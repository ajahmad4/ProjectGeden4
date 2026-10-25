/**
 * UTILITY FUNCTIONS / KUMPULAN FUNGSI PEMBANTU
 * File ini berfungsi sebagai pustaka utilitas independen yang menyediakan fungsi global 
 * untuk mendukung penyajian antarmuka (UI) aplikasi yang dinamis.
 *
 * CHANGELOG:
 * - Ditambahkan pemetaan ikon untuk semua kategori yang digunakan di data.js:
 *   tokoh, perjanjian, kenabian, dakwah, mukjizat, politik, militer
 */

const ICON_KATEGORI = {
    masjid: "mosque",           // Kubah masjid — pusat ibadah & dakwah
    kerajaan: "castle",         // Benteng/kastil — pusat kesultanan & pemerintahan
    pelabuhan: "anchor",        // Jangkar — bandar kuno / pelabuhan dagang
    kota: "location_city",      // Gedung kota — pemukiman / wilayah administratif
    tokoh: "person",            // Figur manusia — tokoh historis penting
    perjanjian: "handshake",    // Jabat tangan — perjanjian antar pihak
    kenabian: "auto_awesome",   // Bintang/cahaya — peristiwa kenabian
    dakwah: "campaign",         // Megafon — penyebaran ajaran Islam
    mukjizat: "flare",          // Sinar — peristiwa luar biasa / mukjizat
    politik: "groups",          // Kelompok orang — peristiwa politik / bai'at
    militer: "shield"           // Perisai — peristiwa militer / pertempuran
};

/**
 * Mendapatkan string pengenal ikon Google Material Symbols berdasarkan kategori historis.
 * @param {string} kategori - Kategori dari situs sejarah
 * @returns {string} Nama kelas ikon Material Symbols yang siap digunakan
 */
function getMaterialIcon(kategori) {
    return ICON_KATEGORI[kategori] || "place";
}