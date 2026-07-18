// js/timeline-data.js
/**
 * =========================================================================
 * TIMELINE DATA & CONFIGURATION
 * =========================================================================
 *
 * CHANGELOG:
 * - Diperbaiki: Era tidak lagi tumpang tindih (overlap) agar getCurrentEra()
 *   via Array.find() selalu mengembalikan tepat satu era per tahun.
 * - Ditambahkan: Era transisi Pasca-Abbasiyah (1258–1291) untuk menutup gap.
 * - Disesuaikan: era-penyebaran-nusantara & era-kesultanan tidak overlap lagi.
 *   era-kesultanan dimulai dari 1400 (periode awal Demak) agar ada batas jelas.
 * - Era-imperium-dunia & era-kemunduran/modern tidak lagi tumpang tindih.
 */

const TIMELINE_CONFIG = {
    minYear: 570,    // Tahun kelahiran Nabi Muhammad SAW & Tahun Gajah
    maxYear: 2000,   // Batas atas tahun timeline
};

const TIMELINE_ERAS = [
    {
        id: "era-pra-islam",
        name: "Masa Pra-Islam (Jahiliyah)",
        colorRgb: "105, 105, 105",
        start: 570,
        end: 609
    },
    {
        id: "era-kenabian",
        name: "Era Kenabian Muhammad SAW",
        colorRgb: "34, 139, 34",
        start: 610,
        end: 632
    },
    {
        id: "era-rashidun",
        name: "Khulafaur Rasyidin",
        colorRgb: "0, 102, 204",
        start: 633,
        end: 661
    },
    {
        id: "era-umayyah",
        name: "Dinasti Umayyah",
        colorRgb: "139, 0, 0",
        start: 662,
        end: 750
    },
    {
        id: "era-abbasiyah",
        name: "Dinasti Abbasiyah",
        colorRgb: "255, 140, 0",
        start: 751,
        end: 1258
    },
    {
        id: "era-pasca-abbasiyah",
        name: "Pasca Abbasiyah & Awal Penyebaran Islam Nusantara",
        colorRgb: "100, 160, 100",
        start: 1259,
        end: 1399
    },
    {
        id: "era-penyebaran-nusantara",
        name: "Masuknya Islam ke Nusantara & Wali Songo",
        colorRgb: "46, 139, 87",
        start: 1400,
        end: 1524
    },
    {
        id: "era-kesultanan",
        name: "Kerajaan / Kesultanan Islam di Indonesia",
        colorRgb: "218, 165, 32",
        start: 1525,
        end: 1699
    },
    {
        id: "era-imperium-dunia",
        name: "Imperium Islam Dunia (Utsmaniyah, Mughal, Safawi)",
        colorRgb: "0, 128, 128",
        start: 1700,
        end: 1799
    },
    {
        id: "era-kemunduran",
        name: "Kemunduran Umat Islam & Penjajahan Barat",
        colorRgb: "139, 69, 19",
        start: 1800,
        end: 1944
    },
    {
        id: "era-modern",
        name: "Era Modern & Kebangkitan Islam Kontemporer",
        colorRgb: "70, 130, 180",
        start: 1945,
        end: 2000
    }
];