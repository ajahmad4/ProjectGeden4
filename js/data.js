/**
 * DATABASE TITIK KOORDINAT SEJARAH ISLAM DI NUSANTARA
 * Materi: Sejarah Kebudayaan Islam (SKI) Kelas 12
 * * Struktur Objek:
 * - id        : Kunci unik pengenal lokasi (string)
 * - nama      : Nama situs sejarah/kerajaan/pelabuhan (string)
 * - tahun     : Tahun perkiraan kontak/berdiri dalam Masehi (string)
 * - kategori  : Jenis situs (menentukan ikon: masjid, kerajaan, pelabuhan, kota)
 * - koordinat : Titik [Latitude, Longitude] presisi untuk Leaflet map (array)
 * - deskripsi : Narasi historis sebagai konten edukasi siswa (string)
 * - foto      : URL gambar visualisasi situs sejarah (string)
 */

const dataSejarahNusantara = [
{
    id: "tahun-gajah",
    nama: "Tahun Gajah",
    tahun: "570",
    periode: "Abad ke-6 M",
    kategori: "kota",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Pasukan Abrahah dari Kerajaan Yaman menyerang Ka'bah dengan pasukan bergajah. Allah mengirim burung ababil yang melempari mereka dengan batu dari tanah yang terbakar, sehingga serangan gagal. Peristiwa ini diabadikan dalam Al-Qur'an Surat Al-Fil.",
    foto: "assets/images/pra-islam/tahun-gajah.jpg",
    era: "era-pra-islam"
  },
  {
    id: "kelahiran-nabi",
    nama: "Kelahiran Nabi Muhammad SAW",
    tahun: "570",
    periode: "Abad ke-6 M",
    kategori: "tokoh",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi Muhammad SAW lahir di Mekkah pada bulan Rabiul Awal. Beliau lahir dalam keadaan yatim, ayahnya Abdullah telah wafat sebelum kelahirannya. Kelahiran beliau terjadi di tahun yang sama dengan peristiwa Tahun Gajah.",
    foto: "assets/images/pra-islam/kelahiran-nabi.jpg",
    era: "era-pra-islam"
  },
  {
    id: "hilful-fudhul",
    nama: "Hilf al-Fudhul",
    tahun: "590",
    periode: "Abad ke-6 M",
    kategori: "perjanjian",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Perjanjian antar suku Quraisy untuk menegakkan keadilan dan membela orang yang dizalimi. Nabi Muhammad SAW turut serta dalam perjanjian ini dan setelah menjadi Nabi, beliau memuji perjanjian tersebut.",
    foto: "assets/images/pra-islam/hilful-fudhul.jpg",
    era: "era-pra-islam"
  },
  {
    id: "pernikahan-khadijah",
    nama: "Pernikahan dengan Khadijah RA",
    tahun: "595",
    periode: "Abad ke-6 M",
    kategori: "tokoh",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi Muhammad SAW menikah dengan Khadijah binti Khuwailid, seorang janda kaya dan saudagar sukses. Pernikahan ini menjadi pondasi dukungan moral dan finansial bagi dakwah Nabi di kemudian hari.",
    foto: "assets/images/pra-islam/khadijah.jpg",
    era: "era-pra-islam"
  },
  {
    id: "rekonstruksi-kaabah",
    nama: "Rekonstruksi Ka'bah dan Hajar Aswad",
    tahun: "605",
    periode: "Abad ke-7 M",
    kategori: "masjid",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Ka'bah rusak akibat banjir. Saat suku Quraisy berselisih tentang siapa yang berhak meletakkan Hajar Aswad, Nabi Muhammad SAW menjadi penengah dengan solusi meletakkannya di atas kain yang diangkat bersama-sama.",
    foto: "assets/images/pra-islam/kaabah.jpg",
    era: "era-pra-islam"
  },
{
    id: "wahyu-pertama",
    nama: "Turunnya Wahyu Pertama",
    tahun: "610",
    periode: "Abad ke-7 M",
    kategori: "kenabian",
    lokasi: "Gua Hira",
    wilayah: "Jabal Nur, Mekkah",
    koordinat: [21.4578, 39.8592],
    deskripsi: "Nabi Muhammad SAW menerima wahyu pertama melalui Malaikat Jibril di Gua Hira. Lima ayat awal Surah Al-Alaq (Iqra') diturunkan. Ini menandai awal kerasulan dan dakwah Islam.",
    foto: "assets/images/kenabian/wahyu-pertama.jpg",
    era: "era-kenabian"
  },
  {
    id: "dakwah-sembunyi",
    nama: "Dakwah Secara Sembunyi-sembunyi",
    tahun: "610",
    periode: "Abad ke-7 M",
    kategori: "dakwah",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi SAW berdakwah secara rahasia kepada kerabat dan sahabat terdekat. Islam mulai diterima oleh Khadijah, Ali bin Abi Thalib, Zaid bin Haritsah, dan Abu Bakar Ash-Shiddiq.",
    foto: "assets/images/kenabian/dakwah-sembunyi.jpg",
    era: "era-kenabian"
  },
  {
    id: "dakwah-terbuka",
    nama: "Pengumuman Dakwah Secara Terbuka",
    tahun: "613",
    periode: "Abad ke-7 M",
    kategori: "dakwah",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi SAW diperintahkan turun Surah Al-Hijr ayat 94 untuk menyampaikan dakwah secara terbuka kepada seluruh kaum Quraisy. Ini memicu penolakan dan permusuhan dari pemimpin Quraisy.",
    foto: "assets/images/kenabian/dakwah-terbuka.jpg",
    era: "era-kenabian"
  },
  {
    id: "isra-miraj",
    nama: "Isra Mi'raj",
    tahun: "621",
    periode: "Abad ke-7 M",
    kategori: "mukjizat",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi Muhammad SAW diisra'kan dari Masjidil Haram ke Masjidil Aqsa, kemudian mi'raj ke Sidratul Muntaha. Peristiwa ini menjadi dasar pensyariatan shalat lima waktu.",
    foto: "assets/images/kenabian/isra-miraj.jpg",
    era: "era-kenabian"
  },
  {
    id: "baiat-aqabah-1",
    nama: "Bai'at Aqabah Pertama",
    tahun: "621",
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Aqabah",
    wilayah: "Madinah",
    koordinat: [24.4667, 39.6167],
    deskripsi: "12 orang dari suku Khazraj dan Aus berbai'at untuk mendukung dakwah Nabi SAW. Ini menjadi titik awal hubungan Nabi dengan penduduk Yatsrib (Madinah).",
    foto: "assets/images/kenabian/baiat-aqabah.jpg",
    era: "era-kenabian"
  },
  {
    id: "baiat-aqabah-2",
    nama: "Bai'at Aqabah Kedua",
    tahun: "622",
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Aqabah",
    wilayah: "Madinah",
    koordinat: [24.4667, 39.6167],
    deskripsi: "73 orang laki-laki dan 2 perempuan dari Madinah berbai'at memberikan perlindungan penuh kepada Nabi SAW dan umat Islam. Bai'at ini membuka jalan terjadinya Hijrah.",
    foto: "assets/images/kenabian/baiat-aqabah2.jpg",
    era: "era-kenabian"
  },
  {
    id: "hijrah-madinah",
    nama: "Hijrah ke Madinah",
    tahun: "622",
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    koordinat: [24.4667, 39.6167],
    deskripsi: "Nabi SAW dan para sahabat hijrah dari Mekkah ke Madinah karena tekanan Quraisy semakin berat. Hijrah ini menandai awal penanggalan Hijriah dan berdirinya negara Islam pertama.",
    foto: "assets/images/kenabian/hijrah.jpg",
    era: "era-kenabian"
  },
  {
    id: "fathu-makkah",
    nama: "Fathu Makkah (Penaklukan Mekkah)",
    tahun: "630",
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    koordinat: [21.4225, 39.8262],
    deskripsi: "Nabi SAW memimpin 10.000 pasukan menaklukkan Mekkah tanpa pertumpahan darah besar. Berhala-berhala di Ka'bah dihancurkan dan penduduk Mekkah banyak yang masuk Islam.",
    foto: "assets/images/kenabian/fathu-makkah.jpg",
    era: "era-kenabian"
  }
];

// =========================================================================
// DATABASE TAMBAHAN: JALUR (POLYLINE) & WILAYAH KEKUASAAN (POLYGON)
// =========================================================================

const dataJalurSejarah = [
    {
        id: "jalur-awal-arab",
        nama: "Rute Pelayaran Saudagar Arab (Abad ke-7 M)",
        tipe: "pelayaran",
        tahunMulai: 570,
        tahunSelesai: 1200,
        warna: "#2e7559", // Hijau sesuai era-awal
        // Koordinat rute pelayaran: dari Timur Tengah menuju Pantai Barat Sumatera (Barus)
        koordinat: [
            [12.1642, 45.0118],  // Aden (Yaman)
            [11.8311, 51.1895],  // Tanjung Guardafui
            [7.8731, 80.7718],   // Sri Lanka (Transit)
            [5.5483, 95.3238],   // Ujung Sumatera (Banda Aceh)
            [2.0031, 98.3908]    // Bandar Kuno Barus (Tujuan)
        ],
        deskripsi: "Rute perdagangan laut yang digunakan oleh para saudagar Arab langsung dari Teluk Aden melintasi Samudera Hindia menuju bandar penyedia kapur barus utama di Sumatera Utara."
    },
    {
        id: "jalur-dakwah-samudera-pasai",
        nama: "Rute Penyebaran Dakwah Samudera Pasai",
        tipe: "dakwah",
        tahunMulai: 1267,
        tahunSelesai: 1500,
        warna: "#d36b1e", // Oranye sesuai era kesultanan
        koordinat: [
            [5.1278, 97.2341],   // Samudera Pasai
            [2.2064, 102.2501],  // Melaka
            [-5.9750, 105.9221], // Selat Sunda
            [-6.9006, 112.2152]  // Pantai Utara Jawa (Tuban/Gresik)
        ],
        deskripsi: "Jalur persebaran Islam dari pusat Kesultanan Samudera Pasai menuju Selat Malaka hingga menyisir pelabuhan-pelabuhan utama di Pantai Utara Jawa."
    },
    {
    idJalur: "jalur-abrahah",
    nama: "Jalur Pasukan Abrahah ke Ka'bah (Tahun Gajah)",
    tipe: "militer",
    tahunMulai: 570,
    tahunSelesai: 570,
    warna: "#8B0000", // Merah marun - nuansa militer & dramatis
    // Koordinat rute darat: dari Sana'a (Yaman) menuju Mekkah
    koordinat: [
        [15.3520, 44.2075],   // Sana'a, Yaman (titik awal)
        [16.8500, 44.2000],   // Menuju Najran
        [17.5000, 44.1500],   // Najran
        [18.7000, 43.3000],   // Wilayah Asir
        [19.5000, 42.5000],   // Tathlith / Al-Qahr
        [20.0000, 41.5000],   // Daerah Baha
        [20.8000, 40.8000],   // Menuju Taif
        [21.2700, 40.4200],   // Taif
        [21.4225, 39.8262]    // Mekkah / Ka'bah (titik akhir)
    ],
    deskripsi: "Pasukan Abrahah al-Ashram berangkat dari Sana'a, Yaman dengan pasukan besar termasuk gajah perang untuk menghancurkan Ka'bah di Mekkah. Rute yang ditempuh melewati Najran, pegunungan Asir, Baha, dan Taif. Perjalanan ini berakhir dengan kehancuran pasukan oleh burung ababil sesuai kisah dalam Al-Qur'an Surat Al-Fil."
    },
    {
    id: "jalur-isra-miraj",
    nama: "Jalur Isra' Mi'raj Nabi Muhammad SAW",
    tipe: "mukjizat",
    tahunMulai: 621,
    tahunSelesai: 621,
    warna: "#4B0082", // Ungu keemasan (nuansa spiritual & mukjizat)
    // Koordinat rute Isra' Mi'raj
    koordinat: [
        [21.4225, 39.8262],   // Masjidil Haram, Mekkah (titik awal Isra')
        [31.7765, 35.2362],   // Masjidil Aqsa, Yerusalem (titik Isra')
        [21.4225, 39.8262]    // Kembali ke Masjidil Haram, Mekkah
    ],
    deskripsi: "Nabi Muhammad SAW diisra'kan (diperjalankan) pada malam hari dari Masjidil Haram di Mekkah ke Masjidil Aqsa di Yerusalem. Kemudian beliau di-mi'raj (diangkat) ke langit hingga Sidratul Muntaha. Peristiwa ini terjadi sekitar tahun 621 M dan menjadi dasar pensyariatan shalat lima waktu."
    }
];
// =========================================================================
// DATABASE TAMBAHAN: WILAYAH KEKUASAAN (POLYGON)
// =========================================================================
const dataWilayahKekuasaan = [
    {
        id: "wilayah-samudera-pasai",
        nama: "Wilayah Inti Kesultanan Samudera Pasai",
        tahunMulai: 1267,
        tahunSelesai: 1521, // Runtuh setelah invasi Portugis
        warna: "#d36b1e",
        // Koordinat batas-batas wilayah kekuasaan (Polygon searah jarum jam)
        koordinat: [
            [5.3500,96.9500],
            [5.4500,97.2500],
            [5.2000,97.6000],
            [4.8500,97.7500],
            [4.7500,97.4000],
            [5.1000,97.0500]
        ],
        deskripsi: "Wilayah kedaulatan utama Kesultanan Samudera Pasai yang meliputi pesisir utara Aceh, bertindak sebagai pengontrol lalu lintas perdagangan Selat Malaka."
    },
    {
        id: "wilayah-kesultanan-demak",
        nama: "Wilayah Pengaruh Kesultanan Demak",
        tahunMulai: 1475,
        tahunSelesai: 1554,
        warna: "#8a6d3b",
        koordinat: [
            [-6.7000, 110.5000],
            [-6.8500, 110.9000],
            [-7.0500, 110.9500],
            [-7.1000, 110.5000],
            [-6.9000, 110.3000]
        ],
        deskripsi: "Wilayah pusat pemerintahan Kesultanan Demak di Jawa Tengah yang mengontrol jalur logistik pertanian pesisir utara Jawa."
    }
];
