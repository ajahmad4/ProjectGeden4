/**
 * UTILITY FUNCTIONS / KUMPULAN FUNGSI PEMBANTU
 * File ini berfungsi sebagai pustaka utilitas independen yang menyediakan fungsi global 
 * untuk mendukung penyajian antarmuka (UI) aplikasi yang dinamis.
 */

/**
 * Mendapatkan string pengenal ikon Google Material Symbols berdasarkan kategori historis.
 * Fungsi ini mengembalikan string nama ikon spesifik yang akan dirender baik pada 
 * penanda peta (map marker) maupun daftar navigasi panel explorer.
 * * @param {string} kategori - Kategori dari situs sejarah (misalnya: 'masjid', 'kerajaan', dll)
 * @returns {string} Nama kelas ikon Material Symbols yang siap digunakan
 */
function getMaterialIcon(kategori) {
    switch (kategori) {
        case "masjid": 
            return "mosque";        // Ikon Kubah Masjid untuk pusat dakwah/ibadah
        case "kerajaan": 
            return "castle";        // Ikon Benteng/Kastil untuk pusat kesultanan/pemerintahan
        case "pelabuhan": 
            return "anchor";        // Ikon Jangkar untuk bandar kuno / pelabuhan transit dagang
        case "kota": 
            return "location_city"; // Ikon Gedung/Kota untuk pemukiman atau wilayah administratif umum
        default: 
            return "place";         // Ikon Pin Peta standar jika kategori data tidak terdefinisi
    }
}