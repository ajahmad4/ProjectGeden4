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
    id: "barus",
    nama: "Bandar Kuno Barus",
    tahun: "674",
    periode: "Abad ke-7 M",
    kategori: "pelabuhan",
    lokasi: "Barus, Tapanuli Tengah, Sumatera Utara",
    wilayah: "Pantai Barat Sumatera",
    koordinat: [2.0031, 98.3908],
    deskripsi: "Barus merupakan salah satu bandar pelabuhan tertua di Nusantara. Berdasarkan dokumen kuno, pada abad ke-7 (sekitar tahun 674 M), sudah terdapat perkampungan pedagang Arab Muslim di pesisir barat Sumatera ini, menjadikannya salah satu titik awal kontak Islam di Nusantara.",
    foto: "assets/images/barus/barus-01.jpg"
    },
    {
    id: "pasai",
    nama: "Kesultanan Samudera Pasai",
    tahun: "1267",
    periode: "Abad ke-13 M",
    kategori: "kerajaan",
    lokasi: "Aceh Utara, Aceh",
    wilayah: "Pantai Utara Aceh",
    koordinat: [5.1278, 97.2341],
    deskripsi: "Kesultanan Samudera Pasai didirikan oleh Marah Silu (Sultan Malik as-Saleh) pada tahun 1267 M. Pasai menjadi kerajaan Islam pertama di Nusantara yang memegang peran kunci sebagai pusat perdagangan internasional dan pusat studi Islam di Asia Tenggara.",
    foto: "assets/images/pasai/pasai-01.jpg"
    },
    {
    id: "demak",
    nama: "Kesultanan Demak",
    tahun: "1475",
    periode: "Abad ke-15 M",
    kategori: "masjid",
    lokasi: "Demak, Jawa Tengah",
    wilayah: "Pesisir Utara Jawa",
    koordinat: [-6.8946, 110.6372],
    deskripsi: "Pelopor kerajaan Islam di tanah Jawa yang didirikan oleh Raden Patah dengan dukungan dari Walisongo. Masjid Agung Demak menjadi simbol pusat penyiaran Islam dan koordinasi strategi dakwah Islamisasi di seluruh Nusantara.",
    foto: "assets/images/demak/demak-01.jpg"
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
    }
];

const dataWilayahKekuasaan = [
    {
        id: "wilayah-samudera-pasai",
        nama: "Wilayah Inti Kesultanan Samudera Pasai",
        tahunMulai: 1267,
        tahunSelesai: 1521, // Runtuh setelah invasi Portugis
        warna: "#d36b1e",
        // Koordinat batas-batas wilayah kekuasaan (Polygon searah jarum jam)
        koordinat: [
            [5.3500, 96.9500],
            [5.4500, 97.2500],
            [5.2000, 97.6000],
            [4.8500, 97.7500],
            [4.7500, 97.4000],
            [5.1000, 97.0500]
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