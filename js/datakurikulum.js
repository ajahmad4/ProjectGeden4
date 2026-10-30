/**
 * DATA KURIKULUM SEJARAH KEBUDAYAAN ISLAM (SKI)
 * Struktur Terpadu Pedagogis: Kelas -> Bab -> Sub-Materi
 * Masing-masing sub-materi terhubung ke entitas geografis (markers, jalur, wilayah).
 */

const dataKurikulum = [
  // =========================================================================
  // KELAS 12: SEJARAH ISLAM DI NUSANTARA
  // =========================================================================
  {
    id: "ski-12-bab-1",
    kelas: "12",
    namaKelas: "Kelas 12 MA",
    bab: 1,
    judulBab: "Bab 1: Masuknya Islam di Nusantara",
    deskripsiBab: "Analisis jalur perdagangan maritim, teori masuknya Islam, serta bukti arkeologis kuno.",
    subMateri: [
      {
        id: "materi-12-1-1",
        nomor: "1.1",
        judul: "Teori-Teori Masuknya Islam ke Nusantara",
        metadata: {
          wilayah: "Pesisir Sumatera & Selat Malaka",
          periode: "Abad ke-7 – 13 M",
          fokus: "Teori Makkah, Gujarat, Persia, & China",
          tokoh: "Buya Hamka, Snouck Hurgronje, J. Pijnappel"
        },
        relasiPeta: {
          markers: ["m-barus"],
          jalur: ["j-jalur-awal-arab"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-umayyah/jalur-arab-1.jpg", caption: "Peta Jalur Pelayaran Dagang Arab - India - Nusantara" },
          { url: "assets/images/era-umayyah/jalur-arab-2.jpg", caption: "Situs Makam Kuno Papan Tinggi di Barus" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Teori Makkah (Arab)</h4>
          <p class="leading-relaxed mb-3">Dicetuskan oleh <strong>Buya Hamka</strong> dan didukung oleh para sejarawan seperti Anthony H. Johns. Teori ini berargumen bahwa Islam masuk ke Nusantara langsung dari tanah Arab (Mekkah dan Yaman) sejak <strong>abad ke-7 M (abad ke-1 H)</strong>. Salah satu bukti otentiknya adalah berlabuhnya saudagar Arab di bandar kuno <em>Barus (Fansur)</em> di pesisir barat Sumatera pada era kepemimpinan Khulafaur Rasyidin dan Dinasti Umayyah.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Teori Gujarat (Cambay, India)</h4>
          <p class="leading-relaxed mb-3">Dipelopori oleh ilmuwan seperti <strong>Snouck Hurgronje</strong> dan J. Pijnappel, menyatakan bahwa Islam masuk melalui para pedagang Cambay di Gujarat sekitar abad ke-13 M. Bukti fisik utama yang diajukan adalah kemiripan gaya nisan makam Sultan Malik as-Saleh (1297 M) di Samudera Pasai dan nisan Maulana Malik Ibrahim di Leran, Gresik.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">3. Teori Persia & China</h4>
          <p class="leading-relaxed">Teori Persia (dikembangkan oleh Hoesein Djajadiningrat) menyoroti kesamaan tradisi kebudayaan seperti perayaan Asyura / Tabot di Pariaman dan Bengkulu. Sedangkan teori China (Slamet Muljana) menekankan peran komunitas saudagar muslim Kanton dan pelayaran Laksamana Cheng Ho dalam membentuk komunitas Islam di bandar-bandar pesisir Nusantara.</p>
        `
      },
      {
        id: "materi-12-1-2",
        nomor: "1.2",
        judul: "Bandar Niaga Barus & Bukti Arkeologis Awal",
        metadata: {
          wilayah: "Barus, Tapanuli Tengah, Sumatera Utara",
          periode: "Abad ke-7 – 10 M",
          fokus: "Kapur Barus, Permukiman Ta-Shih",
          tokoh: "Syekh Rukunuddin, Syekh Mahmud"
        },
        relasiPeta: {
          markers: ["m-barus"],
          jalur: ["j-jalur-awal-arab"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-umayyah/jalur-arab-2.jpg", caption: "Kompleks Makam Kuno Mahligai dan Papan Tinggi Barus" },
          { url: "assets/images/era-umayyah/jalur-arab-3.jpg", caption: "Ilustrasi Kapal Dagang Samudera Kuno (Dhow)" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">A. Posisi Strategis Barus di Peta Kuno Dunia</h4>
          <p class="leading-relaxed mb-3">Nama Barus telah dikenal dalam literatur Yunani kuno oleh astronom Claudius Ptolemaeus pada abad ke-2 M dengan nama <em>Barousai</em>. Bandar ini masyhur di seantero dunia kuno karena komoditas unggulan <strong>kamfer (kapur barus)</strong> dan kemenyan berkualitas tinggi yang menjadi bahan pengawet dan wewangian istana Timur Tengah serta Mediterania.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">B. Catatan Dinasti Tang & Makam Mahligai</h4>
          <p class="leading-relaxed">Kronik Tiongkok era Dinasti Tang mencatat keberadaan permukiman bangsa <em>Ta-Shih</em> (sebutan untuk orang Arab muslim) di pantai barat Sumatera sekitar tahun 674 M. Keberadaan pemukiman ini diperkuat oleh kompleks makam kuno Mahligai di Barus dengan batu nisan bertarikh hijriah awal, membuktikan adanya perjumpaan kultural Islam awal di Nusantara.</p>
        `
      }
    ]
  },
  {
    id: "ski-12-bab-2",
    kelas: "12",
    namaKelas: "Kelas 12 MA",
    bab: 2,
    judulBab: "Bab 2: Kesultanan-Kesultanan Islam di Nusantara",
    deskripsiBab: "Kajian kedaulatan, pusat transmisi ilmu, dan diplomasi maritim kesultanan Islam.",
    subMateri: [
      {
        id: "materi-12-2-1",
        nomor: "2.1",
        judul: "Kesultanan Samudera Pasai: Titik Tolak Dakwah Nusantara",
        metadata: {
          wilayah: "Aceh Utara / Lhokseumawe",
          periode: "1267 – 1521 M",
          fokus: "Pusat Dakwah & Kesultanan Berdaulat",
          tokoh: "Meurah Silu (Sultan Malik as-Saleh)"
        },
        relasiPeta: {
          markers: ["m-samudera-pasai"],
          jalur: ["j-dakwah-samudera-pasai"],
          wilayah: ["w-samudera-pasai"]
        },
        galeri: [
          { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-1.jpg", caption: "Batu Nisan Sultan Malik As-Saleh (1297 M)" },
          { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-2.jpg", caption: "Mata Uang Dirham Emas Samudera Pasai" },
          { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-3.jpg", caption: "Peta Jalur Perdagangan Maritim Pasai di Selat Malaka" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">A. Berdirinya Kesultanan Samudera Pasai</h4>
          <p class="leading-relaxed mb-3">Didirikan oleh Meurah Silu yang setelah memeluk Islam bergelar <strong>Sultan Malik as-Saleh</strong> pada tahun 1267 M. Terletak strategis di pesisir utara Aceh, Pasai memegang kendali rute pelayaran Selat Malaka dan menjadi pelabuhan transit utama bagi kapal niaga dari Arab, Persia, Gujarat, dan Tiongkok.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">B. Pusat Pendidikan Tinggi & Peradaban Islam</h4>
          <p class="leading-relaxed">Pasai bukan hanya kekuatan maritim tetapi juga pusat transmisi keilmuan Islam (*Dayah*) tertua di Asia Tenggara. Penjelajah kenamaan <strong>Ibnu Batutah</strong> yang singgah pada 1345 M mencatat Pasai sebagai negeri makmur dengan sultan yang rendah hati, gemar bermusyawarah dengan para ulama, serta mempraktikkan mazhab Syafi'i.</p>
        `
      },
      {
        id: "materi-12-2-2",
        nomor: "2.2",
        judul: "Kesultanan Demak & Peran Walisongo di Jawa",
        metadata: {
          wilayah: "Demak, Pantai Utara Jawa Tengah",
          periode: "1475 – 1554 M",
          fokus: "Pelopor Kesultanan Jawa & Akulturasi Budaya",
          tokoh: "Raden Patah, Pati Unus, Walisongo"
        },
        relasiPeta: {
          markers: ["m-demak"],
          jalur: ["j-dakwah-samudera-pasai"],
          wilayah: ["w-demak"]
        },
        galeri: [
          { url: "assets/images/era-penyebaran-nusantara/demak-1.jpg", caption: "Masjid Agung Demak dengan Atap Tumpang Tiga Akulturatif" },
          { url: "assets/images/era-penyebaran-nusantara/demak-2.jpg", caption: "Saka Tatal (Tiang Utama Karya Sunan Kalijaga)" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">A. Kesultanan Pelopor di Pulau Jawa</h4>
          <p class="leading-relaxed mb-3">Kesultanan Demak didirikan oleh <strong>Raden Patah</strong> dengan restu dewan ulama <em>Walisongo</em> pada penghujung abad ke-15 M. Demak menjadi pusat kekuatan politik dan dakwah Islam pertama di Jawa seiring melemahnya pengaruh Majapahit.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">B. Perjuangan Maritim & Arsitektur Akulturasi</h4>
          <p class="leading-relaxed">Di bawah kepemimpinan Adipati Unus (*Pangeran Sabrang Lor*), Demak melancarkan armada bahari ke Malaka pada 1513 M untuk membendung hegemoni Portugis. Masjid Agung Demak dengan arsitektur atap tumpang tiga menjadi simbol harmonis dakwah kultural para wali yang merangkul kearifan lokal.</p>
        `
      }
    ]
  },

  // =========================================================================
  // KELAS 10: PERADABAN ISLAM MASA KENABIAN & KHULAFAUR RASYIDIN
  // =========================================================================
  {
    id: "ski-10-bab-1",
    kelas: "10",
    namaKelas: "Kelas 10 MA",
    bab: 1,
    judulBab: "Bab 1: Dakwah Rasulullah Periode Mekkah & Madinah",
    deskripsiBab: "Kajian sirah nabawiyah, strategi dakwah, hijrah, dan fondasi masyarakat madani.",
    subMateri: [
      {
        id: "materi-10-1-1",
        nomor: "1.1",
        judul: "Kondisi Masyarakat Jahiliyah & Peristiwa Tahun Gajah",
        metadata: {
          wilayah: "Mekkah, Jazirah Arab",
          periode: "570 M (Abad ke-6 M)",
          fokus: "Latar Belakang Penyerangan Ka'bah & Kelahiran Nabi",
          tokoh: "Nabi Muhammad SAW, Abdul Muthalib, Abrahah"
        },
        relasiPeta: {
          markers: ["m-mekkah", "m-kabah"],
          jalur: ["j-abrahah"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-pra-islam/tahun-gajah-1.jpg", caption: "Ilustrasi Penyerangan Pasukan Gajah Abrahah" },
          { url: "assets/images/era-pra-islam/kelahiran-nabi-1.jpg", caption: "Situs Rumah Kelahiran Nabi Muhammad SAW di Mekkah" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Penyerangan Ka'bah oleh Pasukan Gajah</h4>
          <p class="leading-relaxed mb-3">Penguasa Yaman, Abrahah Al-Asyram, mengerahkan pasukan bergajah untuk menghancurkan Ka'bah demi mengalihkan ziarah ke katedral <em>Al-Qalis</em> di Sana'a. Upaya invasi ini binasa oleh pertolongan Allah melalui kawanan burung Ababil, diabadikan dalam Al-Qur'an Surat Al-Fil.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Kelahiran Nabi Akhir Zaman</h4>
          <p class="leading-relaxed">Pada tahun yang sama, bertepatan pada 12 Rabiul Awal 570 M, lahirlah Nabi Muhammad SAW dalam keadaan yatim dari rahim Sayyidah Aminah. Peristiwa agung ini menjadi penanda terbitnya fajar hidayah yang mengubah sejarah peradaban umat manusia.</p>
        `
      },
      {
        id: "materi-10-1-2",
        nomor: "1.2",
        judul: "Hijrah ke Madinah & Konstitusi Piagam Madinah",
        metadata: {
          wilayah: "Madinah (Yatsrib)",
          periode: "622 M",
          fokus: "Pembangunan Masjid Nabawi & Piagam Madinah",
          tokoh: "Nabi Muhammad SAW, Abu Bakar, Kaum Muhajirin & Anshar"
        },
        relasiPeta: {
          markers: ["m-madinah", "m-masjid-nabawi"],
          jalur: ["j-hijrah-madinah"],
          wilayah: ["Wilayah-khulafaur-rasyidin"]
        },
        galeri: [
          { url: "assets/images/era-kenabian/masjid-nabawi-1.jpg", caption: "Kawasan Masjid Nabawi di Madinah Al-Munawwarah" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Pembentukan Masyarakat Madani</h4>
          <p class="leading-relaxed mb-3">Tiba di Yatsrib pada 622 M, Nabi Muhammad SAW mempersaudarakan kaum Muhajirin dan Anshar serta mendirikan <strong>Masjid Nabawi</strong> sebagai episentrum pembinaan spiritual, sosial, dan ketatanegaraan.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Piagam Madinah: Piagam Toleransi Tertua</h4>
          <p class="leading-relaxed">Nabi menyusun <strong>Piagam Madinah</strong>, konstitusi tertulis pertama dunia yang mengakui persamaan hak, kebebasan beragama bagi komunitas Yahudi dan suku Arab, serta kewajiban bersama menjaga pertahanan kota Madinah.</p>
        `
      }
    ]
  },

  // =========================================================================
  // KELAS 11: ERA KEGEMILANGAN ILMU & PERADABAN ISLAM DUNIA
  // =========================================================================
  {
    id: "ski-11-bab-1",
    kelas: "11",
    namaKelas: "Kelas 11 MA",
    bab: 1,
    judulBab: "Bab 1: Dinasti Abbasiyah & Andalusia",
    deskripsiBab: "Kajian keemasan sains di Baitul Hikmah Baghdad dan peradaban Kordoba Spanyol.",
    subMateri: [
      {
        id: "materi-11-1-1",
        nomor: "1.1",
        judul: "Baitul Hikmah Baghdad: Episentrum Ilmu Pengetahuan",
        metadata: {
          wilayah: "Baghdad, Irak (Mesopotamia)",
          periode: "750 – 1258 M",
          fokus: "Translasi Naskah & Riset Keilmuan",
          tokoh: "Harun Ar-Rasyid, Al-Ma'mun, Al-Khawarizmi"
        },
        relasiPeta: {
          markers: ["m-baghdad", "m-baitul-hikmah"],
          jalur: [],
          wilayah: ["Wilayah-bani-abbasiyah"]
        },
        galeri: [
          { url: "assets/images/era-abbasiyah/baitul-hikmah-1.jpg", caption: "Ilustrasi Kegiatan Ilmiah di Perpustakaan Baitul Hikmah" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">A. Era Keemasan Intelektual Islam (The Golden Age)</h4>
          <p class="leading-relaxed mb-3">Di bawah naungan Khalifah Harun Ar-Rasyid dan Al-Ma'mun, Baghdad menjadi kiblat ilmu pengetahuan dunia. Melalui lembaga <strong>Baitul Hikmah</strong>, karya-karya filsafat dan sains dari Yunani, Persia, dan India diterjemahkan dan dikembangkan lebih lanjut.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">B. Fondasi Matematika & Astronomi Modern</h4>
          <p class="leading-relaxed">Tokoh seperti <strong>Al-Khawarizmi</strong> merumuskan konsep aljabar dan angka nol, sedangkan para ilmuwan kedokteran seperti Ibnu Sina dan Ar-Razi menyusun ensiklopedia medis yang menjadi rujukan universitas Eropa selama berabad-abad.</p>
        `
      },
      {
        id: "materi-11-1-2",
        nomor: "1.2",
        judul: "Peradaban Islam di Kordoba & Andalusia",
        metadata: {
          wilayah: "Kordoba & Gibraltar, Semenanjung Iberia",
          periode: "756 – 1031 M",
          fokus: "Kecemerlangan Sains, Seni, & Arsitektur di Eropa",
          tokoh: "Abdurrahman Ad-Dakhil, Tariq bin Ziyad, Ibnu Rusyd"
        },
        relasiPeta: {
          markers: ["m-kordoba", "m-gibraltar"],
          jalur: ["j-ekspansi-andalusia"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-umayyah/kordoba-1.jpg", caption: "Keindahan Arsitektur Masjid Katedral Kordoba" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">A. Masuknya Islam ke Benua Eropa</h4>
          <p class="leading-relaxed mb-3">Dimulai dari penyeberangan <strong>Tariq bin Ziyad</strong> di Selat Gibraltar pada tahun 711 M, Islam menancapkan akar peradaban di Andalusia. Di bawah Dinasti Umayyah Spanyol, Kordoba menjelma menjadi kota metropolitan paling beradab di Eropa.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">B. Transmisi Pencerahan Menuju Renaisans</h4>
          <p class="leading-relaxed">Perpustakaan Kordoba menyimpan lebih dari 400.000 naskah ilmiah. Pemikiran filsuf <strong>Ibnu Rusyd (Averroes)</strong> dan dokter bedah <strong>Az-Zahrawi</strong> menjadi jembatan penting yang memicu kebangkitan intelektual (Renaisans) di Eropa Barat.</p>
        `
      }
    ]
  },

  // =========================================================================
  // KELAS 7 MTs: DAKWAH NABI MUHAMMAD SAW & PERADABAN MADINAH
  // =========================================================================
  {
    id: "ski-7-bab-1",
    kelas: "7",
    namaKelas: "Kelas 7 MTs",
    bab: 1,
    judulBab: "Bab 1: Dakwah Nabi Muhammad SAW di Mekkah & Madinah",
    deskripsiBab: "Kerasulan Nabi Muhammad SAW, ketabahan dakwah, peristiwa Hijrah, dan pembangunan peradaban Madinah.",
    subMateri: [
      {
        id: "materi-7-1-1",
        nomor: "1.1",
        judul: "Kondisi Masyarakat Jahiliyah & Wahyu Pertama di Gua Hira",
        metadata: {
          wilayah: "Mekkah & Jabal Nur, Jazirah Arab",
          periode: "570 – 610 M",
          fokus: "Kondisi Moral Bangsa Arab & Turunnya Wahyu Pertama",
          tokoh: "Nabi Muhammad SAW, Sayyidah Khadijah, Waraqah bin Naufal"
        },
        relasiPeta: {
          markers: ["m-mekkah", "m-gua-hira", "m-kabah"],
          jalur: [],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-pra-islam/kelahiran-nabi-1.jpg", caption: "Kawasan Kota Suci Mekkah al-Mukarramah" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Realitas Jahiliyah Pra-Islam</h4>
          <p class="leading-relaxed mb-3">Sebelum datangnya risalah Islam, bangsa Arab hidup dalam kemunduran moral yang dikenal sebagai era <em>Jahiliyah</em>: penyembahan berhala di sekeliling Ka'bah, fanatisme kabilah (*'ashabiyyah*), penindasan kaum lemah, serta penguburan bayi perempuan hidup-hidup.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Tahannuts di Gua Hira & Kerasulan</h4>
          <p class="leading-relaxed">Melihat kebobrokan moral kaumnya, Nabi Muhammad SAW kerap berkontemplasi (*tahannuts*) di <strong>Gua Hira</strong> di puncak Jabal Nur. Pada bulan Ramadhan tahun 610 M, Malaikat Jibril menyampaikan wahyu perdana (QS. Al-'Alaq: 1-5), menabalkan beliau sebagai Rasul pembawa risalah rahmat bagi seluruh alam (*Rahmatan lil 'Alamin*).</p>
        `
      },
      {
        id: "materi-7-1-2",
        nomor: "1.2",
        judul: "Peristiwa Hijrah & Pembangunan Masyarakat Madinah",
        metadata: {
          wilayah: "Madinah (Yatsrib)",
          periode: "622 M",
          fokus: "Persaudaraan Kaum Muslimin & Masjid Nabawi",
          tokoh: "Nabi Muhammad SAW, Abu Bakar, Kaum Muhajirin & Anshar"
        },
        relasiPeta: {
          markers: ["m-madinah", "m-masjid-nabawi"],
          jalur: ["j-hijrah-madinah"],
          wilayah: ["Wilayah-khulafaur-rasyidin"]
        },
        galeri: [
          { url: "assets/images/era-kenabian/masjid-nabawi-1.jpg", caption: "Masjid Nabawi di Madinah Pusat Pembinaan Umat" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Hijrah sebagai Tonggak Peradaban</h4>
          <p class="leading-relaxed mb-3">Menghadapi boikot dan ancaman pembunuhan kaum kafir Quraisy, Rasulullah SAW bersama Abu Bakar Ash-Shiddiq menempuh perjalanan hijrah melintasi padang pasir menuju Yatsrib pada tahun 622 M. Peristiwa ini disambut hangat oleh penduduk Madinah dan menjadi titik awal penanggalan Hijriyah.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Masjid Nabawi & Persaudaraan Madani</h4>
          <p class="leading-relaxed">Langkah pertama Nabi di Madinah adalah membangun <strong>Masjid Nabawi</strong> sebagai episentrum ibadah, musyawarah, dan pendidikan. Beliau juga mempersaudarakan kaum Muhajirin dan Anshar serta merumuskan <em>Piagam Madinah</em> sebagai dasar kehidupan berbangsa yang toleran.</p>
        `
      }
    ]
  },

  // =========================================================================
  // KELAS 8 MTs: DAULAH UMAYYAH & DAULAH ABBASIYAH
  // =========================================================================
  {
    id: "ski-8-bab-1",
    kelas: "8",
    namaKelas: "Kelas 8 MTs",
    bab: 1,
    judulBab: "Bab 1: Daulah Umayyah & Daulah Abbasiyah: Membangun Peradaban",
    deskripsiBab: "Kajian kekhalifahan Islam pasca Khulafaur Rasyidin, ekspansi peradaban ke Andalusia, dan kebangkitan sains Baghdad.",
    subMateri: [
      {
        id: "materi-8-1-1",
        nomor: "1.1",
        judul: "Kekhalifahan Daulah Umayyah di Damaskus & Andalusia",
        metadata: {
          wilayah: "Damaskus (Suriah) & Semenanjung Iberia (Spanyol)",
          periode: "661 – 750 M (Damaskus) & 756 – 1031 M (Andalusia)",
          fokus: "Birokrasi Administrasi & Ekspansi Andalusia",
          tokoh: "Muawiyah bin Abi Sufyan, Abdurrahman Ad-Dakhil, Tariq bin Ziyad"
        },
        relasiPeta: {
          markers: ["m-damaskus", "m-kordoba", "m-gibraltar"],
          jalur: ["j-ekspansi-andalusia"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-umayyah/kordoba-1.jpg", caption: "Pesona Arsitektur Masjid Kordoba di Andalusia" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Daulah Umayyah Berpusat di Damaskus</h4>
          <p class="leading-relaxed mb-3">Didirikan oleh <strong>Muawiyah bin Abi Sufyan</strong> pada 661 M dengan ibukota di Damaskus. Di bawah Dinasti Umayyah, sistem administrasi negara disempurnakan dengan mencetak mata uang dinar Islam mandiri, pembentukan dinas pos (Al-Barid), dan pembangunan arsitektur megah seperti Kubah Ash-Sakhrah di Yerusalem.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Gemilang Peradaban di Andalusia</h4>
          <p class="leading-relaxed">Setelah menyeberangi Selat Gibraltar di bawah panglima Tariq bin Ziyad (711 M), peradaban Islam bersemi di Spanyol. Melalui kepemimpinan Abdurrahman Ad-Dakhil, Kordoba berkembang menjadi mercusuar ilmu pengetahuan dan kebudayaan paling berkilau di Eropa.</p>
        `
      },
      {
        id: "materi-8-1-2",
        nomor: "1.2",
        judul: "Daulah Abbasiyah & Episentrum Sains Baitul Hikmah",
        metadata: {
          wilayah: "Baghdad, Irak (Mesopotamia)",
          periode: "750 – 1258 M",
          fokus: "The Golden Age of Science & Baitul Hikmah",
          tokoh: "Harun Ar-Rasyid, Al-Ma'mun, Al-Khawarizmi, Ibnu Sina"
        },
        relasiPeta: {
          markers: ["m-baghdad", "m-baitul-hikmah"],
          jalur: [],
          wilayah: ["Wilayah-bani-abbasiyah"]
        },
        galeri: [
          { url: "assets/images/era-abbasiyah/baitul-hikmah-1.jpg", caption: "Ilustrasi Diskusi Cendekiawan Muslim di Baitul Hikmah" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Masa Keemasan (The Golden Age) di Baghdad</h4>
          <p class="leading-relaxed mb-3">Didirikan oleh Abu al-Abbas as-Saffah dan mencapai puncak kegemilangan pada masa Khalifah <strong>Harun Ar-Rasyid</strong> dan putranya <strong>Al-Ma'mun</strong>. Kota Baghdad menjadi pusat perdagangan dan kebudayaan global yang dikunjungi para cendekiawan dari berbagai penjuru dunia.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Warisan Abadi Baitul Hikmah</h4>
          <p class="leading-relaxed">Lembaga agung <strong>Baitul Hikmah</strong> berfungsi sebagai perpustakaan besar, biro penerjemahan naskah Yunani, Persia, dan India, serta observatorium astronomi. Dari rahim peradaban inilah lahir tokoh penemu aljabar Muhammad bin Musa Al-Khawarizmi dan bapak kedokteran modern Ibnu Sina.</p>
        `
      }
    ]
  },

  // =========================================================================
  // KELAS 9 MTs: SEJARAH ISLAM DI NUSANTARA
  // =========================================================================
  {
    id: "ski-9-bab-1",
    kelas: "9",
    namaKelas: "Kelas 9 MTs",
    bab: 1,
    judulBab: "Bab 1: Sejarah Masuknya Islam di Nusantara & Kerajaan Islam",
    deskripsiBab: "Jalur niaga maritim para saudagar muslim, situs sejarah Barus, Samudera Pasai, serta dakwah Wali Songo.",
    subMateri: [
      {
        id: "materi-9-1-1",
        nomor: "1.1",
        judul: "Jalur Niaga Maritim & Bandar Bersejarah Barus",
        metadata: {
          wilayah: "Barus (Fansur), Sumatera Utara",
          periode: "Abad ke-7 – 13 M",
          fokus: "Jalur Pelayaran Dagang Kapur Barus & Pemukiman Arab",
          tokoh: "Syekh Rukunuddin, Saudagar Arab & Nusantara"
        },
        relasiPeta: {
          markers: ["m-barus"],
          jalur: ["j-jalur-awal-arab"],
          wilayah: []
        },
        galeri: [
          { url: "assets/images/era-umayyah/jalur-arab-1.jpg", caption: "Peta Rute Jalur Perdagangan Maritim Samudera Hindia" },
          { url: "assets/images/era-umayyah/jalur-arab-2.jpg", caption: "Kompleks Makam Kuno Papan Tinggi di Barus" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Islam Datang Lewat Jalur Damai Perdagangan</h4>
          <p class="leading-relaxed mb-3">Penyebaran Islam di Nusantara tidak melalui penaklukan militer, melainkan berlangsung secara damai melalui saluran <strong>perdagangan maritim</strong>, perkawinan, tasawuf, dan pendidikan. Letak kepulauan Nusantara di persimpangan Selat Malaka menjadikannya magnet perniagaan rempah-rempah internasional.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Jejak Pelabuhan Barus (Fansur)</h4>
          <p class="leading-relaxed">Kota pelabuhan <strong>Barus</strong> di pantai barat Sumatera Utara telah disinggahi saudagar muslim Arab sejak abad ke-7 M (era Dinasti Tang & Umayyah). Kompleks makam kuno Mahligai dan Papan Tinggi bertarikh hijriah awal menjadi bukti arkeologis otentik kehadiran Islam perdana di bumi Nusantara.</p>
        `
      },
      {
        id: "materi-9-1-2",
        nomor: "1.2",
        judul: "Samudera Pasai & Peran Dakwah Kultural Walisongo",
        metadata: {
          wilayah: "Samudera Pasai (Aceh) & Demak (Jawa)",
          periode: "Abad ke-13 – 16 M",
          fokus: "Kerajaan Islam Tertua & Pendekatan Budaya Walisongo",
          tokoh: "Sultan Malik as-Saleh, Raden Patah, Walisongo"
        },
        relasiPeta: {
          markers: ["m-samudera-pasai", "m-demak"],
          jalur: ["j-dakwah-samudera-pasai"],
          wilayah: ["w-samudera-pasai", "w-demak"]
        },
        galeri: [
          { url: "assets/images/era-penyebaran-nusantara/samudera-pasai-1.jpg", caption: "Batu Nisan Kuno Sultan Malik As-Saleh (1297 M)" },
          { url: "assets/images/era-penyebaran-nusantara/demak-1.jpg", caption: "Masjid Agung Demak Simbol Akulturasi Kultural Jawa" }
        ],
        konten: `
          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">1. Samudera Pasai: Titik Tolak Kerajaan Islam</h4>
          <p class="leading-relaxed mb-3">Didirikan oleh Meurah Silu (<strong>Sultan Malik as-Saleh</strong>) pada abad ke-13 M di Aceh Utara, Samudera Pasai menjadi kesultanan maritim berdaulat yang mencetak mata uang dirham emas dan mencetak kader ulama pendakwah ke seluruh kepulauan Nusantara.</p>

          <h4 class="font-bold text-title mb-1.5 text-sm md:text-base">2. Walisongo & Kesultanan Demak</h4>
          <p class="leading-relaxed">Di Pulau Jawa, dewan sembilan wali (<strong>Walisongo</strong>) bersama Raden Patah mendirikan Kesultanan Demak. Pendekatan dakwah yang santun, merangkul adat istiadat setempat (seperti seni wayang, tembang, dan arsitektur masjid beratap tumpang), membuat Islam diterima luas dengan sukacita oleh rakyat Nusantara.</p>
        `
      }
    ]
  }
];