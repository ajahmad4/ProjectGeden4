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