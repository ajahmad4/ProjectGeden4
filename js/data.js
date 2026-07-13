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
        kategori: "pelabuhan", // Disesuaikan dari 'kota' menjadi 'pelabuhan' agar memicu ikon jangkar
        koordinat: [2.0031, 98.3908],
        deskripsi: "Barus merupakan salah satu bandar pelabuhan tertua di Nusantara. Berdasarkan dokumen kuno, pada abad ke-7 (sekitar tahun 674 M), sudah terdapat perkampungan pedagang Arab Muslim di pesisir barat Sumatera ini, menjadikannya salah satu titik awal kontak Islam di Nusantara.",
        foto: "https://images.unsplash.com/photo-1626014902787-885f0962b8fc?w=500"
    },
    {
        id: "pasai",
        nama: "Kesultanan Samudera Pasai",
        tahun: "1267",
        kategori: "kerajaan", // Disesuaikan dari 'kota' menjadi 'kerajaan' agar memicu ikon benteng/castle
        koordinat: [5.1278, 97.2341],
        deskripsi: "Kesultanan Samudera Pasai didirikan oleh Marah Silu (Sultan Malik as-Saleh) pada tahun 1267 M. Pasai menjadi kerajaan Islam pertama di Nusantara yang memegang peran kunci sebagai pusat perdagangan internasional dan pusat studi Islam di Asia Tenggara.",
        foto: "https://images.unsplash.com/photo-1590075865003-e48277afd558?w=500"
    },
    {
        id: "demak",
        nama: "Kesultanan Demak",
        tahun: "1475",
        kategori: "masjid", // Tetap 'masjid' untuk memicu ikon kubah masjid
        koordinat: [-6.8946, 110.6372],
        deskripsi: "Pelopor kerajaan Islam di tanah Jawa yang didirikan oleh Raden Patah dengan dukungan dari Walisongo. Masjid Agung Demak menjadi simbol pusat penyiaran Islam dan koordinasi strategi dakwah Islamisasi di seluruh Nusantara.",
        foto: "https://images.unsplash.com/photo-1598533924765-b1a7dbece744?w=500"
    }
];