//js/timeline.js
/* ==========================================================
   ATLAS SEJARAH KEBUDAYAAN ISLAM
   TIMELINE ENGINE
========================================================== */

// ==========================================================
// KONFIGURASI TIMELINE
// ==========================================================

const timeline = {

    minYear: 570,
    maxYear: 2000,

    currentYear: 570,

    currentTranslate:0,
    
    pixelPerYear: 2,

    zoomStep: 0.25,

    minPixelPerYear: 1,
    maxPixelPerYear: 20,

    interval: 50,

    majorInterval:100,

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

    indicator.value =
        timeline.currentYear;

}

// ==========================================================
// INITIALIZE
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    updateTimelineInterval();
    
    buildRuler();

    setTimelineYear(timeline.currentYear);

    const timelineTrack =
        document.getElementById("timeline-track");

    if (!timelineTrack) return;

    timelineTrack.addEventListener("wheel", (e) => {

        e.preventDefault();

        if (e.deltaY < 0) {

            zoomTimeline(timeline.zoomStep);

        } else {

            zoomTimeline(-timeline.zoomStep);

        }

    }, { passive: false });

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

        const deltaX =
            e.clientX - timeline.startX;

        timeline.startX = e.clientX;

        dragTimeline(deltaX);

    });

    window.addEventListener("blur", () => {

    timeline.dragging = false;

    });

    window.addEventListener("mouseup", () => {

        timeline.dragging = false;

    });

    window.addEventListener("keydown",(e)=>{

        if(e.key==="="){

            e.preventDefault();

            zoomTimeline(timeline.zoomStep);

        }

        if(e.key==="-"){

            e.preventDefault();

            zoomTimeline(-timeline.zoomStep);

        }
    });

    window.addEventListener("resize", () =>{

        buildRuler();

        moveRuler(timeline.currentYear);
    });

    const yearInput =
    document.getElementById(
        "timeline-year-input"
    );

    const yearButton =
        document.getElementById(
            "timeline-year-button"
        );

    if(yearInput && yearButton){

        yearButton.addEventListener("click", () => {

            const year =
                Number(
                    yearInput.value
                );

            if(Number.isNaN(year)) return;

            animateTimelineYear(year);

        });

        yearInput.addEventListener("keydown", (e) => {

            if(e.key !== "Enter") return;

            const year =
                Number(
                    yearInput.value
                );

            if(Number.isNaN(year)) return;

            animateTimelineYear(year);

        });

    }

    const indicator =
    document.getElementById(
        "timeline-current"
    );

    indicator.addEventListener("keydown", (e) => {

        if(e.key !== "Enter") return;

        const year =
            Number(indicator.value);

        if(Number.isNaN(year)){

            indicator.value =
                timeline.currentYear;

            return;

        }

        animateTimelineYear(year);

    });

        indicator.addEventListener("blur", () => {

        indicator.value =
            timeline.currentYear;

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

    timeline.currentTranslate =

        translateFromYear(year);

    notifyTimelineChanged();

}

function animateTimelineYear(targetYear){

    targetYear = Math.round(targetYear);

    targetYear = Math.max(

        timeline.minYear,

        Math.min(

            timeline.maxYear,

            targetYear

        )

    );

    const startYear =
        timeline.currentYear;

    const startTime =
        performance.now();

    const duration =
        300;

    function frame(now){

        const t = Math.min(

            (now - startTime) / duration,

            1

        );

        const progress =

            1 - Math.pow(1 - t, 3);

        const year =

            startYear +

            (

                targetYear -

                startYear

            )

            * progress;

        setTimelineYear(year);

        if(t < 1){

            requestAnimationFrame(frame);

        }

    }

    requestAnimationFrame(frame);

}

function yearFromPixel(deltaX){

    return deltaX / timeline.pixelPerYear;

}

function dragTimeline(deltaX){

    const deltaYear =
        yearFromPixel(deltaX);

    setTimelineYear(

        timeline.currentYear - deltaYear

    );

}

function zoomTimeline(step){

    const nextZoom = timeline.pixelPerYear + step;

    if(
        nextZoom < timeline.minPixelPerYear ||
        nextZoom > timeline.maxPixelPerYear
    ){
        return;
    }

    const currentYear = timeline.currentYear;

    timeline.pixelPerYear = nextZoom;

    updateTimelineInterval();

    buildRuler();

    setTimelineYear(currentYear);

}

function updateTimelineInterval(){

    const p = timeline.pixelPerYear;

    if(p < 1){

        timeline.interval = 100;
        timeline.majorInterval = 500;

    }else if(p < 2){

        timeline.interval = 50;
        timeline.majorInterval = 100;

    }else if(p < 4){

        timeline.interval = 20;
        timeline.majorInterval = 100;

    }else if(p < 8){

        timeline.interval = 10;
        timeline.majorInterval = 50;

    }else if(p < 16){

        timeline.interval = 5;
        timeline.majorInterval = 20;

    }else{

        timeline.interval = 1;
        timeline.majorInterval = 10;

    }

}