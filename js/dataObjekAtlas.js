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
    refStoryId: "oa-tahun-gajah-story",
    refStepIndex: 0,
    deskripsi: "Pasukan Abrahah dari Kerajaan Yaman menyerang Ka'bah dengan pasukan bergajah. Serangan gagal setelah Allah mengirim burung ababil. Peristiwa ini diabadikan dalam Al-Qur'an Surat Al-Fil.",
    kronologi: "Pada tahun 570 M, pasukan Abrahah dari Yaman menyerang Ka'bah dengan pasukan bergajah. Serangan ini gagal setelah Allah mengirim burung ababil yang melempari pasukan Abrahah dengan batu dari neraka, sehingga mereka hancur dan mundur. Peristiwa ini dikenal sebagai Tahun Gajah dan diabadikan dalam Al-Qur'an Surat Al-Fil.",
    gambar: [
      "assets/images/era-pra-islam/tahun-gajah-1.jpg",
      "assets/images/era-pra-islam/tahun-gajah-2.jpg",
      "assets/images/era-pra-islam/tahun-gajah-3.jpg",
    ],
    caption: ["ilustrasi, peta, foto"],
    era: "era-pra-islam",
    relasi: { markers: ["m-mekkah"], jalur: ["j-abrahah"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-pra-islam/kelahiran-nabi-1.jpg", caption: "Situs Rumah Kelahiran Nabi Muhammad SAW di Mekkah", sumber: "Dokumentasi Sejarah" },
      { url: "assets/images/era-pra-islam/kelahiran-nabi-2.jpg", caption: "Peta Pemukiman Bani Hasyim di Mekkah Kuno", sumber: "Atlas Islam" }
    ],
    era: "era-pra-islam",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-pra-islam/pertemuan-bahira-1.jpg", caption: "Reruntuhan Biara Bahira di Bushra, Suriah", sumber: "Arkeologi Islam" },
      { url: "assets/images/era-pra-islam/pertemuan-bahira-2.jpg", caption: "Peta Jalur Perdagangan Kuno Mekkah - Syam", sumber: "Atlas Peta" }
    ],
    era: "era-pra-islam",
    relasi: { markers: ["m-bushra"], jalur: ["j-perdagangan-syam"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-pra-islam/hilful-fudhul-1.jpg", caption: "Ilustrasi Pertemuan Tokoh Quraisy di Rumah Abdullah bin Jud'an", sumber: "Arsip Sejarah" },
      { url: "assets/images/era-pra-islam/hilful-fudhul-2.jpg", caption: "Naskah Kaligrafi Catatan Perjanjian Hilf al-Fudhul", sumber: "Museum Islam" }
    ],
    era: "era-pra-islam",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-pra-islam/khadijah-1.jpg", caption: "Ilustrasi Pernikahan Nabi Muhammad SAW dan Khadijah RA", sumber: "Arsip Seni Islam" },
      { url: "assets/images/era-pra-islam/khadijah-2.jpg", caption: "Lokasi Rumah Khadijah di Kawasan Kuno Mekkah", sumber: "Peta Bersejarah" }
    ],
    era: "era-pra-islam",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-pra-islam/kaabah-1.jpg", caption: "Ilustrasi Pemindahan Hajar Aswad Menggunakan Kain", sumber: "Arsip Ilustrasi" },
      { url: "assets/images/era-pra-islam/kaabah-2.jpg", caption: "Foto Hajar Aswad dan Bingkai Perak Saat Ini", sumber: "Dokumentasi" },
      { url: "assets/images/era-pra-islam/kaabah-3.jpg", caption: "Sketsa Bangunan Ka'bah Era Pra-Islam", sumber: "Museum" }
    ],
    era: "era-pra-islam",
    relasi: { markers: ["m-kabah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/wahyu-pertama-1.jpg", caption: "Pemandangan Gua Hira di Puncak Jabal Nur", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/wahyu-pertama-2.jpg", caption: "Interior Mulut Gua Hira Menghadap ke arah Ka'bah", sumber: "Fotografi" },
      { url: "assets/images/era-kenabian/wahyu-pertama-3.jpg", caption: "Kaligrafi Surat Al-'Alaq Ayat 1-5", sumber: "Seni Kaligrafi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-gua-hira"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/dakwah-sembunyi-1.jpg", caption: "Situs Darul Arqam (Pusat Dakwah Sembunyi-sembunyi)", sumber: "Sejarah Islam" },
      { url: "assets/images/era-kenabian/dakwah-sembunyi-2.jpg", caption: "Peta Pemukiman Para Sahabat Assabiqunal Awwalun", sumber: "Atlas Sejarah" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/dakwah-terbuka-1.jpg", caption: "Situs Bukit Shafa Lokasi Seruan Dakwah Terbuka", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/dakwah-terbuka-2.jpg", caption: "Ilustrasi Suasana Dakwah Terbuka di Mekkah", sumber: "Arsip Ilustrasi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/hijrah-habasyah-1.jpg", caption: "Peta Rute Hijrah Mengarungi Laut Merah ke Habasyah", sumber: "Atlas Islam" },
      { url: "assets/images/era-kenabian/hijrah-habasyah-2.jpg", caption: "Masjid Najashi di Ethiopia (Situs Bersejarah)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/hijrah-habasyah-3.jpg", caption: "Ilustrasi Perwakilan Muslim di Hadapan Raja Najashi", sumber: "Arsip Sejarah" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-aksum"], jalur: ["j-hijrah-habasyah"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/am-al-huzn-1.jpg", caption: "Pemakaman Jannatul Mu'alla di Mekkah (Makam Khadijah RA)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/am-al-huzn-2.jpg", caption: "Peta Kawasan Syi'ib Abu Thalib di Mekkah", sumber: "Peta Sejarah" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/isra-miraj-1.jpg", caption: "Peta Jalur Perjalanan Malam Isra Mi'raj", sumber: "Atlas Sejarah Islam" },
      { url: "assets/images/era-kenabian/isra-miraj-2.jpg", caption: "Kompleks Masjidil Aqsa di Yerusalem", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/isra-miraj-3.jpg", caption: "Interior Batu Shakhrah di Dalam Dome of the Rock", sumber: "Fotografi" },
      { url: "assets/images/era-kenabian/isra-miraj-4.jpg", caption: "Kaligrafi Peringatan Peristiwa Isra Mi'raj", sumber: "Seni Kaligrafi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah", "m-aqsa"], jalur: ["j-isra-miraj"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/baiat-aqabah-1.jpg", caption: "Masjid Al-Baya'ah di Mina (Situs Perjanjian Aqabah)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/baiat-aqabah-2.jpg", caption: "Peta Lokasi Aqabah Terhadap Kota Mekkah", sumber: "Atlas Peta" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-aqabah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/hijrah-madinah-1.jpg", caption: "Peta Jalur Rute Hijrah Nabi Muhammad SAW dan Abu Bakar", sumber: "Atlas Islam" },
      { url: "assets/images/era-kenabian/hijrah-madinah-2.jpg", caption: "Gua Tsur (Tempat Berlindung Saat Perjalanan Hijrah)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/hijrah-madinah-3.jpg", caption: "Masjid Quba (Masjid Pertama yang Didirikan Saat Hijrah)", sumber: "Fotografi" },
      { url: "assets/images/era-kenabian/hijrah-madinah-4.jpg", caption: "Ilustrasi Sambutan Hangat Penduduk Madinah", sumber: "Arsip Ilustrasi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah", "m-madinah"], jalur: ["j-hijrah-madinah"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/piagam-madinah-1.jpg", caption: "Naskah Salinan Piagam Madinah", sumber: "Museum Islam" },
      { url: "assets/images/era-kenabian/piagam-madinah-2.jpg", caption: "Sketsa Arsitektur Awal Masjid Nabawi Era Kenabian", sumber: "Arsip Sejarah" },
      { url: "assets/images/era-kenabian/piagam-madinah-3.jpg", caption: "Masjid Nabawi Modern di Madinah Munawwarah", sumber: "Dokumentasi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-masjid-nabawi"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/perang-badar-1.jpg", caption: "Peta Strategi Posisi Pasukan Perang Badar", sumber: "Atlas Taktik Militer Islam" },
      { url: "assets/images/era-kenabian/perang-badar-2.jpg", caption: "Kondisi Lembah Badar Saat Ini", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/perang-badar-3.jpg", caption: "Makam Para Syuhada Perang Badar", sumber: "Fotografi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-badar"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/perang-uhud-1.jpg", caption: "Bukit Rumat (Posisi Pasukan Pemanah di Uhud)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/perang-uhud-2.jpg", caption: "Peta Pergerakan Taktis Perang Uhud", sumber: "Atlas Militer" },
      { url: "assets/images/era-kenabian/perang-uhud-3.jpg", caption: "Kompleks Pemakaman Syuhada Uhud (Termasuk Hamzah RA)", sumber: "Fotografi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-uhud"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/perang-khandaq-1.jpg", caption: "Peta Jalur Penggalian Parit Pertahanan Madinah", sumber: "Atlas Sejarah" },
      { url: "assets/images/era-kenabian/perang-khandaq-2.jpg", caption: "Masjid Sab'ah (Situs Tujuh Masjid Perang Khandaq)", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/perang-khandaq-3.jpg", caption: "Ilustrasi Penggalian Parit Khandaq", sumber: "Arsip Seni" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/perjanjian-hudaibiyah-1.jpg", caption: "Masjid Hudaibiyah di Lokasi Penandatanganan Perjanjian", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/perjanjian-hudaibiyah-2.jpg", caption: "Ilustrasi Bai'at Ar-Ridhwan di Bawah Pohon", sumber: "Arsip Sejarah" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-hudaibiyah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/fathu-makkah-1.jpg", caption: "Peta 4 Rute Masuk Pasukan Muslim ke Kota Mekkah", sumber: "Atlas Taktik Islam" },
      { url: "assets/images/era-kenabian/fathu-makkah-2.jpg", caption: "Ilustrasi Pembersihan Berhala di Sekitar Ka'bah", sumber: "Arsip Seni" },
      { url: "assets/images/era-kenabian/fathu-makkah-3.jpg", caption: "Ilustrasi Pidato Pengampunan Umum Nabi SAW", sumber: "Lukisan Sejarah" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-mekkah"], jalur: ["j-fathu-makkah"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/haji-wada-1.jpg", caption: "Jabal Rahmah di Padang Arafah (Lokasi Khutbah Wada')", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/haji-wada-2.jpg", caption: "Kaligrafi Petikan Teks Khutbah Wada'", sumber: "Seni Kaligrafi" },
      { url: "assets/images/era-kenabian/haji-wada-3.jpg", caption: "Suasana Padang Arafah Saat Musim Haji", sumber: "Fotografi" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-arafah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-kenabian/wafat-nabi-1.jpg", caption: "Kubah Hijau (Gumbad-e-Khizra) di Atas Makam Nabi SAW", sumber: "Dokumentasi" },
      { url: "assets/images/era-kenabian/wafat-nabi-2.jpg", caption: "Peta Denah Kamar Aisyah RA (Lokasi Makam Nabi)", sumber: "Arsip Arsitektur" }
    ],
    era: "era-kenabian",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/khulafaur-rasyidin-1.jpg", caption: "Peta Ekspansi Wilayah Kekhalifahan Khulafaur Rasyidin", sumber: "Atlas Peradaban Islam" },
      { url: "assets/images/era-rashidun/khulafaur-rasyidin-2.jpg", caption: "Ilustrasi Pasukan Penunggang Kuda Rasyidin", sumber: "Arsip Seni" },
      { url: "assets/images/era-rashidun/khulafaur-rasyidin-3.jpg", caption: "Mata Uang Logam pada Masa Khulafaur Rasyidin", sumber: "Museum Numismatik" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: ["wilayah-khulafaur-rasyidin"] }
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
    galeri: [
      { url: "assets/images/era-rashidun/khalifah-abu-bakar-1.jpg", caption: "Taman Saqifah Bani Sa'idah di Madinah", sumber: "Dokumentasi" },
      { url: "assets/images/era-rashidun/khalifah-abu-bakar-2.jpg", caption: "Peta Operasi Perang Riddah Penumpasan Pemberontakan", sumber: "Atlas Militer" },
      { url: "assets/images/era-rashidun/khalifah-abu-bakar-3.jpg", caption: "Situs Pertempuran Yamamah", sumber: "Fotografi" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/pengumpulan-mushaf-1.jpg", caption: "Manusakrip Al-Qur'an Kuno Lembaran Perkamen", sumber: "Museum Naskah" },
      { url: "assets/images/era-rashidun/pengumpulan-mushaf-2.jpg", caption: "Kaligrafi Khat Kufi Kuno Khulafaur Rasyidin", sumber: "Seni Kaligrafi" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/khalifah-umar-1.jpg", caption: "Peta Wilayah Provinsi Administrasi Era Umar bin Khattab", sumber: "Atlas Islam" },
      { url: "assets/images/era-rashidun/khalifah-umar-2.jpg", caption: "Ilustrasi Khalifah Umar Patroli Malam Meninjau Rakyat", sumber: "Arsip Lukisan" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/perang-yarmuk-1.jpg", caption: "Peta Taktik Pertempuran Yarmuk (Khalid bin Walid vs Bizantium)", sumber: "Atlas Militer" },
      { url: "assets/images/era-rashidun/perang-yarmuk-2.jpg", caption: "Lembah Sungai Yarmuk Lokasi Pertempuran Dahsyat", sumber: "Dokumentasi" },
      { url: "assets/images/era-rashidun/perang-yarmuk-3.jpg", caption: "Pedang Pedang Era Penaklukan Syam", sumber: "Museum Militer" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-yarmuk"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/perang-qadisiyyah-1.jpg", caption: "Peta Formasi Pasukan Sa'ad bin Abi Waqqas vs Gajah Persia", sumber: "Atlas Militer" },
      { url: "assets/images/era-rashidun/perang-qadisiyyah-2.jpg", caption: "Ilustrasi Perang Qadisiyyah di Irak", sumber: "Arsip Seni" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-qadisiyyah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/penaklukan-yerusalem-1.jpg", caption: "Ilustrasi Penyerahan Kunci Yerusalem Kepada Umar bin Khattab", sumber: "Arsip Lukisan" },
      { url: "assets/images/era-rashidun/penaklukan-yerusalem-2.jpg", caption: "Masjid Umar di Kompleks Gereja Makam Kudus", sumber: "Dokumentasi" },
      { url: "assets/images/era-rashidun/penaklukan-yerusalem-3.jpg", caption: "Naskah Jaminan Keamanan (Al-Irhadah al-Umariyya)", sumber: "Museum" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-yerusalem"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/penaklukan-mesir-1.jpg", caption: "Masjid 'Amr bin al-'As di Fustat (Masjid Pertama di Afrika)", sumber: "Dokumentasi" },
      { url: "assets/images/era-rashidun/penaklukan-mesir-2.jpg", caption: "Peta Rute Penaklukan Benteng Babylon Mesir", sumber: "Atlas Islam" },
      { url: "assets/images/era-rashidun/penaklukan-mesir-3.jpg", caption: "Reruntuhan Kota Kuno Fustat (Kairo Lama)", sumber: "Situs Arkeologi" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-fustat"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/khalifah-utsman-1.jpg", caption: "Peta Armada Laut Islam Pertama Perang Dhat as-Sawari", sumber: "Atlas Maritim Islam" },
      { url: "assets/images/era-rashidun/khalifah-utsman-2.jpg", caption: "Peta Wilayah Terluas Kekhalifahan Era Utsman", sumber: "Atlas Peta" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/kodifikasi-utsmani-1.jpg", caption: "Mushaf Kuno Utsmani Koleksi Museum Topkapi", sumber: "Museum Topkapi" },
      { url: "assets/images/era-rashidun/kodifikasi-utsmani-2.jpg", caption: "Mushaf Samarkand (Salah Satu Mushaf Utsmani Tertua)", sumber: "Arsip Naskah Kuno" },
      { url: "assets/images/era-rashidun/kodifikasi-utsmani-3.jpg", caption: "Peta Pengiriman Mushaf Standar ke Kota-kota Besar", sumber: "Atlas Islam" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-madinah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/khalifah-ali-1.jpg", caption: "Masjid Agung Kufah (Pusat Pemerintahan Khalifah Ali)", sumber: "Dokumentasi" },
      { url: "assets/images/era-rashidun/khalifah-ali-2.jpg", caption: "Peta Pemindahan Ibu Kota Kekhalifahan ke Kufah", sumber: "Atlas Sejarah" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-kufah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-rashidun/perang-siffin-1.jpg", caption: "Peta Lokasi Shiffin di Pinggir Sungai Eufrat", sumber: "Atlas Peta" },
      { url: "assets/images/era-rashidun/perang-siffin-2.jpg", caption: "Ilustrasi Peristiwa Arbitrase (Tahkim Dumatar Jandal)", sumber: "Arsip Seni" }
    ],
    era: "era-rashidun",
    relasi: { markers: ["m-shiffin"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/dinasti-umayyah-1.jpg", caption: "Peta Luas Maksimal Kekhalifahan Dinasti Umayyah", sumber: "Atlas Sejarah Peradaban" },
      { url: "assets/images/era-umayyah/dinasti-umayyah-2.jpg", caption: "Masjid Agung Umayyah di Damaskus, Suriah", sumber: "Dokumentasi" },
      { url: "assets/images/era-umayyah/dinasti-umayyah-3.jpg", caption: "Mata Uang Dinar Emas Reformasi Abdul Malik bin Marwan", sumber: "Museum Numismatik" },
      { url: "assets/images/era-umayyah/dinasti-umayyah-4.jpg", caption: "Istana Mushatta (Arsitektur Istana Gurun Umayyah)", sumber: "Situs Arkeologi" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-damaskus"], jalur: [], wilayah: ["wilayah-dinasti-umayyah"] }
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
    galeri: [
      { url: "assets/images/era-umayyah/jalur-arab-1.jpg", caption: "Peta Jalur Pelayaran Dagang Arab - India - Nusantara", sumber: "Atlas Maritim" },
      { url: "assets/images/era-umayyah/jalur-arab-2.jpg", caption: "Situs Makam Kuno Papan Tinggi di Barus", sumber: "Dokumentasi Arkeologi" },
      { url: "assets/images/era-umayyah/jalur-arab-3.jpg", caption: "Ilustrasi Kapal Dagang Arab Kuno (Dhow)", sumber: "Arsip Maritim" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-barus"], jalur: ["j-jalur-awal-arab"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/dome-of-the-rock-1.jpg", caption: "Pemandangan Eksterior Dome of the Rock dengan Kubah Emas", sumber: "Fotografi" },
      { url: "assets/images/era-umayyah/dome-of-the-rock-2.jpg", caption: "Detail Mosaik Khas Arsitektur Umayyah di Dinding Interior", sumber: "Dokumentasi Arsitektur" },
      { url: "assets/images/era-umayyah/dome-of-the-rock-3.jpg", caption: "Denah Geometris Segidelapan Bangunan Kubah Shakhrah", sumber: "Arsip Arsitektur" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-yerusalem"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/penaklukan-andalusia-1.jpg", caption: "Bukit Karang Gibraltar (Jabal Tariq)", sumber: "Dokumentasi" },
      { url: "assets/images/era-umayyah/penaklukan-andalusia-2.jpg", caption: "Peta Rute Penaklukan Semenanjung Iberia oleh Tariq & Musa", sumber: "Atlas Sejarah Eropa" },
      { url: "assets/images/era-umayyah/penaklukan-andalusia-3.jpg", caption: "Ilustrasi Pidato Tariq bin Ziyad di Hadapan Pasukan", sumber: "Arsip Lukisan" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-gibraltar"], jalur: ["j-ekspansi-andalusia"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/penaklukan-sindh-1.jpg", caption: "Peta Ekspedisi Militer Muhammad bin Qasim ke Sindh", sumber: "Atlas Sejarah" },
      { url: "assets/images/era-umayyah/penaklukan-sindh-2.jpg", caption: "Reruntuhan Masjid Kuno Banbhore di Sindh (Pakistan)", sumber: "Situs Arkeologi" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-sindh"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/umar-bin-abdul-aziz-1.jpg", caption: "Makam Khalifah Umar bin Abdul Aziz di Ma'arrat al-Nu'man", sumber: "Dokumentasi" },
      { url: "assets/images/era-umayyah/umar-bin-abdul-aziz-2.jpg", caption: "Naskah Surat Reformasi Pajak dan Perdagangan", sumber: "Arsip Naskah" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-damaskus"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-umayyah/perang-poitiers-1.jpg", caption: "Peta Lokasi Pertempuran Poitiers di Tengah Prancis", sumber: "Atlas Militer Eropa" },
      { url: "assets/images/era-umayyah/perang-poitiers-2.jpg", caption: "Lukisan Pertempuran Poitiers Karya Charles Steuben", sumber: "Museum Seni" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-poitiers"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/dinasti-abbasiyah-1.jpg", caption: "Peta Puncak Wilayah Kekuasaan Dinasti Abbasiyah", sumber: "Atlas Peradaban Islam" },
      { url: "assets/images/era-abbasiyah/dinasti-abbasiyah-2.jpg", caption: "Ilustrasi Pusat Sains & Peradaban Zaman Keemasan Islam", sumber: "Arsip Ilustrasi" },
      { url: "assets/images/era-abbasiyah/dinasti-abbasiyah-3.jpg", caption: "Naskah Kuno Observatorium Sains Abbasiyah", sumber: "Museum Sains Islam" },
      { url: "assets/images/era-abbasiyah/dinasti-abbasiyah-4.jpg", caption: "Mata Uang Dinar Emas Era Kekhalifahan Abbasiyah", sumber: "Museum Numismatik" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-baghdad"], jalur: [], wilayah: ["wilayah-dinasti-abbasiyah"] }
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
    galeri: [
      { url: "assets/images/era-umayyah/keamiran-kordoba-1.jpg", caption: "Masjid Agung Kordoba (Mezquita de Córdoba)", sumber: "Dokumentasi Arsitektur" },
      { url: "assets/images/era-umayyah/keamiran-kordoba-2.jpg", caption: "Hutan Tiang Lengkung Khas Arsitektur Kordoba", sumber: "Fotografi" },
      { url: "assets/images/era-umayyah/keamiran-kordoba-3.jpg", caption: "Peta Keamiran Umayyah Andalusia", sumber: "Atlas Peta" }
    ],
    era: "era-umayyah",
    relasi: { markers: ["m-kordoba"], jalur: [], wilayah: ["wilayah-keamiran-kordoba"] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/pembangunan-baghdad-1.jpg", caption: "Sketsa Rekonstruksi Tata Kota Bundar Baghdad (Madinat al-Salam)", sumber: "Arsip Arsitektur" },
      { url: "assets/images/era-abbasiyah/pembangunan-baghdad-2.jpg", caption: "Peta Letak Kota Baghdad di Pinggir Sungai Tigris", sumber: "Atlas Sejarah" },
      { url: "assets/images/era-abbasiyah/pembangunan-baghdad-3.jpg", caption: "Ilustrasi Gerbang Utama Gerbang Khorasan Baghdad", sumber: "Lukisan Rekonstruksi" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-baghdad"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/harun-ar-rasyid-1.jpg", caption: "Ilustrasi Utusan Harun Ar-Rasyid Memberi Jam Air Kepada Charlemagne", sumber: "Arsip Lukisan Eropa" },
      { url: "assets/images/era-abbasiyah/harun-ar-rasyid-2.jpg", caption: "Ilustrasi Suasana Pasar Kota Baghdad Era Keemasan", sumber: "Seni Lukis" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-baghdad"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/baitul-hikmah-1.jpg", caption: "Ilustrasi Para Cendekiawan Berdiskusi di Baitul Hikmah", sumber: "Arsip Lukisan Khayal" },
      { url: "assets/images/era-abbasiyah/baitul-hikmah-2.jpg", caption: "Manusakrip Kuno Penerjemahan Karya Matematika & Astronomi", sumber: "Museum Naskah" },
      { url: "assets/images/era-abbasiyah/baitul-hikmah-3.jpg", caption: "Naskah Al-Khawarizmi Penemu Aljabar dan Algoritma", sumber: "Arsip Sains" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-baitul-hikmah"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/perang-salib-1.jpg", caption: "Peta Rute Pasukan Perang Salib dari Eropa ke Syam", sumber: "Atlas Militer Sejarah" },
      { url: "assets/images/era-abbasiyah/perang-salib-2.jpg", caption: "Benteng Krak des Chevaliers di Suriah (Peninggalan Perang Salib)", sumber: "Dokumentasi Arkeologi" },
      { url: "assets/images/era-abbasiyah/perang-salib-3.jpg", caption: "Ilustrasi Pertempuran Pasukan Salib vs Pasukan Islam", sumber: "Arsip Seni Lukis" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-yerusalem"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/shalahuddin-yerusalem-1.jpg", caption: "Peta Taktik Kemenangan Shalahuddin pada Pertempuran Hattin", sumber: "Atlas Militer" },
      { url: "assets/images/era-abbasiyah/shalahuddin-yerusalem-2.jpg", caption: "Ilustrasi Pembebasan Kota Yerusalem oleh Shalahuddin", sumber: "Arsip Lukisan" },
      { url: "assets/images/era-abbasiyah/shalahuddin-yerusalem-3.jpg", caption: "Makam Sultan Shalahuddin Al-Ayyubi di Damaskus", sumber: "Dokumentasi" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-yerusalem"], jalur: [], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-abbasiyah/kehancuran-baghdad-1.jpg", caption: "Ilustrasi Pengepungan Kota Baghdad oleh Pasukan Mongol", sumber: "Naskah Kuno Persi (Persian Miniature)" },
      { url: "assets/images/era-abbasiyah/kehancuran-baghdad-2.jpg", caption: "Peta Rute Invasis Kekaisaran Mongol ke Timur Tengah", sumber: "Atlas Sejarah World" },
      { url: "assets/images/era-abbasiyah/kehancuran-baghdad-3.jpg", caption: "Ilustrasi Pembuangan Ribuan Buku Baitul Hikmah ke Sungai Tigris", sumber: "Arsip Ilustrasi" }
    ],
    era: "era-abbasiyah",
    relasi: { markers: ["m-baghdad"], jalur: ["j-invasi-mongol"], wilayah: [] }
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
    galeri: [
      { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-1.jpg", caption: "Batu Nisan Sultan Malik As-Saleh di Aceh Utara", sumber: "Dokumentasi Cagar Budaya" },
      { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-2.jpg", caption: "Mata Uang Dirham Emas Kesultanan Samudera Pasai", sumber: "Museum Nusantara" },
      { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-3.jpg", caption: "Peta Jalur Perdagangan Maritim Samudera Pasai di Selat Malaka", sumber: "Atlas Sejarah Nusantara" }
    ],
    era: "era-penyebaran-nusantara",
    relasi: { markers: ["m-samudera-pasai"], jalur: ["j-dakwah-samudera-pasai"], wilayah: ["w-samudera-pasai"] }
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
    galeri: [
      { url: "assets/images/era-penyebaran-nusantara/demak-1.jpg", caption: "Masjid Agung Demak dengan Atap Tumpang Tiga Khas Jawa", sumber: "Dokumentasi" },
      { url: "assets/images/era-penyebaran-nusantara/demak-2.jpg", caption: "Saka Tatal (Tiang Utama Peninggalan Sunan Kalijaga)", sumber: "Museum Demak" },
      { url: "assets/images/era-penyebaran-nusantara/demak-3.jpg", caption: "Peta Wilayah Kekuasaan Kesultanan Demak di Jawa", sumber: "Atlas Sejarah Indonesia" }
    ],
    era: "era-penyebaran-nusantara",
    relasi: { markers: ["m-demak"], jalur: [], wilayah: ["w-demak"] }
  }
];