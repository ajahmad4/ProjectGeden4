// =========================================================================
// ATLAS SEJARAH KEBUDAYAAN ISLAM - TIMELINE ENGINE
// File: js/timeline.js
// =========================================================================

// =========================================================================
// 1. KONFIGURASI & STATE UTAMA (Disesuaikan dengan timeline-data.js)
// =========================================================================
const timeline = {
    // Membaca dinamis dari TIMELINE_CONFIG yang ada di timeline-data.js
    minYear: TIMELINE_CONFIG.minYear,               
    maxYear: TIMELINE_CONFIG.maxYear,              
    currentYear: TIMELINE_CONFIG.minYear,           
    currentTranslate: 0,        
    pixelPerYear: 2,            
    zoomStep: 0.25,             
    minPixelPerYear: 1.25,      
    maxPixelPerYear: 20,        
    interval: 50,               
    majorInterval: 100,         
    dragging: false,            
    startX: 0                   
};

const DOM = {
    viewport: null,
    indicator: null,
    rulerContent: null
};

// =========================================================================
// 2. LIFECYCLE / INISIALISASI EVENT LISTENERS
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi awal
    DOM.viewport = document.getElementById("timeline-ruler");
    DOM.indicator = document.getElementById("timeline-current");
    DOM.rulerContent = document.getElementById("timeline-ruler-content");
    
    updateTimelineInterval();
    buildRuler();
    setTimelineYear(timeline.currentYear);

    const timelineTrack = document.getElementById("timeline-track");
    if (!timelineTrack) return;

    // --- EVENT: Scroll Mouse (Zoom In/Out) ---
    timelineTrack.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            zoomTimeline(timeline.zoomStep);
        } else {
            zoomTimeline(-timeline.zoomStep);
        }
    }, { passive: false });

    // --- EVENT: Geser Mouse (Drag Timeline) ---
    timelineTrack.addEventListener("mousedown", (e) => {
        e.preventDefault();
        timeline.dragging = true;
        timeline.startX = e.clientX;
    });

    window.addEventListener("mouseleave", () => {
        timeline.dragging = false;
    });
    
    window.addEventListener("mousemove", (e) => {
        if (!timeline.dragging) return;
        const deltaX = e.clientX - timeline.startX;
        timeline.startX = e.clientX;
        dragTimeline(deltaX);
    });

    window.addEventListener("mouseup", () => {
        timeline.dragging = false;
    });

    window.addEventListener("blur", () => {
        timeline.dragging = false;
    });

    // --- EVENT: Tombol Keyboard (= untuk Zoom In, - untuk Zoom Out) ---
    window.addEventListener("keydown", (e) => {
        if (e.key === "=") {
            e.preventDefault();
            zoomTimeline(timeline.zoomStep);
        }
        if (e.key === "-") {
            e.preventDefault();
            zoomTimeline(-timeline.zoomStep);
        }
    });

    // --- EVENT: Responsif saat Layar Berubah Ukuran ---
    window.addEventListener("resize", () => {
        buildRuler();
        moveRuler(timeline.currentYear);
    });

    // --- EVENT: Input Tahun Tambahan (opsional jika elemen ada di HTML) ---
    const yearInput = document.getElementById("timeline-year-input");
    const yearButton = document.getElementById("timeline-year-button");

    if (yearInput && yearButton) {
        yearButton.addEventListener("click", () => {
            const year = Number(yearInput.value);
            if (Number.isNaN(year)) return;
            animateTimelineYear(year);
        });

        yearInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            const year = Number(yearInput.value);
            if (Number.isNaN(year)) return;
            animateTimelineYear(year);
        });
    }

    // --- EVENT: Input Indikator Tahun Aktif ---
    const indicator = document.getElementById("timeline-current");
    if (indicator) {
        indicator.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            const year = Number(indicator.value);
            if (Number.isNaN(year)) {
                indicator.value = timeline.currentYear;
                return;
            }
            animateTimelineYear(year);
        });

        indicator.addEventListener("blur", () => {
            indicator.value = timeline.currentYear;
        });
    }
});

// =========================================================================
// 3. EVENT REACTION & SYNCHRONIZATION
// =========================================================================

// Memperbarui UI indikator angka & menggeser penggaris ketika tahun berubah
function notifyTimelineChanged() {
    updateTimelineIndicator();
    moveRuler(timeline.currentYear);
}

// Memperbarui nilai input tahun di halaman web
function updateTimelineIndicator() {
    const indicator = document.getElementById("timeline-current");
    if (!indicator) return;
    indicator.value = timeline.currentYear;
}

// =========================================================================
// 4. CORE TIMELINE MANIPULATION (GETTERS, SETTERS, DRAG)
// =========================================================================

// Menetapkan tahun aktif secara instan dengan batasan min/max tahun
function setTimelineYear(year) {
    year = Math.round(year);
    year = Math.max(timeline.minYear, Math.min(timeline.maxYear, year));

    timeline.currentYear = year;
    timeline.currentTranslate = translateFromYear(year); // Didefinisikan di file luar (e.g., timelineRuler.js)

    notifyTimelineChanged();
    if (typeof renderJalurDanWilayah === 'function'){
        renderJalurDanWilayah(year);
        updateEraHeader(year);
        muatLokasiAplikasi();
    }

}

// Mengonversi pergeseran pixel horizontal menjadi selisih tahun
function yearFromPixel(deltaX) {
    return deltaX / timeline.pixelPerYear;
}

// Melakukan pergeseran tahun berdasarkan drag mouse
function dragTimeline(deltaX) {
    const deltaYear = yearFromPixel(deltaX);
    setTimelineYear(timeline.currentYear - deltaYear);
}

// =========================================================================
// 5. ANIMASI TRANSISI (EASING ANIMATION)
// =========================================================================

// Menggerakkan timeline ke tahun tujuan secara halus dengan efek easing cubic-out
function animateTimelineYear(targetYear) {
    targetYear = Math.round(targetYear);
    targetYear = Math.max(timeline.minYear, Math.min(timeline.maxYear, targetYear));

    const startYear = timeline.currentYear;
    const startTime = performance.now();
    const duration = 300; // Durasi animasi dalam milidetik

    function frame(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const progress = 1 - Math.pow(1 - t, 3); // Rumus Easing Out Cubic
        const year = startYear + (targetYear - startYear) * progress;

        setTimelineYear(year);

        if (t < 1) {
            requestAnimationFrame(frame);
        }
    }
    requestAnimationFrame(frame);
}

// =========================================================================
// 6. ZOOM & INTERVAL DYNAMIC SCALING
// =========================================================================

// Mengatur perbesaran/perkecilan skala pixel timeline
function zoomTimeline(step) {
    const nextZoom = timeline.pixelPerYear + step;

    if (nextZoom < timeline.minPixelPerYear || nextZoom > timeline.maxPixelPerYear) {
        return; // Batalkan jika melewati ambang batas zoom
    }

    const currentYear = timeline.currentYear;
    timeline.pixelPerYear = nextZoom;

    updateTimelineInterval(); // Sesuaikan ulang kerapatan garis
    buildRuler();             // Gambar ulang penggaris (skala penggaris)
    setTimelineYear(currentYear); // Kembalikan posisi fokus ke tahun sebelum zoom
}

// Menentukan kerapatan interval penggaris secara otomatis berdasarkan tingkat zoom (pixelPerYear)
function updateTimelineInterval() {
    const p = timeline.pixelPerYear;

    if (p < 1.25) {
        timeline.interval = 50;
        timeline.majorInterval = 100;
    } else if (p < 2.5) {
        timeline.interval = 20;
        timeline.majorInterval = 100;
    } else if (p < 5) {
        timeline.interval = 10;
        timeline.majorInterval = 50;
    } else if (p < 10) {
        timeline.interval = 5;
        timeline.majorInterval = 20;
    } else {
        timeline.interval = 1;
        timeline.majorInterval = 10;
    }
}