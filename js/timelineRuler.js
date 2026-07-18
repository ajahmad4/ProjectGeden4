// js/timelineRuler.js
/* ==========================================================
   TIME RULER SYSTEM (ALL-IN-ONE)
========================================================== */

// 1. FUNGSI PEMBANTU UTAMA (Diletakkan di paling atas)
function clearRuler(){
    const container = document.getElementById("timeline-ruler-content");
    if(!container) return null;
    container.innerHTML = "";
    return container;
}

function translateFromYear(year) {
    const viewport = document.getElementById("timeline-ruler");
    const indicator = document.getElementById("timeline-current");

    if (!viewport || !indicator) return 0;

    const indicatorCenter =
        indicator.getBoundingClientRect().left +
        (indicator.offsetWidth / 2);

    const viewportLeft =
        viewport.getBoundingClientRect().left;

    const center =
        indicatorCenter - viewportLeft;

    const yearPosition =
        (year - timeline.minYear) *
        timeline.pixelPerYear;

    return center - yearPosition;
}

function yearToPixel(year){
    return (
        year - timeline.minYear
    ) * timeline.pixelPerYear;
}

function createLine(width) {
    const line = document.createElement("div");
    line.className = "ruler-line";
    line.style.width = width + "px";
    return line;
}

function createTick(year, x) {
    const mark = document.createElement("div");
    mark.className = "ruler-mark";
    mark.style.left = x + "px";

    const tick = document.createElement("div");
    const isMajor = (year - timeline.minYear) % timeline.majorInterval === 0;

    tick.className = "ruler-tick" + (isMajor ? " major" : "");
    mark.appendChild(tick);

    if (isMajor) {
        const label = document.createElement("div");
        label.className = "ruler-label";
        label.textContent = year;
        mark.appendChild(label);
    }

    return mark;
}

// =========================================================================
// DATA ERA SEJARAH
// =========================================================================

function buildEraBackgrounds(container) {
    const oldWrapper = container.querySelector('.eras-background-wrapper');
    if (oldWrapper) oldWrapper.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'eras-background-wrapper';

    // MEMBACA DARI: TIMELINE_ERAS yang berada di timeline-data.js
    TIMELINE_ERAS.forEach(era => {
        const leftX = yearToPixel(era.start);
        const rightX = yearToPixel(era.end);
        const width = rightX - leftX;

        if (width > 0) {
            const eraBlock = document.createElement('div');
            // Menambahkan kelas dinamis era.id
            eraBlock.className = `era-block ${era.id}`;
            eraBlock.style.left = `${leftX}px`;
            eraBlock.style.width = `${width}px`;
            
            // Mengirimkan variabel warna dinamis ke CSS
            eraBlock.style.setProperty("--era-color-rgb", era.colorRgb);

            const labelContainer = document.createElement('div');
            labelContainer.className = 'era-label-container';

            const badge = document.createElement('span');
            badge.className = 'era-badge';
            badge.innerText = era.name;

            labelContainer.appendChild(badge);
            eraBlock.appendChild(labelContainer);
            wrapper.appendChild(eraBlock);
        }
    });

    container.insertBefore(wrapper, container.firstChild);
}

// =========================================================================
// LOGIKA UTAMA BUILD RULER
// =========================================================================

function buildRuler() {
    const container = clearRuler();
    if (!container) return;

    const totalWidth = yearToPixel(timeline.maxYear);
    container.style.width = totalWidth + "px";

    // 1. Gambar Era Terlebih Dahulu (Agar berada di belakang garis penggaris)
    buildEraBackgrounds(container);

    // 2. Gambar Garis utama penggaris
    container.appendChild(createLine(totalWidth));

    // 3. Gambar Tick + Label Tahun
    for (let year = timeline.minYear; year <= timeline.maxYear; year += timeline.interval) {
        const x = yearToPixel(year);
        container.appendChild(createTick(year, x));
    }

    // 4. Bangun Legend Shortcut
    buildLegend();
}

// =========================================================================
// ERA SHORTCUT LEGEND
// =========================================================================

function buildLegend() {
    const container = document.getElementById("timeline-legend");
    if (!container) return;

    container.innerHTML = ""; // Bersihkan dulu sebelum rebuild

    TIMELINE_ERAS.forEach(era => {
        const dot = document.createElement("button");
        dot.className = "legend-dot";
        dot.setAttribute("data-tooltip", era.name);
        dot.setAttribute("aria-label", "Pergi ke " + era.name);
        dot.title = era.name; // fallback tooltip untuk non-CSS

        // Warna titik diambil langsung dari colorRgb era
        dot.style.setProperty("--dot-color", era.colorRgb);

        // Klik: Geser timeline ke tahun awal era dengan animasi halus
        dot.addEventListener("click", () => {
            if (typeof animateTimelineYear === "function") {
                animateTimelineYear(era.start);
            }
        });

        container.appendChild(dot);
    });
}

function moveRuler(year) {
    const content = document.getElementById("timeline-ruler-content");
    if (!content) return;

    timeline.currentTranslate = translateFromYear(year);
    content.style.transform = `translate3d(${timeline.currentTranslate}px, 0, 0)`;
    
    // Sinkronisasi geseran otomatis ditangani browser karena era berada di dalam "content"
}