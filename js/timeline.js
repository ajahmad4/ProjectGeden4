//js/timeline.js
/* ==========================================================
   ATLAS SEJARAH KEBUDAYAAN ISLAM
   TIMELINE ENGINE
========================================================== */

// ==========================================================
// KONFIGURASI TIMELINE
// ==========================================================

const YEAR_PER_PIXEL = 1;

const timeline = {

    minYear: 570,
    maxYear: 2000,

    currentYear: 570,

    pixelPerYear: 2,

    interval: 50,

    dragging: false,

    startX: 0

};

// ==========================================================
// UPDATE INDIKATOR
// ==========================================================

function updateTimelineIndicator() {

    const indicator =
        document.getElementById("timeline-current");

    if (!indicator) return;

    indicator.textContent =
        `${timeline.currentYear} M`;

}

// ==========================================================
// INITIALIZE
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    buildRuler();

    setTimelineYear(timeline.currentYear);

    const timelineTrack =
        document.getElementById("timeline-track");

    if (!timelineTrack) return;

    timelineTrack.addEventListener("mousedown", (e) => {

        timeline.dragging = true;

        timeline.startX = e.clientX;

    });

    window.addEventListener("mousemove", (e) => {

        if (!timeline.dragging) return;

        const deltaX =
            e.clientX - timeline.startX;

        timeline.startX = e.clientX;

        dragTimeline(deltaX);

    });

    window.addEventListener("mouseup", () => {

        timeline.dragging = false;

    });

});

//=========================================================
//=========================================================

function notifyTimelineChanged(){

    updateTimelineIndicator();

    moveRuler(timeline.currentYear);

}

function setTimelineYear(year){

    year = Math.round(year);

    year = Math.max(
        timeline.minYear,
        Math.min(timeline.maxYear, year)
    );

    timeline.currentYear = year;

    notifyTimelineChanged();

}

function yearFromPixel(deltaX){

    return deltaX * YEAR_PER_PIXEL;

}

function dragTimeline(deltaX){

    const deltaYear =
        yearFromPixel(deltaX);

    setTimelineYear(

        timeline.currentYear - deltaYear

    );

}