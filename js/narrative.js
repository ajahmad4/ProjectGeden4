// ==========================================
// 1. DEKLARASI VARIABEL GLOBAL
// ==========================================
// Menggunakan 'window.' agar tidak error jika sudah dideklarasikan di file lain
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
function initNarrativeMode(externalData) {
    // 1. Prioritaskan data yang di-pass, lalu dataObjekAtlas global, lalu narrativeDataList
    if (externalData && Array.isArray(externalData) && externalData.length > 0) {
        narrativeDataList = externalData;
    } else if (typeof dataObjekAtlas !== 'undefined' && dataObjekAtlas.length > 0) {
        narrativeDataList = dataObjekAtlas;
    }

    // 2. Set list yang terfilter dengan seluruh data awal
    filteredNarrativeList = [...narrativeDataList];
    currentNarrativeIndex = 0;
    
    // 3. Inisialisasi Peta Narasi jika belum ada
    if (!window.narrativeMap && typeof L !== 'undefined' && typeof initNarrativeMap === 'function') {
        initNarrativeMap();
    }

    // 4. Render UI jika data tersedia
    if (filteredNarrativeList.length > 0) {
        renderNarrativeTimeline();
        loadNarrativeStep(0);
    } else {
        console.warn("[Narrative Engine] Tidak ada data objek sejarah yang dapat dimuat.");
        const listContainer = document.getElementById('narrative-timeline-list');
        if (listContainer) {
            listContainer.innerHTML = `<div class="text-xs text-amber-400 p-3 bg-slate-900/90 rounded-xl border border-amber-500/30">⚠️ Data atlas belum tersedia.</div>`;
        }
    }
}

// Helper untuk mengambil koordinat utama
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
// ==========================================
// FUNGSI FILTER ERA (SINKRON DENGAN TIMELINE_ERAS)
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

    // Jika memilih 'ALL'
    if (!selectedEraId || selectedEraId === 'ALL') {
        filteredNarrativeList = [...narrativeDataList];
    } else {
        const targetEraObj = (typeof TIMELINE_ERAS !== 'undefined') 
            ? TIMELINE_ERAS.find(e => e.id === selectedEraId) 
            : null;

        filteredNarrativeList = narrativeDataList.filter(item => {
            // A. Cek kesamaan ID Era langsung (misal: item.era === "era-pasca-abbasiyah")
            if (item.era === selectedEraId || item.eraId === selectedEraId) {
                return true;
            }

            // B. Cek berdasarkan rentang tahun era dari TIMELINE_ERAS
            if (item.tahun && targetEraObj) {
                const yr = parseInt(item.tahun, 10);
                if (!isNaN(yr) && yr >= targetEraObj.start && yr <= targetEraObj.end) {
                    return true;
                }
            }

            return false;
        });
    }

    // Fallback Safety: Jika era yang dipilih belum memiliki data, berikan pemberitahuan tanpa merusak UI
    currentNarrativeIndex = 0;
    
    if (filteredNarrativeList.length === 0) {
        const container = document.getElementById('narrative-content-body');
        const listContainer = document.getElementById('narrative-timeline-list');
        
        if (listContainer) {
            listContainer.innerHTML = `<div class="text-xs text-slate-400 p-2">Tidak ada data di era ini</div>`;
        }
        if (container) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 text-center space-y-3">
                    <span class="material-symbols-outlined text-4xl text-slate-600">manage_search</span>
                    <p class="text-sm font-semibold text-slate-300">Belum ada objek sejarah pada era ini.</p>
                    <p class="text-xs text-slate-500">Silakan pilih era lain pada filter di atas.</p>
                </div>`;
        }
    } else {
        renderNarrativeTimeline();
        loadNarrativeStep(0);
    }
}

function matchesEraYear(tahunInput, eraKey) {
    const yr = parseInt(tahunInput);
    if (isNaN(yr)) return false;

    const key = String(eraKey).toLowerCase();

    if (key.includes('pra') || key.includes('570')) return yr >= 570 && yr <= 610;
    if (key.includes('kenabian') || key.includes('610')) return yr >= 610 && yr <= 633;
    if (key.includes('rashidun') || key.includes('633')) return yr >= 633 && yr <= 662;
    if (key.includes('umayyah') || key.includes('662')) return yr >= 662 && yr <= 751;
    if (key.includes('abbasiyah') || key.includes('751')) return yr >= 751 && yr <= 1258;
    if (key.includes('pasca') || key.includes('1259')) return yr >= 1259 && yr <= 1400;
    if (key.includes('nusantara') || key.includes('1400')) return yr >= 1400 && yr <= 1525;
    if (key.includes('kesultanan') || key.includes('1525')) return yr >= 1525 && yr <= 1700;
    if (key.includes('imperium') || key.includes('1700')) return yr >= 1700 && yr <= 1800;
    if (key.includes('kemunduran') || key.includes('1800')) return yr >= 1800 && yr <= 2000;

    return false;
}

// ==========================================
// 4. RENDER TIMELINE VERTIKAL KIRI
// ==========================================
function renderNarrativeTimeline() {
    const listContainer = document.getElementById('narrative-timeline-list');
    if (!listContainer) return;

    const currentList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    if (!currentList || currentList.length === 0) {
        listContainer.innerHTML = `<div class="text-xs text-slate-500 p-2">Data belum dimuat</div>`;
        return;
    }

    listContainer.innerHTML = currentList.map((item, idx) => {
        const isActive = idx === currentNarrativeIndex;
        const yearText = item.tahun ? `${item.tahun} M` : (item.periode || `${idx + 1}`);
        const titleText = item.nama || item.title || 'Objek Sejarah';

        return `
            <button onclick="loadNarrativeStep(${idx})" class="group flex items-center gap-3 my-1.5 transition-all outline-none text-left">
                <div class="w-3.5 h-3.5 rounded-full border-2 ${isActive ? 'bg-emerald-400 border-white scale-125 shadow-lg shadow-emerald-500/50' : 'bg-slate-800 border-slate-600 group-hover:border-emerald-400'} transition-all"></div>
                <div class="px-3 py-1.5 rounded-xl border ${isActive ? 'bg-slate-900/90 border-emerald-500/60 text-emerald-300 shadow-md' : 'bg-slate-900/50 border-slate-800/80 text-slate-400 group-hover:text-slate-200'} text-xs font-mono backdrop-blur-md transition-all">
                    <span class="block font-bold text-[10px] ${isActive ? 'text-emerald-400' : 'text-slate-500'}">${yearText}</span>
                    <span class="line-clamp-1">${titleText}</span>
                </div>
            </button>
        `;
    }).join('');
}

// ==========================================
// 5. RENDER DETAIL KONTEN NARASI
// ==========================================
function loadNarrativeStep(index) {
    const activeList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    if (!activeList || index < 0 || index >= activeList.length) return;
    currentNarrativeIndex = index;

    const data = activeList[index];
    const container = document.getElementById('narrative-content-body');
    if (!container) return;

    // Data Variabel + Fallback
    const tipePeristiwa = data.kategori || data.tipe || 'Kerajaan Islam';
    const tahunText = data.tahun ? `${data.tahun} M` : 'Nusantara';
    const eraText = data.era || data.periodeEra || 'Klasik Islam';
    const namaJudul = data.nama || data.title || 'Situs Sejarah';
    
    const wilayahText = data.wilayah || data.lokasi || 'Nusantara';
    const tokohText = data.tokoh || 'Sultan & Ulama Setempat';
    const jalurText = data.jalur || data.metode || 'Perdagangan & Maritim';
    const buktiText = data.bukti || data.artefak || 'Batu Nisan & Naskah Kuno';
    const statusText = data.status || 'Pusat Peradaban Islam';

    const ringkasanText = data.ringkasan || data.deskripsiSingkat || data.deskripsi || 'Ringkasan materi belum tersedia.';
    const kronologiText = data.kronologi || data.deskripsi || 'Kronologi peristiwa sejarah belum diuraikan.';
    const dampakText = data.dampak || data.signifikansi || 'Memberikan pengaruh besar terhadap penyebaran dakwah Islam di wilayah Nusantara.';
    const fotoUrl = data.foto || data.image || '';
    const captionFoto = data.caption || namaJudul;
    const keterkaitanList = data.keterkaitan || data.tags || ['SKI Kelas 12', 'Islamisasi Nusantara', 'Jalur Rempah'];

    container.innerHTML = `
        <!-- 1. TIPE PERISTIWA & TAHUN -->
        <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                ${tipePeristiwa}
            </span>
            <span class="text-xs font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 flex items-center gap-1">
                ⏱️ <strong>${tahunText}</strong>
            </span>
        </div>

        <!-- 2. JUDUL UTAMA -->
        <h1 class="text-2xl md:text-3xl font-bold text-white tracking-wide uppercase font-title drop-shadow">
            ${namaJudul}
        </h1>

        <!-- 3. META DATA RAMAI (Grid 2x3 Box) -->
        <div class="grid grid-cols-2 gap-2 p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 text-[11px] md:text-xs">
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-emerald-400 text-base shrink-0">location_on</span>
                <span class="truncate"><strong>Wilayah:</strong> ${wilayahText}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-amber-400 text-base shrink-0">person</span>
                <span class="truncate"><strong>Tokoh:</strong> ${tokohText}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-blue-400 text-base shrink-0">history_edu</span>
                <span class="truncate"><strong>Era:</strong> ${eraText}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-cyan-400 text-base shrink-0">sailing</span>
                <span class="truncate"><strong>Jalur:</strong> ${jalurText}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-purple-400 text-base shrink-0">account_balance</span>
                <span class="truncate"><strong>Bukti:</strong> ${buktiText}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-300">
                <span class="material-symbols-outlined text-rose-400 text-base shrink-0">verified</span>
                <span class="truncate"><strong>Status:</strong> ${statusText}</span>
            </div>
        </div>

        <!-- 4. RINGKASAN -->
        <div class="space-y-1.5">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span class="w-1 h-3 bg-emerald-500 rounded-full"></span> Ringkasan
            </h4>
            <div class="p-3 bg-emerald-950/20 border-l-2 border-emerald-500 text-slate-200 text-xs md:text-sm italic rounded-r-lg leading-relaxed">
                "${ringkasanText}"
            </div>
        </div>

        <!-- 5. KRONOLOGI -->
        <div class="space-y-1.5">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span class="w-1 h-3 bg-blue-500 rounded-full"></span> Kronologi Sejarah
            </h4>
            <div class="text-xs md:text-sm text-slate-300 leading-relaxed space-y-2 text-justify">
                ${kronologiText.split('\n').map(p => `<p>${p}</p>`).join('')}
            </div>
        </div>

        <!-- 6. DAMPAK / SIGNIFIKANSI -->
        <div class="space-y-1.5">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span class="w-1 h-3 bg-amber-500 rounded-full"></span> Dampak & Signifikansi
            </h4>
            <div class="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs md:text-sm text-amber-200/90 leading-relaxed">
                ${dampakText}
            </div>
        </div>

        <!-- 7. DOKUMENTASI -->
        <div class="space-y-1.5">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span class="w-1 h-3 bg-purple-500 rounded-full"></span> Dokumentasi Visual
            </h4>
            ${fotoUrl ? `
                <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                    <img src="${fotoUrl}" alt="${namaJudul}" class="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="p-2 bg-slate-900/90 text-[11px] text-slate-400 italic text-center border-t border-slate-800">
                        📷 ${captionFoto}
                    </div>
                </div>
            ` : `
                <div class="p-4 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
                    Dokumentasi gambar belum tersedia
                </div>
            `}
        </div>

        <!-- 8. KETERKAITAN KONSEP -->
        <div class="space-y-1.5 pt-2 border-t border-slate-800">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span class="w-1 h-3 bg-teal-500 rounded-full"></span> Keterkaitan Konsep
            </h4>
            <div class="flex flex-wrap gap-1.5">
                ${keterkaitanList.map(tag => `
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-900 text-slate-300 border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors">
                        <span class="text-emerald-400">➔</span> ${tag}
                    </span>
                `).join('')}
            </div>
        </div>
    `;

    // Fly map ke lokasi
    const coords = getObjekCoordinates(data);
    if (window.narrativeMap && coords) {
        window.narrativeMap.flyTo(coords, 9, { duration: 1.5 });
    }

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
// 6. NAVIGASI STEPPER
// ==========================================
function navigateNarrative(direction) {
    const activeList = (filteredNarrativeList && filteredNarrativeList.length > 0) 
        ? filteredNarrativeList 
        : narrativeDataList;

    const newIndex = currentNarrativeIndex + direction;
    if (newIndex >= 0 && newIndex < activeList.length) {
        loadNarrativeStep(newIndex);
        renderNarrativeTimeline();
    }
}