/**
 * DATABASE MARKER (TITIK KOORDINAT PETA)
 * Menyimpan data titik lokasi geografis presisi (lintang, bujur)
 * yang direferensikan oleh dataObjekAtlas.
 */

const dataMarker = [
  // ==========================================
  // 1. JAZIRAH ARAB & SEKITARNYA
  // ==========================================
  { 
    id: "m-mekkah", 
    nama: "Mekkah", 
    koordinat: [21.4225, 39.8262] 
  },
  { 
    id: "m-kabah", 
    nama: "Ka'bah (Mekkah)", 
    koordinat: [21.4225, 39.8262] 
  },
  { 
    id: "m-gua-hira", 
    nama: "Gua Hira (Jabal Nur)", 
    koordinat: [21.4578, 39.8592] 
  },
  { 
    id: "m-madinah", 
    nama: "Madinah (Yatsrib)", 
    koordinat: [24.4667, 39.6167] 
  },
  { 
    id: "m-masjid-nabawi", 
    nama: "Masjid Nabawi (Madinah)", 
    koordinat: [24.4672, 39.6111] 
  },
  { 
    id: "m-arafah", 
    nama: "Padang Arafah", 
    koordinat: [21.3549, 39.9840] 
  },
  { 
    id: "m-aqabah", 
    nama: "Mina / Bukit Aqabah", 
    koordinat: [21.4133, 39.8933] 
  },
  { 
    id: "m-hudaibiyah", 
    nama: "Al-Hudaibiyah (Al-Shumaisi)", 
    koordinat: [21.4422, 39.6419] 
  },
  { 
    id: "m-badar", 
    nama: "Lembah Badar", 
    koordinat: [23.7822, 38.7892] 
  },
  { 
    id: "m-uhud", 
    nama: "Bukit Uhud", 
    koordinat: [24.5034, 39.6117] 
  },

  // ==========================================
  // 2. TIMUR TENGAH, SYAM & PERSIA
  // ==========================================
  { 
    id: "m-bushra", 
    nama: "Bushra (Bostra)", 
    koordinat: [32.5186, 36.4811] 
  },
  { 
    id: "m-aqsa", 
    nama: "Masjidil Aqsa (Yerusalem)", 
    koordinat: [31.7765, 35.2362] 
  },
  { 
    id: "m-yerusalem", 
    nama: "Kota Yerusalem (Al-Quds)", 
    koordinat: [31.7767, 35.2345] 
  },
  { 
    id: "m-damaskus", 
    nama: "Damaskus", 
    koordinat: [33.5138, 36.2765] 
  },
  { 
    id: "m-baghdad", 
    nama: "Baghdad", 
    koordinat: [33.3152, 44.3661] 
  },
  { 
    id: "m-baitul-hikmah", 
    nama: "Baitul Hikmah (Baghdad)", 
    koordinat: [33.3406, 44.3828] 
  },
  { 
    id: "m-kufah", 
    nama: "Kufah", 
    koordinat: [32.0298, 44.4022] 
  },
  { 
    id: "m-yarmuk", 
    nama: "Sungai Yarmuk", 
    koordinat: [32.7144, 35.6881] 
  },
  { 
    id: "m-qadisiyyah", 
    nama: "Al-Qadisiyyah", 
    koordinat: [31.5833, 44.5000] 
  },
  { 
    id: "m-shiffin", 
    nama: "Shiffin (Ar-Raqqah)", 
    koordinat: [35.9500, 39.0167] 
  },

  // ==========================================
  // 3. AFRIKA, EROPA & ASIA SELATAN
  // ==========================================
  { 
    id: "m-aksum", 
    nama: "Kerajaan Aksum (Habasyah / Ethiopia)", 
    koordinat: [14.1311, 38.7208] 
  },
  { 
    id: "m-fustat", 
    nama: "Fustat (Kairo Lama)", 
    koordinat: [30.0063, 31.2325] 
  },
  { 
    id: "m-gibraltar", 
    nama: "Jabal Tariq (Gibraltar)", 
    koordinat: [36.1408, -5.3536] 
  },
  { 
    id: "m-kordoba", 
    nama: "Kordoba (Cordoba)", 
    koordinat: [37.8882, -4.7794] 
  },
  { 
    id: "m-poitiers", 
    nama: "Poitiers / Tours", 
    koordinat: [46.5802, 0.3404] 
  },
  { 
    id: "m-sindh", 
    nama: "Wilayah Sindh (Lembah Indus)", 
    koordinat: [25.8943, 68.5247] 
  },

  // ==========================================
  // 4. NUSANTARA
  // ==========================================
  { 
    id: "m-barus", 
    nama: "Barus (Pesisir Barat Sumatera)", 
    koordinat: [2.0028, 98.3789] 
  },
  { 
    id: "m-samudera-pasai", 
    nama: "Kesultanan Samudera Pasai", 
    koordinat: [5.1278, 97.2341] 
  },
  { 
    id: "m-demak", 
    nama: "Kesultanan Demak (Masjid Agung Demak)", 
    koordinat: [-6.8943, 110.6386] 
  }
];