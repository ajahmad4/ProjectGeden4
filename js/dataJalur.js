/**
 * DATABASE SPASIAL: JALUR (POLYLINE)
 * Hanya menyimpan informasi geometris rute/jalur dan ID referensinya.
 */

const dataJalur = [
    {
        id: "j-jalur-awal-arab",
        nama: "Rute Pelayaran Saudagar Arab (Abad ke-7 M)",
        tipe: "pelayaran",
        tahunMulai: 1000,
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
        id: "j-dakwah-samudera-pasai",
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
        id: "j-abrahah",
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
        deskripsi: "Pasukan Abrahah al-Ashram berangkat dari Sana'a, Yaman dengan pasukan besar termasuk gajah perang untuk menghancurkan Ka'bah di Mekkah."
    },
    {
        id: "j-isra-miraj",
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
        deskripsi: "Nabi Muhammad SAW diisra'kan dari Masjidil Haram di Mekkah ke Masjidil Aqsa di Yerusalem. Kemudian beliau di-mi'raj ke langit."
    }
];
