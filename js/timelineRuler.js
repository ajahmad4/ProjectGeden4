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

function yearToPixel(year){

    return (
        year - timeline.minYear
    ) * timeline.pixelPerYear;

}

function getVisibleYears(){

    const viewport =
        document.getElementById("timeline-ruler");

    if(!viewport){

        return null;

    }

    const leftPixel =
        -timeline.currentTranslate;

    const rightPixel =
        leftPixel + viewport.clientWidth;

    const leftYear =
        timeline.minYear +
        (leftPixel / timeline.pixelPerYear);

    const rightYear =
        timeline.minYear +
        (rightPixel / timeline.pixelPerYear);

    const firstYear =

        Math.floor(

            leftYear /

            timeline.interval

        ) * timeline.interval;

    const lastYear =

        Math.ceil(

            rightYear /

            timeline.interval

        ) * timeline.interval;

    return {

        firstYear,

        lastYear

    };

}

function debugVisibleYears(){

    const range =
        getVisibleYears();

    if(!range) return;

    console.log(

        "Visible:",

        range.firstYear,

        "-",

        range.lastYear

    );

}

function createLine(width){

    const line =
        document.createElement("div");

    line.className = "ruler-line";

    line.style.left = "0px";

    line.style.width =
        width + "px";

    return line;

}

function createTick(year, x){

    const mark =
        document.createElement("div");

    mark.className = "ruler-mark";

    mark.style.left =
        x + "px";

    const tick =
        document.createElement("div");

    tick.className =
        "ruler-tick";

    if(
        year % timeline.majorInterval === 0
    ){

        tick.classList.add("major");

    }

    mark.appendChild(tick);

    if(
        year % timeline.majorInterval === 0
    ){

        const label =
            document.createElement("div");

        label.className =
            "ruler-label";

        label.textContent =
            year;

        mark.appendChild(label);

    }

    return mark;

}

function clearRuler(){

    const container =
        document.getElementById(
            "timeline-ruler-content"
        );

    if(!container) return null;

    container.innerHTML = "";

    return container;

}

function buildRuler() {

    const container =
        clearRuler()
        
    if (!container) return;

    const totalWidth =
        yearToPixel(
            timeline.maxYear
        );

    container.style.width =
        totalWidth + "px";

    // Garis utama
    container.appendChild(
        createLine(totalWidth)
    );

    // Tick + Label
    for (

        let year = timeline.minYear;

        year <= timeline.maxYear;

        year += timeline.interval

    ){

        const x =
            yearToPixel(year);

        container.appendChild(

            createTick(

                year,

                x

            )

        );

    }
}
/* ==========================================================
   GESER PENGGARIS
========================================================== */

function moveRuler(year) {

    const content =
        document.getElementById("timeline-ruler-content");

    if (!content) return;

    timeline.currentTranslate =
        translateFromYear(year);

    content.style.transform =
        `translate3d(${timeline.currentTranslate}px,0,0)`;

}
