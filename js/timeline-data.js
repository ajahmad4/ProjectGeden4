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
    id: "era-pra-islam",
    name: "Masa Pra-Islam / Jahiliyah di Arab",
    colorRgb: "105, 105, 105",
    start: 570,
    end: 610
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
    start: 632,
    end: 661
  },
  {
    id: "era-umayyah",
    name: "Dinasti Umayyah",
    colorRgb: "139, 0, 0",
    start: 661,
    end: 750
  },
  {
    id: "era-abbasiyah",
    name: "Dinasti Abbasiyah",
    colorRgb: "255, 140, 0",
    start: 750,
    end: 1258
  },
  {
    id: "era-penyebaran-nusantara",
    name: "Masuknya Islam ke Nusantara & Wali Songo",
    colorRgb: "46, 139, 87",
    start: 1200,
    end: 1600
  },
  {
    id: "era-kesultanan",
    name: "Kerajaan / Kesultanan Islam di Indonesia",
    colorRgb: "218, 165, 32",
    start: 1292,
    end: 1800
  },
  {
    id: "era-imperium-dunia",
    name: "Imperium Islam Dunia (Utsmaniyah, Mughal, Safawi)",
    colorRgb: "0, 128, 128",
    start: 1500,
    end: 1800
  },
  {
    id: "era-kemunduran",
    name: "Kemunduran Umat Islam & Penjajahan Barat",
    colorRgb: "139, 69, 19",
    start: 1800,
    end: 1945
  },
  {
    id: "era-modern",
    name: "Era Modern & Kebangkitan Islam Kontemporer",
    colorRgb: "70, 130, 180",
    start: 1945,
    end: 2000
  }
];