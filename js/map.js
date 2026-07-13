// js/map.js

// ==========================================
// 1. INISIALISASI LAYER GROUP (FONDASI DATA)
// ==========================================
const layerMasjid = L.layerGroup();
const layerKota = L.layerGroup();

// ==========================================
// 2. PEMBUATAN MESIN PETA UTAMA (L.map)
// ==========================================
// Peta harus dibuat pertama kali sebelum elemen lain memanggil variabel 'map'
const map = L.map('map', {
    center: [1.0, 115.0],
    zoom: 5,
    zoomControl: false, // Kita matikan bawaan karena posisinya mau kita kustom
    layers: [layerMasjid, layerKota] // Keduanya aktif saat pertama kali dimuat
});

// Mengunci batas zoom peta utama
map.setMinZoom(4);
map.setMaxZoom(15);

// ==========================================
// 3. PEMANGGILAN BASEMAP UTAMA
// ==========================================
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
    maxZoom: 18 
}).addTo(map);

// ==========================================
// 4. KONTROL LAYER & TOMBOL ZOOM UI
// ==========================================
// Kita letakkan kontrol bawaan ini di 'topright' (kanan atas) agar pojok bawah bersih untuk minimap
const baseLayers = {}; 
const overlays = {
    "Masjid": layerMasjid,
    "Kota": layerKota
};
L.control.layers(baseLayers, overlays, { position: 'topright' }).addTo(map);

// Tombol zoom (+/-) kita taruh di pojok kanan atas di bawah menu layer
L.control.zoom({ position: 'topright' }).addTo(map);

var layerMini = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 13,
    attribution: false 
});

var opsiMinimap = {
    position: 'bottomright',  
    width: 150,               
    height: 150,              
    collapsedWidth: 24,       
    collapsedHeight: 24,      
    zoomLevelOffset: -4,      
    toggleDisplay: true,      
    autoToggleDisplay: true // Kembalikan ke true agar Leaflet mengatur suspensi render secara otomatis
};

// Jalankan plugin secara standar bawaan library
var miniMap = new L.Control.MiniMap(layerMini, opsiMinimap).addTo(map);

// Berikan event sederhana ini saja untuk memastikan peta kecil tidak pecah/blank saat selesai flyTo
map.on('moveend zoomend', function () {
    if (miniMap && miniMap._miniMap) {
        miniMap._miniMap.invalidateSize();
    }
});