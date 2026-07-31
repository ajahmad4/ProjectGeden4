/**
 * DATABASE SPASIAL: JALUR (POLYLINE)
 * Menyimpan informasi geometris rute/jalur dan ID referensinya.
 * Hanya memuat event yang membutuhkan visualisasi rute perpindahan/perjalanan.
 */

const dataJalur = [
  // ==========================================
  // 1. ERA PRA-ISLAM & KENABIAN
  // ==========================================
  {
    id: "j-abrahah",
    nama: "Jalur Pasukan Abrahah ke Ka'bah (Tahun Gajah)",
    tipe: "militer",
    tahunMulai: 570,
    tahunSelesai: 570,
    warna: "#8B0000", // Merah Tua / Militer
    koordinat: [
      [15.3520, 44.2075], // Sana'a (Yaman)
      [17.5000, 44.1500], // Najran
      [19.5000, 42.5000], // Tathlith
      [21.2700, 40.4200], // Taif
      [21.4225, 39.8262]  // Mekkah
    ],
    deskripsi: "Rute invasi pasukan Abrahah dari Sana'a (Yaman) menuju Mekkah untuk menghancurkan Ka'bah dengan pasukan gajah."
  },
  {
    id: "j-perdagangan-syam",
    nama: "Rute Perdagangan ke Syam (Pertemuan Pendeta Bahira)",
    tipe: "perdagangan",
    tahunMulai: 582,
    tahunSelesai: 582,
    warna: "#A0522D", // Cokelat Kayu / Perdagangan
    koordinat: [
      [21.4225, 39.8262], // Mekkah
      [24.4667, 39.6167], // Yatsrib (Madinah)
      [27.4833, 35.8000], // Tabuk
      [30.3285, 35.4444], // Ma'an (Petra)
      [32.5186, 36.4811]  // Bushra (Bostra, Syam)
    ],
    deskripsi: "Jalur kafilah dagang Quraisy dari Mekkah menuju Bushra (Syam), tempat Nabi Muhammad kecil bertemu Pendeta Bahira."
  },
  {
    id: "j-hijrah-habasyah",
    nama: "Rute Hijrah Pertama ke Habasyah (Ethiopia)",
    tipe: "peristiwa",
    tahunMulai: 615,
    tahunSelesai: 615,
    warna: "#2E8B57", // Hijau Laut
    koordinat: [
      [21.4225, 39.8262], // Mekkah
      [21.5433, 39.1728], // Pelabuhan Shu'aiba (Jeddah Kuno)
      [19.1000, 37.3300], // Menyeberangi Laut Merah
      [15.6031, 39.4678], // Pelabuhan Adulis (Eritrea)
      [14.1311, 38.7208]  // Aksum (Kerajaan Habasyah)
    ],
    deskripsi: "Perjalanan penyelamatan diri rombongan Muslim pertama dari Mekkah menyeberangi Laut Merah menuju Kerajaan Aksum."
  },
  {
    id: "j-isra-miraj",
    nama: "Jalur Isra' Mi'raj Nabi Muhammad SAW",
    tipe: "mukjizat",
    tahunMulai: 621,
    tahunSelesai: 621,
    warna: "#4B0082", // Ungu / Spiritual
    koordinat: [
      [21.4225, 39.8262], // Masjidil Haram (Mekkah)
      [31.7765, 35.2362], // Masjidil Aqsa (Yerusalem)
      [21.4225, 39.8262]  // Kembali ke Mekkah
    ],
    deskripsi: "Perjalanan mukjizat malam hari Nabi Muhammad SAW dari Masjidil Haram ke Masjidil Aqsa sebelum di-mi'raj-kan."
  },
  {
    id: "j-hijrah-madinah",
    nama: "Rute Hijrah Nabi ke Madinah",
    tipe: "politik",
    tahunMulai: 622,
    tahunSelesai: 622,
    warna: "#008080", // Toska / Transisi Era
    koordinat: [
      [21.4225, 39.8262], // Mekkah
      [21.3110, 39.8510], // Gua Tsur (Selatan Mekkah)
      [21.5000, 39.1000], // Menyusuri pesisir pantai Laut Merah (Rabigh)
      [22.8000, 38.9000], // Badr
      [24.4394, 39.6172], // Masjid Quba
      [24.4667, 39.6167]  // Yatsrib (Madinah)
    ],
    deskripsi: "Rute rahasia yang ditempuh Nabi Muhammad SAW dan Abu Bakar RA menghindari kejaran Quraisy menuju Madinah."
  },
  {
    id: "j-fathu-makkah",
    nama: "Rute Pasukan Fathu Makkah",
    tipe: "militer",
    tahunMulai: 630,
    tahunSelesai: 630,
    warna: "#228B22", // Hijau Tua
    koordinat: [
      [24.4667, 39.6167], // Madinah
      [23.7822, 38.7892], // Badar
      [22.4000, 39.1000], // Usfan
      [21.6000, 39.5000], // Marr az-Zahran
      [21.4225, 39.8262]  // Mekkah
    ],
    deskripsi: "Pergerakan 10.000 pasukan Muslim dari Madinah menuju Mekkah yang berakhir pada pembebasan kota tanpa pertumpahan darah."
  },

  // ==========================================
  // 2. KHULAFAUR RASYIDIN, UMAYYAH & ABBASIYAH
  // ==========================================
  {
    id: "j-jalur-awal-arab",
    nama: "Rute Pelayaran Saudagar Arab ke Barus",
    tipe: "pelayaran",
    tahunMulai: 674, // Dikoreksi sesuai konteks abad ke-7 M di dataObjekAtlas
    tahunSelesai: 800,
    warna: "#2E7559", // Hijau Tua
    koordinat: [
      [12.1642, 45.0118], // Aden (Yaman)
      [11.8311, 51.1895], // Tanjung Guardafui
      [7.8731, 80.7718],  // Sri Lanka (Transit)
      [5.5483, 95.3238],  // Ujung Sumatera (Banda Aceh)
      [2.0028, 98.3789]   // Bandar Kuno Barus (Tujuan)
    ],
    deskripsi: "Rute perdagangan laut maritim langsung dari Yaman/Arab Selatan melintasi Samudera Hindia menuju pelabuhan kapur barus di Sumatera Utara."
  },
  {
    id: "j-ekspansi-andalusia",
    nama: "Rute Penaklukan Tariq bin Ziyad ke Andalusia",
    tipe: "militer",
    tahunMulai: 711,
    tahunSelesai: 711,
    warna: "#B22222", // Merah Bata
    koordinat: [
      [35.8894, -5.3213], // Ceuta (Afrika Utara)
      [36.1408, -5.3536], // Menyeberang ke Gibraltar (Jabal Tariq)
      [36.1500, -5.4500], // Algeciras
      [37.3891, -5.9845], // Sevilla
      [37.8882, -4.7794]  // Kordoba
    ],
    deskripsi: "Jalur penyeberangan pasukan Tariq bin Ziyad dari Ceuta menyeberangi Selat Gibraltar hingga menguasai kota-kota utama Andalusia."
  },
  {
    id: "j-invasi-mongol",
    nama: "Rute Invasi Pasukan Mongol ke Baghdad",
    tipe: "militer",
    tahunMulai: 1257,
    tahunSelesai: 1258,
    warna: "#4A4A4A", // Abu-abu Gelap / Kehancuran
    koordinat: [
      [37.9500, 58.3833], // Nisa / Khorasan
      [35.6961, 51.4231], // Rayy (Teheran)
      [34.3142, 47.0650], // Kermanshah
      [33.3152, 44.3661]  // Baghdad
    ],
    deskripsi: "Pergerakan pasukan Mongol di bawah pimpinan Hulagu Khan dari Persia menuju dan mengepung ibu kota Kekhalifahan Abbasiyah di Baghdad."
  },

  // ==========================================
  // 3. ERA NUSANTARA
  // ==========================================
  {
    id: "j-dakwah-samudera-pasai",
    nama: "Rute Penyebaran Dakwah Samudera Pasai",
    tipe: "dakwah",
    tahunMulai: 1267,
    tahunSelesai: 1500,
    warna: "#D36B1E", // Oranye Kesultanan
    koordinat: [
      [5.1278, 97.2341],  // Samudera Pasai
      [2.2064, 102.2501], // Melaka
      [-5.9750, 105.9221], // Selat Sunda
      [-6.8943, 110.6386] // Pantai Utara Jawa (Demak / Gresik)
    ],
    deskripsi: "Jalur persebaran agama Islam dan perdagangan maritim dari Samudera Pasai menuju Selat Malaka hingga pesisir utara Pulau Jawa."
  }
];