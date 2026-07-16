// js/timeline-data.js
/**
 * =========================================================================
 * TIMELINE DATA & CONFIGURATION
 * =========================================================================
 */
const TIMELINE_CONFIG = {
    minYear: 570,    // Batas tahun kelahiran Nabi Muhammad SAW
    maxYear: 2000,   // Batas atas tahun timeline
};

const TIMELINE_ERAS = [
    {
        id: "era-awal",
        name: "Era Awal / Teori Masuknya Islam",
        colorRgb: "46, 117, 89", // Hijau (R, G, B) untuk visual variabel CSS
        start: 570,
        end: 1200
    },
    {
        id: "era-kesultanan",
        name: "Era Kesultanan & Kerajaan Islam",
        colorRgb: "211, 107, 30", // Oranye (R, G, B)
        start: 1200,
        end: 1600
    }
    // Jika nanti ingin menambah era baru, Anda CUKUP menambah objek baru di bawah sini!
];