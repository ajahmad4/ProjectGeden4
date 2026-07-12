// js/loader.js

async function loadLocations() {
    try {
        // 1. Ambil data JSON
        const response = await fetch("data/location.json");
        const locations = await response.json();
        
        const locationList = document.getElementById('location-list');
        locationList.innerHTML = ''; // Kosongkan daftar sebelum diisi

        // 2. Loop data
        locations.forEach(loc => {
            // Panggil fungsi dari utils.js
            const iconName = getMaterialIcon(loc.kategori); 
            
            // Buat ikon peta
            const myIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<span class="material-symbols-outlined" style="font-size: 32px; color: #064e3b;">${iconName}</span>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });

            if (typeof map !== 'undefined') {
                const marker = L.marker([loc.lat, loc.lng], { icon: myIcon });
                marker.bindPopup(`<b>${loc.nama}</b><br>Tahun: ${loc.tahun}<br>${loc.deskripsi}`);

                // LOGIKA FILTER: Masukkan marker ke layer yang sesuai
                switch (loc.kategori) {
                    case 'masjid':
                        marker.addTo(layerMasjid);
                        break;
                    case 'kota':
                        marker.addTo(layerKota);
                        break;
                    default:
                        marker.addTo(map); // Default jika kategorinya belum terdaftar
                }
            }

            // Tambah ke sidebar
            const buttonHTML = `
                <button onclick="map.flyTo([${loc.lat}, ${loc.lng}], 12)" 
                    class="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 border border-gray-200 rounded-lg transition-all shadow-sm">
                    <span class="material-symbols-outlined text-emerald-900">${iconName}</span>
                    <div class="text-left">
                        <p class="font-semibold text-gray-800">${loc.nama}</p>
                        <p class="text-xs text-gray-500">${loc.tahun} M</p>
                    </div>
                </button>
            `;
            locationList.innerHTML += buttonHTML;
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
}