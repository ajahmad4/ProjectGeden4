// js/loader.js
let allLocationsData = []; // Variabel global untuk menyimpan data lokasi
async function loadLocations() {
    try {
        // 1. Ambil data JSON
        const response = await fetch("data/location.json");
        const locations = await response.json();
        allLocationsData = locations; // Simpan data lokasi ke variabel global

        const locationList = document.getElementById('location-list');
        locationList.innerHTML = ''; // Kosongkan daftar sebelum diisi

        // 2. Loop data
        locations.forEach(loc => {
            // Panggil fungsi dari utils.js untuk ikon
            const iconName = getMaterialIcon(loc.kategori); 
            
            // Buat ikon peta Leaflet
            const myIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<span class="material-symbols-outlined" style="font-size: 32px; color: #064e3b;">${iconName}</span>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });

            // Pasang marker ke layer group yang sesuai (dari map.js)
            if (typeof map !== 'undefined') {
                const marker = L.marker([loc.lat, loc.lng], { icon: myIcon });
                marker.bindPopup(`<b>${loc.nama}</b><br>Tahun: ${loc.tahun}<br>${loc.deskripsi}`);

                // Filter berdasarkan kategori yang didefinisikan di map.js
                switch (loc.kategori) {
                    case 'masjid':
                        marker.addTo(layerMasjid);
                        break;
                    case 'kota':
                        marker.addTo(layerKota);
                        break;
                    default:
                        marker.addTo(map);
                }
            }

            // Amankan teks deskripsi dari karakter kutip agar tidak merusak HTML onclick
            if (allLocationsData.length === 0) {
                allLocationsData = locations; 
            }

            // Sekarang buttonHTML jauh lebih bersih dan aman dari error tanda kutip:
            const buttonHTML = `
                <button onclick="map.flyTo([${loc.lat}, ${loc.lng}], 12); handleSidebarClick(${loc.id})" 
                    class="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-emerald-50 border border-gray-200 rounded-lg transition-all shadow-sm text-left cursor-pointer">
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

// ==========================================
// FUNGSI MANAJEMEN INTERAKSI UI SIDEBAR
// ==========================================

function handleSidebarClick(id) {
    // Cari data lokasi yang ID-nya cocok dengan yang diklik
    const lokasiTerpilih = allLocationsData.find(loc => loc.id === id);
    
    if (lokasiTerpilih) {
        // Jika ketemu, kirim datanya ke fungsi tampil detail
        showDetail(lokasiTerpilih.nama, lokasiTerpilih.tahun, lokasiTerpilih.deskripsi);
    }
}

function showDetail(nama, tahun, deskripsi) {
    // Sembunyikan panel daftar, tampilkan panel detail
    document.getElementById('list-panel').classList.add('hidden');
    document.getElementById('detail-panel').classList.remove('hidden');

    // Isi konten detailnya dengan aman
    document.getElementById('detail-nama').innerText = nama;
    document.getElementById('detail-tahun').innerText = tahun + " M";
    document.getElementById('detail-deskripsi').innerText = deskripsi;
}

function showList() {
    // Tampilkan kembali panel daftar, sembunyikan panel detail
    document.getElementById('list-panel').classList.remove('hidden');
    document.getElementById('detail-panel').classList.add('hidden');
}

// Jalankan fungsi load data saat halaman dimuat
loadLocations();