/**
 * KONFIGURASI DAN INISIALISASI PETA UTAMA (LEAFLET ENG)
 * File ini mengontrol pembuatan komponen spasial, penentuan batas wilayah (bounds),
 * manajemen basemap, penataan layer kontrol overlay, serta integrasi plugin MiniMap.
 */

// ==========================================
// 1. INISIALISASI LAYER GROUP (MANAJEMEN SPASIAL)
// ==========================================
// Membagi data spasial menjadi beberapa klaster kelompok layer independen 
// agar mempermudah fitur filter (menyala/mati) pada kontrol overlay peta.
var layerMasjid = L.layerGroup();
var layerKerajaan = L.layerGroup();
var layerPelabuhan = L.layerGroup();
var layerKota = L.layerGroup();

var layerJalurSitus = L.layerGroup();
var layerWilayahKekuasaan = L.layerGroup();

// ==========================================
// 2. STABILISASI DAN PEMBUATAN MESIN PETA (L.map)
// ==========================================
// Inisialisasi kontainer peta utama yang membidik elemen dengan ID 'map'
const map = L.map('map', {
    center: [1.0, 115.0],              // Koordinat titik tengah (center) geografis wilayah Indonesia
    zoom: 5,                            // Skala zoom awal untuk menampilkan lanskap Nusantara secara utuh
    zoomControl: false,                 // Mematikan kontrol tombol zoom default agar bisa diatur posisinya secara kustom
    layers: [
        layerMasjid, 
        layerKerajaan, 
        layerPelabuhan, 
        layerJalurSitus,
        layerKota, 
        layerWilayahKekuasaan
    ] // Seluruh klaster layer otomatis aktif di awal pemuatan
});

// Membatasi ruang navigasi skala interaksi peta (mencegah distorsi atau peta blank)
map.setMinZoom(4);                      // Batas maksimal zoom out (skala makro Nusantara)
map.setMaxZoom(15);                     // Batas maksimal zoom in (skala mikro situs lokal)

// ==========================================
// 3. INTEGRASI RENDER BASEMAP UTAMA
// ==========================================
// Menggunakan ubin peta (tile layer) CartoDB Light Minimalist agar fokus visual siswa
// tetap tertuju pada kontras warna marker situs sejarah kebudayaan Islam.
let currentBasemap = null;

function setBasemap(theme) {
    if (currentBasemap) {
        map.removeLayer(currentBasemap);
    }
    const tileUrl = theme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        
    currentBasemap = L.tileLayer(tileUrl, { 
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(map);
}

// Initial basemap load
const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
setBasemap(initialTheme);

// ==========================================
// 4. MANAJEMEN KONTROL LAYER & NAVIGASI UI
// ==========================================
// Menyusun objek overlay berdasarkan klaster layer sejarah kebudayaan Islam terbaru
const baseLayers = {}; 
const overlays = {
    "Situs Masjid": layerMasjid,
    "Pusat Kesultanan/Kerajaan": layerKerajaan,
    "Pelabuhan/Bandar Transaksi": layerPelabuhan,
    "Jalur Dakwah/Perdagangan": layerJalurSitus,
    "Wilayah Kekuasaan Kesultanan":layerWilayahKekuasaan,
    "kota" : layerKota
};

// Menempatkan menu kontrol layer di pojok kanan atas agar estetik dan fungsional
L.control.layers(baseLayers, overlays, { 
    position: 'topright',
    collapsed: true // Panel layer tetap terbuka secara default agar interaktif bagi siswa
}).addTo(map);

// Menyisipkan kembali tombol kontrol zoom (+/-) tepat di bawah panel manajemen layer
L.control.zoom({ position: 'topright' }).addTo(map);

// ==========================================
// 5. IMPLEMENTASI PLUGIN LEAFLET-MINIMAP
// ==========================================
// Membuat layer independen sekunder khusus untuk peta kecil penunjuk orientasi regional
const initialMiniTile = initialTheme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

var layerMini = L.tileLayer(initialMiniTile, {
    minZoom: 0,
    maxZoom: 13,
    attribution: false 
});

// Pengaturan parameter dimensi, posisi, dan perilaku reaktivitas minimap
var opsiMinimap = {
    position: 'bottomright',  
    width: 150,               
    height: 150,              
    collapsedWidth: 24,       
    collapsedHeight: 24,      
    zoomLevelOffset: -4,      // Menjaga perbandingan skala kedalaman zoom (peta mini 4 tingkat lebih jauh)
    toggleDisplay: true,      
    autoToggleDisplay: true   // Suspensi otomatis aktif demi menjaga kestabilan memori render browser
};

// Eksekusi inisialisasi MiniMap kontrol ke dalam peta utama
var miniMap = new L.Control.MiniMap(layerMini, opsiMinimap).addTo(map);

// Event Handler: Menjamin peta kecil menyegarkan ukuran kontainernya (anti-blank/pecah)
// sesaat setelah peta utama selesai melakukan proses pergeseran animasi makro (flyTo/drag)
map.on('moveend zoomend', function () {
    if (miniMap && miniMap._miniMap) {
        miniMap._miniMap.invalidateSize();
    }
});

// Listener dari js/theme.js
window.updateMapTheme = function(theme) {
    setBasemap(theme);
    
    if (miniMap) {
        const tileUrl = theme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
            
        var newLayerMini = L.tileLayer(tileUrl, {
            minZoom: 0, maxZoom: 13, attribution: false 
        });
        miniMap.changeLayer(newLayerMini);
    }
};

// ==========================================
// 6. ADAPTASI RENDER PENANDA KUSTOM (CUSTOM MARKER)
// ==========================================
/**
 * Merender representasi grafis penanda (marker) secara dinamis memanfaatkan kolaborasi
 * kelas gaya utilitas Tailwind CSS serta pustaka simbol dari Google Material Symbols (utils.js).
 * @param {string} kategori - Jenis identitas data geografis ('masjid', 'kerajaan', 'pelabuhan')
 * @returns {object} Instansiasi dari L.divIcon sebagai penanda kustom Leaflet
 */
function buatIkonSejarah(kategori) {
    // Menarik data nama string ikon resmi dari pustaka fungsi di js/utils.js
    const namaIkon = getMaterialIcon(kategori);

    // Palet warna diferensiasi visual per kategori historis
    // Menggunakan switch untuk scalability (menggantikan if-else berantai)
    let warnaLatar;
    switch (kategori) {
        case "masjid":      warnaLatar = "#1f4b3a"; break; // Hijau tua  — pusat ibadah
        case "kerajaan":    warnaLatar = "#8a6d3b"; break; // Emas-coklat — pusat kekuasaan
        case "pelabuhan":   warnaLatar = "#547792"; break; // Biru-abu   — jalur maritim
        case "kota":        warnaLatar = "#687076"; break; // Abu netral — pusat kota
        case "tokoh":       warnaLatar = "#5c4a8a"; break; // Ungu       — figur historis
        case "kenabian":    warnaLatar = "#2e7d32"; break; // Hijau cerah — peristiwa kenabian
        case "dakwah":      warnaLatar = "#00695c"; break; // Teal       — penyebaran ajaran
        case "mukjizat":    warnaLatar = "#6a1b9a"; break; // Ungu tua   — peristiwa mukjizat
        case "politik":     warnaLatar = "#1565c0"; break; // Biru tua   — peristiwa politik
        case "militer":     warnaLatar = "#b71c1c"; break; // Merah tua  — peristiwa militer
        case "perjanjian":  warnaLatar = "#e65100"; break; // Oranye     — perjanjian/pakta
        default:            warnaLatar = "#5d6d7e"; break; // Abu-biru   — kategori umum
    }

    // Komposisi DOM HTML marker kustom dengan ikon & warna dinamis
    return L.divIcon({
        html: `
        <div
            class="atlas-marker"
            style="background:${warnaLatar}; opacity:1;">
            <span class="material-symbols-outlined">
                ${namaIkon}
            </span>
        </div>
        `,
        className: 'bg-transparent', // Hapus kotak bawaan native CSS Leaflet
        iconSize: [42, 42],          // Dimensi pembungkus ikon
        iconAnchor: [21, 21]         // Titik anchor pada koordinat peta
    });
}


// ======================================================
// BATAS VERTIKAL PETA
// ======================================================

map.on("moveend", function () {

    const center = map.getCenter();

    let lat = center.lat;

    const lng = center.lng;

    if (lat > 80) lat = 80;

    if (lat < -80) lat = -80;

    if (lat !== center.lat) {

        map.panTo([lat, lng], {
            animate: true,
            duration: 0.35
        });

    }

});