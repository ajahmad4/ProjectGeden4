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
// let currentFilterMode = 'default';

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
    const eraObjek = TIMELINE_ERAS.find(e => e.id === objek.era);
    const namaEra = eraObjek ? eraObjek.name : '';

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
                <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="text-[10px] text-muted">
                        ${objek.tahun} M
                    </span>
                    <span class="text-[9px] px-1.5 py-0.2 rounded bg-badge text-muted-alt border border-border-light truncate max-w-[110px]">
                        ${namaEra}
                    </span>
                </div>
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

    const currentYear = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;
    const eraAktif = getCurrentEra(currentYear);
    if (!eraAktif) return;    

    const cardFragments = [];
    const processedMarkers = new Set();

    dataObjekAtlas
        .filter(objek => objek.era === eraAktif.id)
        .forEach(objek => {

        if (map && objek.relasi && objek.relasi.markers) {
            objek.relasi.markers.forEach(markerId => {
                if (processedMarkers.has(markerId)) return;
                processedMarkers.add(markerId);

                const dataTitik = markerMap[markerId];
                if (!dataTitik) {
                    console.warn(`[Data Error] Marker ID '${markerId}' tidak ditemukan di dataMarker.js (Dirujuk oleh ${objek.id})`);
                    return;
                }

                const marker = L.marker(dataTitik.koordinat, { icon: buatIkonSejarah(objek.kategori) });
                activeMarkers[markerId] = marker;

                marker.on("click", function () {
                    map.flyTo(dataTitik.koordinat, 12, { animate: true, duration: 1.5 });
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktif.id && 
                        oa.relasi.markers.includes(markerId)
                    );
                    
                    if (objekTerkait) {
                        showDetail(objekTerkait);
                        aktifkanCard(objekTerkait.id);
                    }
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

    // Masukkan fragment ke DOM
    if (cardFragments.length === 0) {
        locationList.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 text-center">
                <span class="material-symbols-outlined text-[36px] text-muted-alt">explore_off</span>
                <p class="mt-2 text-[13px] font-semibold text-secondary">Tidak ada objek sejarah</p>
                <p class="mt-0.5 text-[11px] text-muted">Pada era ini belum ada data tercatat.</p>
            </div>`;
    } else {
        locationList.innerHTML = cardFragments.join('');
    }

    // =========================================================
    // PERBAIKAN JALUR: Eksekusi render jalur & wilayah setiap kali
    // aplikasi memuat lokasi era yang aktif
    // =========================================================
    if (typeof renderJalurDanWilayah === 'function') {
        renderJalurDanWilayah(currentYear);
    }
}
// ==========================================
// 4. MANAJEMEN INTERAKSI & TRANSISI UI
// ==========================================

/**
 * Mengaktifkan card dan fokus pada layer terkait.
 * Pada Mode Default: Elemen terpilih menyala, elemen lain diredupkan.
 * Pada Mode Era Aktif / Keseluruhan: Semua elemen tetap terang (100%).
 * @param {string} idObjekAtlas - ID Objek Atlas
 */
function aktifkanCard(idObjekAtlas) {
    // 1. Reset visual semua card
    document.querySelectorAll("#location-list > div").forEach(card => {
        card.classList.remove("location-card-active");
    });

    // Redupkan semua layer spasial
    Object.values(activeMarkers).forEach(marker => {
        marker.setZIndexOffset(0);
        if (typeof marker.setOpacity === 'function') {
            marker.setOpacity(0.25);
        }
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

    const cardAktif = document.getElementById(`card-${idObjekAtlas}`);
    if (cardAktif) {
        cardAktif.classList.add("location-card-active");
        cardAktif.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

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
    let jalurDitemukan = false;
    if (objek.relasi && objek.relasi.jalur) {
        objek.relasi.jalur.forEach(jalurId => {
            const polyline = activePolylines[jalurId];
            if (polyline) {
                polyline.setStyle({ opacity: 0.9 });
                polyline.bringToFront();
                jalurDitemukan = true;
            }
        });
    }

    // Jika tidak ada jalur spesifik milik objek ini, normalkan opacity semua jalur era aktif
    if (!jalurDitemukan) {
        Object.values(activePolylines).forEach(poly => {
            poly.setStyle({ opacity: 0.9 });
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

    if (typeof switchAppMode === 'function') {
        switchAppMode('WELCOME');
    }

    const tahunAwal = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;

    muatLokasiAplikasi();
    updateEraHeader(tahunAwal);

    // Event Listener Pencarian
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase().trim();
            const locationList = document.getElementById("location-list");

            // PERBAIKAN 2: Jika mengetik pencarian, gunakan SELURUH dataObjekAtlas (Global Search).
            // Jika kolom pencarian kosong, kembalikan hanya objek di ERA AKTIF.
            const currentYear = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;
            const eraAktif = getCurrentEra(currentYear);

            let dataSumber = [];

            if (keyword !== "") {
                // Cari di seluruh era
                dataSumber = dataObjekAtlas;
            } else {
                // Kembali ke era aktif saja
                dataSumber = eraAktif
                    ? dataObjekAtlas.filter(oa => oa.era === eraAktif.id)
                    : dataObjekAtlas;
            }

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
                    <div class="flex flex-col items-center justify-center py-10 text-center">
                        <span class="material-symbols-outlined text-[38px] text-muted-alt">search_off</span>
                        <p class="mt-2 text-[14px] font-semibold text-secondary">Lokasi tidak ditemukan</p>
                        <p class="mt-0.5 text-[12px] text-muted">Tidak ada hasil untuk "${keyword}" di semua era.</p>
                    </div>`;
            } else {
                locationList.innerHTML = hasilFragments.join('');
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

    // ==================== 1. RENDER JALUR ====================
// ==================== 1. RENDER JALUR ====================
if (typeof dataJalur !== 'undefined') {
    dataJalur.forEach(jalur => {
        // PERBAIKAN LOGIKA RENTANG TAHUN JALUR:
        // Jika tahunMulai == tahunSelesai (misal 570-570), cek batas <= agar tetap muncul pada tahun tersebut.
        const isAktif = (jalur.tahunMulai === jalur.tahunSelesai)
            ? (tahunAktif >= jalur.tahunMulai && tahunAktif <= jalur.tahunSelesai)
            : (tahunAktif >= jalur.tahunMulai && tahunAktif < jalur.tahunSelesai);

        if (isAktif) {
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
                    <p><strong>Periode:</strong> ${jalur.tahunMulai}${jalur.tahunMulai === jalur.tahunSelesai ? '' : '–' + jalur.tahunSelesai} M</p>
                    <p>${jalur.deskripsi}</p>
                </div>`);

            polyline.addTo(layerJalurSitus);
            activePolylines[jalur.id] = polyline;

            polyline.on('click', function() {
                const eraAktif = getCurrentEra(tahunAktif);
                if (!eraAktif) return;
                const objekTerkait = dataObjekAtlas.find(oa => 
                    oa.era === eraAktif.id && 
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
            if (tahunAktif >= wilayah.tahunMulai && tahunAktif <= wilayah.tahunSelesai) {

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
                    const eraAktif = getCurrentEra(tahunAktif);
                    if (!eraAktif) return;
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktif.id && 
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
 * @param {number} delta - Selisih tahun (-1 untuk mundur, 1 untuk maju)
 */
function ubahTahunAktif(delta) {
    const elInput = document.getElementById("timeline-current");
    const current = (typeof timeline !== 'undefined' && timeline.currentYear) 
        ? timeline.currentYear 
        : parseInt(elInput?.value || "570", 10);

    if (typeof animateTimelineYear === 'function') {
        animateTimelineYear(current + delta);
    }
}

function resetMapViewState() {
    // 1. Sembunyikan panel detail kanan jika sedang terbuka
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }

    // 2. Unselect/reset semua status kartu yang terpilih di panel kiri
    const allCards = document.querySelectorAll('#location-list > div, .location-card-item');
    allCards.forEach(card => {
        card.classList.remove('active', 'bg-active', 'border-accent');
    });

    // 3. Zoom out peta tanpa mengubah titik koordinat pusat saat ini
    if (typeof map !== 'undefined' && map) {
        map.flyTo(map.getCenter(), 5, {
            animate: true,
            duration: 2.5
        });
    }
}

// Fungsi mengubah mode utama dari Header atau Modal Welcome
function switchAppMode(mode) {
    const welcomePanel = document.getElementById('welcome-panel');
    const listPanel = document.getElementById('list-panel');
    const detailPanel = document.getElementById('detail-panel');
    const timelineLegend = document.getElementById('timeline-legend');
    const timelineIndicator = document.getElementById('timeline-indicator');
    const timelineFooter = document.getElementById('timeline-footer');
    const modeSelect = document.getElementById('mode-select');
    const badgeMode = document.getElementById('badge-mode-aktif');

    // Selaraskan nilai dropdown di header
    if (modeSelect) modeSelect.value = mode;

    if (mode === 'WELCOME') {
        // 1. Tampilkan Welcome Overlay Modal
        if (welcomePanel) welcomePanel.classList.remove('hidden');

        // 2. Sembunyikan SEMUA panel UI & Timeline agar tidak mengganggu modal
        if (listPanel) listPanel.classList.add('hidden');
        if (detailPanel) detailPanel.classList.add('hidden');
        if (timelineLegend) timelineLegend.classList.add('hidden');
        if (timelineIndicator) timelineIndicator.classList.add('hidden');
        if (timelineFooter) timelineFooter.classList.add('hidden');

    } else if (mode === 'EXPLORE' || mode === 'CURRICULUM') {
        // 1. Sembunyikan Welcome Overlay Modal
        if (welcomePanel) welcomePanel.classList.add('hidden');

        // 2. Tampilkan Panel Kiri dan Timeline
        if (listPanel) listPanel.classList.remove('hidden');
        if (timelineLegend) timelineLegend.classList.remove('hidden');
        if (timelineIndicator) timelineIndicator.classList.remove('hidden');
        if (timelineFooter) timelineFooter.classList.remove('hidden');

        // Panel detail tetap tersembunyi sampai ada marker/card yang diklik
        if (detailPanel) detailPanel.classList.add('hidden');

        // Update badge mode jika panel detail dibuka
        if (badgeMode) {
            badgeMode.textContent = mode === 'EXPLORE' ? 'MODE: EKSPLORASI' : 'MODE: KURIKULUM';
        }
    }
}