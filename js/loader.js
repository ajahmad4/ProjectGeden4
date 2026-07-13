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
            
            // Menyisipkan tooltip/popup informatif saat marker berinteraksi dengan pengguna
            marker.bindTooltip(`<b>${loc.nama}</b><br><small>Tahun Kontak: ${loc.tahun} M</small>`, {
                direction: 'top',
                offset: [0, -10]
            });

            // Sistem Event Klik pada Marker Peta: Mengarahkan kamera dan memicu panel detail
            marker.on('click', function() {
                map.flyTo(loc.koordinat, 12, { animate: true, duration: 1.5 });
                showDetail(loc.nama, loc.tahun, loc.deskripsi);
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
            <div onclick="eksekusiNavigasiLokal('${loc.id}')" 
                 class="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 border border-gray-200 rounded-lg transition-all shadow-sm text-left cursor-pointer group hover:border-emerald-200">
                <div class="w-9 h-9 rounded-full bg-emerald-50 text-emerald-900 flex items-center justify-center transition-transform group-hover:scale-105">
                    <span class="material-symbols-outlined text-xl">${iconName}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-semibold text-gray-800 text-sm truncate group-hover:text-emerald-800 transition-colors">${loc.nama}</p>
                    <p class="text-xs text-gray-500 mt-0.5">Tahun Kontak: ${loc.tahun} M</p>
                </div>
                <span class="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward_ios</span>
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
        showDetail(lokasiTerpilih.nama, lokasiTerpilih.tahun, lokasiTerpilih.deskripsi);
    }
}

/**
 * Mengisi konten teks narasi edukasi dan menampilkan panel informasi detail kanan.
 */
function showDetail(nama, tahun, deskripsi) {
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.classList.remove('hidden');
        document.getElementById('detail-nama').innerText = nama;
        document.getElementById('detail-tahun').innerText = tahun + " M";
        document.getElementById('detail-deskripsi').innerText = deskripsi;
    }
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
document.addEventListener('DOMContentLoaded', muatLokasiAplikasi);