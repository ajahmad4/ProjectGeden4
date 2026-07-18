/**
 * DATABASE SPASIAL: MARKER (TITIK LOKASI)
 * Hanya menyimpan informasi geometris titik koordinat dan ID referensinya.
 */

const dataMarker = [
    { 
        id: "m-mekkah", 
        nama: "Mekkah", 
        koordinat: [21.4225, 39.8262] 
    },
    { 
        id: "m-gua-hira", 
        nama: "Gua Hira", 
        koordinat: [21.4578, 39.8592] 
    },
    { 
        id: "m-madinah", 
        nama: "Madinah (Yatsrib / Aqabah)", 
        koordinat: [24.4667, 39.6167] 
    },
    {
        id: "m-aqsa",
        nama: "Masjidil Aqsa (Yerusalem)",
        koordinat: [31.7765, 35.2362]
    },
    {
        id: "m-samudera-pasai",
        nama: "Samudera Pasai",
        koordinat: [5.1278, 97.2341]
    },
    {
        id: "m-demak",
        nama: "Kesultanan Demak",
        koordinat: [-6.8943, 110.6386] // Masjid Agung Demak
    }
];
