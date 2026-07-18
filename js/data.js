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
    id: "jalur-abrahah",
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
  },
  {
    id: "Wilayah-khulafaur-rasyidin",
    nama: "Wilayah Khulafaur Rasyidin",
    tahunMulai: 631,
    tahunSelesai: 634,
    warna: "#8a6d3b",
    koordinat: [
      [38.5987808, 23.4732239],
      [38.8870199, 23.5055508],
      [39.3308251, 23.0227733],
      [39.9005292, 23.0607092],
      [40.2972596, 22.6572118],
      [40.8010341, 22.7184726],
      [41.3325343, 23.241125],
      [41.5840849, 23.7601664],
      [42.112582, 23.8702905],
      [42.1225897, 24.7264709],
      [43.0060847, 24.5526127],
      [44.6561909, 25.5542705],
      [47.7990673, 25.4533368],
      [50.5113331, 25.050178],
      [50.5950146, 25.0365484],
      [50.7147445, 24.8755936],
      [50.7766738, 24.7219296],
      [50.8675034, 24.7631752],
      [50.8344744, 24.9617119],
      [50.7931882, 25.1412428],
      [50.7642879, 25.4883325],
      [50.7271304, 25.7005715],
      [50.784931, 25.7489241],
      [51.0409053, 26.0608808],
      [51.1565066, 26.1609769],
      [51.3175227, 26.1609769],
      [51.4000951, 26.0200763],
      [51.4289954, 25.9532747],
      [51.5322109, 25.9532747],
      [51.6189118, 25.8121247],
      [51.5941401, 25.6894105],
      [51.5363395, 25.6038075],
      [51.4991819, 25.5255947],
      [51.4909247, 25.4696971],
      [51.552854, 25.3988563],
      [51.6312977, 25.1935564],
      [51.6519408, 25.0440295],
      [51.552854, 24.8793391],
      [51.4702816, 24.7256798],
      [51.4289954, 24.6393974],
      [51.519825, 24.5680757],
      [51.3756293, 24.4441046],
      [51.3095714, 24.3124867],
      [51.4281709, 24.3493334],
      [51.5355149, 24.2590283],
      [51.5768011, 24.4019816],
      [51.6758879, 24.3117141],
      [51.7749748, 24.2853739],
      [51.7956179, 24.0518374],
      [51.8616758, 24.0065875],
      [52.2014742, 23.9614709],
      [52.5691431, 24.2093418],
      [53.1234746, 24.1112836],
      [53.7796222, 24.0544786],
      [53.5929595, 24.1525804],
      [53.7909351, 24.2970143],
      [53.9719413, 24.2145007],
      [54.7808129, 24.9038872],
      [55.012713, 25.0218318],
      [55.5161365, 25.5741383],
      [55.878149, 25.7372994],
      [56.1496583, 26.2710953],
      [56.4268241, 26.4079635],
      [56.5003579, 26.3471531],
      [56.4098548, 25.5639334],
      [56.3928854, 24.975693],
      [56.6589646, 24.4979162],
      [57.1397624, 23.9976485],
      [57.7286492, 23.8114839],
      [58.6223675, 23.6509611],
      [59.2955528, 22.9235155],
      [59.4389934, 22.6656867],
      [59.8292881, 22.5299103],
      [59.8575703, 22.2370159],
      [59.7274721, 22.0588874],
      [59.3880854, 21.3936371],
      [59.1335454, 21.277724],
      [58.8507232, 20.982261],
      [58.76022, 20.7972988],
      [58.7941587, 20.7232503],
      [58.9977907, 20.6703363],
      [58.9711526, 20.4898373],
      [58.8504365, 20.433945],
      [58.7964313, 20.2688498],
      [58.7213347, 20.1957526],
      [58.6412093, 20.154114],
      [58.6197621, 20.1724532],
      [58.6155511, 20.3337722],
      [58.5369452, 20.3587781],
      [58.4014905, 20.3357465],
      [58.0757902, 20.4049315],
      [57.945692, 20.2086509],
      [57.744042, 19.7059869],
      [57.9024224, 19.0175786],
      [57.744042, 18.8838322],
      [57.3084958, 18.8784801],
      [56.929514, 18.7874686],
      [56.6894954, 18.5742904],
      [56.582023, 18.0964266],
      [56.346769, 17.8651327],
      [55.9791001, 17.8651327],
      [55.5548668, 17.8166728],
      [55.4360815, 17.7466519],
      [55.3851735, 17.6119195],
      [55.277701, 17.5418188],
      [55.3229526, 17.4231252],
      [55.3003268, 17.2341353],
      [55.0570997, 16.9908643],
      [54.7346824, 16.8826422],
      [54.5084246, 16.9962738],
      [54.0896728, 16.9628091],
      [53.9256359, 16.8545709],
      [53.710691, 16.7787672],
      [52.4379909, 16.3504544],
      [52.1830779, 15.9701494],
      [52.2848939, 15.5836722],
      [50.2029182, 14.814783],
      [49.9370653, 14.7874392],
      [49.4279853, 14.6287775],
      [49.0716293, 14.4207025],
      [48.9766614, 14.2388763],
      [48.6712134, 13.9755556],
      [48.1395076, 13.9261492],
      [48.0207223, 14.0304391],
      [47.6756792, 13.8492739],
      [47.4081452, 13.6049256],
      [46.9330039, 13.5114458],
      [46.7124026, 13.3739089],
      [46.2006844, 13.4014226],
      [45.6746351, 13.3133678],
      [45.4427209, 13.049012],
      [45.1316164, 12.9498053],
      [45.0863649, 12.7071343],
      [44.820512, 12.6740247],
      [44.6225363, 12.7678239],
      [44.4302172, 12.64643],
      [43.9143438, 12.5525861],
      [43.6202087, 12.6795432],
      [43.484454, 12.6298719],
      [43.3882945, 12.7071342],
      [43.433546, 12.806437],
      [43.1903189, 13.2858441],
      [43.2355705, 13.6543999],
      [42.9414354, 14.4774189],
      [42.7830549, 15.1172142],
      [42.5341714, 15.1936502],
      [42.4889198, 15.3573482],
      [42.619018, 15.4991161],
      [42.7547727, 15.3355292],
      [42.6473002, 15.6135499],
      [42.6642696, 15.7442533],
      [42.8113371, 15.9347117],
      [42.7550221, 16.367765],
      [42.6475497, 16.7797933],
      [42.3194759, 17.0557872],
      [42.2855372, 17.403753],
      [41.6689848, 17.9104076],
      [41.3635368, 18.4639126],
      [41.1825305, 18.6891054],
      [41.1626664, 18.8495261],
      [40.6705557, 19.7038073],
      [40.4895495, 19.9592143],
      [39.8673406, 20.2619736],
      [39.7015864, 20.3560052],
      [39.0171566, 21.2759703],
      [39.1302855, 21.3708162],
      [38.8757455, 22.001543],
      [39.0284695, 22.3425364],
      [39.0284695, 22.5777682],
      [38.6777699, 23.1666868],
      [38.6042361, 23.478342]
    ],
    deskripsi: "Wilayah pusat pemerintahan Kesultanan Demak di Jawa Tengah yang mengontrol jalur logistik pertanian pesisir utara Jawa."
  },
];
