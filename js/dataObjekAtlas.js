/**
 * DATABASE RELASI & NARASI: OBJEK ATLAS
 * Merupakan entitas utama pembelajaran yang dipilih oleh pengguna.
 * Tidak menyimpan koordinat, melainkan menghubungkan metadata naratif dengan 
 * ID marker, jalur, dan wilayah yang relevan secara opsional.
 */

const dataObjekAtlas = [
  // ==========================================
  // 1. ERA PRA-ISLAM & KENABIAN
  // ==========================================
  {
    id: "oa-tahun-gajah",
    nama: "Tahun Gajah",
    tahun: 570,
    periode: "Abad ke-6 M",
    kategori: "peristiwa",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    deskripsi: "Pasukan Abrahah dari Kerajaan Yaman menyerang Ka'bah dengan pasukan bergajah. Serangan gagal setelah Allah mengirim burung ababil. Peristiwa ini diabadikan dalam Al-Qur'an Surat Al-Fil.",
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
    deskripsi: "Nabi Muhammad SAW lahir di Mekkah pada bulan Rabiul Awal dalam keadaan yatim. Kelahiran beliau terjadi pada tahun yang sama dengan peristiwa Tahun Gajah.",
    foto: "assets/images/pra-islam/kelahiran-nabi.jpg",
    era: "era-pra-islam",
    relasi: {
      markers: ["m-mekkah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-pertemuan-bahira",
    nama: "Pertemuan dengan Pendeta Bahira",
    tahun: 582,
    periode: "Abad ke-6 M",
    kategori: "peristiwa",
    lokasi: "Bushra",
    wilayah: "Syam (Suriah)",
    deskripsi: "Perjalanan dagang pertama ke Syam bersama Abu Thalib, di mana Pendeta Bahira mengenali tanda-tanda kenabian pada diri Muhammad.",
    foto: "assets/images/placeholder.jpg",
    era: "era-pra-islam",
    relasi: {
      markers: ["m-bushra"],
      jalur: ["j-perdagangan-syam"],
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
    deskripsi: "Perjanjian antar suku Quraisy untuk menegakkan keadilan dan membela orang yang dizalimi. Nabi Muhammad SAW turut serta dalam perjanjian ini.",
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
    deskripsi: "Nabi Muhammad SAW menikah dengan Khadijah binti Khuwailid, seorang saudagar sukses yang menjadi penyokong utama dakwah beliau.",
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
    nama: "Rekonstruksi Ka'bah & Peletakan Hajar Aswad",
    tahun: 605,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    deskripsi: "Nabi Muhammad SAW menengahi perselisihan suku-suku Quraisy terkait peletakan kembali Hajar Aswad setelah Ka'bah direnovasi akibat banjir.",
    foto: "assets/images/pra-islam/kaabah.jpg",
    era: "era-pra-islam",
    relasi: {
      markers: ["m-kabah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-wahyu-pertama",
    nama: "Wahyu Pertama di Gua Hira",
    tahun: 610,
    periode: "Abad ke-7 M",
    kategori: "kenabian",
    lokasi: "Gua Hira (Jabal Nur)",
    wilayah: "Mekkah",
    deskripsi: "Penerimaan wahyu pertama (QS. Al-'Alaq: 1-5) melalui Malaikat Jibril di Gua Hira, menandai dimulainya kerasulan Nabi Muhammad SAW.",
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
    nama: "Masa Dakwah Sembunyi-sembunyi",
    tahun: 610,
    periode: "Abad ke-7 M",
    kategori: "dakwah",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    deskripsi: "Awal penyebaran Islam secara rahasia kepada keluarga dan sahabat terdekat (Assabiqunal Awwalun).",
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
    deskripsi: "Nabi Muhammad SAW mulai menyerukan Islam secara terbuka di Bukit Shafa, memicu tekanan dan penolakan keras dari kaum Quraisy.",
    foto: "assets/images/kenabian/dakwah-terbuka.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-mekkah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-hijrah-habasyah",
    nama: "Hijrah Pertama ke Habasyah",
    tahun: 615,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Aksum",
    wilayah: "Habasyah (Ethiopia)",
    deskripsi: "Gelombang pertama kaum Muslimin berhijrah mengungsi dari penindasan Quraisy atas izin Nabi ke Kerajaan Aksum.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-aksum"],
      jalur: ["j-hijrah-habasyah"],
      wilayah: []
    }
  },
  {
    id: "oa-am-al-huzn",
    nama: "Tahun Kesedihan ('Am al-Huzn)",
    tahun: 619,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Mekkah",
    wilayah: "Jazirah Arab",
    deskripsi: "Tahun wafatnya dua pelindung utama Nabi Muhammad SAW, yaitu paman beliau Abu Thalib dan istri beliau Khadijah RA.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-mekkah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-isra-miraj",
    nama: "Peristiwa Isra Mi'raj",
    tahun: 621,
    periode: "Abad ke-7 M",
    kategori: "mukjizat",
    lokasi: "Mekkah - Yerusalem",
    wilayah: "Timur Tengah",
    deskripsi: "Perjalanan malam Nabi dari Masjidil Haram ke Masjidil Aqsa, dilanjutkan kenaikan ke Sidratul Muntaha dan pensyariatan shalat lima waktu.",
    foto: "assets/images/kenabian/isra-miraj.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-mekkah", "m-aqsa"],
      jalur: ["j-isra-miraj"],
      wilayah: []
    }
  },
  {
    id: "oa-baiat-aqabah",
    nama: "Perjanjian Bai'at Aqabah I & II",
    tahun: 621,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Aqabah (Mina)",
    wilayah: "Jazirah Arab",
    deskripsi: "Sumpah setia penduduk Yatsrib (Madinah) untuk mendukung dan melindungi Nabi Muhammad SAW, membuka jalan bagi terjadinya hijrah.",
    foto: "assets/images/kenabian/baiat-aqabah.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-aqabah"],
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
    deskripsi: "Kepindahan Nabi SAW dan Umat Islam dari Mekkah ke Madinah, menandai awal penetapan kalender Hijriah dan berdirinya pemerintahan Islam.",
    foto: "assets/images/kenabian/hijrah.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-mekkah", "m-madinah"],
      jalur: ["j-hijrah-madinah"],
      wilayah: []
    }
  },
  {
    id: "oa-piagam-madinah",
    nama: "Penyusunan Piagam Madinah & Pembangunan Masjid Nabawi",
    tahun: 622,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    deskripsi: "Penyusunan konstitusi tertulis pertama yang mengatur hak dan kewajiban warga Madinah serta pendirian Masjid Nabawi.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-masjid-nabawi"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-badar",
    nama: "Perang Badar",
    tahun: 624,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Lembah Badar",
    wilayah: "Jazirah Arab",
    deskripsi: "Pertempuran besar pertama antara pasukan Muslim Madinah melawan pasukan Quraisy Mekkah yang berakhir dengan kemenangan Muslim.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-badar"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-uhud",
    nama: "Perang Uhud",
    tahun: 625,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Bukit Uhud",
    wilayah: "Jazirah Arab",
    deskripsi: "Pertempuran balasan Quraisy di dekat Madinah yang memberi pelajaran berharga bagi pasukan Islam akibat pengabaian strategi.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-uhud"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-khandaq",
    nama: "Perang Khandaq (Ahzab)",
    tahun: 627,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    deskripsi: "Pengepungan Madinah oleh koalisi suku Arab yang berhasil digagalkan dengan strategi penggalian parit usulan Salman Al-Farisi.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perjanjian-hudaibiyah",
    nama: "Perjanjian Hudaibiyah",
    tahun: 628,
    periode: "Abad ke-7 M",
    kategori: "perjanjian",
    lokasi: "Hudaibiyah",
    wilayah: "Jazirah Arab",
    deskripsi: "Gencatan senjata 10 tahun antara Madinah dan Mekkah yang secara diplomatik menguntungkan konsolidasi Islam.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-hudaibiyah"],
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
    deskripsi: "Penaklukan Kota Mekkah secara damai tanpa pertumpahan darah besar, diikuti pembersihan berhala di sekeliling Ka'bah.",
    foto: "assets/images/kenabian/fathu-makkah.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-mekkah"],
      jalur: ["j-fathu-makkah"],
      wilayah: []
    }
  },
  {
    id: "oa-haji-wada",
    nama: "Haji Wada' & Khutbah Terakhir",
    tahun: 632,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Padang Arafah",
    wilayah: "Jazirah Arab",
    deskripsi: "Ibadah haji perpisahan Nabi Muhammad SAW di mana beliau menyampaikan Khutbah Wada' tentang prinsip keislaman dan kemanusiaan.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-arafah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-wafat-nabi",
    nama: "Wafatnya Nabi Muhammad SAW",
    tahun: 632,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    deskripsi: "Wafatnya Nabi Muhammad SAW pada usia 63 tahun, mengakhiri periode Kenabian dan membuka era Khulafaur Rasyidin.",
    foto: "assets/images/placeholder.jpg",
    era: "era-kenabian",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },

  // ==========================================
  // 2. KHULAFAUR RASYIDIN
  // ==========================================
  {
    id: "oa-khulafaur-rasyidin",
    nama: "Wilayah Kekuasaan Khulafaur Rasyidin",
    tahun: 632,
    periode: "Abad ke-7 M",
    kategori: "kerajaan",
    lokasi: "Madinah (Pusat)",
    wilayah: "Jazirah Arab, Syam, Persia, Mesir",
    deskripsi: "Masa kepemimpinan empat khalifah pertama. Wilayah Islam meluas pesat menaklukkan Kekaisaran Sasania (Persia) dan merebut Syam serta Mesir dari Bizantium.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: ["wilayah-khulafaur-rasyidin"]
    }
  },
  {
    id: "oa-khalifah-abu-bakar",
    nama: "Pengangkatan Abu Bakar & Perang Riddah",
    tahun: 632,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Saqifah Bani Sa'idah (Madinah)",
    wilayah: "Jazirah Arab",
    deskripsi: "Pembaiatan Abu Bakar Ash-Shiddiq sebagai khalifah pertama, dilanjutkan operasi menumpas nabi palsu dan pemberontakan (Perang Riddah).",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-pengumpulan-mushaf",
    nama: "Pengumpulan Mushaf Al-Qur'an Pertama",
    tahun: 633,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    deskripsi: "Inisiatif pengumpulan lembaran wahyu menjadi satu mushaf di bawah pimpinan Zaid bin Tsabit pasca Perang Yamamah.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-khalifah-umar",
    nama: "Pemerintahan Khalifah Umar bin Khattab",
    tahun: 634,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Madinah (Pusat)",
    wilayah: "Timur Tengah",
    deskripsi: "Awal masa kepemimpinan Umar bin Khattab yang ditandai dengan pembentukan administrasi negara modern dan ekspansi besar-besaran.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-yarmuk",
    nama: "Perang Yarmuk",
    tahun: 636,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Sungai Yarmuk",
    wilayah: "Syam (Perbatasan Yordania-Suriah)",
    deskripsi: "Kemenangan krusial pasukan Muslim pimpinan Khalid bin Walid melawan pasukan Bizantium, membuka jalan penaklukan Syam.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-yarmuk"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-qadisiyyah",
    nama: "Perang Qadisiyyah",
    tahun: 636,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Qadisiyyah",
    wilayah: "Irak",
    deskripsi: "Pertempuran menentukan pimpinan Sa'ad bin Abi Waqqas yang meruntuhkan kekuatan utama Kekaisaran Persia Sasania.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-qadisiyyah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-penaklukan-yerusalem",
    nama: "Penaklukan Yerusalem",
    tahun: 638,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Yerusalem",
    wilayah: "Palestina",
    deskripsi: "Penyerahan kunci Kota Yerusalem secara damai oleh Patriark Sophronius langsung kepada Khalifah Umar bin Khattab.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-yerusalem"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-penaklukan-mesir",
    nama: "Penaklukan Mesir & Pendirian Fustat",
    tahun: 641,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Fustat",
    wilayah: "Mesir",
    deskripsi: "Ekspansi pasukan Muslim pimpinan 'Amr bin al-'As ke Mesir dan pembangunan Kota Fustat sebagai pusat pemerintahan baru.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-fustat"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-khalifah-utsman",
    nama: "Pemerintahan Khalifah Utsman bin Affan",
    tahun: 644,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Madinah (Pusat)",
    wilayah: "Afrika Utara hingga Asia Tengah",
    deskripsi: "Masa kepemimpinan Utsman bin Affan yang diwarnai pembentukan armada laut Islam pertama dan perluasan wilayah yang masif.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-kodifikasi-utsmani",
    nama: "Kodifikasi Mushaf Utsmani",
    tahun: 650,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Madinah",
    wilayah: "Jazirah Arab",
    deskripsi: "Penggandaan dialek bacaan Al-Qur'an ke dalam satu standar resmi (Mushaf Utsmani) untuk dikirim ke berbagai provinsi Islam.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-madinah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-khalifah-ali",
    nama: "Pemerintahan Khalifah Ali bin Abi Thalib",
    tahun: 656,
    periode: "Abad ke-7 M",
    kategori: "politik",
    lokasi: "Kufah (Pusat)",
    wilayah: "Timur Tengah",
    deskripsi: "Pemerintahan Khalifah Ali yang diwarnai dinamika politik internal dan pemindahan pusat pemerintahan dari Madinah ke Kufah.",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-kufah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-siffin",
    nama: "Perang Shiffin & Peristiwa Tahkim",
    tahun: 657,
    periode: "Abad ke-7 M",
    kategori: "militer",
    lokasi: "Shiffin",
    wilayah: "Irak / Syam",
    deskripsi: "Pertempuran antara pihak Ali bin Abi Thalib dan Muawiyah bin Abi Sufyan yang diakhiri dengan proses arbitrase (Tahkim).",
    foto: "assets/images/placeholder.jpg",
    era: "era-rashidun",
    relasi: {
      markers: ["m-shiffin"],
      jalur: [],
      wilayah: []
    }
  },

  // ==========================================
  // 3. DINASTI UMAYYAH
  // ==========================================
  {
    id: "oa-dinasti-umayyah",
    nama: "Kekhalifahan Dinasti Umayyah",
    tahun: 661,
    periode: "Abad ke-7 - 8 M",
    kategori: "kerajaan",
    lokasi: "Damaskus (Pusat)",
    wilayah: "Timur Tengah, Afrika Utara, Andalusia, Asia Tengah, Sindh",
    deskripsi: "Dinasti kekhalifahan berkonsep dinastik pertama yang didirikan Muawiyah I. Menjadi salah satu kekaisaran terbesar dalam sejarah.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-damaskus"],
      jalur: [],
      wilayah: ["wilayah-dinasti-umayyah"]
    }
  },
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
    era: "era-umayyah",
    relasi: {
      markers: ["m-barus"],
      jalur: ["j-jalur-awal-arab"],
      wilayah: []
    }
  },
  {
    id: "oa-dome-of-the-rock",
    nama: "Pembangunan Kubah Shakhrah (Dome of the Rock)",
    tahun: 691,
    periode: "Abad ke-7 M",
    kategori: "peristiwa",
    lokasi: "Yerusalem",
    wilayah: "Palestina",
    deskripsi: "Pembangunan monumen arsitektur Islam monumental di Kompleks Masjidil Aqsha pada masa Khalifah Abdul Malik bin Marwan.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-yerusalem"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-penaklukan-andalusia",
    nama: "Penaklukan Andalusia (Spanyol)",
    tahun: 711,
    periode: "Abad ke-8 M",
    kategori: "militer",
    lokasi: "Gibraltar",
    wilayah: "Semenanjung Iberia (Spanyol & Portugal)",
    deskripsi: "Pendaratan pasukan pimpinan Tariq bin Ziyad di Gibraltar yang membuka jalan ekspansi Islam ke Eropa Barat.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-gibraltar"],
      jalur: ["j-ekspansi-andalusia"],
      wilayah: []
    }
  },
  {
    id: "oa-penaklukan-sindh",
    nama: "Penaklukan Sindh",
    tahun: 712,
    periode: "Abad ke-8 M",
    kategori: "militer",
    lokasi: "Sindh",
    wilayah: "Pakistan / Asia Selatan",
    deskripsi: "Ekspansi pasukan Umayyah di bawah pimpinan Muhammad bin Qasim hingga ke wilayah Lembah Sungai Indus.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-sindh"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-umar-bin-abdul-aziz",
    nama: "Pemerintahan Reformis Umar bin Abdul Aziz",
    tahun: 717,
    periode: "Abad ke-8 M",
    kategori: "politik",
    lokasi: "Damaskus",
    wilayah: "Seluruh Kekhalifahan Umayyah",
    deskripsi: "Masa keemasan keadilan dan reformasi internal di bawah Khalifah Umar bin Abdul Aziz yang dijuluki Khulafaur Rasyidin kelima.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-damaskus"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-poitiers",
    nama: "Pertempuran Poitiers (Tours)",
    tahun: 732,
    periode: "Abad ke-8 M",
    kategori: "militer",
    lokasi: "Poitiers",
    wilayah: "Prancis",
    deskripsi: "Pertempuran antara pasukan Muslim Andalusia melawan Charles Martel dari Franka, menghentikan penyerangan Islam ke Eropa utara.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-poitiers"],
      jalur: [],
      wilayah: []
    }
  },

  // ==========================================
  // 4. DINASTI ABBASIYAH
  // ==========================================
  {
    id: "oa-dinasti-abbasiyah",
    nama: "Kekhalifahan Dinasti Abbasiyah",
    tahun: 750,
    periode: "Abad ke-8 - 13 M",
    kategori: "kerajaan",
    lokasi: "Baghdad (Pusat)",
    wilayah: "Timur Tengah, Persia, Afrika Utara",
    deskripsi: "Dinasti kekhalifahan yang menggulingkan Umayyah. Dikenal sebagai puncak Zaman Keemasan Islam (The Islamic Golden Age).",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-baghdad"],
      jalur: [],
      wilayah: ["wilayah-dinasti-abbasiyah"]
    }
  },
  {
    id: "oa-keamiran-kordoba",
    nama: "Berdirinya Keamiran Umayyah di Andalusia",
    tahun: 756,
    periode: "Abad ke-8 M",
    kategori: "kerajaan",
    lokasi: "Kordoba",
    wilayah: "Andalusia (Spanyol)",
    deskripsi: "Pendirian pemerintahan penerus Umayyah di Spanyol oleh Abdurrahman Ad-Dakhil setelah jatuhnya Damaskus ke tangan Abbasiyah.",
    foto: "assets/images/placeholder.jpg",
    era: "era-umayyah",
    relasi: {
      markers: ["m-kordoba"],
      jalur: [],
      wilayah: ["wilayah-keamiran-kordoba"]
    }
  },
  {
    id: "oa-pembangunan-baghdad",
    nama: "Pembangunan Kota Baghdad",
    tahun: 762,
    periode: "Abad ke-8 M",
    kategori: "peristiwa",
    lokasi: "Baghdad",
    wilayah: "Irak",
    deskripsi: "Pendirian 'Madinat al-Salam' (Kota Bundar Baghdad) oleh Khalifah Al-Manshur sebagai ibu kota baru yang menjadi pusat peradaban.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-baghdad"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-harun-ar-rasyid",
    nama: "Puncak Kejayaan Harun Ar-Rasyid",
    tahun: 786,
    periode: "Abad ke-8 - 9 M",
    kategori: "politik",
    lokasi: "Baghdad",
    wilayah: "Timur Tengah",
    deskripsi: "Masa pemerintahan Khalifah Harun Ar-Rasyid yang menandai era keemasan kemakmuran, perdagangan, dan perkembangan ilmu sains.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-baghdad"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-baitul-hikmah",
    nama: "Pendirian Baitul Hikmah (House of Wisdom)",
    tahun: 830,
    periode: "Abad ke-9 M",
    kategori: "peristiwa",
    lokasi: "Baghdad",
    wilayah: "Irak",
    deskripsi: "Pendirian pusat perpustakaan besar, translasi, dan lembaga penelitian akademis pada masa Khalifah Al-Ma'mun.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-baitul-hikmah"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-perang-salib",
    nama: "Awal Era Perang Salib",
    tahun: 1096,
    periode: "Abad ke-11 - 13 M",
    kategori: "militer",
    lokasi: "Yerusalem & Syam",
    wilayah: "Timur Tengah",
    deskripsi: "Rangkaian konflik militer antara pasukan Eropa Kristen dan Daulah Islamiyah di kawasan Mediterania Timur.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-yerusalem"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-shalahuddin-yerusalem",
    nama: "Pembebasan Yerusalem oleh Shalahuddin Al-Ayyubi",
    tahun: 1187,
    periode: "Abad ke-12 M",
    kategori: "militer",
    lokasi: "Yerusalem",
    wilayah: "Palestina",
    deskripsi: "Keberhasilan Shalahuddin Al-Ayyubi merebut kembali Kota Yerusalem setelah kemenangan dalam Pertempuran Hattin.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-yerusalem"],
      jalur: [],
      wilayah: []
    }
  },
  {
    id: "oa-kehancuran-baghdad",
    nama: "Invasi Mongol & Kehancuran Baghdad",
    tahun: 1258,
    periode: "Abad ke-13 M",
    kategori: "militer",
    lokasi: "Baghdad",
    wilayah: "Irak",
    deskripsi: "Pengepungan dan pembakaran Kota Baghdad oleh pasukan Mongol pimpinan Hulagu Khan, mengakhiri kekuasaan Abbasiyah di Baghdad.",
    foto: "assets/images/placeholder.jpg",
    era: "era-abbasiyah",
    relasi: {
      markers: ["m-baghdad"],
      jalur: ["j-invasi-mongol"],
      wilayah: []
    }
  },

  // ==========================================
  // 5. ERA PENYEBARAN & KESULTANAN NUSANTARA
  // ==========================================
  {
    id: "oa-samudera-pasai",
    nama: "Kesultanan Samudera Pasai",
    tahun: 1267,
    periode: "Abad ke-13 M",
    kategori: "kerajaan",
    lokasi: "Aceh Utara",
    wilayah: "Sumatera",
    deskripsi: "Kerajaan Islam pertama di Nusantara yang didirikan oleh Meurah Silu (Sultan Malik As-Saleh). Menjadi pusat penyebaran agama Islam melalui jalur perdagangan.",
    foto: "assets/images/placeholder.jpg",
    era: "era-penyebaran-nusantara",
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
    deskripsi: "Kesultanan Islam pertama di Pulau Jawa yang didirikan oleh Raden Patah. Berkembang pesat dengan dukungan Wali Songo sebagai pusat penyebaran Islam.",
    foto: "assets/images/placeholder.jpg",
    era: "era-penyebaran-nusantara",
    relasi: {
      markers: ["m-demak"],
      jalur: [],
      wilayah: ["w-demak"]
    }
  }
];