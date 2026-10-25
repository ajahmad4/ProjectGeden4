// js/timelineRuler.js
/* ==========================================================
   TIME RULER SYSTEM (ALL-IN-ONE)
========================================================== */

// Cache DOM references for 60fps performance
let _elRuler = null;
let _elIndicator = null;
let _elRulerContent = null;
let _elLegend = null;

function getRulerElements() {
    if (!_elRuler) _elRuler = document.getElementById("timeline-ruler");
    if (!_elIndicator) _elIndicator = document.getElementById("timeline-current");
    if (!_elRulerContent) _elRulerContent = document.getElementById("timeline-ruler-content");
    if (!_elLegend) _elLegend = document.getElementById("timeline-legend");
    return { ruler: _elRuler, indicator: _elIndicator, content: _elRulerContent, legend: _elLegend };
}

// 1. FUNGSI PEMBANTU UTAMA
function clearRuler() {
    const { content } = getRulerElements();
    if (!content) return null;
    content.innerHTML = "";
    return content;
}

function translateFromYear(year) {
    const { ruler: viewport, indicator } = getRulerElements();
    if (!viewport || !indicator) return 0;

    const indicatorCenter = indicator.getBoundingClientRect().left + (indicator.offsetWidth / 2);
    const viewportLeft = viewport.getBoundingClientRect().left;
    const center = indicatorCenter - viewportLeft;
    const yearPosition = (year - timeline.minYear) * timeline.pixelPerYear;

    return center - yearPosition;
}

function yearToPixel(year) {
    return (year - timeline.minYear) * timeline.pixelPerYear;
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

    if (typeof TIMELINE_ERAS === 'undefined' || !Array.isArray(TIMELINE_ERAS)) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'eras-background-wrapper';

    TIMELINE_ERAS.forEach(era => {
        const leftX = yearToPixel(era.start);
        const rightX = yearToPixel(era.end);
        const width = rightX - leftX;

        if (width > 0) {
            const eraBlock = document.createElement('div');
            eraBlock.className = `era-block ${era.id}`;
            eraBlock.style.left = `${leftX}px`;
            eraBlock.style.width = `${width}px`;
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

    // 1. Gambar Era Terlebih Dahulu (latar belakang)
    buildEraBackgrounds(container);

    // 2. Gambar Garis utama penggaris
    container.appendChild(createLine(totalWidth));

    // 3. Gambar Tick + Label Tahun menggunakan DocumentFragment untuk performa tinggi
    const fragment = document.createDocumentFragment();
    for (let year = timeline.minYear; year <= timeline.maxYear; year += timeline.interval) {
        fragment.appendChild(createTick(year, yearToPixel(year)));
    }
    container.appendChild(fragment);

    // 4. Bangun Legend Shortcut
    buildLegend();
}

// =========================================================================
// ERA SHORTCUT LEGEND
// =========================================================================

function buildLegend() {
    const { legend: container } = getRulerElements();
    if (!container || typeof TIMELINE_ERAS === 'undefined') return;

    container.innerHTML = "";

    const fragment = document.createDocumentFragment();
    TIMELINE_ERAS.forEach(era => {
        const dot = document.createElement("button");
        dot.className = "legend-dot";
        dot.setAttribute("data-tooltip", era.name);
        dot.setAttribute("aria-label", "Pergi ke " + era.name);
        dot.title = era.name;
        dot.style.setProperty("--dot-color", era.colorRgb);

        dot.addEventListener("click", () => {
            if (typeof animateTimelineYear === "function") {
                animateTimelineYear(era.start);
            }
        });

        fragment.appendChild(dot);
    });
    container.appendChild(fragment);
}

function moveRuler(year) {
    const { content } = getRulerElements();
    if (!content) return;

    timeline.currentTranslate = translateFromYear(year);
    content.style.transform = `translate3d(${timeline.currentTranslate}px, 0, 0)`;
}