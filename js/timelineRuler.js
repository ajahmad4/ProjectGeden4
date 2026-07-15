// =========================================================================
// ATLAS SEJARAH KEBUDAYAAN ISLAM - TIME RULER ENGINE
// File: js/timelineRuler.js
// =========================================================================

// =========================================================================
// 1. FUNGSI UTILITAS MATEMATIKA / KONVERSI POSISI
// =========================================================================

/**
 * Menghitung nilai translasi horizontal (X) agar tahun target berada tepat 
 * di tengah indikator penunjuk waktu aktif.
 */
function translateFromYear(year) {
    const viewport = DOM.viewport;
    const indicator = DOM.indicator;

    if (!viewport || !indicator) return 0;

    // Cari titik tengah dari elemen penunjuk (indicator) relatif terhadap viewport
    const indicatorCenter = indicator.getBoundingClientRect().left + (indicator.offsetWidth / 2);
    const viewportLeft = viewport.getBoundingClientRect().left;
    const center = indicatorCenter - viewportLeft;

    // Hitung posisi pixel dari tahun yang dituju
    const yearPosition = (year - timeline.minYear) * timeline.pixelPerYear;

    // Kembalikan offset translasi agar tahun sejajar di tengah
    return center - yearPosition;
}

/**
 * Mengonversi nilai tahun menjadi posisi pixel relatif dari titik awal (tahun minimum).
 */
function yearToPixel(year) {
    return (year - timeline.minYear) * timeline.pixelPerYear;
}

/**
 * Menghitung rentang tahun awal dan akhir yang saat ini terlihat di layar viewport.
 * Berguna untuk optimasi render jika diperlukan.
 */
function getVisibleYears() {
    const viewport = document.getElementById("timeline-ruler");
    if (!viewport) return null;

    const leftPixel = -timeline.currentTranslate;
    const rightPixel = leftPixel + viewport.clientWidth;

    const leftYear = timeline.minYear + (leftPixel / timeline.pixelPerYear);
    const rightYear = timeline.minYear + (rightPixel / timeline.pixelPerYear);

    // Dibulatkan ke kelipatan interval terdekat
    const firstYear = Math.floor(leftYear / timeline.interval) * timeline.interval;
    const lastYear = Math.ceil(rightYear / timeline.interval) * timeline.interval;

    return { firstYear, lastYear };
}

/**
 * Debugging untuk mencetak rentang tahun yang terlihat ke konsol developer.
 */
function debugVisibleYears() {
    const range = getVisibleYears();
    if (!range) return;
    console.log("Visible:", range.firstYear, "-", range.lastYear);
}

// =========================================================================
// 2. FUNGSI PEMBUATAN ELEMEN DOM (RULER GENERATOR)
// =========================================================================

/**
 * Membuat elemen garis horizontal utama penggaris.
 */
function createLine(width) {
    const line = document.createElement("div");
    line.className = "ruler-line";
    line.style.left = "0px";
    line.style.width = width + "px";
    return line;
}

/**
 * Membuat tanda garis vertikal (tick) beserta label tahun jika masuk skala major.
 */
function createTick(year, x) {
    const mark = document.createElement("div");
    mark.className = "ruler-mark";
    mark.style.left = x + "px";

    const tick = document.createElement("div");
    tick.className = "ruler-tick";

    // Cek apakah tahun ini merupakan kelipatan interval besar (Major Interval)
    if (year % timeline.majorInterval === 0) {
        tick.classList.add("major");
    }
    mark.appendChild(tick);

    // Tambahkan teks label tahun jika berada di interval besar
    if (year % timeline.majorInterval === 0) {
        const label = document.createElement("div");
        label.className = "ruler-label";
        label.textContent = year;
        mark.appendChild(label);
    }

    return mark;
}

/**
 * Membersihkan seluruh isi elemen kontainer penggaris sebelum digambar ulang.
 */
function clearRuler() {
    const container = DOM.rulerContent;
    if (!container) return null;
    container.innerHTML = "";
    return container;
}

// =========================================================================
// 3. FUNGSI KONTROL RENDERING & PERGESERAN (BUILD & MOVE)
// =========================================================================

/**
 * Membangun ulang seluruh struktur fisik penggaris (garis, tick, dan label).
 * Dipanggil setiap kali inisialisasi awal atau saat terjadi perubahan tingkat zoom.
 */
function buildRuler() {
    const container = clearRuler();
    if (!container) return;

    // Set lebar total kontainer berdasarkan rentang tahun maksimal
    const totalWidth = yearToPixel(timeline.maxYear);
    container.style.width = totalWidth + "px";

    // Render garis dasar horizontal
    container.appendChild(createLine(totalWidth));

    // Render semua garis penanda (ticks) dari tahun minimal hingga maksimal
    for (let year = timeline.minYear; year <= timeline.maxYear; year += timeline.interval) {
        const x = yearToPixel(year);
        container.appendChild(createTick(year, x));
    }
}

/**
 * Menggeser posisi fisik penggaris secara horizontal menggunakan GPU-Accelerated 3D Transform
 * agar sejajar dengan koordinat tahun aktif saat ini.
 */
function moveRuler(year) {
    const content = DOM.rulerContent;
    if (!content) return;

    timeline.currentTranslate = translateFromYear(year);
    content.style.transform = `translate3d(${timeline.currentTranslate}px, 0, 0)`;
}