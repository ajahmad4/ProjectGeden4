// ==========================================
// 1. DEKLARASI VARIABEL GLOBAL
// ==========================================
if (typeof window.narrativeMap === 'undefined') {
    window.narrativeMap = null;
}
var currentNarrativeIndex = 0;
var filteredNarrativeList = []; 
var narrativeDataList = narrativeDataList || []; 
var narrativeMapMarkers = narrativeMapMarkers || [];

// ==========================================
// 2. INISIALISASI MODE NARASI
// ==========================================

function getObjekCoordinates(item) {
    if (!item) return null;
    if (item.lat && item.lng) return [item.lat, item.lng];
    if (item.relasi && item.relasi.markers && item.relasi.markers.length > 0) {
        const primaryMarkerId = item.relasi.markers[0];
        if (typeof markerMap !== 'undefined' && markerMap[primaryMarkerId]) {
            return markerMap[primaryMarkerId].koordinat;
        }
    }
    return null;
}

// ==========================================
// 3. FUNGSI FILTER BERDASARKAN ERA
// ==========================================
function filterNarrativeByEra(selectedEraId) {
    if (!narrativeDataList || narrativeDataList.length === 0) {
        if (typeof dataObjekAtlas !== 'undefined' && dataObjekAtlas.length > 0) {
            narrativeDataList = dataObjekAtlas;
        } else {
            console.warn("Data atlas tidak ditemukan!");
            return;
        }
    }

    if (!selectedEraId || selectedEraId === 'ALL') {
        filteredNarrativeList = [...narrativeDataList];
    } else {
        const targetEraObj = (typeof TIMELINE_ERAS !== 'undefined') 
            ? TIMELINE_ERAS.find(e => e.id === selectedEraId) 
            : null;

        filteredNarrativeList = narrativeDataList.filter(item => {
            if (item.era === selectedEraId || item.eraId === selectedEraId) {
                return true;
            }

            if (item.tahun && targetEraObj) {
                const yr = parseInt(item.tahun, 10);
                if (!isNaN(yr) && yr >= targetEraObj.start && yr <= targetEraObj.end) {
                    return true;
                }
            }

            return false;
        });
    }

    currentNarrativeIndex = -1;
    
    // SEMBUNYIKAN KEMBALI PANEL MATERI KETIKA ERA DIBUAT BERUBAH
    const floatingPanel = document.getElementById('narrative-floating-panel');
    if (floatingPanel) {
        floatingPanel.classList.add('hidden');
    }

    if (filteredNarrativeList.length === 0) {
        const listContainer = document.getElementById('narrative-timeline-list');
        if (listContainer) {
            listContainer.innerHTML = `<div class="text-xs text-slate-400 p-2">Tidak ada data di era ini</div>`;
        }
    } else {
        renderNarrativeTimeline();
    }
}

// ==========================================
// 4. RENDER TIMELINE VERTIKAL KIRI (MELAYANG DAN MULTILINE)
// ==========================================
function renderNarrativeTimeline() {
    const listContainer = document.getElementById('narrative-timeline-list');
    if (!listContainer) return;

    const currentList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    if (!currentList || currentList.length === 0) {
        listContainer.innerHTML = `<div class="text-xs p-2 rounded-lg border" style="color: var(--text-muted); background: var(--bg-panel); border-color: var(--border-light);">Data belum dimuat</div>`;
        return;
    }

    listContainer.innerHTML = currentList.map((item, idx) => {
        const isActive = idx === currentNarrativeIndex;
        const yearText = item.tahun ? `${item.tahun} M` : (item.periode || `${idx + 1}`);
        const titleText = item.nama || item.title || 'Objek Sejarah';

        return `
            <button onclick="loadNarrativeStep(${idx})" class="timeline-item group flex items-start gap-2.5 my-2 transition-all outline-none text-left max-w-[260px] p-1.5 rounded-lg">
                <!-- Titik Marker -->
                <div class="w-3.5 h-3.5 mt-0.5 rounded-full border-2 shrink-0 transition-all duration-200"
                     style="${isActive 
                        ? 'background-color: var(--accent-orange); border-color: var(--bg-panel-solid); transform: scale(1.25); box-shadow: 0 0 10px rgba(var(--accent-orange-rgb), 0.6);' 
                        : 'background-color: var(--bg-badge); border-color: var(--timeline-tick);'}">
                </div>
                
                <!-- Teks & Tahun -->
                <div class="text-xs font-mono transition-all duration-200">
                    <!-- TAHUN -->
                    <span class="block font-bold text-[10px] transition-colors" 
                          style="color: ${isActive ? 'var(--accent-orange)' : 'var(--text-title)'};">
                        ${yearText}
                    </span>
                    <!-- JUDUL -->
                    <span class="block text-xs leading-snug line-clamp-2 transition-colors ${isActive ? 'font-bold' : 'font-medium'}"
                          style="color: ${isActive ? 'var(--accent-orange)' : 'var(--text-primary)'};">
                        ${titleText}
                    </span>
                </div>
            </button>
        `;
    }).join('');
}

// ==========================================
// 5. TOGGLE HIDE/SHOW PANEL MATERI KANAN
// ==========================================
function toggleNarrativePanel() {
    const floatingPanel = document.getElementById('narrative-floating-panel');
    const reopenBtn = document.getElementById('btn-reopen-panel');

    if (!floatingPanel) return;

    if (floatingPanel.classList.contains('hidden')) {
        // Tampilkan Panel Materi Melayang (Menutupi 50% kanan)
        floatingPanel.classList.remove('hidden');
        if (reopenBtn) reopenBtn.classList.add('hidden');
    } else {
        // Sembunyikan Panel Materi (Peta Fullscreen Utuh Terlihat Semua)
        floatingPanel.classList.add('hidden');
        if (reopenBtn) reopenBtn.classList.remove('hidden');
    }
}

// ==========================================
// 6. RENDER DETAIL KONTEN NARASI (WITH CAROUSEL)
// ==========================================
function loadNarrativeStep(index) {
    const activeList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    if (!activeList || index < 0 || index >= activeList.length) return;
    currentNarrativeIndex = index;

    const floatingPanel = document.getElementById('narrative-floating-panel');
    if (floatingPanel) {
        floatingPanel.classList.remove('hidden');
    }

    const data = activeList[index];

    // 1. UPDATE HEADER STATIS (AGAR JUDUL TIDAK TERGESER SAAT SCROLL)
    const topicTitleEl = document.getElementById('narrative-topic-title');
    if (topicTitleEl) {
        topicTitleEl.textContent = data.nama || data.title || 'Situs Sejarah';
    }

    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    const tipePeristiwa = data.kategori || data.tipe || 'Kerajaan Islam';
    const tahunText = data.tahun ? `${data.tahun} M` : 'Nusantara';
    const eraText = data.era || data.periodeEra || 'Klasik Islam';
    const namaJudul = data.nama || data.title || 'Situs Sejarah';
    
    const wilayahText = data.wilayah || data.lokasi || 'Nusantara';
    const tokohText = data.tokoh || 'Sultan & Ulama Setempat';
    const jalurText = data.jalur || data.metode || 'Perdagangan & Maritim';
    const buktiText = data.bukti || data.artefak || 'Batu Nisan & Naskah Kuno';
    const statusText = data.status || 'Pusat Peradaban Islam';

    const kronologiText = data.kronologi || data.deskripsi || 'Kronologi peristiwa sejarah belum diuraikan.';
    
    // Penanganan Gambar Carousel
    let imageList = [];
    if (Array.isArray(data.gambar) && data.gambar.length > 0) {
        imageList = data.gambar;
    } else if (Array.isArray(data.images) && data.images.length > 0) {
        imageList = data.images;
    } else if (data.foto || data.image) {
        imageList = [data.foto || data.image];
    }
    const validImages = imageList.filter(img => img && typeof img === 'string');
    
    // Reset Index Carousel saat langkah diganti
    currentCarouselIndex = 0;

    container.innerHTML = `
        <!-- 1. TIPE PERISTIWA & TAHUN -->
        <div class="flex items-center justify-between gap-2 pb-2 border-b shrink-0" style="border-color: var(--border-light);">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider" style="background-color: var(--bg-badge); color: var(--accent-primary); border: 1px solid var(--border-light);">
                <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--accent-primary);"></span>
                ${tipePeristiwa}
            </span>
            <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-md flex items-center gap-1" style="background-color: var(--bg-badge); color: var(--text-title); border: 1px solid var(--border-light);">
                ⏱️ <strong>${tahunText}</strong>
            </span>
        </div>

        <!-- JUDUL UTAMA MATERI (Gunakan --text-title agar Hijau Tua Tegas) -->
        <h3 class="text-xl md:text-2xl font-bold tracking-tight pt-2" style="color: var(--text-title);">
            ${namaJudul}
        </h3>

        <!-- 2. METADATA 2 KOLOM (KIRI) & GAMBAR FULL COVER (KANAN) -->
        <div class="flex flex-col md:flex-row items-stretch gap-4 my-2">
            
            <!-- Metadata 2 Kolom -->
            <div class="flex-1 grid grid-cols-2 gap-y-3 gap-x-4 p-4 rounded-xl text-[11px] md:text-xs justify-center items-center shadow-sm" style="background-color: var(--bg-badge); border: 1px solid var(--border-panel); color: var(--text-primary);">
                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">location_on</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Wilayah</span>
                        <span class="font-medium" style="color: var(--text-primary);">${wilayahText}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">sailing</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Jalur</span>
                        <span class="font-medium" style="color: var(--text-primary);">${jalurText}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">person</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Tokoh</span>
                        <span class="font-medium" style="color: var(--text-primary);">${tokohText}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">account_balance</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Bukti</span>
                        <span class="font-medium" style="color: var(--text-primary);">${buktiText}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">history_edu</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Era</span>
                        <span class="font-medium" style="color: var(--text-primary);">${eraText}</span>
                    </div>
                </div>

                <div class="flex items-start gap-2">
                    <span class="material-symbols-outlined text-base shrink-0 mt-0.5" style="color: var(--accent-primary);">verified</span>
                    <div>
                        <span class="block text-[10px] uppercase font-bold" style="color: var(--text-muted);">Status</span>
                        <span class="font-medium" style="color: var(--text-primary);">${statusText}</span>
                    </div>
                </div>
            </div>

            <!-- Carousel Gambar Materi Aktif di Kanan (Full Fit tanpa ruang hitam) -->
            <div class="w-full md:w-[280px] lg:w-[320px] shrink-0 min-h-[180px] rounded-xl overflow-hidden relative group flex flex-col justify-between shadow-sm" style="border: 1px solid var(--border-panel); background-color: var(--bg-badge);">
                ${validImages.length > 0 ? `
                    <div class="relative w-full flex-1 overflow-hidden min-h-[150px]">
                        ${validImages.map((imgUrl, idx) => `
                            <img src="${imgUrl}" 
                                 alt="${namaJudul} - ${idx + 1}" 
                                 data-caption="${data.caption || `${namaJudul} (${idx + 1}/${validImages.length})`}"
                                 class="narrative-carousel-slide w-full h-full object-cover transition-all duration-300 ${idx !== 0 ? 'hidden' : ''}">
                        `).join('')}

                        <!-- Navigasi Panah Carousel -->
                        ${validImages.length > 1 ? `
                            <button onclick="changeNarrativeImage(-1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-md z-10 cursor-pointer" style="background-color: var(--bg-panel-solid); color: var(--text-title); border: 1px solid var(--border-light);">
                                <span class="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button onclick="changeNarrativeImage(1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity shadow-md z-10 cursor-pointer" style="background-color: var(--bg-panel-solid); color: var(--text-title); border: 1px solid var(--border-light);">
                                <span class="material-symbols-outlined text-sm">chevron_right</span>
                            </button>

                            <!-- Dots Indikator -->
                            <div class="absolute top-2 inset-x-0 flex justify-center gap-1 z-10">
                                ${validImages.map((_, idx) => `
                                    <button onclick="setNarrativeImage(${idx})" class="narrative-carousel-dot h-1.5 rounded-full transition-all duration-300 ${idx === 0 ? 'w-4' : 'w-1.5'}" style="background-color: ${idx === 0 ? 'var(--accent-primary)' : 'var(--border-light)'};"></button>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>

                    <!-- Caption Gambar -->
                    <div id="narrative-carousel-caption" class="p-2 text-[10px] italic text-center border-t truncate shrink-0" style="background-color: var(--bg-panel-solid); color: var(--text-muted); border-color: var(--border-light);">
                        📷 ${data.caption || `${namaJudul} (1/${validImages.length})`}
                    </div>
                ` : `
                    <div class="w-full h-full flex flex-col items-center justify-center p-4 text-center text-xs" style="color: var(--text-muted);">
                        <span class="material-symbols-outlined text-2xl mb-1">image_not_supported</span>
                        <span>Gambar belum tersedia</span>
                    </div>
                `}
            </div>
        </div>

        <!-- 3. KRONOLOGI / MATERI UTAMA -->
        <div class="space-y-1.5 pt-2">
            <h4 class="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style="color: var(--text-muted);">
                <span class="w-1 h-3 rounded-full" style="background-color: var(--accent-primary);"></span> Uraian / Kronologi Sejarah
            </h4>
            <div class="text-xs md:text-sm leading-relaxed space-y-2 text-justify" style="color: var(--text-secondary);">
                ${kronologiText.split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('')}
            </div>
        </div>
    `;

    // Fly map ke lokasi
    const coords = getObjekCoordinates(data);
    if (window.narrativeMap && coords) {
        window.narrativeMap.flyTo(coords, 9, { duration: 1.5 });
    }

    // Re-render daftar timeline untuk memperbarui status 'isActive'
    renderNarrativeTimeline();

    // Update Text Progress & Navigasi
    const progressEl = document.getElementById('narrative-progress-text');
    if (progressEl) progressEl.textContent = `Materi ${index + 1} dari ${activeList.length}`;

    const stepEl = document.getElementById('narrative-step-indicator');
    if (stepEl) stepEl.textContent = `${index + 1} / ${activeList.length}`;

    const btnPrev = document.getElementById('btn-narrative-prev');
    if (btnPrev) btnPrev.disabled = (index === 0);

    const btnNext = document.getElementById('btn-narrative-next');
    if (btnNext) btnNext.disabled = (index === activeList.length - 1);
}

// ==========================================
// 7. NAVIGASI STEPPER & UTILITY RENDER
// ==========================================
function navigateNarrative(direction) {
    const activeList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    const newIndex = currentNarrativeIndex + direction;
    if (newIndex >= 0 && newIndex < activeList.length) {
        loadNarrativeStep(newIndex);
    }
}

function populateEraDropdown() {
    const selectEl = document.getElementById('filter-era-select');
    if (!selectEl) return;

    // Pastikan TIMELINE_ERAS tersedia dari timeline-data.js
    if (typeof TIMELINE_ERAS !== 'undefined' && Array.isArray(TIMELINE_ERAS)) {
        let optionsHtml = `<option value="ALL">Semua Era Sejarah</option>`;
        
        TIMELINE_ERAS.forEach(era => {
            const rangeText = (era.start && era.end) ? ` (${era.start}–${era.end} M)` : '';
            optionsHtml += `<option value="${era.id}">${era.nama || era.name}${rangeText}</option>`;
        });

        selectEl.innerHTML = optionsHtml;
    } else {
        console.warn("[Narrative] Variable TIMELINE_ERAS tidak ditemukan di timeline-data.js.");
    }
}

function initNarrativeMode(externalData) {
    // Integrasikan dropdown era otomatis dari timeline-data.js
    populateEraDropdown();

    if (externalData && Array.isArray(externalData) && externalData.length > 0) {
        narrativeDataList = externalData;
    } else if (typeof dataObjekAtlas !== 'undefined' && dataObjekAtlas.length > 0) {
        narrativeDataList = dataObjekAtlas;
    }

    filteredNarrativeList = [...narrativeDataList];
    currentNarrativeIndex = -1; // -1 artinya belum ada yang dipilih
    
    if (!window.narrativeMap && typeof L !== 'undefined' && typeof initNarrativeMap === 'function') {
        initNarrativeMap();
    }

    // 1. SEMBUNYIKAN PANEL MATERI SECARA DEFAULT (Hanya Peta & Timeline Kiri)
    const floatingPanel = document.getElementById('narrative-floating-panel');
    if (floatingPanel) {
        floatingPanel.classList.add('hidden');
    }

    // 2. Render hanya timeline melayang di kiri
    if (filteredNarrativeList.length > 0) {
        renderNarrativeTimeline();
    }
}

function renderNarrativeContent(item) {
    if (!item) return;

    // 1. Dapatkan & Isi Seluruh Metadata Awal
    const metaContainer = document.getElementById('narrative-metadata-container');
    if (metaContainer) {
        let metaHTML = '';
        
        if (item.tahun || item.periode) {
            metaHTML += `
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-sm" style="color: var(--accent-orange);">event</span>
                    <div>
                        <span class="text-[9px] uppercase font-semibold block" style="color: var(--text-muted);">Tahun / Periode</span>
                        <span class="font-bold text-xs">${item.tahun ? item.tahun + ' M' : item.periode}</span>
                    </div>
                </div>`;
        }
        
        if (item.lokasi || item.tempat) {
            metaHTML += `
                <div class="flex items-center gap-2 pt-1 border-t" style="border-color: var(--border-light);">
                    <span class="material-symbols-outlined text-sm" style="color: var(--accent-primary);">location_on</span>
                    <div>
                        <span class="text-[9px] uppercase font-semibold block" style="color: var(--text-muted);">Lokasi</span>
                        <span class="font-semibold text-xs">${item.lokasi || item.tempat}</span>
                    </div>
                </div>`;
        }

        if (item.era || item.kategori) {
            metaHTML += `
                <div class="flex items-center gap-2 pt-1 border-t" style="border-color: var(--border-light);">
                    <span class="material-symbols-outlined text-sm" style="color: var(--accent-primary);">bookmark</span>
                    <div>
                        <span class="text-[9px] uppercase font-semibold block" style="color: var(--text-muted);">Era / Kategori</span>
                        <span class="font-semibold text-xs">${item.era || item.kategori}</span>
                    </div>
                </div>`;
        }

        // Render metadata tambahan secara otomatis
        Object.keys(item).forEach(key => {
            if (!['nama', 'title', 'tahun', 'periode', 'lokasi', 'tempat', 'era', 'kategori', 'deskripsi', 'description', 'gambar', 'images'].includes(key)) {
                if (typeof item[key] === 'string' || typeof item[key] === 'number') {
                    metaHTML += `
                        <div class="flex items-center gap-2 pt-1 border-t" style="border-color: var(--border-light);">
                            <span class="material-symbols-outlined text-sm" style="color: var(--text-muted);">info</span>
                            <div>
                                <span class="text-[9px] uppercase font-semibold block" style="color: var(--text-muted);">${key}</span>
                                <span class="font-medium text-xs">${item[key]}</span>
                            </div>
                        </div>`;
                }
            }
        });

        metaContainer.innerHTML = metaHTML;
    }

    // 2. Gambar Utama (Gambar Pertama)
    const mainImg = document.getElementById('narrative-main-image');
    const mainImgWrapper = document.getElementById('narrative-main-image-wrapper');
    const imageList = Array.isArray(item.gambar) ? item.gambar : (Array.isArray(item.images) ? item.images : [item.gambar || item.image || item.foto]);
    
    const validImages = imageList.filter(img => img && typeof img === 'string');

    if (validImages.length > 0) {
        if (mainImg) mainImg.src = validImages[0];
        if (mainImgWrapper) mainImgWrapper.classList.remove('hidden');
    } else {
        if (mainImgWrapper) mainImgWrapper.classList.add('hidden');
    }

    // 3. Deskripsi Materi
    const descEl = document.getElementById('narrative-description');
    if (descEl) descEl.innerText = item.deskripsi || item.description || 'Tidak ada deskripsi.';

    // 4. Galeri Gambar Relevan
    const gallerySection = document.getElementById('narrative-gallery-section');
    const galleryGrid = document.getElementById('narrative-gallery-grid');
    const extraImages = validImages.slice(1);

    if (extraImages.length > 0 && galleryGrid && gallerySection) {
        galleryGrid.innerHTML = extraImages.map((imgUrl, idx) => `
            <div class="w-20 h-20 rounded-lg overflow-hidden border shadow-xs group cursor-pointer shrink-0" 
                 style="border-color: var(--border-panel);"
                 onclick="window.open('${imgUrl}', '_blank')">
                <img src="${imgUrl}" alt="Visual ${idx + 2}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200">
            </div>
        `).join('');
        
        gallerySection.classList.remove('hidden');
    } else if (gallerySection) {
        gallerySection.classList.add('hidden');
    }
}
// ==========================================
// FUNGSIONALITAS CAROUSEL GAMBAR NARASI
// ==========================================
let currentCarouselIndex = 0;

function changeNarrativeImage(direction) {
    const images = document.querySelectorAll('.narrative-carousel-slide');
    const dots = document.querySelectorAll('.narrative-carousel-dot');
    const captionEl = document.getElementById('narrative-carousel-caption');
    
    if (!images || images.length <= 1) return;

    // Sembunyikan slide aktif saat ini
    images[currentCarouselIndex].classList.add('hidden');
    if (dots[currentCarouselIndex]) {
        dots[currentCarouselIndex].style.backgroundColor = 'var(--border-light)';
        dots[currentCarouselIndex].classList.remove('w-4');
        dots[currentCarouselIndex].classList.add('w-1.5');
    }

    // Hitung indeks baru
    currentCarouselIndex = (currentCarouselIndex + direction + images.length) % images.length;

    // Tampilkan slide baru
    images[currentCarouselIndex].classList.remove('hidden');
    if (dots[currentCarouselIndex]) {
        dots[currentCarouselIndex].style.backgroundColor = 'var(--accent-primary)';
        dots[currentCarouselIndex].classList.remove('w-1.5');
        dots[currentCarouselIndex].classList.add('w-4');
    }

    if (captionEl) {
        const activeImg = images[currentCarouselIndex];
        captionEl.textContent = `📷 ${activeImg.getAttribute('data-caption') || 'Gambar Sejarah'}`;
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