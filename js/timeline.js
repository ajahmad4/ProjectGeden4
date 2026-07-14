/* ==========================================================
   ATLAS SEJARAH KEBUDAYAAN ISLAM
   TIMELINE ENGINE
========================================================== */

// ==========================================================
// KONFIGURASI TIMELINE
// ==========================================================

const timeline = {

    // Rentang sejarah global
    minYear: 570,
    maxYear: 2000,

    // Tahun aktif
    currentYear: 570,

    // Lebar jendela yang ditampilkan
    windowSize: 300,

    // Jarak antar label
    interval: 50

};


// ==========================================================
// MENGHITUNG VIEWPORT TIMELINE
// ==========================================================

function getTimelineViewport() {

    let start = timeline.currentYear - (timeline.windowSize / 2);
    let end = timeline.currentYear + (timeline.windowSize / 2);

    if (start < timeline.minYear) {

        start = timeline.minYear;
        end = start + timeline.windowSize;

    }

    if (end > timeline.maxYear) {

        end = timeline.maxYear;
        start = end - timeline.windowSize;

    }

    return {

        start: Math.round(start),
        end: Math.round(end)

    };

}


// ==========================================================
// MEMBUAT LABEL TAHUN
// ==========================================================

function generateTimelineLabels() {

    const viewport = getTimelineViewport();

    const labels = [];

    for (
        let year = viewport.start;
        year <= viewport.end;
        year += timeline.interval
    ) {

        labels.push(year);

    }

    return labels;

}


// ==========================================================
// MENGUBAH TAHUN AKTIF
// ==========================================================

function setTimelineYear(year) {

    timeline.currentYear = Number(year);

}

// ==========================================================
// RENDER LABEL TIMELINE
// ==========================================================

function renderTimelineLabels() {

    const container = document.getElementById("timeline-labels");

    if (!container) return;

    container.innerHTML = "";

    const labels = generateTimelineLabels();

    labels.forEach(year => {

        const item = document.createElement("span");

        item.textContent = year;

        container.appendChild(item);

    });

}

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.getElementById("timeline-slider");

    updateTimelineIndicator();

    if (!slider) return;

    slider.addEventListener("input", function () {

        setTimelineYear(this.value);

        updateTimelineIndicator();

    });

});

// ==========================================================
// POSISI LABEL TAHUN
// ==========================================================

function updateTimelineIndicator() {

    const slider = document.getElementById("timeline-slider");

    const indicator = document.getElementById("timeline-current");

    if (!slider || !indicator) return;

    const min = Number(slider.min);
    const max = Number(slider.max);
    const value = Number(slider.value);

    const percent = ((value - min) / (max - min)) * 100;

    indicator.style.left = percent + "%";

    indicator.textContent = `${value} M`;

}