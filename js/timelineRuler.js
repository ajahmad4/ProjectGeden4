// js/timelineRuler.js
/* ==========================================================
   TIME RULER
========================================================== */

let currentTranslate = 0;

function yearToTranslate(year, viewportWidth) {

    const center = viewportWidth / 2;

    const yearPosition =
        (year - timeline.minyear)

    return center - yearPosition;

}


function buildRuler() {

    const container = document.getElementById("timeline-ruler-content");

    if (!container) return;

    container.innerHTML = "";

    const totalWidth =
        (timeline.maxYear - timeline.minYear) * timeline.pixelPerYear;

    container.style.width = totalWidth + "px";

    // Garis utama
    const line = document.createElement("div");
    line.className = "ruler-line";
    line.style.left = "0px";
    line.style.width = totalWidth + "px";

    container.appendChild(line);

    // Tick + Label
    for (let year = timeline.minYear; year <= timeline.maxYear; year += timeline.interval) {

        const x =
            (year - timeline.minYear) * timeline.pixelPerYear;

        const mark = document.createElement("div");
        mark.className = "ruler-mark";
        mark.style.left = x + "px";

        const tick = document.createElement("div");
        tick.className = "ruler-tick";

        const label = document.createElement("div");
        label.className = "ruler-label";
        label.textContent = year;

        mark.appendChild(tick);
        mark.appendChild(label);

        container.appendChild(mark);

    }

}/* ==========================================================
   GESER PENGGARIS
========================================================== */

function moveRuler(year) {

    const viewport =
        document.getElementById("timeline-ruler");

    const content =
        document.getElementById("timeline-ruler-content");

    const indicator =
        document.getElementById("timeline-current");

    if (!viewport || !content || !indicator) return;

    // posisi tengah indikator di layar
    const indicatorCenter =
        indicator.getBoundingClientRect().left +
        (indicator.offsetWidth / 2);

    // posisi kiri viewport ruler
    const viewportLeft =
        viewport.getBoundingClientRect().left;

    // posisi indikator relatif terhadap viewport
    const center =
        indicatorCenter - viewportLeft;

    // posisi tahun pada ruler
    const yearPosition =
        (year - timeline.minYear) * timeline.pixelPerYear;

    // translate ruler agar tahun aktif tepat di bawah indikator
    currentTranslate =
        center - yearPosition;

    content.style.transform =
        `translate3d(${currentTranslate}px,0,0)`;

}