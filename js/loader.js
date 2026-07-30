/**
 * ENGINE UTAMA INTERAKSI ANTARMUKA DAN MANIPULASI DATA DOM
 * Arsitektur Baru: "Objek Atlas" memisahkan narasi pembelajaran dari data geometris spasial.
 */

// ==========================================
// 1. STATE & CACHE GLOBAL
// ==========================================

// Indeks Memori (Lookup Maps) O(1)
const markerMap = {};
const jalurMap = {};
const wilayahMap = {};

// Menyimpan referensi instance Leaflet berdasarkan ID spasial
const activeMarkers = {};
const activePolylines = {};
const activePolygons = {};

// State mode filter aktif: 'default' | 'era_aktif' | 'keseluruhan'
let currentFilterMode = 'default';

// ==========================================
// 2. INISIALISASI & BUILDER CARD
// ==========================================

function inisialisasiData() {
    // Membangun map lookup dari data mentah
    if (typeof dataMarker !== 'undefined') dataMarker.forEach(m => markerMap[m.id] = m);
    if (typeof dataJalur !== 'undefined') dataJalur.forEach(j => jalurMap[j.id] = j);
    if (typeof dataWilayah !== 'undefined') dataWilayah.forEach(w => wilayahMap[w.id] = w);
}

// Eksekusi segera secara sinkron
inisialisasiData();

function buatCardHTML(objek) {
    const iconName = getMaterialIcon(objek.kategori);
    return `
        <div
            id="card-${objek.id}"
            onclick="eksekusiNavigasiLokal('${objek.id}')"
            class="w-full flex items-center gap-2.5 px-2.5 py-2.5 bg-input hover:bg-page border border-border-panel rounded-2xl transition-all duration-300 cursor-pointer group">

            <div class="w-9 h-9 flex-shrink-0 rounded-full bg-active text-title flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <span class="material-symbols-outlined text-[18px]">${iconName}</span>
            </div>

            <div class="flex-1 min-w-0">
                <p class="font-medium text-[13px] text-primary truncate group-hover:text-title transition-colors">
                    ${objek.nama}
                </p>
                <p class="text-[10px] text-muted mt-0.5">
                    Tahun: ${objek.tahun} M
                </p>
            </div>

            <span class="material-symbols-outlined text-muted-alt text-[16px] transition-transform duration-200 group-hover:translate-x-1">
                arrow_forward_ios
            </span>
        </div>`;
}

// ==========================================
// 3. MUAT LOKASI APLIKASI
// ==========================================

/**
 * Membaca dataObjekAtlas, memfilter berdasarkan mode filter aktif,
 * lalu merender marker ke peta dan card ke panel navigasi kiri.
 */
function muatLokasiAplikasi() {
    const locationList = document.getElementById('location-list');
    if (!locationList) return;

    locationList.innerHTML = '';

    // 1. Bersihkan semua layer marker dari peta
    if (typeof layerMasjid !== 'undefined') layerMasjid.clearLayers();
    if (typeof layerKerajaan !== 'undefined') layerKerajaan.clearLayers();
    if (typeof layerPelabuhan !== 'undefined') layerPelabuhan.clearLayers();
    if (typeof layerKota !== 'undefined') layerKota.clearLayers();

    for (const key in activeMarkers) delete activeMarkers[key];

    const eraAktif = getCurrentEra(timeline.currentYear);
    
    // 2. Tentukan dataset objek yang difilter sesuai mode
    let dataSumber = [];

    if (currentFilterMode === 'keseluruhan') {
        // Semua objek atlas tanpa batasan era
        dataSumber = [...dataObjekAtlas];
    } else {
        // Mode 'default' & 'era_aktif': Tampilkan seluruh objek di era tersebut
        if (eraAktif) {
            dataSumber = dataObjekAtlas.filter(objek => objek.era === eraAktif.id);
        }
    }

    const cardFragments = [];
    const processedMarkers = new Set();

    dataSumber.forEach(objek => {
        // Render Marker
        if (map && objek.relasi && objek.relasi.markers) {
            objek.relasi.markers.forEach(markerId => {
                if (processedMarkers.has(markerId)) return;
                processedMarkers.add(markerId);

                const dataTitik = markerMap[markerId];
                if (!dataTitik) return;

                const marker = L.marker(dataTitik.koordinat, { icon: buatIkonSejarah(objek.kategori) });
                activeMarkers[markerId] = marker;

                marker.on("click", function () {
                    map.flyTo(dataTitik.koordinat, 12, { animate: true, duration: 1.5 });
                    showDetail(objek);
                    aktifkanCard(objek.id);
                });

                switch (objek.kategori) {
                    case 'masjid':    marker.addTo(layerMasjid);    break;
                    case 'kerajaan':  marker.addTo(layerKerajaan);  break;
                    case 'pelabuhan': marker.addTo(layerPelabuhan); break;
                    default:          marker.addTo(layerKota);      break;
                }
            });
        }

        // Render Card HTML
        cardFragments.push(buatCardHTML(objek));
    });

    if (cardFragments.length === 0) {
        locationList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10 text-center">
                <span class="material-symbols-outlined text-[36px] text-muted-alt">location_off</span>
                <p class="mt-2 text-[13px] font-medium text-secondary">Tidak ada data untuk era ini.</p>
            </div>`;
    } else {
        locationList.innerHTML = cardFragments.join('');
    }
}

// ==========================================
// 4. MANAJEMEN INTERAKSI & TRANSISI UI
// ==========================================

/**
 * Mengaktifkan card dan fokus pada layer terkait.
 * Pada Mode Default: Elemen terpilih menyala, elemen lain diredupkan.
 * Pada Mode Era Aktif / Keseluruhan: Semua elemen tetap terang (100%).
 */
function aktifkanCard(idObjekAtlas) {
    // 1. Reset visual aktif pada daftar card
    document.querySelectorAll("#location-list > div").forEach(card => {
        card.classList.remove("location-card-active");
    });

    const cardAktif = document.getElementById(`card-${idObjekAtlas}`);
    if (cardAktif) {
        cardAktif.classList.add("location-card-active");
        cardAktif.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Jika mode 'era_aktif' atau 'keseluruhan', tampilkan SEMUA elemen 100% tanpa transparansi
    if (currentFilterMode === 'era_aktif' || currentFilterMode === 'keseluruhan') {
        resetTransparansiLayer();
        return; 
    }

    // =========================================================
    // MODE DEFAULT: Fokuskan item terpilih & redupkan yang lain
    // =========================================================

    // Redupkan semua layer spasial
    Object.values(activeMarkers).forEach(marker => {
        marker.setZIndexOffset(0);
        const el = marker.getElement();
        if (el) el.style.opacity = "0.25"; // Sedikit transparan
    });

    Object.values(activePolylines).forEach(polyline => {
        polyline.setStyle({ opacity: 0.15 }); // Sedikit transparan
    });

    Object.values(activePolygons).forEach(polygon => {
        polygon.setStyle({ fillOpacity: 0.05, opacity: 0.15 }); // Sedikit transparan
    });

    // Ambil data Objek Atlas dan fokuskan layer miliknya
    const objek = dataObjekAtlas.find(oa => oa.id === idObjekAtlas);
    if (!objek) return;

    // Aktifkan Marker terkait (Opacity 100%)
    if (objek.relasi && objek.relasi.markers) {
        objek.relasi.markers.forEach(markerId => {
            const marker = activeMarkers[markerId];
            if (marker) {
                marker.setZIndexOffset(1000);
                const el = marker.getElement();
                if (el) el.style.opacity = "1";
            }
        });
    }

    // Aktifkan Jalur terkait (Opacity 100%)
    if (objek.relasi && objek.relasi.jalur) {
        objek.relasi.jalur.forEach(jalurId => {
            const polyline = activePolylines[jalurId];
            if (polyline) {
                polyline.setStyle({ opacity: 0.9 });
                polyline.bringToFront();
            }
        });
    }

    // Aktifkan Wilayah terkait (Opacity 100%)
    if (objek.relasi && objek.relasi.wilayah) {
        objek.relasi.wilayah.forEach(wilayahId => {
            const polygon = activePolygons[wilayahId];
            if (polygon) {
                polygon.setStyle({ fillOpacity: 0.25, opacity: 1 });
                polygon.bringToFront();
            }
        });
    }
}

function eksekusiNavigasiLokal(idObjekAtlas) {
    const objek = dataObjekAtlas.find(oa => oa.id === idObjekAtlas);
    if (!objek) return;

    // Mobile: Auto-close dropdown panel saat item dipilih
    const listPanel = document.getElementById("list-panel");
    if (window.innerWidth <= 768 && listPanel) {
        listPanel.classList.add("mobile-closed");
    }

    animateTimelineYear(
        Number(objek.tahun),
        () => {
            if (map && objek.relasi) {
                const bounds = L.latLngBounds();
                let hasPoint = false;

                if (objek.relasi.markers) {
                    objek.relasi.markers.forEach(id => {
                        if (markerMap[id]) {
                            bounds.extend(markerMap[id].koordinat);
                            hasPoint = true;
                        }
                    });
                }

                if (objek.relasi.jalur) {
                    objek.relasi.jalur.forEach(id => {
                        if (jalurMap[id] && jalurMap[id].koordinat) {
                            jalurMap[id].koordinat.forEach(coord => bounds.extend(coord));
                            hasPoint = true;
                        }
                    });
                }

                if (objek.relasi.wilayah) {
                    objek.relasi.wilayah.forEach(id => {
                        if (wilayahMap[id] && wilayahMap[id].koordinat) {
                            wilayahMap[id].koordinat.forEach(coord => bounds.extend(coord));
                            hasPoint = true;
                        }
                    });
                }

                if (hasPoint) {
                    const sw = bounds.getSouthWest();
                    const ne = bounds.getNorthEast();
                    
                    if (sw.lat === ne.lat && sw.lng === ne.lng) {
                        map.flyTo(sw, 12, { animate: true, duration: 1.5, easeLinearity: 0.25 });
                    } else {
                        map.flyToBounds(bounds, { animate: true, duration: 1.5, padding: [40, 40] });
                    }
                }
            }
            
            showDetail(objek);
            aktifkanCard(idObjekAtlas);
        }
    );
}

function showDetail(objek) {
    const detailPanel = document.getElementById("detail-panel");
    const detailContent = document.getElementById("detail-content");
    if (!detailPanel) return;

    if (detailPanel.classList.contains("hidden")) {
        detailPanel.classList.remove("hidden");

        if (window.innerWidth <= 768) {
            detailPanel.classList.remove("snap-half", "snap-full");
            detailPanel.classList.add("snap-peek");
        }

        isiDetailPanel(objek);
        return;
    }

    detailContent.classList.add("fading");

    setTimeout(() => {
        isiDetailPanel(objek);
        detailContent.classList.remove("fading");
    }, 180);
}

function isiDetailPanel(objek) {
    const fields = {
        "detail-nama": objek.nama,
        "detail-tahun": objek.periode,
        "detail-waktu": objek.tahun ? `${objek.tahun} M` : "-",
        "detail-lokasi": objek.lokasi,
        "detail-kategori": objek.kategori.charAt(0).toUpperCase() + objek.kategori.slice(1),
        "detail-wilayah": objek.wilayah,
        "detail-deskripsi": objek.deskripsi,
    };

    Object.entries(fields).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });

    const fotoWrapper = document.getElementById("detail-foto-wrapper");
    const foto = document.getElementById("detail-foto");

    if (objek.foto && objek.foto.length > 0) {
        foto.src = objek.foto;
        foto.alt = objek.nama;
        foto.onerror = function () {
            this.src = "assets/images/placeholder.jpg";
        };
        fotoWrapper.classList.remove("hidden");
    } else {
        fotoWrapper.classList.add("hidden");
    }
}

function tutupDetailPanel() {
    const detailPanel = document.getElementById('detail-panel');

    if (detailPanel) {
        detailPanel.classList.add('hidden');
        detailPanel.classList.remove('snap-peek', 'snap-half', 'snap-full');
    }

    if (map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }
}

function resetTampilanDefault() {
    const detailPanel = document.getElementById('detail-panel');

    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }

    document.querySelectorAll('.leaflet-right').forEach(el => {
        el.classList.remove('geser-kiri');
    });

    if (map) {
        map.flyTo([1.0, 115.0], 5, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
        });
    }
}

// ==========================================
// 5. INITIALIZER (DOMContentLoaded)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    muatLokasiAplikasi();
    updateEraHeader(timeline.currentYear || 570);

    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase().trim();
            const locationList = document.getElementById("location-list");

            const eraAktif = getCurrentEra(timeline.currentYear);
            const dataSumber = (currentFilterMode === 'keseluruhan')
                ? dataObjekAtlas
                : (eraAktif ? dataObjekAtlas.filter(oa => oa.era === eraAktif.id) : dataObjekAtlas);

            const hasilFragments = [];

            dataSumber.forEach(objek => {
                const cocok =
                    objek.nama.toLowerCase().includes(keyword) ||
                    objek.kategori.toLowerCase().includes(keyword) ||
                    objek.lokasi.toLowerCase().includes(keyword) ||
                    objek.wilayah.toLowerCase().includes(keyword);

                if (cocok) hasilFragments.push(buatCardHTML(objek));
            });

            if (hasilFragments.length === 0) {
                locationList.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-14 text-center">
                        <span class="material-symbols-outlined text-[42px] text-muted-alt">search_off</span>
                        <p class="mt-3 text-[15px] font-semibold text-secondary">Lokasi tidak ditemukan</p>
                        <p class="mt-1 text-[13px] text-muted">Coba gunakan kata kunci lain.</p>
                    </div>`;
            } else {
                locationList.innerHTML = hasilFragments.join('');
            }

            if (typeof renderJalurDanWilayah === 'function') {
                renderJalurDanWilayah(timeline?.currentYear ?? 570);
            }
        });
    }

    const timelineSlider = document.getElementById("timeline-slider");
    const timelineCurrent = document.getElementById("timeline-current");
    if (timelineSlider && timelineCurrent) {
        timelineSlider.addEventListener("input", function () {
            timelineCurrent.textContent = `${this.value} M`;
        });
    }
});

// =========================================================================
// 6. RENDER JALUR (POLYLINE) DAN WILAYAH KEKUASAAN (POLYGON)
// =========================================================================

function renderJalurDanWilayah(tahunAktif) {
    tahunAktif = Math.round(Number(tahunAktif));

    if (typeof layerJalurSitus !== 'undefined') layerJalurSitus.clearLayers();
    if (typeof layerWilayahKekuasaan !== 'undefined') layerWilayahKekuasaan.clearLayers();

    for (const key in activePolylines) delete activePolylines[key];
    for (const key in activePolygons)  delete activePolygons[key];

    const eraAktif = getCurrentEra(tahunAktif);

    // ==================== 1. RENDER JALUR ====================
    if (typeof dataJalur !== 'undefined') {
        dataJalur.forEach(jalur => {
            let tampilkan = false;

            if (currentFilterMode === 'keseluruhan') {
                tampilkan = true;
            } else if (eraAktif) { // Mode 'default' & 'era_aktif'
                tampilkan = (jalur.tahunMulai <= eraAktif.end && jalur.tahunSelesai >= eraAktif.start);
            }

            if (tampilkan) {
                const polyline = L.polyline(jalur.koordinat, {
                    color:       jalur.warna,
                    weight:      5,
                    opacity:     0.9,
                    dashArray:   "10 6",
                    smoothFactor: 1,
                    lineJoin:    "round",
                    lineCap:     "round"
                });

                polyline.bindPopup(`
                    <div class="popup-jalur">
                        <h4>${jalur.nama}</h4>
                        <p><strong>Periode:</strong> ${jalur.tahunMulai}–${jalur.tahunSelesai} M</p>
                        <p>${jalur.deskripsi}</p>
                    </div>`);

                polyline.addTo(layerJalurSitus);
                activePolylines[jalur.id] = polyline;

                polyline.on('click', function() {
                    const eraAktifLocal = getCurrentEra(tahunAktif);
                    if (!eraAktifLocal) return;
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktifLocal.id && 
                        oa.relasi.jalur && oa.relasi.jalur.includes(jalur.id)
                    );
                    if (objekTerkait) {
                        showDetail(objekTerkait);
                        aktifkanCard(objekTerkait.id);
                    }
                });
            }
        });
    }

    // ==================== 2. RENDER WILAYAH ====================
    if (typeof dataWilayah !== 'undefined') {
        dataWilayah.forEach(wilayah => {
            let tampilkan = false;

            if (currentFilterMode === 'keseluruhan') {
                tampilkan = true;
            } else if (eraAktif) { // Mode 'default' & 'era_aktif'
                tampilkan = (wilayah.tahunMulai <= eraAktif.end && wilayah.tahunSelesai >= eraAktif.start);
            }

            if (tampilkan) {
                const polygon = L.polygon(wilayah.koordinat, {
                    color:       wilayah.warna,
                    fillColor:   wilayah.warna,
                    fillOpacity: 0.18,
                    weight:      2
                });

                polygon.bindPopup(`
                    <div class="popup-wilayah">
                        <h4>${wilayah.nama}</h4>
                        <p><strong>Periode:</strong> ${wilayah.tahunMulai}–${wilayah.tahunSelesai} M</p>
                        <p>${wilayah.deskripsi}</p>
                    </div>`);

                polygon.addTo(layerWilayahKekuasaan);
                activePolygons[wilayah.id] = polygon;

                polygon.on('click', function() {
                    const eraAktifLocal = getCurrentEra(tahunAktif);
                    if (!eraAktifLocal) return;
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktifLocal.id && 
                        oa.relasi.wilayah && oa.relasi.wilayah.includes(wilayah.id)
                    );
                    if (objekTerkait) {
                        showDetail(objekTerkait);
                        aktifkanCard(objekTerkait.id);
                    }
                });
            }
        });
    }
}

// =========================================================================
// 7. UTILITAS ERA & FILTER MODE
// =========================================================================

function updateEraHeader(tahunAktif) {
    const container = document.getElementById("era-header");
    if (!container) return;

    const eraAktif = getCurrentEra(tahunAktif);

    container.className = "era-header";

    if (!eraAktif) {
        container.style.borderLeftColor = "var(--border-light)";
        container.innerHTML = `
            <h3>Era Aktif</h3>
            <span style="color:var(--text-muted);font-size:13px">Tidak ada era pada periode ini</span>`;
        return;
    }

    container.style.borderLeftColor = `rgb(${eraAktif.colorRgb})`;
    container.innerHTML = `
        <h3>Era Aktif</h3>
        <div class="era-item">
            <strong>${eraAktif.name}</strong>
            <span>${eraAktif.start}–${eraAktif.end} M</span>
        </div>`;
}

function getCurrentEra(tahunAktif) {
    return TIMELINE_ERAS.find((era, index) => {
        if (index === TIMELINE_ERAS.length - 1) {
            return tahunAktif >= era.start && tahunAktif <= era.end;
        }
        return tahunAktif >= era.start && tahunAktif < era.end;
    });
}

/**
 * Mengubah tahun aktif sebesar delta (-1 atau +1)
 */
function ubahTahunAktif(delta) {
    animateTimelineYear(timeline.currentYear + delta);
}

/**
 * Mengubah mode filter spasial & merender ulang elemen terkait
 * @param {string} mode - 'default' | 'era_aktif' | 'keseluruhan'
 */
function ubahFilterMode(mode) {
    currentFilterMode = mode;
    
    // Muat ulang marker & list
    muatLokasiAplikasi();
    
    // Render ulang jalur & wilayah
    if (typeof renderJalurDanWilayah === 'function') {
        renderJalurDanWilayah(timeline?.currentYear ?? 570);
    }

    // Jika beralih ke mode Era Aktif atau Keseluruhan, normalkan opacity seluruh layer
    if (currentFilterMode === 'era_aktif' || currentFilterMode === 'keseluruhan') {
        resetTransparansiLayer();
    }
}

/**
 * Mengembalikan transparansi seluruh layer ke kondisi utuh (100%)
 */
function resetTransparansiLayer() {
    Object.values(activeMarkers).forEach(marker => {
        marker.setZIndexOffset(0);
        const el = marker.getElement();
        if (el) el.style.opacity = "1";
    });

    Object.values(activePolylines).forEach(polyline => {
        polyline.setStyle({ opacity: 0.9 });
    });

    Object.values(activePolygons).forEach(polygon => {
        polygon.setStyle({ fillOpacity: 0.18, opacity: 1 });
    });
}