/**
 * CONVERTER ENGINE: EXCEL XLSX TO JS/JSON DATA ATLAS SKI
 * Mengolah 5 Sheet Excel (ObjekAtlas, Markers, Jalur, Wilayah, Kurikulum)
 * Menjadi file JavaScript asli yang langsung dapat dibaca oleh loader.js
 */

// State Penyimpanan Data Hasil Parse
let parsedData = {
    dataObjekAtlas: [],
    dataMarker: [],
    dataJalur: [],
    dataWilayah: [],
    dataKurikulum: [],
    logs: [],
    errors: []
};

// ==========================================
// 1. DOWLOAD TEMPLATE EXCEL (.XLSX)
// ==========================================
function downloadExcelTemplate() {
    if (typeof XLSX === 'undefined') {
        alert("Library SheetJS (XLSX) belum dimuat. Pastikan koneksi internet terhubung.");
        return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet 1: ObjekAtlas
    const objekAtlasSheet = [
        {
            id: "oa-tahun-gajah",
            nama: "Tahun Gajah",
            tahun: 570,
            periode: "Abad ke-6 M",
            kategori: "peristiwa",
            lokasi: "Mekkah",
            wilayah: "Jazirah Arab",
            era: "era-pra-islam",
            deskripsi: "Pasukan Abrahah dari Kerajaan Yaman menyerang Ka'bah dengan pasukan bergajah.",
            kronologi: "Pada tahun 570 M, pasukan Abrahah dari Yaman menyerang Ka'bah dengan pasukan bergajah...",
            relasi_markers: "m-mekkah",
            relasi_jalur: "j-abrahah",
            relasi_wilayah: "",
            refStoryId: "oa-tahun-gajah-story",
            refStepIndex: 0,
            galeri_urls: "assets/images/era-pra-islam/tahun-gajah-1.jpg|assets/images/era-pra-islam/tahun-gajah-2.jpg",
            galeri_captions: "Ilustrasi Penyerangan Abrahah|Peta Yaman Kuno",
            galeri_sumber: "Arsip Sejarah|Atlas Peta"
        },
        {
            id: "oa-perang-badar",
            nama: "Perang Badar",
            tahun: 624,
            periode: "Abad ke-7 M",
            kategori: "militer",
            lokasi: "Lembah Badar",
            wilayah: "Jazirah Arab",
            era: "era-kenabian",
            deskripsi: "Pertempuran besar pertama antara pasukan Muslim Madinah melawan pasukan Quraisy Mekkah.",
            kronologi: "Perang Badar terjadi pada 17 Ramadan 2 H di lembah Badar...",
            relasi_markers: "m-badar",
            relasi_jalur: "",
            relasi_wilayah: "",
            refStoryId: "",
            refStepIndex: "",
            galeri_urls: "assets/images/era-kenabian/perang-badar-1.jpg",
            galeri_captions: "Peta Strategi Posisi Pasukan Badar",
            galeri_sumber: "Atlas Taktik Militer Islam"
        }
    ];

    // Sheet 2: Markers
    const markersSheet = [
        { id: "m-mekkah", nama: "Mekkah", latitude: 21.4225, longitude: 39.8262 },
        { id: "m-badar", nama: "Lembah Badar", latitude: 23.7822, longitude: 38.7892 },
        { id: "m-gua-hira", nama: "Gua Hira (Jabal Nur)", latitude: 21.4578, longitude: 39.8592 }
    ];

    // Sheet 3: Jalur
    const jalurSheet = [
        {
            id: "j-abrahah",
            nama: "Jalur Pasukan Abrahah ke Ka'bah",
            tipe: "militer",
            tahunMulai: 570,
            tahunSelesai: 570,
            warna: "#8B0000",
            koordinat_json: "[[15.3520, 44.2075], [17.5000, 44.1500], [19.5000, 42.5000], [21.2700, 40.4200], [21.4225, 39.8262]]",
            deskripsi: "Rute invasi pasukan Abrahah dari Sana'a (Yaman) menuju Mekkah."
        }
    ];

    // Sheet 4: Wilayah
    const wilayahSheet = [
        {
            id: "w-samudera-pasai",
            nama: "Wilayah Inti Kesultanan Samudera Pasai",
            tahunMulai: 1267,
            tahunSelesai: 1521,
            warna: "#d36b1e",
            koordinat_json: "[[5.3500, 96.9500], [5.4500, 97.2500], [5.2000, 97.6000], [4.8500, 97.7500], [4.7500, 97.4000], [5.1000, 97.0500]]",
            deskripsi: "Wilayah kedaulatan utama Kesultanan Samudera Pasai."
        }
    ];

    // Sheet 5: Kurikulum
    const kurikulumSheet = [
        {
            story_id: "oa-tahun-gajah-story",
            judulCerita: "Peristiwa Tahun Gajah & Penyerangan Ka'bah (570 M)",
            step_index: 0,
            step_judul: "1. Latar Belakang & Ambisi Abrahah",
            step_konten_html: "<p>Pada pertengahan abad ke-6 M, <strong>Abrahah Al-Asyram</strong> membangun gereja katedral di Sana'a...</p>"
        },
        {
            story_id: "oa-tahun-gajah-story",
            judulCerita: "Peristiwa Tahun Gajah & Penyerangan Ka'bah (570 M)",
            step_index: 1,
            step_judul: "2. Serangan Pasukan Bergajah",
            step_konten_html: "<p>Abrahah memimpin ribuan prajurit yang dilengkapi dengan gajah-gajah perang...</p>"
        }
    ];

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(objekAtlasSheet), "ObjekAtlas");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(markersSheet), "Markers");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(jalurSheet), "Jalur");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(wilayahSheet), "Wilayah");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(kurikulumSheet), "Kurikulum");

    XLSX.writeFile(wb, "Template_Database_Atlas_SKI.xlsx");
}

// ==========================================
// 2. PARSING & KONVERSI EXCEL WORKBOOK
// ==========================================
function processExcelFile(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            parsedData = {
                dataObjekAtlas: [],
                dataMarker: [],
                dataJalur: [],
                dataWilayah: [],
                dataKurikulum: [],
                logs: [],
                errors: []
            };

            // Parse Sheet 1: ObjekAtlas
            if (workbook.Sheets["ObjekAtlas"]) {
                const rawObjek = XLSX.utils.sheet_to_json(workbook.Sheets["ObjekAtlas"], { defval: "" });
                parsedData.dataObjekAtlas = parseSheetObjekAtlas(rawObjek);
            } else {
                parsedData.errors.push("Sheet 'ObjekAtlas' tidak ditemukan di file Excel.");
            }

            // Parse Sheet 2: Markers
            if (workbook.Sheets["Markers"]) {
                const rawMarkers = XLSX.utils.sheet_to_json(workbook.Sheets["Markers"], { defval: "" });
                parsedData.dataMarker = parseSheetMarkers(rawMarkers);
            } else {
                parsedData.logs.push("Sheet 'Markers' tidak ditemukan atau kosong.");
            }

            // Parse Sheet 3: Jalur
            if (workbook.Sheets["Jalur"]) {
                const rawJalur = XLSX.utils.sheet_to_json(workbook.Sheets["Jalur"], { defval: "" });
                parsedData.dataJalur = parseSheetJalur(rawJalur);
            } else {
                parsedData.logs.push("Sheet 'Jalur' tidak ditemukan.");
            }

            // Parse Sheet 4: Wilayah
            if (workbook.Sheets["Wilayah"]) {
                const rawWilayah = XLSX.utils.sheet_to_json(workbook.Sheets["Wilayah"], { defval: "" });
                parsedData.dataWilayah = parseSheetWilayah(rawWilayah);
            } else {
                parsedData.logs.push("Sheet 'Wilayah' tidak ditemukan.");
            }

            // Parse Sheet 5: Kurikulum
            if (workbook.Sheets["Kurikulum"]) {
                const rawKurikulum = XLSX.utils.sheet_to_json(workbook.Sheets["Kurikulum"], { defval: "" });
                parsedData.dataKurikulum = parseSheetKurikulum(rawKurikulum);
            } else {
                parsedData.logs.push("Sheet 'Kurikulum' tidak ditemukan.");
            }

            // Jalankan Validasi Integritas Relasi Data
            validateIntegrity();

            if (typeof callback === 'function') callback(parsedData);

        } catch (err) {
            console.error("Gagal memproses file Excel:", err);
            parsedData.errors.push(`Error membaca file Excel: ${err.message}`);
            if (typeof callback === 'function') callback(parsedData);
        }
    };

    reader.readAsArrayBuffer(file);
}

// ==========================================
// 3. TRANSFORMASI PARSER PER SHEET
// ==========================================

function parseSheetObjekAtlas(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `oa-item-${idx + 1}`).trim();
        const nama = String(row.nama || '').trim();
        const tahun = row.tahun !== "" ? Number(row.tahun) : null;
        const periode = String(row.periode || '').trim();
        const kategori = String(row.kategori || 'peristiwa').trim();
        const lokasi = String(row.lokasi || '').trim();
        const wilayah = String(row.wilayah || '').trim();
        const era = String(row.era || '').trim();
        const deskripsi = String(row.deskripsi || '').trim();
        const kronologi = String(row.kronologi || deskripsi).trim();
        const refStoryId = String(row.refStoryId || '').trim();
        const refStepIndex = row.refStepIndex !== "" ? Number(row.refStepIndex) : 0;

        // Parse Markers, Jalur, Wilayah
        const markersArr = row.relasi_markers ? String(row.relasi_markers).split(',').map(s => s.trim()).filter(Boolean) : [];
        const jalurArr = row.relasi_jalur ? String(row.relasi_jalur).split(',').map(s => s.trim()).filter(Boolean) : [];
        const wilayahArr = row.relasi_wilayah ? String(row.relasi_wilayah).split(',').map(s => s.trim()).filter(Boolean) : [];

        // Parse Galeri Gambar
        const urls = row.galeri_urls ? String(row.galeri_urls).split('|').map(s => s.trim()).filter(Boolean) : [];
        const captions = row.galeri_captions ? String(row.galeri_captions).split('|').map(s => s.trim()) : [];
        const sumbers = row.galeri_sumber ? String(row.galeri_sumber).split('|').map(s => s.trim()) : [];

        const galeri = urls.map((url, i) => ({
            url: url,
            caption: captions[i] || nama,
            sumber: sumbers[i] || "Dokumentasi Sejarah"
        }));

        const item = {
            id,
            nama,
            tahun,
            periode,
            kategori,
            lokasi,
            wilayah,
            deskripsi,
            kronologi,
            era,
            relasi: {
                markers: markersArr,
                jalur: jalurArr,
                wilayah: wilayahArr
            }
        };

        if (galeri.length > 0) item.galeri = galeri;
        if (refStoryId) {
            item.refStoryId = refStoryId;
            item.refStepIndex = refStepIndex;
        }

        return item;
    });
}

function parseSheetMarkers(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `m-item-${idx + 1}`).trim();
        const nama = String(row.nama || id).trim();
        const lat = Number(row.latitude);
        const lng = Number(row.longitude);

        return {
            id,
            nama,
            koordinat: [lat, lng]
        };
    });
}

function parseSheetJalur(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `j-item-${idx + 1}`).trim();
        const nama = String(row.nama || id).trim();
        const tipe = String(row.tipe || 'peristiwa').trim();
        const tahunMulai = Number(row.tahunMulai || 0);
        const tahunSelesai = Number(row.tahunSelesai || tahunMulai);
        const warna = String(row.warna || '#008080').trim();
        const deskripsi = String(row.deskripsi || '').trim();

        let koordinat = [];
        if (row.koordinat_json) {
            try {
                koordinat = JSON.parse(row.koordinat_json);
            } catch (e) {
                parsedData.errors.push(`Gagal membaca koordinat JSON pada Jalur '${id}'`);
            }
        }

        return {
            id,
            nama,
            tipe,
            tahunMulai,
            tahunSelesai,
            warna,
            koordinat,
            deskripsi
        };
    });
}

function parseSheetWilayah(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `w-item-${idx + 1}`).trim();
        const nama = String(row.nama || id).trim();
        const tahunMulai = Number(row.tahunMulai || 0);
        const tahunSelesai = Number(row.tahunSelesai || tahunMulai);
        const warna = String(row.warna || '#d36b1e').trim();
        const deskripsi = String(row.deskripsi || '').trim();

        let koordinat = [];
        if (row.koordinat_json) {
            try {
                koordinat = JSON.parse(row.koordinat_json);
            } catch (e) {
                parsedData.errors.push(`Gagal membaca koordinat JSON pada Wilayah '${id}'`);
            }
        }

        return {
            id,
            nama,
            tahunMulai,
            tahunSelesai,
            warna,
            koordinat,
            deskripsi
        };
    });
}

function parseSheetKurikulum(rows) {
    const mapStories = {};

    rows.forEach(row => {
        const storyId = String(row.story_id || '').trim();
        if (!storyId) return;

        if (!mapStories[storyId]) {
            mapStories[storyId] = {
                id: storyId,
                judulCerita: String(row.judulCerita || storyId).trim(),
                steps: []
            };
        }

        const stepIdx = Number(row.step_index || mapStories[storyId].steps.length);
        const stepJudul = String(row.step_judul || `Langkah ${stepIdx + 1}`).trim();
        const stepKonten = String(row.step_konten_html || '').trim();

        mapStories[storyId].steps.push({
            idx: stepIdx,
            judul: stepJudul,
            konten: stepKonten
        });
    });

    // Sort steps per story
    return Object.values(mapStories).map(story => {
        story.steps.sort((a, b) => a.idx - b.idx);
        story.steps = story.steps.map(s => ({ judul: s.judul, konten: s.konten }));
        return story;
    });
}

// ==========================================
// 4. VALIDASI INTEGRITAS DATA (RELATION CHECK)
// ==========================================
function validateIntegrity() {
    const markerIds = new Set(parsedData.dataMarker.map(m => m.id));
    const jalurIds = new Set(parsedData.dataJalur.map(j => j.id));
    const wilayahIds = new Set(parsedData.dataWilayah.map(w => w.id));
    const storyIds = new Set(parsedData.dataKurikulum.map(k => k.id));

    parsedData.dataObjekAtlas.forEach(objek => {
        // Cek Markers
        objek.relasi.markers.forEach(mId => {
            if (!markerIds.has(mId)) {
                parsedData.errors.push(`[Peringatan Marker] Objek '${objek.nama}' Merujuk Marker '${mId}' yang tidak terdaftar di sheet Markers.`);
            }
        });
        // Cek Jalur
        objek.relasi.jalur.forEach(jId => {
            if (!jalurIds.has(jId)) {
                parsedData.errors.push(`[Peringatan Jalur] Objek '${objek.nama}' Merujuk Jalur '${jId}' yang tidak terdaftar di sheet Jalur.`);
            }
        });
        // Cek Wilayah
        objek.relasi.wilayah.forEach(wId => {
            if (!wilayahIds.has(wId)) {
                parsedData.errors.push(`[Peringatan Wilayah] Objek '${objek.nama}' Merujuk Wilayah '${wId}' yang tidak terdaftar di sheet Wilayah.`);
            }
        });
        // Cek RefStoryId Kurikulum
        if (objek.refStoryId && !storyIds.has(objek.refStoryId)) {
            parsedData.logs.push(`[Info Kurikulum] Objek '${objek.nama}' Merujuk Kurikulum '${objek.refStoryId}' (akan menggunakan template otomatis jika belum terdaftar).`);
        }
    });
}

// ==========================================
// 5. GENERATOR & DOWNLOADER FILE .JS
// ==========================================

function downloadJSFile(varName, filename, dataObj) {
    const codeStr = `const ${varName} = ${JSON.stringify(dataObj, null, 2)};\n`;
    const blob = new Blob([codeStr], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportDataObjekAtlasJS() { downloadJSFile("dataObjekAtlas", "dataObjekAtlas.js", parsedData.dataObjekAtlas); }
function exportDataMarkerJS() { downloadJSFile("dataMarker", "dataMarker.js", parsedData.dataMarker); }
function exportDataJalurJS() { downloadJSFile("dataJalur", "dataJalur.js", parsedData.dataJalur); }
function exportDataWilayahJS() { downloadJSFile("dataWilayah", "dataWilayah.js", parsedData.dataWilayah); }
function exportDataKurikulumJS() { downloadJSFile("dataKurikulum", "datakurikulum.js", parsedData.dataKurikulum); }
