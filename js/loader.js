/**
 * ENGINE UTAMA INTERAKSI ANTARMUKA DAN MANIPULASI DATA DOM
 * Arsitektur Terintegrasi: Menghubungkan dataObjekAtlas, data-kurikulum, dan antarmuka Leaflet.
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

let currentActiveObjekId = null;

// ==========================================
// 2. INISIALISASI & BUILDER CARD
// ==========================================

function inisialisasiData() {
    if (typeof dataMarker !== 'undefined') dataMarker.forEach(m => markerMap[m.id] = m);
    if (typeof dataJalur !== 'undefined') dataJalur.forEach(j => jalurMap[j.id] = j);
    if (typeof dataWilayah !== 'undefined') dataWilayah.forEach(w => wilayahMap[w.id] = w);
}

// Eksekusi segera secara sinkron
inisialisasiData();

function buatCardHTML(objek) {
    const iconName = typeof getMaterialIcon === 'function' ? getMaterialIcon(objek.kategori) : 'place';
    const eraObjek = (typeof TIMELINE_ERAS !== 'undefined') ? TIMELINE_ERAS.find(e => e.id === objek.era) : null;
    const namaEra = eraObjek ? (eraObjek.name || eraObjek.nama || '') : '';

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
                    ${objek.nama || ''}
                </p>
                <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="text-[10px] text-muted">
                        ${objek.tahun ? objek.tahun + ' M' : (objek.periode || '-')}
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

function muatLokasiAplikasi() {
    inisialisasiData();
    const locationList = document.getElementById('location-list');
    if (!locationList) return;

    locationList.innerHTML = '';

    // Bersihkan semua layer marker dari peta
    if (typeof layerMasjid !== 'undefined') layerMasjid.clearLayers();
    if (typeof layerKerajaan !== 'undefined') layerKerajaan.clearLayers();
    if (typeof layerPelabuhan !== 'undefined') layerPelabuhan.clearLayers();
    if (typeof layerKota !== 'undefined') layerKota.clearLayers();

    for (const key in activeMarkers) delete activeMarkers[key];

    const currentYear = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;
    const eraAktif = (typeof getCurrentEra === 'function') ? getCurrentEra(currentYear) : null;
    if (!eraAktif || typeof dataObjekAtlas === 'undefined') return;    

    const cardFragments = [];
    const processedMarkers = new Set();

    dataObjekAtlas
        .filter(objek => objek.era === eraAktif.id)
        .forEach(objek => {

            if (typeof map !== 'undefined' && map && objek.relasi && objek.relasi.markers) {
                objek.relasi.markers.forEach(markerId => {
                    if (processedMarkers.has(markerId)) return;
                    processedMarkers.add(markerId);

                    const dataTitik = markerMap[markerId];
                    if (!dataTitik) {
                        console.warn(`[Data Error] Marker ID '${markerId}' tidak ditemukan di dataMarker.js (Dirujuk oleh ${objek.id})`);
                        return;
                    }

                    const marker = L.marker(dataTitik.koordinat, { 
                        icon: typeof buatIkonSejarah === 'function' ? buatIkonSejarah(objek.kategori) : new L.Icon.Default() 
                    });
                    activeMarkers[markerId] = marker;

                    marker.on("click", function () {
                        map.flyTo(dataTitik.koordinat, 12, { animate: true, duration: 1.5 });
                        const objekTerkait = dataObjekAtlas.find(oa => 
                            oa.era === eraAktif.id && 
                            oa.relasi && oa.relasi.markers && oa.relasi.markers.includes(markerId)
                        );
                        
                        if (objekTerkait) {
                            showDetail(objekTerkait);
                            aktifkanCard(objekTerkait.id);
                        }
                    });

                    switch (objek.kategori) {
                        case 'masjid':    if (typeof layerMasjid !== 'undefined') marker.addTo(layerMasjid); break;
                        case 'kerajaan':  if (typeof layerKerajaan !== 'undefined') marker.addTo(layerKerajaan); break;
                        case 'pelabuhan': if (typeof layerPelabuhan !== 'undefined') marker.addTo(layerPelabuhan); break;
                        default:          if (typeof layerKota !== 'undefined') marker.addTo(layerKota); break;
                    }
                });
            }

            // Render Card HTML
            cardFragments.push(buatCardHTML(objek));
        });

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

    if (typeof renderJalurDanWilayah === 'function') {
        renderJalurDanWilayah(currentYear);
    }
}

// ==========================================
// 4. MANAJEMEN INTERAKSI & TRANSISI UI
// ==========================================

function aktifkanCard(idObjekAtlas) {
    document.querySelectorAll("#location-list > div").forEach(card => {
        card.classList.remove("location-card-active");
    });

    Object.values(activeMarkers).forEach(marker => {
        marker.setZIndexOffset(0);
        if (typeof marker.setOpacity === 'function') {
            marker.setOpacity(0.25);
        }
    });

    Object.values(activePolylines).forEach(polyline => {
        polyline.setStyle({ opacity: 0.15 });
    });

    Object.values(activePolygons).forEach(polygon => {
        polygon.setStyle({ fillOpacity: 0.05, opacity: 0.15 });
    });

    if (typeof dataObjekAtlas === 'undefined') return;
    const objek = dataObjekAtlas.find(oa => oa.id === idObjekAtlas);
    if (!objek) return;

    const cardAktif = document.getElementById(`card-${idObjekAtlas}`);
    if (cardAktif) {
        cardAktif.classList.add("location-card-active");
        cardAktif.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    if (objek.relasi && objek.relasi.markers) {
        objek.relasi.markers.forEach(markerId => {
            const marker = activeMarkers[markerId];
            if (marker) {
                marker.setZIndexOffset(1000);
                if (typeof marker.setOpacity === 'function') {
                    marker.setOpacity(1);
                } else {
                    const el = marker.getElement();
                    if (el) el.style.opacity = "1";
                }
            }
        });
    }

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

    if (!jalurDitemukan) {
        Object.values(activePolylines).forEach(poly => {
            poly.setStyle({ opacity: 0.9 });
        });
    }

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
    if (typeof dataObjekAtlas === 'undefined') return;
    const objek = dataObjekAtlas.find(oa => oa.id === idObjekAtlas);
    if (!objek) return;

    const listPanel = document.getElementById("list-panel");
    if (window.innerWidth <= 768 && listPanel) {
        listPanel.classList.add("mobile-closed");
    }

    const jalankanNavigasi = () => {
        if (typeof map !== 'undefined' && map && objek.relasi) {
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
    };

    if (typeof animateTimelineYear === 'function' && objek.tahun) {
        animateTimelineYear(Number(objek.tahun), jalankanNavigasi);
    } else {
        jalankanNavigasi();
    }
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

    if (detailContent) detailContent.classList.add("fading");

    setTimeout(() => {
        isiDetailPanel(objek);
        if (detailContent) detailContent.classList.remove("fading");
    }, 180);
}

function tutupDetailPanel() {
    const detailPanel = document.getElementById('detail-panel');

    if (detailPanel) {
        detailPanel.classList.add('hidden');
        detailPanel.classList.remove('snap-peek', 'snap-half', 'snap-full');
    }

    document.querySelectorAll("#location-list > div").forEach(card => {
        card.classList.remove("location-card-active");
    });

    Object.values(activeMarkers).forEach(marker => {
        marker.setZIndexOffset(0);
        if (typeof marker.setOpacity === 'function') {
            marker.setOpacity(1);
        }
    });

    Object.values(activePolylines).forEach(polyline => {
        polyline.setStyle({ opacity: 0.9 });
    });

    Object.values(activePolygons).forEach(polygon => {
        polygon.setStyle({ fillOpacity: 0.18, opacity: 1 });
    });

    if (typeof map !== 'undefined' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
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

    if (typeof map !== 'undefined' && map) {
        map.flyTo([1.0, 115.0], 5, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
        });
    }
}

// ==========================================
// 5. SWITCH APP MODE & INITIALIZER
// ==========================================

function switchAppMode(mode) {
    const modalLayer = document.getElementById('modal-layer');
    const welcomePanel = document.getElementById('welcome-panel');
    const listPanel = document.getElementById('list-panel');
    const detailPanel = document.getElementById('detail-panel');
    const timelineContainer = document.getElementById('timeline-container');
    const modeSelect = document.getElementById('mode-select');
    const badgeMode = document.getElementById('badge-mode-aktif');
    const narrativeContainer = document.getElementById('narrative-mode-container');

    if (modeSelect) modeSelect.value = mode;

    if (mode === 'WELCOME') {
        document.body.classList.add('mode-welcome');

        if (modalLayer) modalLayer.classList.remove('hidden');
        if (welcomePanel) welcomePanel.classList.remove('hidden');
        if (listPanel) listPanel.classList.add('hidden');
        if (detailPanel) detailPanel.classList.add('hidden');
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (narrativeContainer) narrativeContainer.classList.add('hidden');

    } else if (mode === 'EXPLORE') {
        document.body.classList.remove('mode-welcome');

        if (modalLayer) modalLayer.classList.add('hidden');
        if (welcomePanel) welcomePanel.classList.add('hidden');
        if (listPanel) listPanel.classList.remove('hidden');
        if (timelineContainer) timelineContainer.classList.remove('hidden');
        if (detailPanel) detailPanel.classList.add('hidden');
        if (narrativeContainer) narrativeContainer.classList.add('hidden');

        if (badgeMode) {
            badgeMode.textContent = 'MODE: EKSPLORASI';
            badgeMode.className = "text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono";
        }

        if (typeof map !== 'undefined' && map) {
            setTimeout(() => map.invalidateSize(), 200);
        }

    } else if (mode === 'CURRICULUM') {
        document.body.classList.remove('mode-welcome');

        if (modalLayer) modalLayer.classList.add('hidden');
        if (welcomePanel) welcomePanel.classList.add('hidden');
        if (listPanel) listPanel.classList.add('hidden');
        if (detailPanel) detailPanel.classList.add('hidden');
        if (timelineContainer) timelineContainer.classList.add('hidden');

        if (narrativeContainer) narrativeContainer.classList.remove('hidden');

        if (typeof initNarrativeMap === 'function') {
            initNarrativeMap();
        }

        if (typeof initNarrativeMode === 'function') {
            initNarrativeMode(typeof dataObjekAtlas !== 'undefined' ? dataObjekAtlas : []);
        }

        if (typeof narrativeMap !== 'undefined' && narrativeMap) {
            setTimeout(() => narrativeMap.invalidateSize(), 200);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    inisialisasiData();

    if (typeof switchAppMode === 'function') {
        switchAppMode('WELCOME');
    }

    const tahunAwal = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;

    muatLokasiAplikasi();
    if (typeof updateEraHeader === 'function') {
        updateEraHeader(tahunAwal);
    }

    // Event Listener Pencarian
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase().trim();
            const locationList = document.getElementById("location-list");

            if (typeof dataObjekAtlas === 'undefined') return;

            const currentYear = (typeof timeline !== 'undefined' && timeline.currentYear) ? timeline.currentYear : 570;
            const eraAktif = typeof getCurrentEra === 'function' ? getCurrentEra(currentYear) : null;

            let dataSumber = [];

            if (keyword !== "") {
                dataSumber = dataObjekAtlas;
            } else {
                dataSumber = eraAktif
                    ? dataObjekAtlas.filter(oa => oa.era === eraAktif.id)
                    : dataObjekAtlas;
            }

            const hasilFragments = [];

            dataSumber.forEach(objek => {
                const cocok =
                    (objek.nama && objek.nama.toLowerCase().includes(keyword)) ||
                    (objek.kategori && objek.kategori.toLowerCase().includes(keyword)) ||
                    (objek.lokasi && objek.lokasi.toLowerCase().includes(keyword)) ||
                    (objek.wilayah && objek.wilayah.toLowerCase().includes(keyword));

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
});

// ==========================================
// 6. RENDER JALUR & WILAYAH
// ==========================================

function renderJalurDanWilayah(tahunAktif) {
    tahunAktif = Math.round(Number(tahunAktif));

    if (typeof layerJalurSitus !== 'undefined') layerJalurSitus.clearLayers();
    if (typeof layerWilayahKekuasaan !== 'undefined') layerWilayahKekuasaan.clearLayers();

    for (const key in activePolylines) delete activePolylines[key];
    for (const key in activePolygons)  delete activePolygons[key];

    // 1. RENDER JALUR
    if (typeof dataJalur !== 'undefined') {
        dataJalur.forEach(jalur => {
            const isAktif = (jalur.tahunMulai === jalur.tahunSelesai)
                ? (tahunAktif >= jalur.tahunMulai && tahunAktif <= jalur.tahunSelesai)
                : (tahunAktif >= jalur.tahunMulai && tahunAktif < jalur.tahunSelesai);

            if (isAktif) {
                const polyline = L.polyline(jalur.koordinat, {
                    color:        jalur.warna,
                    weight:       5,
                    opacity:      0.9,
                    dashArray:    "10 6",
                    smoothFactor: 1,
                    lineJoin:     "round",
                    lineCap:      "round"
                });

                polyline.bindPopup(`
                    <div class="popup-jalur">
                        <h4>${jalur.nama}</h4>
                        <p><strong>Periode:</strong> ${jalur.tahunMulai}${jalur.tahunMulai === jalur.tahunSelesai ? '' : '–' + jalur.tahunSelesai} M</p>
                        <p>${jalur.deskripsi}</p>
                    </div>`);

                if (typeof layerJalurSitus !== 'undefined') polyline.addTo(layerJalurSitus);
                activePolylines[jalur.id] = polyline;

                polyline.on('click', function () {
                    const eraAktif = typeof getCurrentEra === 'function' ? getCurrentEra(tahunAktif) : null;
                    if (!eraAktif || typeof dataObjekAtlas === 'undefined') return;
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktif.id && 
                        oa.relasi && oa.relasi.jalur && oa.relasi.jalur.includes(jalur.id)
                    );
                    if (objekTerkait) {
                        showDetail(objekTerkait);
                        aktifkanCard(objekTerkait.id);
                    }
                });
            }
        });
    }

    // 2. RENDER WILAYAH
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

                if (typeof layerWilayahKekuasaan !== 'undefined') polygon.addTo(layerWilayahKekuasaan);
                activePolygons[wilayah.id] = polygon;

                polygon.on('click', function () {
                    const eraAktif = typeof getCurrentEra === 'function' ? getCurrentEra(tahunAktif) : null;
                    if (!eraAktif || typeof dataObjekAtlas === 'undefined') return;
                    const objekTerkait = dataObjekAtlas.find(oa => 
                        oa.era === eraAktif.id && 
                        oa.relasi && oa.relasi.wilayah && oa.relasi.wilayah.includes(wilayah.id)
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

// ==========================================
// 7. UTILITAS ERA & NAVIGATION CONTROL
// ==========================================

function updateEraHeader(tahunAktif) {
    const container = document.getElementById("era-header");
    if (!container) return;

    const eraAktif = typeof getCurrentEra === 'function' ? getCurrentEra(tahunAktif) : null;

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
            <strong>${eraAktif.name || eraAktif.nama}</strong>
            <span>${eraAktif.start}–${eraAktif.end} M</span>
        </div>`;
}

function getCurrentEra(tahunAktif) {
    if (typeof TIMELINE_ERAS === 'undefined' || !Array.isArray(TIMELINE_ERAS)) return null;
    return TIMELINE_ERAS.find((era, index) => {
        if (index === TIMELINE_ERAS.length - 1) {
            return tahunAktif >= era.start && tahunAktif <= era.end;
        }
        return tahunAktif >= era.start && tahunAktif < era.end;
    });
}

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
    const detailPanel = document.getElementById('detail-panel');
    if (detailPanel) {
        detailPanel.classList.add('hidden');
    }

    const allCards = document.querySelectorAll('#location-list > div, .location-card-item');
    allCards.forEach(card => {
        card.classList.remove('active', 'bg-active', 'border-accent');
    });

    if (typeof map !== 'undefined' && map) {
        map.flyTo(map.getCenter(), 5, {
            animate: true,
            duration: 2.5
        });
    }
}

// ==========================================
// 8. DETAIL PANEL & INTEGRASI KURIKULUM
// ==========================================

function showInitialNarrativePlaceholder() {
    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
            <div class="p-4 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 animate-pulse">
                <span class="material-symbols-outlined text-3xl">touch_app</span>
            </div>
            <h3 class="text-base font-semibold text-slate-200">Pilih Objek Sejarah</h3>
            <p class="text-xs text-slate-400 max-w-xs leading-relaxed">
                Silakan klik salah satu titik peristiwa atau materi pada timeline sebelah kiri untuk menampilkan detail konten dan lokasi peta.
            </p>
        </div>
    `;

    const progressEl = document.getElementById('narrative-progress-text');
    if (progressEl) progressEl.textContent = `Pilih materi pada daftar`;

    const stepEl = document.getElementById('narrative-step-indicator');
    if (stepEl) stepEl.textContent = `- / ${(typeof filteredNarrativeList !== 'undefined') ? filteredNarrativeList.length : 0}`;

    const btnPrev = document.getElementById('btn-narrative-prev');
    if (btnPrev) btnPrev.disabled = true;

    const btnNext = document.getElementById('btn-narrative-next');
    if (btnNext) btnNext.disabled = true;
}

function renderCarousel(objek) {
  const rawImages = objek.galeri || objek.gambar || (objek.foto ? [objek.foto] : []);
  
  if (!rawImages || rawImages.length === 0) {
    return `<div class="p-4 text-center text-xs text-slate-500">Gambar belum tersedia</div>`;
  }

  const imagesHtml = rawImages.map((img, index) => {
    const src = typeof img === 'string' ? img : (img.url || img);
    const caption = typeof img === 'object' && img.caption ? img.caption : (objek.caption || objek.nama || '');
    
    return `
      <div class="carousel-slide ${index === 0 ? 'active' : ''}">
        <img src="${src}" alt="${caption}" onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';">
        <div class="carousel-caption">
          <p><strong>${caption}</strong></p>
        </div>
      </div>
    `;
  }).join('');

  return `<div class="carousel-container">${imagesHtml}</div>`;
}

function bukaSubMateriDariNarasi(storyId, stepIndex, objek) {
    if (typeof dataKurikulum === 'undefined') return;

    let cerita = dataKurikulum.find(c => c.id === storyId);
    let stepData;

    if (!cerita) {
        // Buat cerita placeholder dinamis jika tidak ada di kurikulum
        const namaObjek = objek ? (objek.nama || 'Objek Sejarah') : 'Detail Peristiwa';
        const deskripsiObjek = objek ? (objek.deskripsi || objek.kronologi || 'Kronologi lengkap peristiwa sedang dalam proses penyusunan.') : 'Kronologi lengkap peristiwa sedang dalam proses penyusunan.';
        
        cerita = {
            id: storyId,
            judulCerita: `Modul Pembelajaran: ${namaObjek}`,
            steps: [
                {
                    judul: `Uraian Mendalam: ${namaObjek}`,
                    konten: `
                        <p class="text-secondary leading-relaxed mb-3"><strong>Pendahuluan:</strong></p>
                        <p class="text-secondary leading-relaxed mb-3">Halaman ini berisi modul kurikulum mendalam untuk mempelajari peristiwa <strong>${namaObjek}</strong>. Materi ini disesuaikan dengan kurikulum Sejarah Kebudayaan Islam (SKI) Kelas 12.</p>
                        <hr class="my-3 border-border-light">
                        <p class="text-secondary leading-relaxed mb-3"><strong>Kronologi Peristiwa:</strong></p>
                        <p class="text-secondary leading-relaxed mb-3">${deskripsiObjek}</p>
                        <hr class="my-3 border-border-light">
                        <div class="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 text-center">
                            📖 Modul pembelajaran SKI Kelas 12. Peta interaktif & materi kronologis.
                        </div>
                    `
                }
            ]
        };
        stepData = cerita.steps[0];
    } else {
        stepData = cerita.steps[stepIndex];
    }

    if (!stepData) {
        alert("Sub-materi belum tersedia untuk titik ini.");
        return;
    }

    const tagEl = document.getElementById('submateri-tag-cerita');
    if (tagEl) tagEl.textContent = cerita.judulCerita || 'MODUL KURIKULUM';

    const judulEl = document.getElementById('submateri-judul');
    if (judulEl) judulEl.textContent = stepData.judul || '';

    const kontenEl = document.getElementById('submateri-konten');
    if (kontenEl) kontenEl.innerHTML = stepData.konten || '';

    document.getElementById('panel-ringkasan-view')?.classList.add('hidden');
    document.getElementById('panel-submateri-view')?.classList.remove('hidden');

    document.getElementById('detail-content')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function tutupSubMateriView() {
    document.getElementById('panel-submateri-view')?.classList.add('hidden');
    document.getElementById('panel-ringkasan-view')?.classList.remove('hidden');
}

function isiDetailPanel(objek) {
    if (!objek) return;
    currentActiveObjekId = objek.id;

    if (typeof tutupSubMateriView === 'function') {
        tutupSubMateriView();
    }

    const fields = {
        "detail-nama": objek.nama || '',
        "detail-tahun": objek.periode || '',
        "detail-waktu": objek.tahun ? `${objek.tahun} M` : '-',
        "detail-lokasi": objek.lokasi || '-',
        "detail-kategori": objek.kategori ? (objek.kategori.charAt(0).toUpperCase() + objek.kategori.slice(1)) : '-',
        "detail-wilayah": objek.wilayah || '-',
        "detail-deskripsi": objek.deskripsi || objek.kronologi || '',
    };

    Object.entries(fields).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });

    const fotoWrapper = document.getElementById("detail-foto-wrapper");
    const foto = document.getElementById("detail-foto");

    let imgUrl = null;
    if (objek.foto && objek.foto.length > 0) {
        imgUrl = typeof objek.foto === 'string' ? objek.foto : objek.foto[0];
    } else if (objek.gambar && objek.gambar.length > 0) {
        imgUrl = typeof objek.gambar[0] === 'string' ? objek.gambar[0] : (objek.gambar[0].url || objek.gambar[0]);
    } else if (objek.galeri && objek.galeri.length > 0) {
        imgUrl = typeof objek.galeri[0] === 'string' ? objek.galeri[0] : (objek.galeri[0].url || objek.galeri[0]);
    }

    if (imgUrl && fotoWrapper && foto) {
        foto.src = imgUrl;
        foto.alt = objek.nama || 'Foto Sejarah';
        foto.onerror = function () {
            this.src = "assets/images/placeholder.jpg";
        };
        fotoWrapper.classList.remove("hidden");
    } else if (fotoWrapper) {
        fotoWrapper.classList.add("hidden");
    }

    const wrapperBtn = document.getElementById('wrapper-btn-submateri');
    const btnSubMateri = document.getElementById('btn-buka-submateri');

    if (wrapperBtn && btnSubMateri) {
        wrapperBtn.classList.remove('hidden');
        btnSubMateri.onclick = () => bukaSubMateriDariNarasi(objek.refStoryId || `fallback-${objek.id}`, objek.refStepIndex || 0, objek);
    } else if (wrapperBtn) {
        wrapperBtn.classList.add('hidden');
    }
}