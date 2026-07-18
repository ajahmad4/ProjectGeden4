/**
 * DATABASE RELASI & NARASI: OBJEK ATLAS
 * Merupakan entitas utama pembelajaran yang dipilih oleh pengguna.
 * Tidak menyimpan koordinat, melainkan menghubungkan metadata naratif dengan 
 * ID marker, jalur, dan wilayah yang relevan secara opsional.
 */

const dataObjekAtlas = [
    {
        id: "oa-tahun-gajah",
        nama: "Tahun Gajah",
        tahun: 570,
        periode: "Abad ke-6 M",
        kategori: "kota",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Pasukan Abrahah dari Kerajaan Yaman menyerang Ka'bah dengan pasukan bergajah. Allah mengirim burung ababil yang melempari mereka dengan batu dari tanah yang terbakar, sehingga serangan gagal. Peristiwa ini diabadikan dalam Al-Qur'an Surat Al-Fil.",
        foto: "assets/images/pra-islam/tahun-gajah.jpg",
        era: "era-pra-islam",
        relasi: {
            markers: ["m-mekkah"],
            jalur: ["j-abrahah"],
            wilayah: []
        }
    },
    {
        id: "oa-kelahiran-nabi",
        nama: "Kelahiran Nabi Muhammad SAW",
        tahun: 570,
        periode: "Abad ke-6 M",
        kategori: "tokoh",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi Muhammad SAW lahir di Mekkah pada bulan Rabiul Awal. Beliau lahir dalam keadaan yatim, ayahnya Abdullah telah wafat sebelum kelahirannya. Kelahiran beliau terjadi di tahun yang sama dengan peristiwa Tahun Gajah.",
        foto: "assets/images/pra-islam/kelahiran-nabi.jpg",
        era: "era-pra-islam",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-hilful-fudhul",
        nama: "Hilf al-Fudhul",
        tahun: 590,
        periode: "Abad ke-6 M",
        kategori: "perjanjian",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Perjanjian antar suku Quraisy untuk menegakkan keadilan dan membela orang yang dizalimi. Nabi Muhammad SAW turut serta dalam perjanjian ini dan setelah menjadi Nabi, beliau memuji perjanjian tersebut.",
        foto: "assets/images/pra-islam/hilful-fudhul.jpg",
        era: "era-pra-islam",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-pernikahan-khadijah",
        nama: "Pernikahan dengan Khadijah RA",
        tahun: 595,
        periode: "Abad ke-6 M",
        kategori: "tokoh",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi Muhammad SAW menikah dengan Khadijah binti Khuwailid, seorang janda kaya dan saudagar sukses. Pernikahan ini menjadi pondasi dukungan moral dan finansial bagi dakwah Nabi di kemudian hari.",
        foto: "assets/images/pra-islam/khadijah.jpg",
        era: "era-pra-islam",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-rekonstruksi-kaabah",
        nama: "Rekonstruksi Ka'bah dan Hajar Aswad",
        tahun: 605,
        periode: "Abad ke-7 M",
        kategori: "masjid",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Ka'bah rusak akibat banjir. Saat suku Quraisy berselisih tentang siapa yang berhak meletakkan Hajar Aswad, Nabi Muhammad SAW menjadi penengah dengan solusi meletakkannya di atas kain yang diangkat bersama-sama.",
        foto: "assets/images/pra-islam/kaabah.jpg",
        era: "era-pra-islam",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-wahyu-pertama",
        nama: "Turunnya Wahyu Pertama",
        tahun: 610,
        periode: "Abad ke-7 M",
        kategori: "kenabian",
        lokasi: "Gua Hira",
        wilayah: "Jabal Nur, Mekkah",
        deskripsi: "Nabi Muhammad SAW menerima wahyu pertama melalui Malaikat Jibril di Gua Hira. Lima ayat awal Surah Al-Alaq (Iqra') diturunkan. Ini menandai awal kerasulan dan dakwah Islam.",
        foto: "assets/images/kenabian/wahyu-pertama.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-gua-hira"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-dakwah-sembunyi",
        nama: "Dakwah Secara Sembunyi-sembunyi",
        tahun: 610,
        periode: "Abad ke-7 M",
        kategori: "dakwah",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi SAW berdakwah secara rahasia kepada kerabat dan sahabat terdekat. Islam mulai diterima oleh Khadijah, Ali bin Abi Thalib, Zaid bin Haritsah, dan Abu Bakar Ash-Shiddiq.",
        foto: "assets/images/kenabian/dakwah-sembunyi.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-dakwah-terbuka",
        nama: "Pengumuman Dakwah Secara Terbuka",
        tahun: 613,
        periode: "Abad ke-7 M",
        kategori: "dakwah",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi SAW diperintahkan turun Surah Al-Hijr ayat 94 untuk menyampaikan dakwah secara terbuka kepada seluruh kaum Quraisy. Ini memicu penolakan dan permusuhan dari pemimpin Quraisy.",
        foto: "assets/images/kenabian/dakwah-terbuka.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-isra-miraj",
        nama: "Isra Mi'raj",
        tahun: 621,
        periode: "Abad ke-7 M",
        kategori: "mukjizat",
        lokasi: "Mekkah - Yerusalem",
        wilayah: "Timur Tengah",
        deskripsi: "Nabi Muhammad SAW diisra'kan dari Masjidil Haram ke Masjidil Aqsa, kemudian mi'raj ke Sidratul Muntaha. Peristiwa ini menjadi dasar pensyariatan shalat lima waktu.",
        foto: "assets/images/kenabian/isra-miraj.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-mekkah", "m-aqsa"],
            jalur: ["j-isra-miraj"],
            wilayah: []
        }
    },
    {
        id: "oa-baiat-aqabah-1",
        nama: "Bai'at Aqabah Pertama",
        tahun: 621,
        periode: "Abad ke-7 M",
        kategori: "politik",
        lokasi: "Aqabah",
        wilayah: "Madinah",
        deskripsi: "12 orang dari suku Khazraj dan Aus berbai'at untuk mendukung dakwah Nabi SAW. Ini menjadi titik awal hubungan Nabi dengan penduduk Yatsrib (Madinah).",
        foto: "assets/images/kenabian/baiat-aqabah.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-madinah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-baiat-aqabah-2",
        nama: "Bai'at Aqabah Kedua",
        tahun: 622,
        periode: "Abad ke-7 M",
        kategori: "politik",
        lokasi: "Aqabah",
        wilayah: "Madinah",
        deskripsi: "73 orang laki-laki dan 2 perempuan dari Madinah berbai'at memberikan perlindungan penuh kepada Nabi SAW dan umat Islam. Bai'at ini membuka jalan terjadinya Hijrah.",
        foto: "assets/images/kenabian/baiat-aqabah2.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-madinah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-hijrah-madinah",
        nama: "Hijrah ke Madinah",
        tahun: 622,
        periode: "Abad ke-7 M",
        kategori: "politik",
        lokasi: "Madinah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi SAW dan para sahabat hijrah dari Mekkah ke Madinah karena tekanan Quraisy semakin berat. Hijrah ini menandai awal penanggalan Hijriah dan berdirinya negara Islam pertama.",
        foto: "assets/images/kenabian/hijrah.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-mekkah", "m-madinah"],
            jalur: [],
            wilayah: []
        }
    },
    {
        id: "oa-fathu-makkah",
        nama: "Fathu Makkah (Penaklukan Mekkah)",
        tahun: 630,
        periode: "Abad ke-7 M",
        kategori: "militer",
        lokasi: "Mekkah",
        wilayah: "Jazirah Arab",
        deskripsi: "Nabi SAW memimpin 10.000 pasukan menaklukkan Mekkah tanpa pertumpahan darah besar. Berhala-berhala di Ka'bah dihancurkan dan penduduk Mekkah banyak yang masuk Islam.",
        foto: "assets/images/kenabian/fathu-makkah.jpg",
        era: "era-kenabian",
        relasi: {
            markers: ["m-mekkah"],
            jalur: [],
            wilayah: []
        }
    },
    // ============================================
    // OBJEK BARU UNTUK ERA PENYEBARAN/KESULTANAN
    // ============================================
    {
        id: "oa-jalur-arab",
        nama: "Pelayaran Saudagar Arab ke Nusantara",
        tahun: 674,
        periode: "Abad ke-7 M",
        kategori: "pelabuhan",
        lokasi: "Barus",
        wilayah: "Sumatera Utara",
        deskripsi: "Kontak awal Islam di Nusantara melalui saudagar Arab dari Yaman dan Oman yang berlabuh di bandar kapur barus di pesisir barat Sumatera.",
        foto: "assets/images/placeholder.jpg",
        era: "era-pra-islam", // Akan disesuaikan saat timeline aktif, untuk contoh kita masukkan era pra-islam/kenabian atau era umayyah
        relasi: {
            markers: [],
            jalur: ["j-jalur-awal-arab"],
            wilayah: []
        }
    },
    {
        id: "oa-samudera-pasai",
        nama: "Kesultanan Samudera Pasai",
        tahun: 1267,
        periode: "Abad ke-13 M",
        kategori: "kerajaan",
        lokasi: "Aceh Utara",
        wilayah: "Sumatera",
        deskripsi: "Kerajaan Islam pertama di Nusantara yang didirikan oleh Meurah Silu (Sultan Malik As-Saleh). Menjadi pusat penyebaran agama Islam ke seluruh pesisir Sumatera dan Jawa melalui jalur perdagangan.",
        foto: "assets/images/placeholder.jpg",
        era: "era-pasca-abbasiyah",
        relasi: {
            markers: ["m-samudera-pasai"],
            jalur: ["j-dakwah-samudera-pasai"],
            wilayah: ["w-samudera-pasai"]
        }
    },
    {
        id: "oa-demak",
        nama: "Kesultanan Demak",
        tahun: 1475,
        periode: "Abad ke-15 M",
        kategori: "kerajaan",
        lokasi: "Demak",
        wilayah: "Jawa Tengah",
        deskripsi: "Kesultanan Islam pertama di Pulau Jawa yang didirikan oleh Raden Patah. Berkembang pesat dengan dukungan Wali Songo dan menjadi pusat penyebaran Islam ke berbagai penjuru Jawa dan Indonesia Timur.",
        foto: "assets/images/placeholder.jpg",
        era: "era-penyebaran-nusantara",
        relasi: {
            markers: ["m-demak"],
            jalur: [],
            wilayah: ["w-demak"]
        }
    },
    {
        id: "oa-khulafaur-rasyidin",
        nama: "Wilayah Kekuasaan Khulafaur Rasyidin",
        tahun: 633, 
        periode: "Abad ke-7 M",
        kategori: "kerajaan",
        lokasi: "Madinah (Pusat)",
        wilayah: "Jazirah Arab, Syam, Persia, Mesir",
        deskripsi: "Masa kepemimpinan empat khalifah pertama setelah wafatnya Rasulullah SAW. Pada era ini, wilayah Islam meluas dengan sangat pesat hingga menguasai seluruh Jazirah Arab, menaklukkan Kekaisaran Sasania (Persia), dan mengambil alih wilayah Syam serta Mesir dari Kekaisaran Romawi Bizantium.",
        foto: "assets/images/placeholder.jpg",
        era: "era-rashidun", 
        relasi: {
            markers: ["m-madinah"],
            jalur: [],
            wilayah: ["Wilayah-khulafaur-rasyidin"]
        }
    }
];
