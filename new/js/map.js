// js/map.js

// Menginisialisasi peta dan mengatur titik tengah awal
const map = L.map('map').setView([21.4225, 39.8262], 6);

// Memanggil basemap dari internet
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
    maxZoom: 18 
}).addTo(map);