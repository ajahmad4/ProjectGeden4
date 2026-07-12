// js/utils.js

// Fungsi untuk memilih ikon berdasarkan kategori lokasi
function getMaterialIcon(kategori) {
    switch (kategori) {
        case "masjid": return "mosque";
        case "kerajaan": return "castle";
        case "pelabuhan": return "anchor";
        case "kota": return "location_city";
        default: return "place"; // Ikon default jika kategori tidak dikenal
    }
}