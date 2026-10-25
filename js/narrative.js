/**
 * MODUL KURIKULUM SEJARAH KEBUDAYAAN ISLAM (SKI)
 * Menghubungkan kurikulum terstruktur (Kelas -> Bab -> Sub-Materi)
 * dengan visualisasi spasial peta Leaflet, metadata kontekstual, dan carousel media.
 */

// ==========================================
// 1. STATE & VARIABEL GLOBAL
// ==========================================
if (typeof window.narrativeMap === 'undefined') {
    window.narrativeMap = null;
}

let currentCurriculumClass = "12";
let currentChapterId = null;
let currentSubMateriIndex = 0;
let narrativeMapMarkers = [];
let currentCarouselIndex = 0;
let currentSubMateriImages = [];

// ==========================================
// 2. TOGGLE HIDE/SHOW PANEL MATERI KANAN
// ==========================================
function toggleNarrativePanel() {
    const floatingPanel = document.getElementById('narrative-floating-panel');
    const reopenBtn = document.getElementById('btn-reopen-panel');

    if (!floatingPanel) return;

    if (floatingPanel.classList.contains('hidden')) {
        // Tampilkan panel materi kanan
        floatingPanel.classList.remove('hidden');
        if (reopenBtn) reopenBtn.classList.add('hidden');

        if (window.narrativeMap) {
            setTimeout(() => window.narrativeMap.invalidateSize(), 300);
        }
    } else {
        // Sembunyikan panel materi (Peta Fullscreen 100%)
        floatingPanel.classList.add('hidden');
        if (reopenBtn) reopenBtn.classList.remove('hidden');

        if (window.narrativeMap) {
            setTimeout(() => window.narrativeMap.invalidateSize(), 300);
        }
    }
}

// ==========================================
// 3. EVENT HANDLER FILTER KELAS & BAB
// ==========================================
function onCurriculumClassChange(kelasVal) {
    currentCurriculumClass = String(kelasVal);
    populateChapterDropdown(currentCurriculumClass);
}

function onCurriculumChapterChange(chapterId) {
    currentChapterId = chapterId;
    currentSubMateriIndex = 0;
    renderSubMateriChips();
    loadActiveSubMateri();
}

function selectSubMateri(index) {
    currentSubMateriIndex = index;
    renderSubMateriChips();
    loadActiveSubMateri();
}

function navigateCurriculum(direction) {
    const chapter = getCurrentChapter();
    if (!chapter || !chapter.subMateri || chapter.subMateri.length === 0) return;

    const newIndex = currentSubMateriIndex + direction;
    if (newIndex >= 0 && newIndex < chapter.subMateri.length) {
        selectSubMateri(newIndex);
    }
}

// Helper: Mengambil data bab yang sedang aktif
function getCurrentChapter() {
    if (typeof dataKurikulum === 'undefined' || !Array.isArray(dataKurikulum)) return null;
    return dataKurikulum.find(c => c.id === currentChapterId) ||
           dataKurikulum.find(c => String(c.kelas) === String(currentCurriculumClass)) ||
           dataKurikulum[0] || null;
}

// ==========================================
// 4. POPULATE DROPDOWNS & CHIPS
// ==========================================
function populateChapterDropdown(kelasVal) {
    const chapterSelect = document.getElementById('curriculum-chapter-select');
    if (!chapterSelect || typeof dataKurikulum === 'undefined') return;

    const filteredChapters = dataKurikulum.filter(c => String(c.kelas) === String(kelasVal));

    if (filteredChapters.length === 0) {
        chapterSelect.innerHTML = `<option value="">Tidak ada bab tersedia</option>`;
        currentChapterId = null;
        renderSubMateriChips();
        return;
    }

    chapterSelect.innerHTML = filteredChapters.map(c => `
        <option value="${c.id}">${c.judulBab}</option>
    `).join('');

    currentChapterId = filteredChapters[0].id;
    currentSubMateriIndex = 0;

    renderSubMateriChips();
    loadActiveSubMateri();
}

function renderSubMateriChips() {
    const container = document.getElementById('curriculum-submateri-chips');
    if (!container) return;

    const chapter = getCurrentChapter();
    if (!chapter || !chapter.subMateri || chapter.subMateri.length === 0) {
        container.innerHTML = `<span class="text-[11px] text-muted">Belum ada sub-materi</span>`;
        return;
    }

    container.innerHTML = chapter.subMateri.map((sub, idx) => {
        const isAktif = (idx === currentSubMateriIndex);
        return `
            <button type="button" onclick="selectSubMateri(${idx})"
                class="px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 shrink-0 border transition-all cursor-pointer ${
                    isAktif
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm font-semibold'
                        : 'bg-badge text-muted border-border-light hover:bg-active hover:text-title'
                }">
                <span class="w-1.5 h-1.5 rounded-full ${isAktif ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}"></span>
                <span class="truncate max-w-[160px] md:max-w-[200px]">${sub.nomor || (idx + 1)}. ${sub.judul}</span>
            </button>
        `;
    }).join('');

    // Pastikan chip yang aktif terlihat (scroll into view halus)
    const activeChip = container.children[currentSubMateriIndex];
    if (activeChip && typeof activeChip.scrollIntoView === 'function') {
        activeChip.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
}

// ==========================================
// 5. RENDER KONTEN SUB-MATERI AKTIF & INTEGRASI PETA
// ==========================================
function loadActiveSubMateri() {
    const chapter = getCurrentChapter();
    if (!chapter || !chapter.subMateri || chapter.subMateri.length === 0) return;

    if (currentSubMateriIndex < 0) currentSubMateriIndex = 0;
    if (currentSubMateriIndex >= chapter.subMateri.length) currentSubMateriIndex = chapter.subMateri.length - 1;

    const sub = chapter.subMateri[currentSubMateriIndex];
    const totalSub = chapter.subMateri.length;

    // Pastikan panel materi terbuka
    const floatingPanel = document.getElementById('narrative-floating-panel');
    if (floatingPanel) floatingPanel.classList.remove('hidden');

    const reopenBtn = document.getElementById('btn-reopen-panel');
    if (reopenBtn) reopenBtn.classList.add('hidden');

    // 1. Update Progress & Stepper Controls
    const progressEl = document.getElementById('narrative-progress-text');
    if (progressEl) progressEl.textContent = `Materi ${currentSubMateriIndex + 1} dari ${totalSub}`;

    const stepEl = document.getElementById('narrative-step-indicator');
    if (stepEl) stepEl.textContent = `${currentSubMateriIndex + 1} / ${totalSub}`;

    const btnPrev = document.getElementById('btn-narrative-prev');
    if (btnPrev) btnPrev.disabled = (currentSubMateriIndex === 0);

    const btnNext = document.getElementById('btn-narrative-next');
    if (btnNext) btnNext.disabled = (currentSubMateriIndex === totalSub - 1);

    // 2. Setup Galeri Gambar
    currentSubMateriImages = Array.isArray(sub.galeri) ? sub.galeri : (sub.gambar ? (Array.isArray(sub.gambar) ? sub.gambar : [sub.gambar]) : []);
    currentCarouselIndex = 0;

    const validImages = currentSubMateriImages.map(img => {
        if (!img) return null;
        if (typeof img === 'string') return { url: img, caption: sub.judul };
        if (typeof img === 'object' && img.url) return { url: img.url, caption: img.caption || sub.judul };
        return null;
    }).filter(Boolean);

    // 3. Render Body Konten Panel Kanan
    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    const meta = sub.metadata || {};
    const wilayahVal = meta.wilayah || '-';
    const periodeVal = meta.periode || '-';
    const fokusVal = meta.fokus || '-';
    const tokohVal = meta.tokoh || '-';

    container.innerHTML = `
        <!-- JUDUL & KODE SUB-MATERI -->
        <div class="space-y-1">
            <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider"
                      style="background-color: var(--bg-badge); color: var(--accent-orange); border: 1px solid var(--border-light);">
                    <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--accent-orange);"></span>
                    Sub-Materi ${sub.nomor || (currentSubMateriIndex + 1)}
                </span>
                <span class="text-[11px] text-muted truncate">${chapter.judulBab}</span>
            </div>
            <h3 class="text-xl md:text-2xl font-bold tracking-tight pt-1 leading-snug" style="color: var(--text-title);">
                ${sub.judul}
            </h3>
        </div>

        <!-- 2. METADATA 2 KOLOM (KIRI) & GAMBAR FULL COVER (KANAN) -->
        <div class="flex flex-col md:flex-row items-stretch gap-4 my-2">
            
            <!-- Metadata Box 2 Kolom -->
            <div class="flex-1 grid grid-cols-2 gap-y-2.5 gap-x-3.5 p-3.5 rounded-xl text-[11px] md:text-xs justify-center items-center shadow-sm"
                 style="background-color: var(--bg-badge); border: 1px solid var(--border-panel); color: var(--text-primary);">
                
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">calendar_today</span>
                    <div class="min-w-0">
                        <span class="block text-[9px] uppercase font-bold" style="color: var(--text-muted);">Periode</span>
                        <span class="font-medium truncate block" style="color: var(--text-primary);" title="${periodeVal}">${periodeVal}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">explore</span>
                    <div class="min-w-0">
                        <span class="block text-[9px] uppercase font-bold" style="color: var(--text-muted);">Fokus Kajian</span>
                        <span class="font-medium truncate block" style="color: var(--text-primary);" title="${fokusVal}">${fokusVal}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">location_on</span>
                    <div class="min-w-0">
                        <span class="block text-[9px] uppercase font-bold" style="color: var(--text-muted);">Wilayah / Situs</span>
                        <span class="font-medium truncate block" style="color: var(--text-primary);" title="${wilayahVal}">${wilayahVal}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">groups</span>
                    <div class="min-w-0">
                        <span class="block text-[9px] uppercase font-bold" style="color: var(--text-muted);">Tokoh Terkait</span>
                        <span class="font-medium truncate block" style="color: var(--text-primary);" title="${tokohVal}">${tokohVal}</span>
                    </div>
                </div>
            </div>

            <!-- Carousel Gambar Materi Aktif di Kanan -->
            <div class="w-full md:w-[260px] lg:w-[290px] shrink-0 h-[175px] rounded-xl overflow-hidden relative group flex flex-col justify-between shadow-sm"
                 style="border: 1px solid var(--border-panel); background-color: var(--bg-badge);">
                ${validImages.length > 0 ? `
                    <div class="relative w-full flex-1 overflow-hidden min-h-0">
                        ${validImages.map((imgObj, idx) => `
                            <img src="${imgObj.url}" 
                                 alt="${sub.judul} - ${idx + 1}" 
                                 data-caption="${imgObj.caption || `${sub.judul} (${idx + 1}/${validImages.length})`}"
                                 onerror="this.onerror=null; this.src='assets/images/placeholder.jpg';"
                                 class="narrative-carousel-slide w-full h-full object-cover transition-all duration-300 ${idx !== 0 ? 'hidden' : ''}">
                        `).join('')}

                        <!-- Navigasi Panah Carousel -->
                        ${validImages.length > 1 ? `
                            <button type="button" onclick="changeNarrativeImage(-1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-md z-10 cursor-pointer" style="background-color: var(--bg-panel-solid); color: var(--text-title); border: 1px solid var(--border-light);">
                                <span class="material-symbols-outlined text-xs">chevron_left</span>
                            </button>
                            <button type="button" onclick="changeNarrativeImage(1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-md z-10 cursor-pointer" style="background-color: var(--bg-panel-solid); color: var(--text-title); border: 1px solid var(--border-light);">
                                <span class="material-symbols-outlined text-xs">chevron_right</span>
                            </button>

                            <!-- Dots Indikator -->
                            <div class="absolute top-2 inset-x-0 flex justify-center gap-1 z-10">
                                ${validImages.map((_, idx) => `
                                    <button type="button" onclick="setNarrativeImage(${idx})" class="narrative-carousel-dot h-1.5 rounded-full transition-all duration-300 ${idx === 0 ? 'w-4' : 'w-1.5'}" style="background-color: ${idx === 0 ? 'var(--accent-primary)' : 'var(--border-light)'};"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Caption Gambar -->
                    <div id="narrative-carousel-caption" class="h-[30px] p-1 text-[10px] italic text-center border-t truncate shrink-0 flex items-center justify-center" style="background-color: var(--bg-panel-solid); color: var(--text-muted); border-color: var(--border-light);">
                        📷 ${validImages[0]?.caption || `${sub.judul} (1/${validImages.length})`}
                    </div>
                ` : `
                    <div class="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs" style="color: var(--text-muted);">
                        <span class="material-symbols-outlined text-2xl mb-1">image_not_supported</span>
                        <span>Gambar media belum tersedia</span>
                    </div>
                `}
            </div>
        </div>

        <hr class="my-1" style="border-color: var(--border-light);">

        <!-- 3. URAIAN LENGKAP KONTEN PEMBELAJARAN SKI -->
        <div class="space-y-2 pt-1 text-xs md:text-sm leading-relaxed text-secondary text-justify">
            ${sub.konten || '<p>Materi sedang dalam proses penyusunan modul.</p>'}
        </div>
    `;

    // 4. Sinkronisasi Spasial Peta (Leaflet)
    sinkronisasiPetaKurikulum(sub);
}

// ==========================================
// 6. SINKRONISASI PETA DENGAN RELASI MATERI
// ==========================================
function sinkronisasiPetaKurikulum(sub) {
    if (!window.narrativeMap) return;

    // Bersihkan marker, jalur, dan wilayah lama dari peta narasi
    if (Array.isArray(narrativeMapMarkers)) {
        narrativeMapMarkers.forEach(layer => {
            if (layer && typeof window.narrativeMap.removeLayer === 'function') {
                window.narrativeMap.removeLayer(layer);
            }
        });
    }
    narrativeMapMarkers = [];

    const relasi = sub.relasiPeta || {};
    let markerUtama = null;
    const navBounds = L.latLngBounds();
    let hasPoint = false;

    // 1. Render Poligon Wilayah
    if (relasi.wilayah && typeof wilayahMap !== 'undefined') {
        relasi.wilayah.forEach(wId => {
            const wData = wilayahMap[wId];
            if (wData && wData.koordinat) {
                const polygon = L.polygon(wData.koordinat, {
                    color: wData.warna || '#d36b1e',
                    fillColor: wData.warna || '#d36b1e',
                    fillOpacity: 0.22,
                    weight: 2
                });
                polygon.bindPopup(`
                    <div class="p-1">
                        <strong class="text-xs" style="color:var(--text-title);">${wData.nama}</strong>
                        <p class="text-[10px] text-muted">${wData.deskripsi || ''}</p>
                    </div>
                `);
                polygon.addTo(window.narrativeMap);
                narrativeMapMarkers.push(polygon);

                wData.koordinat.forEach(coord => navBounds.extend(coord));
                hasPoint = true;
            }
        });
    }

    // 2. Render Polyline Jalur Pelayaran / Dakwah
    if (relasi.jalur && typeof jalurMap !== 'undefined') {
        relasi.jalur.forEach(jId => {
            const jData = jalurMap[jId];
            if (jData && jData.koordinat) {
                const polyline = L.polyline(jData.koordinat, {
                    color: jData.warna || '#D36B1E',
                    weight: 4,
                    opacity: 0.9,
                    dashArray: "10 6",
                    smoothFactor: 1,
                    lineJoin: "round",
                    lineCap: "round"
                });
                polyline.bindPopup(`
                    <div class="p-1">
                        <strong class="text-xs" style="color:var(--text-title);">${jData.nama}</strong>
                        <p class="text-[10px] text-muted">${jData.deskripsi || ''}</p>
                    </div>
                `);
                polyline.addTo(window.narrativeMap);
                narrativeMapMarkers.push(polyline);

                jData.koordinat.forEach(coord => navBounds.extend(coord));
                hasPoint = true;
            }
        });
    }

    // 3. Render Marker Titik
    if (relasi.markers && typeof markerMap !== 'undefined') {
        relasi.markers.forEach((mId, idx) => {
            const mData = markerMap[mId];
            if (mData && mData.koordinat) {
                const markerIcon = typeof buatIkonSejarah === 'function'
                    ? buatIkonSejarah(mData.kategori || 'kota')
                    : new L.Icon.Default();

                const marker = L.marker(mData.koordinat, { icon: markerIcon });
                marker.bindPopup(`
                    <div class="p-1 min-w-[140px]">
                        <span class="text-[9px] uppercase font-bold block" style="color:var(--accent-orange);">${sub.nomor || ''} ${sub.judul}</span>
                        <strong class="text-xs block" style="color:var(--text-title);">${mData.nama}</strong>
                    </div>
                `, { autoPan: false });

                marker.addTo(window.narrativeMap);
                narrativeMapMarkers.push(marker);

                navBounds.extend(mData.koordinat);
                hasPoint = true;

                if (idx === 0) markerUtama = marker;
            }
        });
    }

    // 4. Navigasi Kamera Halus (FlyTo dengan Kompensasi 25% Sisi Kiri Layar)
    if (hasPoint) {
        window.narrativeMap.invalidateSize();

        const sw = navBounds.getSouthWest();
        const ne = navBounds.getNorthEast();
        const isSinglePoint = (sw.lat === ne.lat && sw.lng === ne.lng);

        let centerCoord = isSinglePoint ? sw : navBounds.getCenter();
        let targetZoom = isSinglePoint ? 8 : 7;

        if (!isSinglePoint) {
            const calculatedZoom = window.narrativeMap.getBoundsZoom(navBounds, false, [60, 60]);
            targetZoom = Math.min(Math.max(calculatedZoom, 5), 11);
        }

        const isDesktop = window.innerWidth > 768;
        const floatingPanel = document.getElementById('narrative-floating-panel');
        const isPanelOpen = !floatingPanel || !floatingPanel.classList.contains('hidden');

        const mapWidth = window.narrativeMap.getSize().x || window.innerWidth;
        const shiftX = (isDesktop && isPanelOpen) ? (mapWidth * 0.25) : 0;

        const targetPoint = window.narrativeMap.project(centerCoord, targetZoom);
        const offsetPoint = L.point(targetPoint.x + shiftX, targetPoint.y);
        const offsetLatLng = window.narrativeMap.unproject(offsetPoint, targetZoom);

        if (window.narrativeMap._narrativePopupHandler) {
            window.narrativeMap.off('moveend', window.narrativeMap._narrativePopupHandler);
            window.narrativeMap._narrativePopupHandler = null;
        }

        if (markerUtama) {
            window.narrativeMap._narrativePopupHandler = function () {
                markerUtama.openPopup();
                window.narrativeMap._narrativePopupHandler = null;
            };
            window.narrativeMap.once('moveend', window.narrativeMap._narrativePopupHandler);
        }

        window.narrativeMap.flyTo(offsetLatLng, targetZoom, {
            animate: true,
            duration: 1.4,
            easeLinearity: 0.25
        });
    }
}

// ==========================================
// 7. CAROUSEL GAMBAR KONTEN
// ==========================================
function changeNarrativeImage(direction) {
    const images = document.querySelectorAll('.narrative-carousel-slide');
    const dots = document.querySelectorAll('.narrative-carousel-dot');
    const captionEl = document.getElementById('narrative-carousel-caption');

    if (!images || images.length <= 1) return;

    images[currentCarouselIndex].classList.add('hidden');
    if (dots[currentCarouselIndex]) {
        dots[currentCarouselIndex].style.backgroundColor = 'var(--border-light)';
        dots[currentCarouselIndex].classList.remove('w-4');
        dots[currentCarouselIndex].classList.add('w-1.5');
    }

    currentCarouselIndex = (currentCarouselIndex + direction + images.length) % images.length;

    images[currentCarouselIndex].classList.remove('hidden');
    if (dots[currentCarouselIndex]) {
        dots[currentCarouselIndex].style.backgroundColor = 'var(--accent-primary)';
        dots[currentCarouselIndex].classList.remove('w-1.5');
        dots[currentCarouselIndex].classList.add('w-4');
    }

    if (captionEl) {
        const activeImg = images[currentCarouselIndex];
        captionEl.textContent = `📷 ${activeImg.getAttribute('data-caption') || 'Dokumentasi Sejarah'}`;
    }
}

function setNarrativeImage(targetIndex) {
    const images = document.querySelectorAll('.narrative-carousel-slide');
    if (!images || targetIndex < 0 || targetIndex >= images.length) return;

    const diff = targetIndex - currentCarouselIndex;
    if (diff !== 0) {
        changeNarrativeImage(diff);
    }
}

// ==========================================
// 8. INISIALISASI MODE KURIKULUM
// ==========================================
function initNarrativeMode() {
    if (!window.narrativeMap && typeof L !== 'undefined' && typeof initNarrativeMap === 'function') {
        initNarrativeMap();
    }

    // Set nilai default dropdown kelas
    const classSelect = document.getElementById('curriculum-class-select');
    if (classSelect) {
        classSelect.value = currentCurriculumClass || "12";
    }

    // Populate bab dan load sub-materi
    populateChapterDropdown(currentCurriculumClass || "12");
}

// Ekspor ke window global untuk event inline HTML
window.onCurriculumClassChange = onCurriculumClassChange;
window.onCurriculumChapterChange = onCurriculumChapterChange;
window.selectSubMateri = selectSubMateri;
window.navigateCurriculum = navigateCurriculum;
window.toggleNarrativePanel = toggleNarrativePanel;
window.changeNarrativeImage = changeNarrativeImage;
window.setNarrativeImage = setNarrativeImage;
window.initNarrativeMode = initNarrativeMode;