// js/map.js

// Menginisialisasi peta dan mengatur titik tengah awal
// 1. Buat Layer Group kosong
const layerMasjid = L.layerGroup();
const layerKota = L.layerGroup();

// 2. Tambahkan ke peta secara default
const map = L.map('map', {
    center: [1.0, 115.0],
    zoom: 5,
    layers: [layerMasjid, layerKota] // Keduanya aktif saat pertama kali dimuat
});

// 3. Buat variabel kontrol (Menu UI)
const baseLayers = {}; // Untuk peta dasar (opsional)
const overlays = {
    "Masjid": layerMasjid,
    "Kota": layerKota
};

// 4. Tambahkan kontrol ke peta
L.control.layers(baseLayers, overlays).addTo(map);
// Memanggil basemap dari internet
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
    maxZoom: 18 
}).addTo(map);