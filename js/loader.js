/**
 * ENGINE UTAMA INTERAKSI ANTARMUKA DAN MANIPULASI DATA DOM
 * File ini bertugas mengeksekusi perulangan (looping) data sejarah, merender marker kustom
 * ke dalam klaster layer peta Leaflet, menyuntikkan komponen card list navigasi,
 * serta mengatur animasi buka-tutup panel detail edukasi secara responsif.
 */

// ==========================================
// 1. INTEGRASI DATABASE LOKAL DAN RENDER UI
// ==========================================

/**
 * Membaca data array terpusat 'dataSejarahNusantara' (dari js/data.js),
 * lalu mendistribusikannya secara otomatis ke komponen peta dan panel navigasi kiri.
 */
// menyimpan seluruh marker berdasarkan id lokasi
const markerLokasi = {};

function renderDaftarLokasi(dataLokasi) {

    const locationList = document.getElementById("location-list");

    if (!locationList) return;

    locationList.innerHTML = "";

    dataLokasi.forEach(loc => {

        const iconName = getMaterialIcon(loc.kategori);

        const buttonHTML = `
            <div onclick="eksekusiNavigasiLokal('${loc.id}')"
                class="w-full flex items-center gap-4 px-5 py-4 bg-[#fcfbf9] hover:bg-[#f6f2ec] border border-[#e7e1da] rounded-2xl transition-all duration-300 cursor-pointer group">

                <div class="w-12 h-12 flex-shrink-0 rounded-full bg-[#edf3ef] text-[#1f4b3a] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">

                    <span class="material-symbols-outlined text-[24px]">
                        ${iconName}
                    </span>

                </div>

                <div class="flex-1 min-w-0">

                    <p class="font-semibold text-[16px] text-[#2f2f2f] truncate group-hover:text-[#1f4b3a] transition-colors">

                        ${loc.nama}

                    </p>

                    <p class="text-[12px] text-[#8b847a] mt-1">

                        Tahun Kontak: ${loc.tahun} M

                    </p>

                </div>

                <span class="material-symbols-outlined text-[#b4aea6] text-[18px] transition-transform duration-200 group-hover:translate-x-1">

                    arrow_forward_ios

                </span>

            </div>
        `;

        locationList.innerHTML += buttonHTML;

    });

}

function muatLokasiAplikasi() {
    // Membidik elemen kontainer daftar navigasi pada panel kiri index.html
    const locationList = document.getElementById('location-list');
    if (!locationList) return;
    
    // Sterilisasi kontainer list sebelum diisi data untuk menghindari penumpukan elemen
    locationList.innerHTML = ''; 

    // Eksekusi perulangan otomatis untuk setiap entitas data sejarah kebudayaan Islam
    dataSejarahNusantara.forEach(loc => {
        
        // A. PENANGANAN SPASIAL DAN MARKER PETA (KOLABORASI DENGAN MAP.JS)
        if (typeof map !== 'undefined') {
            // Memanggil fungsi penentu ikon dinamis yang berada di js/map.js
            const ikonPilihan = buatIkonSejarah(loc.kategori);
            
            // Inisialisasi objek marker Leaflet memanfaatkan koordinat array [lat, lng]
            const marker = L.marker(loc.koordinat, { icon: ikonPilihan });
            
            markerLokasi[loc.id] = marker; // Menyimpan referensi marker berdasarkan ID unik lokasi

            // Menyisipkan tooltip/popup informatif saat marker berinteraksi dengan pengguna
            marker.bindTooltip(`<b>${loc.nama}</b><br><small>Tahun Kontak: ${loc.tahun} M</small>`, {
                direction: 'top',
                offset: [0, -10]
            });

            // Sistem Event Klik pada Marker Peta: Mengarahkan kamera dan memicu panel detail
            marker.on("click", function () {

                map.flyTo(loc.koordinat, 12, {
                    animate: true,
                    duration: 1.5
                });

                showDetail(loc);
                aktifkanCard(loc.id);

            });

            // Distribusi marker ke dalam kelompok Layer Group spesifik berdasarkan kategorinya
            switch (loc.kategori) {
                case 'masjid':
                    marker.addTo(layerMasjid);
                    break;
                case 'kerajaan':
                    marker.addTo(layerKerajaan);
                    break;
                case 'pelabuhan':
                    marker.addTo(layerPelabuhan);
                    break;
                default:
                    marker.addTo(map); // Layer cadangan jika kategori umum
            }
        }

        // B. PENANGANAN STRUKTUR ANTARMUKA (UI NAVIGASI CARD LIST KIRI)
        // Mengambil teks ikon Google Material Symbols dari pustaka fungsi js/utils.js
        const iconName = getMaterialIcon(loc.kategori); 
        
        // Komposisi string HTML komponen button card dengan manipulasi parameter string yang aman
        const buttonHTML = `
            <div 
                id="card-${loc.id}"
                onclick="eksekusiNavigasiLokal('${loc.id}')"
                class="w-full mx-0 flex items-center gap-2.5 px-2.5 py-2.5 bg-[#fcfbf9] hover:bg-[#f6f2ec] border border-[#e7e1da] rounded-2xl transition-all duration-300 cursor-pointer group">

                <div class="w-9 h-9 flex-shrink-0 rounded-full bg-[#edf3ef] text-[#1f4b3a] flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                    <span class="material-symbols-outlined text-[18px]">${iconName}</span>
                </div>

                <div class="flex-1 min-w-0">
                    <p class="font-medium text-[13px] text-[#2f2f2f] truncate group-hover:text-[#1f4b3a] transition-colors">
                        ${loc.nama}
                    </p>

                    <p class="text-[10px] text-[#8b847a] mt-0.5">
                        Tahun Kontak: ${loc.tahun} M
                    </p>
                </div>

                <span class="material-symbols-outlined text-[#b4aea6] text-[16px] transition-transform duration-200 group-hover:translate-x-1">
                    arrow_forward_ios
                </span>

            </div>
        `;        
        // Injeksi elemen HTML card list ke dalam DOM halaman web
        locationList.innerHTML += buttonHTML;
    });
}

// ==========================================
// 2. FUNGSI MANAJEMEN INTERAKSI & TRANSISI UI
// ==========================================

/**
 * Menjembatani aksi klik pada list navigasi kiri agar peta bergerak
 * dan panel detail kanan menyajikan data historis yang bersesuaian.
 * @param {string} targetId - String ID unik pengenal situs sejarah
 */

function aktifkanCard(id) {

    document.querySelectorAll("#location-list > div").forEach(card => {
        card.classList.remove("location-card-active");
    });

    const cardAktif = document.getElementById(`card-${id}`);

    if (cardAktif) {
        cardAktif.classList.add("location-card-active");

        cardAktif.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

}

function eksekusiNavigasiLokal(targetId) {
    // Membaca baris array untuk menemukan kecocokan ID objek
    const lokasiTerpilih = dataSejarahNusantara.find(loc => loc.id === targetId);
    
    if (lokasiTerpilih && typeof map !== 'undefined') {
        // Meluncurkan animasi kamera peta ke titik koordinat sejarah secara anggun
        map.flyTo(lokasiTerpilih.koordinat, 12, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
        });
        
        // Membuka panel narasi edukasi
        showDetail(lokasiTerpilih);
        aktifkanCard(targetId);
    }
}

/**
 * Mengisi konten teks narasi edukasi dan menampilkan panel informasi detail kanan.
 */
function showDetail(lokasi) {

    const detailPanel = document.getElementById("detail-panel");

    if (!detailPanel) return;

    detailPanel.classList.remove("hidden");

    document.getElementById("detail-nama").innerText = lokasi.nama;

    document.getElementById("detail-tahun").innerText = lokasi.periode;

    document.getElementById("detail-lokasi").innerText = lokasi.lokasi;

    document.getElementById("detail-kategori").innerText =
        lokasi.kategori.charAt(0).toUpperCase() + lokasi.kategori.slice(1);

    document.getElementById("detail-wilayah").innerText = lokasi.wilayah;

    const fotoWrapper = document.getElementById("detail-foto-wrapper");
    const foto = document.getElementById("detail-foto");

    if (lokasi.foto && lokasi.foto.length > 0) {

        foto.src = lokasi.foto[0];
        foto.alt = lokasi.nama;
        foto.onerror = function () {
            this.src = "assets/images/placeholder.jpg"; // Gambar cadangan jika URL foto tidak valid
        };

        fotoWrapper.classList.remove("hidden");

    } else {

        fotoWrapper.classList.add("hidden");

    }

    document.getElementById("detail-deskripsi").innerText =
        lokasi.deskripsi;

}

/**
 * Menutup panel informasi detail kanan seutuhnya TANPA mengubah posisi fokus kamera peta.
 */
function tutupDetailPanel() {
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }
    
    // Memaksa penyegaran ukuran area pandang Leaflet karena hilangnya panel kanan (mencegah lag)
    if (typeof map !== 'undefined') {
        setTimeout(() => { map.invalidateSize(); }, 300);
    }
}

/**
 * Melakukan reset visual total (Zoom Out) ke peta makro kedaulatan Indonesia.
 * Fungsi ini terikat khusus pada interaksi klik judul/logo utama di header aplikasi.
 */
function resetTampilanDefault() {
    // 1. Menyembunyikan panel detail kanan jika sedang terbuka
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }

    // 2. Mengembalikan posisi layout kontrol peta sisi kanan (jika terdapat modifikasi margin)
    const kontrolKanan = document.querySelectorAll('.leaflet-right');
    kontrolKanan.forEach(el => {
        el.classList.remove('geser-kiri');
    });

    // 3. Meluncurkan animasi zoom out kembali menghadap titik tengah kepulauan Nusantara
    if (typeof map !== 'undefined') {
        map.flyTo([1.0, 115.0], 5, { // Konsisten dengan titik pusat inisialisasi awal di map.js [1.0, 115.0]
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
        });
    }
}

// ==========================================
// 3. PICU UTAMA PEMUATAN SISTEM (INITIALIZER)
// ==========================================
// Menjalankan fungsi render otomatis segera setelah seluruh struktur DOM HTML selesai dimuat
document.addEventListener("DOMContentLoaded", function () {

    muatLokasiAplikasi();

    updateEraHeader(570);

    const searchInput = document.getElementById("search-input");

    if (!searchInput) return;

searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase().trim();

    const locationList = document.getElementById("location-list");

    locationList.innerHTML = "";

    let jumlahHasil = 0;

    dataSejarahNusantara.forEach(loc => {

        const cocok =
            loc.nama.toLowerCase().includes(keyword) ||
            loc.kategori.toLowerCase().includes(keyword) ||
            loc.lokasi.toLowerCase().includes(keyword) ||
            loc.wilayah.toLowerCase().includes(keyword);

        if (!cocok) return;

        jumlahHasil++;

        const iconName = getMaterialIcon(loc.kategori);

        const buttonHTML = `
            <div 
                id="card-${loc.id}"
                onclick="eksekusiNavigasiLokal('${loc.id}')"
                class="w-full flex items-center gap-4 px-5 py-4 bg-[#fcfbf9] hover:bg-[#f6f2ec] border border-[#e7e1da] rounded-2xl transition-all duration-300 cursor-pointer group">

                <div class="w-12 h-12 flex-shrink-0 rounded-full bg-[#edf3ef] text-[#1f4b3a] flex items-center justify-center">
                    <span class="material-symbols-outlined text-[24px]">${iconName}</span>
                </div>

                <div class="flex-1 min-w-0">

                    <p class="font-semibold text-[16px] text-[#2f2f2f] truncate">
                        ${loc.nama}
                    </p>

                    <p class="text-[12px] text-[#8b847a] mt-1">
                        Tahun Kontak: ${loc.tahun} M
                    </p>

                </div>

                <span class="material-symbols-outlined text-[#b4aea6] text-[18px]">
                    arrow_forward_ios
                </span>

            </div>
        `;

        locationList.innerHTML += buttonHTML;

    });

    if (jumlahHasil === 0) {

        locationList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-14 text-center">

                <span class="material-symbols-outlined text-[42px] text-[#c6bfb5]">
                    search_off
                </span>

                <p class="mt-3 text-[15px] font-semibold text-[#6d675f]">
                    Lokasi tidak ditemukan
                </p>

                <p class="mt-1 text-[13px] text-[#9b948b]">
                    Coba gunakan kata kunci lain.
                </p>

            </div>
        `;

    }

    if (typeof renderJalurDanWilayah === 'function') {
        
        const tahunAwal = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;
        renderJalurDanWilayah(tahunAwal);
    }

});

const timelineSlider = document.getElementById("timeline-slider");
const timelineCurrent = document.getElementById("timeline-current");

if (timelineSlider && timelineCurrent) {

    timelineSlider.addEventListener("input", function () {

        timelineCurrent.textContent = `${this.value} M`;

    });

}

});

// =========================================================================
// RENDER JALUR (POLYLINE) DAN WILAYAH KEKUASAAN (POLYGON)
// =========================================================================

const activePolylines = {};
const activePolygons = {};

function renderJalurDanWilayah(tahunAktif) {

    tahunAktif = Math.round(Number(tahunAktif));

    // Bersihkan gambar lama
    layerJalurSitus.clearLayers();
    layerWilayahKekuasaan.clearLayers();

    // Reset penyimpanan
    Object.keys(activePolylines).forEach(key => delete activePolylines[key]);
    Object.keys(activePolygons).forEach(key => delete activePolygons[key]);

    // =====================================================
    // POLYLINE
    // =====================================================

    dataJalurSejarah.forEach(jalur => {

        if (
            tahunAktif >= jalur.tahunMulai &&
            tahunAktif <= jalur.tahunSelesai
        ) {

            const polyline = L.polyline(jalur.koordinat, {

                color: jalur.warna,
                weight: 5,
                opacity: 0.9,
                dashArray: "10 6",
                smoothFactor: 1,
                lineJoin: "round",
                lineCap: "round"

            });

            polyline.bindPopup(`
                <div class="popup-jalur">
                    <h4>${jalur.nama}</h4>
                    <p><strong>Periode:</strong> ${jalur.tahunMulai}–${jalur.tahunSelesai} M</p>
                    <p>${jalur.deskripsi}</p>
                </div>
            `);

            polyline.addTo(layerJalurSitus);

            activePolylines[jalur.id] = polyline;

        }

    });

    // =====================================================
    // POLYGON
    // =====================================================

    dataWilayahKekuasaan.forEach(wilayah => {    
        
        if (
            tahunAktif >= wilayah.tahunMulai &&
            tahunAktif <= wilayah.tahunSelesai
        ) {
            
            const polygon = L.polygon(wilayah.koordinat, {

                color: wilayah.warna,
                fillColor: wilayah.warna,
                fillOpacity: 0.18,
                weight: 2

        });

        polygon.bindPopup(`
            <div class="popup-wilayah">
                <h4>${wilayah.nama}</h4>
                <p><strong>Periode:</strong> ${wilayah.tahunMulai}–${wilayah.tahunSelesai} M</p>
                <p>${wilayah.deskripsi}</p>
            </div>
        `);

            polygon.addTo(layerWilayahKekuasaan);

            activePolygons[wilayah.id] = polygon;

        }

    });
    
}

function updateEraHeader(tahunAktif){

    const container = document.getElementById("era-header");

    const eraAktif = dataWilayahKekuasaan.filter(wilayah=>

        tahunAktif >= wilayah.tahunMulai &&
        tahunAktif <= wilayah.tahunSelesai

    );

    if(eraAktif.length===0){

        container.innerHTML=`
            <h3>Era Aktif</h3>
            <span>Tidak ada kerajaan aktif</span>
        `;

        return;

    }

    container.innerHTML=`
        <h3>Era Aktif</h3>

        ${eraAktif.map(wilayah=>`

            <div class="era-item">

                <strong>${wilayah.nama}</strong>

                <span>${wilayah.tahunMulai}–${wilayah.tahunSelesai} M</span>

            </div>

        `).join("")}
    `;

}