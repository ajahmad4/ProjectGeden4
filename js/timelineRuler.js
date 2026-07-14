// js/timelineRuler.js
/* ==========================================================
   TIME RULER
========================================================== */

function translateFromYear(year) {

    const viewport =
        document.getElementById("timeline-ruler");

    const indicator =
        document.getElementById("timeline-current");

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

function renderRuler() {

    const content =
        document.getElementById("timeline-ruler-content");

    if (!content) return;

    content.style.transform =
        `translate3d(${timeline.currentTranslate}px,0,0)`;

}
