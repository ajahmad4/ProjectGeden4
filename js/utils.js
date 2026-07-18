/**
 * UTILITY FUNCTIONS / KUMPULAN FUNGSI PEMBANTU
 * File ini berfungsi sebagai pustaka utilitas independen yang menyediakan fungsi global 
 * untuk mendukung penyajian antarmuka (UI) aplikasi yang dinamis.
 *
 * CHANGELOG:
 * - Ditambahkan pemetaan ikon untuk semua kategori yang digunakan di data.js:
 *   tokoh, perjanjian, kenabian, dakwah, mukjizat, politik, militer
 */

/**
 * Mendapatkan string pengenal ikon Google Material Symbols berdasarkan kategori historis.
 * Fungsi ini mengembalikan string nama ikon spesifik yang akan dirender baik pada 
 * penanda peta (map marker) maupun daftar navigasi panel explorer.
 * @param {string} kategori - Kategori dari situs sejarah
 * @returns {string} Nama kelas ikon Material Symbols yang siap digunakan
 */
function getMaterialIcon(kategori) {
    switch (kategori) {
        // Kategori utama (marker layer group)
        case "masjid":
            return "mosque";           // Kubah masjid — pusat ibadah & dakwah

        case "kerajaan":
            return "castle";           // Benteng/kastil — pusat kesultanan & pemerintahan

        case "pelabuhan":
            return "anchor";           // Jangkar — bandar kuno / pelabuhan dagang

        case "kota":
            return "location_city";    // Gedung kota — pemukiman / wilayah administratif

        // Kategori tambahan dari data.js (pra-Islam & kenabian)
        case "tokoh":
            return "person";           // Figur manusia — tokoh historis penting

        case "perjanjian":
            return "handshake";        // Jabat tangan — perjanjian antar pihak

        case "kenabian":
            return "auto_awesome";     // Bintang/cahaya — peristiwa kenabian

        case "dakwah":
            return "campaign";         // Megafon — penyebaran ajaran Islam

        case "mukjizat":
            return "flare";            // Sinar — peristiwa luar biasa / mukjizat

        case "politik":
            return "groups";           // Kelompok orang — peristiwa politik / bai'at

        case "militer":
            return "shield";           // Perisai — peristiwa militer / pertempuran

        default:
            return "place";            // Pin peta standar — kategori tidak terdefinisi
    }
}