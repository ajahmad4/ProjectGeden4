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

let currentCurriculumClass = "";
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
    currentCurriculumClass = (kelasVal !== undefined && kelasVal !== null) ? String(kelasVal).trim() : "";
    
    // Sinkronkan nilai select dropdown kelas di header panel
    const classSelect = document.getElementById('curriculum-class-select');
    if (classSelect && classSelect.value !== currentCurriculumClass) {
        classSelect.value = currentCurriculumClass;
    }

    if (!currentCurriculumClass) {
        renderCurriculumWelcomeState();
        return;
    }
    populateChapterDropdown(currentCurriculumClass);
}

function onCurriculumChapterChange(chapterId) {
    if (!chapterId) return;
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
    if (!currentCurriculumClass) return null;
    return dataKurikulum.find(c => c.id === currentChapterId) ||
           dataKurikulum.find(c => String(c.kelas) === String(currentCurriculumClass)) ||
           null;
}

// ==========================================
// 4. POPULATE DROPDOWNS & CHIPS
// ==========================================
function populateChapterDropdown(kelasVal) {
    const chapterSelect = document.getElementById('curriculum-chapter-select');
    if (!chapterSelect || typeof dataKurikulum === 'undefined') return;

    if (!kelasVal) {
        chapterSelect.innerHTML = `<option value="">-- Pilih Bab Pembelajaran --</option>`;
        chapterSelect.disabled = true;
        currentChapterId = null;
        renderCurriculumWelcomeState();
        return;
    }

    const filteredChapters = dataKurikulum.filter(c => String(c.kelas) === String(kelasVal));

    if (filteredChapters.length === 0) {
        chapterSelect.innerHTML = `<option value="">Modul belum tersedia untuk kelas ini</option>`;
        chapterSelect.disabled = true;
        currentChapterId = null;
        renderSubMateriChips();
        renderEmptyCurriculumPlaceholder(kelasVal);
        return;
    }

    chapterSelect.disabled = false;
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

        <!-- 4. QUICK LINKS: ENTITAS SPASIAL TERKAIT DI PETA -->
        ${renderCurriculumQuickLinks(sub)}
    `;

    // 4. Sinkronisasi Spasial Peta (Leaflet)
    sinkronisasiPetaKurikulum(sub);
}

// ==========================================
// 6. SINKRONISASI PETA DENGAN RELASI MATERI
// ==========================================
function sinkronisasiPetaKurikulum(sub) {
    if (!window.narrativeMap) return;

    // Tutup popup aktif dari materi sebelumnya
    if (typeof window.narrativeMap.closePopup === 'function') {
        window.narrativeMap.closePopup();
    }

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
            const wData = wilayahMap[wId] || (typeof wId === 'string' ? wilayahMap[wId.toLowerCase()] : null);
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
                polygon._curriculumEntity = { type: 'wilayah', id: wId, name: wData.nama };
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
            const jData = jalurMap[jId] || (typeof jId === 'string' ? jalurMap[jId.toLowerCase()] : null);
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
                polyline._curriculumEntity = { type: 'jalur', id: jId, name: jData.nama };
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
            const mData = markerMap[mId] || (typeof mId === 'string' ? markerMap[mId.toLowerCase()] : null);
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

                marker._curriculumEntity = { type: 'marker', id: mId, name: mData.nama };
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
// 8. INISIALISASI MODE KURIKULUM & WELCOME STATE
// ==========================================
function initNarrativeMode() {
    if (!window.narrativeMap && typeof L !== 'undefined' && typeof initNarrativeMap === 'function') {
        initNarrativeMap();
    }

    // Set nilai default dropdown kelas (jika belum dipilih, tetap kosong)
    const classSelect = document.getElementById('curriculum-class-select');
    if (classSelect) {
        classSelect.value = currentCurriculumClass || "";
    }

    if (!currentCurriculumClass) {
        renderCurriculumWelcomeState();
    } else {
        populateChapterDropdown(currentCurriculumClass);
    }
}

function renderCurriculumWelcomeState() {
    // 1. Bersihkan marker atau layer sebelumnya dari peta kurikulum
    if (window.narrativeMap && Array.isArray(narrativeMapMarkers)) {
        narrativeMapMarkers.forEach(layer => {
            if (layer && typeof layer.remove === 'function') layer.remove();
        });
        narrativeMapMarkers = [];
        // Reset pandangan kamera peta ke ikhtisar luas dunia Islam
        try {
            window.narrativeMap.setView([23.0, 48.0], 4);
        } catch (e) {
            console.warn("Reset peta kurikulum:", e);
        }
    }

    // 2. Reset kontrol dropdown & chips
    const classSelect = document.getElementById('curriculum-class-select');
    if (classSelect) classSelect.value = "";

    const chapterSelect = document.getElementById('curriculum-chapter-select');
    if (chapterSelect) {
        chapterSelect.innerHTML = `<option value="">-- Pilih Bab Pembelajaran --</option>`;
        chapterSelect.disabled = true;
    }

    const chipsContainer = document.getElementById('curriculum-submateri-chips');
    if (chipsContainer) {
        chipsContainer.innerHTML = `
            <div class="flex items-center gap-1.5 text-[11px] text-muted italic">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>Silakan tentukan jenjang madrasah & kelas untuk memulai</span>
            </div>
        `;
    }

    // 3. Reset teks progress & tombol navigasi stepper
    const progressEl = document.getElementById('narrative-progress-text');
    if (progressEl) progressEl.textContent = 'Pilih Kelas & Materi';

    const stepEl = document.getElementById('narrative-step-indicator');
    if (stepEl) stepEl.textContent = '- / -';

    const btnPrev = document.getElementById('btn-narrative-prev');
    if (btnPrev) btnPrev.disabled = true;

    const btnNext = document.getElementById('btn-narrative-next');
    if (btnNext) btnNext.disabled = true;

    // 4. Render tampilan awal / kosong / pemilihan di body konten kanan
    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    container.innerHTML = `
        <div class="space-y-4 py-2">
            <!-- Header Hero Selamat Datang -->
            <div class="p-4 md:p-5 rounded-2xl border text-center space-y-2 relative overflow-hidden"
                 style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(245, 158, 11, 0.06) 100%); border-color: var(--border-light);">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider"
                     style="background-color: var(--bg-badge); color: var(--accent-primary); border: 1px solid var(--border-light);">
                    <span class="material-symbols-outlined text-xs">school</span>
                    <span>Modul Kurikulum SKI Terpadu (MTs & MA)</span>
                </div>
                <h3 class="text-lg md:text-xl font-bold tracking-tight" style="color: var(--text-title);">
                    Eksplorasi Sejarah Kebudayaan Islam
                </h3>
                <p class="text-xs max-w-xl mx-auto leading-relaxed text-secondary">
                    Selamat datang di media pembelajaran SKI interaktif berbasis atlas spasial. Silakan pilih jenjang madrasah dan kelas Anda di bawah ini untuk memulai kajian materi bab, jejak peninggalan, dan visualisasi rute sejarah Islam.
                </p>
            </div>

            <!-- Pilihan Cepat Jenjang: MTs & MA -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                
                <!-- Jenjang MTs (Kelas 7, 8, 9) -->
                <div class="p-4 rounded-2xl border space-y-2.5" style="background-color: var(--bg-badge); border-color: var(--border-panel);">
                    <div class="flex items-center gap-2 pb-1.5 border-b" style="border-color: var(--border-light);">
                        <span class="material-symbols-outlined text-lg text-emerald-400">menu_book</span>
                        <div>
                            <h4 class="font-bold text-title text-xs md:text-sm">Madrasah Tsanawiyah (MTs)</h4>
                            <p class="text-[10px] text-muted">Kelas 7, 8, dan 9</p>
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <button type="button" onclick="onCurriculumClassChange('7')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-emerald-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-emerald-400 transition-colors" style="color: var(--text-title);">
                                    📖 Kelas 7 MTs
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Dakwah Rasulullah SAW di Mekkah-Madinah & Pembentukan Peradaban Islam.
                            </p>
                        </button>

                        <button type="button" onclick="onCurriculumClassChange('8')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-emerald-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-emerald-400 transition-colors" style="color: var(--text-title);">
                                    🏛️ Kelas 8 MTs
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Daulah Umayyah Damaskus-Andalusia & Masa Keemasan Sains Abbasiyah di Baghdad.
                            </p>
                        </button>

                        <button type="button" onclick="onCurriculumClassChange('9')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-emerald-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-emerald-400 transition-colors" style="color: var(--text-title);">
                                    ⛵ Kelas 9 MTs
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Masuknya Islam di Nusantara lewat Bandar Barus, Samudera Pasai & Walisongo.
                            </p>
                        </button>
                    </div>
                </div>

                <!-- Jenjang MA (Kelas 10, 11, 12) -->
                <div class="p-4 rounded-2xl border space-y-2.5" style="background-color: var(--bg-badge); border-color: var(--border-panel);">
                    <div class="flex items-center gap-2 pb-1.5 border-b" style="border-color: var(--border-light);">
                        <span class="material-symbols-outlined text-lg text-amber-400">account_balance</span>
                        <div>
                            <h4 class="font-bold text-title text-xs md:text-sm">Madrasah Aliyah (MA)</h4>
                            <p class="text-[10px] text-muted">Kelas 10, 11, dan 12</p>
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <button type="button" onclick="onCurriculumClassChange('10')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-amber-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-amber-400 transition-colors" style="color: var(--text-title);">
                                    📜 Kelas 10 MA
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Sirah Nabawiyah Periode Mekkah-Madinah & Konstitusi Piagam Madinah.
                            </p>
                        </button>

                        <button type="button" onclick="onCurriculumClassChange('11')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-amber-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-amber-400 transition-colors" style="color: var(--text-title);">
                                    🔭 Kelas 11 MA
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Episentrum Sains Baitul Hikmah Baghdad & Peradaban Kordoba Andalusia.
                            </p>
                        </button>

                        <button type="button" onclick="onCurriculumClassChange('12')"
                            class="w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] hover:border-amber-500/50"
                            style="background-color: var(--bg-input); border-color: var(--border-input);">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-xs group-hover:text-amber-400 transition-colors" style="color: var(--text-title);">
                                    👑 Kelas 12 MA
                                </span>
                                <span class="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">arrow_forward</span>
                            </div>
                            <p class="text-[10.5px] text-muted mt-0.5 leading-snug">
                                Teori Masuknya Islam di Nusantara & Kesultanan Samudera Pasai hingga Demak.
                            </p>
                        </button>
                    </div>
                </div>

            </div>

            <!-- Petunjuk Interaksi -->
            <div class="p-3.5 rounded-xl border flex items-center gap-3 text-xs" style="background-color: var(--bg-badge); border-color: var(--border-light);">
                <span class="material-symbols-outlined text-xl text-emerald-400 shrink-0">touch_app</span>
                <span class="text-muted leading-relaxed">
                    <strong>Panduan Singkat:</strong> Klik salah satu kartu kelas di atas atau gunakan filter dropdown di pojok kiri atas panel. Peta akan otomatis menyesuaikan wilayah dan rute peristiwa sesuai bab yang Anda pilih.
                </span>
            </div>
        </div>
    `;
}

function renderEmptyCurriculumPlaceholder(kelasVal) {
    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    container.innerHTML = `
        <div class="py-12 text-center space-y-4 max-w-md mx-auto">
            <div class="w-14 h-14 mx-auto rounded-full flex items-center justify-center border shadow-sm"
                 style="background-color: var(--bg-badge); border-color: var(--border-light); color: var(--accent-orange);">
                <span class="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <div class="space-y-1.5">
                <h4 class="font-bold text-base text-title">Modul Kelas ${kelasVal} Sedang Disiapkan</h4>
                <p class="text-xs text-muted leading-relaxed">
                    Data kurikulum untuk kelas ini sedang dalam tahap harmonisasi materi digital Kemenag RI. Silakan pilih kelas lainnya yang sudah aktif.
                </p>
            </div>
            <div class="pt-2 flex flex-wrap justify-center gap-2">
                <button type="button" onclick="onCurriculumClassChange('7')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-emerald-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 7 MTs</button>
                <button type="button" onclick="onCurriculumClassChange('8')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-emerald-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 8 MTs</button>
                <button type="button" onclick="onCurriculumClassChange('9')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-emerald-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 9 MTs</button>
                <button type="button" onclick="onCurriculumClassChange('10')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-amber-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 10 MA</button>
                <button type="button" onclick="onCurriculumClassChange('11')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-amber-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 11 MA</button>
                <button type="button" onclick="onCurriculumClassChange('12')" class="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:border-amber-500/50" style="background-color: var(--bg-input); border-color: var(--border-input); color: var(--text-title);">Kelas 12 MA</button>
            </div>
        </div>
    `;
}

// ==========================================
// 8. QUICK LINKS & NAVIGASI SPASIAL INTERAKTIF
// ==========================================
function renderCurriculumQuickLinks(sub) {
    const relasi = sub.relasiPeta || {};
    const items = [];

    // 1. Titik Lokasi
    if (Array.isArray(relasi.markers) && typeof markerMap !== 'undefined') {
        relasi.markers.forEach(mId => {
            const mData = markerMap[mId] || (typeof mId === 'string' ? markerMap[mId.toLowerCase()] : null);
            if (mData) {
                const icon = typeof getMaterialIcon === 'function' ? getMaterialIcon(mData.kategori || 'kota') : 'place';
                items.push({
                    type: 'marker',
                    id: mId,
                    label: mData.nama,
                    category: 'Titik Lokasi',
                    icon: icon,
                    badgeStyle: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                });
            }
        });
    }

    // 2. Jalur Dakwah / Rute
    if (Array.isArray(relasi.jalur) && typeof jalurMap !== 'undefined') {
        relasi.jalur.forEach(jId => {
            const jData = jalurMap[jId] || (typeof jId === 'string' ? jalurMap[jId.toLowerCase()] : null);
            if (jData) {
                items.push({
                    type: 'jalur',
                    id: jId,
                    label: jData.nama,
                    category: 'Rute Jalur',
                    icon: 'route',
                    badgeStyle: 'border-amber-500/40 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
                });
            }
        });
    }

    // 3. Wilayah Kekuasaan
    if (Array.isArray(relasi.wilayah) && typeof wilayahMap !== 'undefined') {
        relasi.wilayah.forEach(wId => {
            const wData = wilayahMap[wId] || (typeof wId === 'string' ? wilayahMap[wId.toLowerCase()] : null);
            if (wData) {
                items.push({
                    type: 'wilayah',
                    id: wId,
                    label: wData.nama,
                    category: 'Wilayah Kekuasaan',
                    icon: 'flag',
                    badgeStyle: 'border-orange-500/40 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20'
                });
            }
        });
    }

    if (items.length === 0) return '';

    return `
        <div class="mt-4 pt-3.5 border-t space-y-2" style="border-color: var(--border-light);">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-xs font-semibold" style="color: var(--text-title);">
                    <span class="material-symbols-outlined text-[15px]" style="color: var(--accent-primary);">explore</span>
                    <span>Objek Spasial Terkait (Klik untuk Menuju Titik):</span>
                </div>
                <span class="text-[10px] font-mono text-muted">(${items.length} entitas aktif)</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${items.map(item => `
                    <button type="button" onclick="focusNarrativeEntity('${item.type}', '${item.id}')"
                        class="px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm group ${item.badgeStyle}"
                        title="Fokuskan kamera peta ke ${item.label}">
                        <span class="material-symbols-outlined text-[14px] group-hover:scale-110 transition-transform">${item.icon}</span>
                        <span class="font-semibold">${item.label}</span>
                        <span class="material-symbols-outlined text-[12px] opacity-60 group-hover:translate-x-0.5 transition-transform">arrow_outward</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function focusNarrativeEntity(type, id) {
    if (!window.narrativeMap || !Array.isArray(narrativeMapMarkers)) return;

    // Cari layer di narrativeMapMarkers berdasarkan entity ID
    const targetLayer = narrativeMapMarkers.find(layer =>
        layer && layer._curriculumEntity &&
        (layer._curriculumEntity.id === id || (typeof id === 'string' && layer._curriculumEntity.id.toLowerCase() === id.toLowerCase()))
    );

    if (!targetLayer) return;

    const isDesktop = window.innerWidth > 768;
    const floatingPanel = document.getElementById('narrative-floating-panel');
    const isPanelOpen = !floatingPanel || !floatingPanel.classList.contains('hidden');
    const mapWidth = window.narrativeMap.getSize().x || window.innerWidth;
    const shiftX = (isDesktop && isPanelOpen) ? (mapWidth * 0.25) : 0;

    if (type === 'marker' && typeof targetLayer.getLatLng === 'function') {
        const coord = targetLayer.getLatLng();
        const targetZoom = Math.max(window.narrativeMap.getZoom(), 8);
        const targetPoint = window.narrativeMap.project(coord, targetZoom);
        const offsetPoint = L.point(targetPoint.x + shiftX, targetPoint.y);
        const offsetLatLng = window.narrativeMap.unproject(offsetPoint, targetZoom);

        window.narrativeMap.flyTo(offsetLatLng, targetZoom, {
            animate: true,
            duration: 1.2,
            easeLinearity: 0.25
        });

        setTimeout(() => {
            if (typeof targetLayer.openPopup === 'function') {
                targetLayer.openPopup();
            }
        }, 500);

    } else if ((type === 'jalur' || type === 'wilayah') && typeof targetLayer.getBounds === 'function') {
        const bounds = targetLayer.getBounds();
        const centerCoord = bounds.getCenter();
        const targetZoom = Math.min(Math.max(window.narrativeMap.getBoundsZoom(bounds, false, [60, 60]), 5), 9);

        const targetPoint = window.narrativeMap.project(centerCoord, targetZoom);
        const offsetPoint = L.point(targetPoint.x + shiftX, targetPoint.y);
        const offsetLatLng = window.narrativeMap.unproject(offsetPoint, targetZoom);

        window.narrativeMap.flyTo(offsetLatLng, targetZoom, {
            animate: true,
            duration: 1.2,
            easeLinearity: 0.25
        });

        setTimeout(() => {
            if (typeof targetLayer.openPopup === 'function') {
                targetLayer.openPopup();
            }
        }, 500);
    }
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
window.renderCurriculumWelcomeState = renderCurriculumWelcomeState;
window.focusNarrativeEntity = focusNarrativeEntity;