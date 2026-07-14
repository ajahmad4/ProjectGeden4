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

    currentTranslate: 0,

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

    renderRuler();

}

function setTimelineYear(year){

    year = Math.round(year);

    year = Math.max(

        timeline.minYear,

        Math.min(

            timeline.maxYear,

            year

        )

    );

    timeline.currentYear = year;

    timeline.currentTranslate =

    translateFromYear(year);

    notifyTimelineChanged();

}
function yearFromPixel(deltaX){

    return deltaX * YEAR_PER_PIXEL;

}

function translateToYear(translate){

    const viewport =
        document.getElementById("timeline-ruler");

    const indicator =
        document.getElementById("timeline-current");

    if(!viewport || !indicator)
        return timeline.currentYear;

    const indicatorCenter =
        indicator.getBoundingClientRect().left +
        (indicator.offsetWidth / 2);

    const viewportLeft =
        viewport.getBoundingClientRect().left;

    const center =
        indicatorCenter - viewportLeft;

    const yearPosition =
        center - translate;

    return Math.round(

        timeline.minYear +

        (yearPosition / timeline.pixelPerYear)

    );

}

function dragTimeline(deltaX){

    timeline.currentTranslate += deltaX;

    let year = translateToYear(

        timeline.currentTranslate

    );

    year = Math.max(

        timeline.minYear,

        Math.min(

            timeline.maxYear,

            year

        )

    );

    timeline.currentYear = year;

    timeline.currentTranslate =

        translateFromYear(year);

    notifyTimelineChanged();

}