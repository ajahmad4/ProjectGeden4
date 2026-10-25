/**
 * CONVERTER ENGINE TERPADU: EXCEL XLSX <-> JS DATABASE ATLAS SKI
 * Mendukung 5 Komponen Utama:
 * 1. Kurikulum (Kelas -> Bab -> Sub-Materi -> Metadata -> Relasi Peta -> Galeri -> Konten HTML)
 * 2. Objek Atlas (Master Peristiwa & Tokoh Sejarah)
 * 3. Markers (Titik Spasial Koordinat Peta)
 * 4. Jalur (Polyline Rute Pelayaran & Perjalanan)
 * 5. Wilayah (Polygon Teritorial & Area Kekuasaan)
 */

// State Data Global Hasil Parse
let parsedData = {
    dataKurikulum: [],
    dataObjekAtlas: [],
    dataMarker: [],
    dataJalur: [],
    dataWilayah: [],
    logs: [],
    errors: []
};

// Inisialisasi otomatis jika file database sudah diload via script tag
function initConverterFromExistingData() {
    if (typeof dataKurikulum !== 'undefined' && Array.isArray(dataKurikulum)) {
        parsedData.dataKurikulum = JSON.parse(JSON.stringify(dataKurikulum));
    }
    if (typeof dataObjekAtlas !== 'undefined' && Array.isArray(dataObjekAtlas)) {
        parsedData.dataObjekAtlas = JSON.parse(JSON.stringify(dataObjekAtlas));
    }
    if (typeof dataMarker !== 'undefined' && Array.isArray(dataMarker)) {
        parsedData.dataMarker = JSON.parse(JSON.stringify(dataMarker));
    }
    if (typeof dataJalur !== 'undefined' && Array.isArray(dataJalur)) {
        parsedData.dataJalur = JSON.parse(JSON.stringify(dataJalur));
    }
    if (typeof dataWilayah !== 'undefined' && Array.isArray(dataWilayah)) {
        parsedData.dataWilayah = JSON.parse(JSON.stringify(dataWilayah));
    }
    validateIntegrity();
}

// ==========================================
// 1. EKSPOR DATABASE AKTIF SAAT INI KE EXCEL (.XLSX)
// ==========================================
function exportCurrentDatabaseToExcel() {
    if (typeof XLSX === 'undefined') {
        alert("Library SheetJS (XLSX) belum dimuat. Pastikan terhubung internet.");
        return;
    }

    const curKurikulum = parsedData.dataKurikulum.length > 0 ? parsedData.dataKurikulum : (typeof dataKurikulum !== 'undefined' ? dataKurikulum : []);
    const curObjek = parsedData.dataObjekAtlas.length > 0 ? parsedData.dataObjekAtlas : (typeof dataObjekAtlas !== 'undefined' ? dataObjekAtlas : []);
    const curMarkers = parsedData.dataMarker.length > 0 ? parsedData.dataMarker : (typeof dataMarker !== 'undefined' ? dataMarker : []);
    const curJalur = parsedData.dataJalur.length > 0 ? parsedData.dataJalur : (typeof dataJalur !== 'undefined' ? dataJalur : []);
    const curWilayah = parsedData.dataWilayah.length > 0 ? parsedData.dataWilayah : (typeof dataWilayah !== 'undefined' ? dataWilayah : []);

    const wb = XLSX.utils.book_new();

    // 1. Flatten Kurikulum ke Baris Spreadsheet
    const rowsKurikulum = [];
    curKurikulum.forEach(chap => {
        const subList = chap.subMateri || [];
        subList.forEach(sub => {
            const relMarkers = (sub.relasiPeta && sub.relasiPeta.markers) ? sub.relasiPeta.markers.join(", ") : "";
            const relJalur = (sub.relasiPeta && sub.relasiPeta.jalur) ? sub.relasiPeta.jalur.join(", ") : "";
            const relWilayah = (sub.relasiPeta && sub.relasiPeta.wilayah) ? sub.relasiPeta.wilayah.join(", ") : "";

            const galUrls = (sub.galeri || []).map(g => g.url).join(" | ");
            const galCaptions = (sub.galeri || []).map(g => g.caption).join(" | ");

            rowsKurikulum.push({
                kelas: chap.kelas || "12",
                namaKelas: chap.namaKelas || `Kelas ${chap.kelas} MA`,
                bab: chap.bab || 1,
                judulBab: chap.judulBab || "",
                deskripsiBab: chap.deskripsiBab || "",
                id_sub_materi: sub.id || "",
                nomor_sub_materi: sub.nomor || "",
                judul_sub_materi: sub.judul || "",
                metadata_wilayah: (sub.metadata && sub.metadata.wilayah) || "",
                metadata_periode: (sub.metadata && sub.metadata.periode) || "",
                metadata_fokus: (sub.metadata && sub.metadata.fokus) || "",
                metadata_tokoh: (sub.metadata && sub.metadata.tokoh) || "",
                relasi_markers: relMarkers,
                relasi_jalur: relJalur,
                relasi_wilayah: relWilayah,
                galeri_urls: galUrls,
                galeri_captions: galCaptions,
                konten_html: sub.konten || ""
            });
        });
    });

    // 2. Flatten Objek Atlas
    const rowsObjek = curObjek.map(item => {
        const relMarkers = (item.relasi && item.relasi.markers) ? item.relasi.markers.join(", ") : "";
        const relJalur = (item.relasi && item.relasi.jalur) ? item.relasi.jalur.join(", ") : "";
        const relWilayah = (item.relasi && item.relasi.wilayah) ? item.relasi.wilayah.join(", ") : "";

        let urls = "";
        let captions = "";
        let sumbers = "";

        if (Array.isArray(item.galeri) && item.galeri.length > 0) {
            urls = item.galeri.map(g => g.url).join(" | ");
            captions = item.galeri.map(g => g.caption).join(" | ");
            sumbers = item.galeri.map(g => g.sumber || "Dokumentasi").join(" | ");
        } else if (Array.isArray(item.gambar) && item.gambar.length > 0) {
            urls = item.gambar.join(" | ");
            captions = Array.isArray(item.caption) ? item.caption.join(" | ") : "";
            sumbers = "Dokumentasi";
        }

        return {
            id: item.id || "",
            nama: item.nama || "",
            tahun: item.tahun !== undefined ? item.tahun : "",
            periode: item.periode || "",
            kategori: item.kategori || "peristiwa",
            lokasi: item.lokasi || "",
            wilayah: item.wilayah || "",
            era: item.era || "",
            deskripsi: item.deskripsi || "",
            kronologi: item.kronologi || item.deskripsi || "",
            relasi_markers: relMarkers,
            relasi_jalur: relJalur,
            relasi_wilayah: relWilayah,
            refStoryId: item.refStoryId || "",
            refStepIndex: item.refStepIndex !== undefined ? item.refStepIndex : "",
            galeri_urls: urls,
            galeri_captions: captions,
            galeri_sumber: sumbers
        };
    });

    // 3. Markers
    const rowsMarkers = curMarkers.map(m => ({
        id: m.id || "",
        nama: m.nama || "",
        latitude: (m.koordinat && m.koordinat[0] !== undefined) ? m.koordinat[0] : "",
        longitude: (m.koordinat && m.koordinat[1] !== undefined) ? m.koordinat[1] : ""
    }));

    // 4. Jalur
    const rowsJalur = curJalur.map(j => ({
        id: j.id || "",
        nama: j.nama || "",
        tipe: j.tipe || "peristiwa",
        tahunMulai: j.tahunMulai !== undefined ? j.tahunMulai : "",
        tahunSelesai: j.tahunSelesai !== undefined ? j.tahunSelesai : "",
        warna: j.warna || "#008080",
        koordinat_json: JSON.stringify(j.koordinat || []),
        deskripsi: j.deskripsi || ""
    }));

    // 5. Wilayah
    const rowsWilayah = curWilayah.map(w => ({
        id: w.id || "",
        nama: w.nama || "",
        tahunMulai: w.tahunMulai !== undefined ? w.tahunMulai : "",
        tahunSelesai: w.tahunSelesai !== undefined ? w.tahunSelesai : "",
        warna: w.warna || "#d36b1e",
        koordinat_json: JSON.stringify(w.koordinat || []),
        deskripsi: w.deskripsi || ""
    }));

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsKurikulum), "Kurikulum");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsObjek), "ObjekAtlas");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsMarkers), "Markers");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsJalur), "Jalur");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rowsWilayah), "Wilayah");

    XLSX.writeFile(wb, "Database_Lengkap_Atlas_SKI.xlsx");
}

// ==========================================
// 2. UNDUH TEMPLATE EXCEL KOSONG (.XLSX)
// ==========================================
function downloadExcelTemplate() {
    if (typeof XLSX === 'undefined') {
        alert("Library SheetJS (XLSX) belum dimuat. Pastikan terhubung internet.");
        return;
    }

    const wb = XLSX.utils.book_new();

    // Sheet Kurikulum
    const contohKurikulum = [
        {
            kelas: "12",
            namaKelas: "Kelas 12 MA",
            bab: 1,
            judulBab: "Bab 1: Masuknya Islam di Nusantara",
            deskripsiBab: "Analisis jalur perdagangan maritim, teori masuknya Islam, serta bukti arkeologis kuno.",
            id_sub_materi: "materi-12-1-1",
            nomor_sub_materi: "1.1",
            judul_sub_materi: "Teori-Teori Masuknya Islam ke Nusantara",
            metadata_wilayah: "Pesisir Sumatera & Selat Malaka",
            metadata_periode: "Abad ke-7 – 13 M",
            metadata_fokus: "Teori Makkah, Gujarat, Persia, & China",
            metadata_tokoh: "Buya Hamka, Snouck Hurgronje, J. Pijnappel",
            relasi_markers: "m-barus",
            relasi_jalur: "j-jalur-awal-arab",
            relasi_wilayah: "",
            galeri_urls: "assets/images/era-umayyah/jalur-arab-1.jpg | assets/images/era-umayyah/jalur-arab-2.jpg",
            galeri_captions: "Peta Rute Dagang Arab - Nusantara | Makam Papan Tinggi Barus",
            konten_html: "<p>Dicetuskan oleh <strong>Buya Hamka</strong> dan didukung para sejarawan...</p>"
        },
        {
            kelas: "12",
            namaKelas: "Kelas 12 MA",
            bab: 1,
            judulBab: "Bab 1: Masuknya Islam di Nusantara",
            deskripsiBab: "Analisis jalur perdagangan maritim, teori masuknya Islam, serta bukti arkeologis kuno.",
            id_sub_materi: "materi-12-1-2",
            nomor_sub_materi: "1.2",
            judul_sub_materi: "Bandar Niaga Barus & Bukti Arkeologis Awal",
            metadata_wilayah: "Barus, Tapanuli Tengah",
            metadata_periode: "Abad ke-7 – 10 M",
            metadata_fokus: "Kapur Barus & Permukiman Muslim",
            metadata_tokoh: "Syekh Rukunuddin",
            relasi_markers: "m-barus",
            relasi_jalur: "j-jalur-awal-arab",
            relasi_wilayah: "",
            galeri_urls: "assets/images/era-umayyah/jalur-arab-2.jpg",
            galeri_captions: "Kompleks Makam Mahligai Barus",
            konten_html: "<p>Barus dikenal dalam peta kuno Claudius Ptolemaeus sejak abad ke-2 M...</p>"
        }
    ];

    // Sheet ObjekAtlas
    const contohObjekAtlas = [
        {
            id: "oa-tahun-gajah",
            nama: "Tahun Gajah",
            tahun: 570,
            periode: "Abad ke-6 M",
            kategori: "peristiwa",
            lokasi: "Mekkah",
            wilayah: "Jazirah Arab",
            era: "era-pra-islam",
            deskripsi: "Pasukan Abrahah dari Yaman menyerang Ka'bah dengan pasukan bergajah.",
            kronologi: "Pada tahun 570 M, pasukan Abrahah dari Yaman menyerang Ka'bah dengan pasukan bergajah...",
            relasi_markers: "m-mekkah",
            relasi_jalur: "j-abrahah",
            relasi_wilayah: "",
            refStoryId: "",
            refStepIndex: "",
            galeri_urls: "assets/images/era-pra-islam/tahun-gajah-1.jpg | assets/images/era-pra-islam/tahun-gajah-2.jpg",
            galeri_captions: "Ilustrasi Pasukan Abrahah | Peta Yaman Kuno",
            galeri_sumber: "Arsip Sejarah | Atlas Peta"
        }
    ];

    // Sheet Markers
    const contohMarkers = [
        { id: "m-mekkah", nama: "Mekkah", latitude: 21.4225, longitude: 39.8262 },
        { id: "m-barus", nama: "Barus (Fansur)", latitude: 2.0019, longitude: 98.3972 }
    ];

    // Sheet Jalur
    const contohJalur = [
        {
            id: "j-abrahah",
            nama: "Jalur Pasukan Abrahah ke Ka'bah",
            tipe: "militer",
            tahunMulai: 570,
            tahunSelesai: 570,
            warna: "#8B0000",
            koordinat_json: "[[15.3520, 44.2075], [17.5000, 44.1500], [21.4225, 39.8262]]",
            deskripsi: "Rute invasi pasukan Abrahah dari Yaman ke Mekkah."
        }
    ];

    // Sheet Wilayah
    const contohWilayah = [
        {
            id: "w-samudera-pasai",
            nama: "Wilayah Kesultanan Samudera Pasai",
            tahunMulai: 1267,
            tahunSelesai: 1521,
            warna: "#d36b1e",
            koordinat_json: "[[5.3500, 96.9500], [5.4500, 97.2500], [4.7500, 97.4000], [5.1000, 97.0500]]",
            deskripsi: "Wilayah kedaulatan utama Kesultanan Samudera Pasai di pesisir Aceh."
        }
    ];

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contohKurikulum), "Kurikulum");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contohObjekAtlas), "ObjekAtlas");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contohMarkers), "Markers");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contohJalur), "Jalur");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(contohWilayah), "Wilayah");

    XLSX.writeFile(wb, "Template_Database_Atlas_SKI.xlsx");
}

// ==========================================
// 3. PARSING & KONVERSI DARI FILE EXCEL UPLOAD
// ==========================================
function processExcelFile(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            parsedData = {
                dataKurikulum: [],
                dataObjekAtlas: [],
                dataMarker: [],
                dataJalur: [],
                dataWilayah: [],
                logs: [],
                errors: []
            };

            // 1. Parse Kurikulum
            if (workbook.Sheets["Kurikulum"]) {
                const rawKurikulum = XLSX.utils.sheet_to_json(workbook.Sheets["Kurikulum"], { defval: "" });
                parsedData.dataKurikulum = parseSheetKurikulum(rawKurikulum);
            } else {
                parsedData.logs.push("Sheet 'Kurikulum' tidak ditemukan.");
            }

            // 2. Parse ObjekAtlas
            if (workbook.Sheets["ObjekAtlas"]) {
                const rawObjek = XLSX.utils.sheet_to_json(workbook.Sheets["ObjekAtlas"], { defval: "" });
                parsedData.dataObjekAtlas = parseSheetObjekAtlas(rawObjek);
            } else {
                parsedData.errors.push("Sheet 'ObjekAtlas' tidak ditemukan di file Excel.");
            }

            // 3. Parse Markers
            if (workbook.Sheets["Markers"]) {
                const rawMarkers = XLSX.utils.sheet_to_json(workbook.Sheets["Markers"], { defval: "" });
                parsedData.dataMarker = parseSheetMarkers(rawMarkers);
            } else {
                parsedData.logs.push("Sheet 'Markers' tidak ditemukan.");
            }

            // 4. Parse Jalur
            if (workbook.Sheets["Jalur"]) {
                const rawJalur = XLSX.utils.sheet_to_json(workbook.Sheets["Jalur"], { defval: "" });
                parsedData.dataJalur = parseSheetJalur(rawJalur);
            } else {
                parsedData.logs.push("Sheet 'Jalur' tidak ditemukan.");
            }

            // 5. Parse Wilayah
            if (workbook.Sheets["Wilayah"]) {
                const rawWilayah = XLSX.utils.sheet_to_json(workbook.Sheets["Wilayah"], { defval: "" });
                parsedData.dataWilayah = parseSheetWilayah(rawWilayah);
            } else {
                parsedData.logs.push("Sheet 'Wilayah' tidak ditemukan.");
            }

            // Validasi Integritas
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
// 4. PARSER SPESIFIK TIAP SHEET
// ==========================================

// Parse Kurikulum (Mengelompokkan baris ke struktur Kelas -> Bab -> Sub-Materi)
function parseSheetKurikulum(rows) {
    const mapChapters = {};

    rows.forEach((row, idx) => {
        const kelas = String(row.kelas || '12').trim();
        const babNum = Number(row.bab || 1);
        const chapKey = `ski-${kelas}-bab-${babNum}`;

        if (!mapChapters[chapKey]) {
            mapChapters[chapKey] = {
                id: chapKey,
                kelas: kelas,
                namaKelas: String(row.namaKelas || `Kelas ${kelas} MA`).trim(),
                bab: babNum,
                judulBab: String(row.judulBab || `Bab ${babNum}`).trim(),
                deskripsiBab: String(row.deskripsiBab || '').trim(),
                subMateri: []
            };
        }

        // Parse Sub-Materi
        const subId = String(row.id_sub_materi || `materi-${kelas}-${babNum}-${mapChapters[chapKey].subMateri.length + 1}`).trim();
        const subNomor = String(row.nomor_sub_materi || `${babNum}.${mapChapters[chapKey].subMateri.length + 1}`).trim();
        const subJudul = String(row.judul_sub_materi || `Sub-Materi ${subNomor}`).trim();

        const markers = row.relasi_markers ? String(row.relasi_markers).split(',').map(s => s.trim()).filter(Boolean) : [];
        const jalur = row.relasi_jalur ? String(row.relasi_jalur).split(',').map(s => s.trim()).filter(Boolean) : [];
        const wilayah = row.relasi_wilayah ? String(row.relasi_wilayah).split(',').map(s => s.trim()).filter(Boolean) : [];

        // Parse Galeri
        const urls = row.galeri_urls ? String(row.galeri_urls).split('|').map(s => s.trim()).filter(Boolean) : [];
        const captions = row.galeri_captions ? String(row.galeri_captions).split('|').map(s => s.trim()) : [];
        const galeri = urls.map((u, i) => ({
            url: u,
            caption: captions[i] || subJudul
        }));

        mapChapters[chapKey].subMateri.push({
            id: subId,
            nomor: subNomor,
            judul: subJudul,
            metadata: {
                wilayah: String(row.metadata_wilayah || '').trim(),
                periode: String(row.metadata_periode || '').trim(),
                fokus: String(row.metadata_fokus || '').trim(),
                tokoh: String(row.metadata_tokoh || '').trim()
            },
            relasiPeta: {
                markers: markers,
                jalur: jalur,
                wilayah: wilayah
            },
            galeri: galeri,
            konten: String(row.konten_html || '').trim()
        });
    });

    return Object.values(mapChapters);
}

// Parse Objek Atlas
function parseSheetObjekAtlas(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `oa-item-${idx + 1}`).trim();
        const nama = String(row.nama || '').trim();
        const tahun = row.tahun !== "" && !isNaN(Number(row.tahun)) ? Number(row.tahun) : null;
        const periode = String(row.periode || '').trim();
        const kategori = String(row.kategori || 'peristiwa').trim();
        const lokasi = String(row.lokasi || '').trim();
        const wilayah = String(row.wilayah || '').trim();
        const era = String(row.era || '').trim();
        const deskripsi = String(row.deskripsi || '').trim();
        const kronologi = String(row.kronologi || deskripsi).trim();
        const refStoryId = String(row.refStoryId || '').trim();
        const refStepIndex = row.refStepIndex !== "" && !isNaN(Number(row.refStepIndex)) ? Number(row.refStepIndex) : 0;

        const markersArr = row.relasi_markers ? String(row.relasi_markers).split(',').map(s => s.trim()).filter(Boolean) : [];
        const jalurArr = row.relasi_jalur ? String(row.relasi_jalur).split(',').map(s => s.trim()).filter(Boolean) : [];
        const wilayahArr = row.relasi_wilayah ? String(row.relasi_wilayah).split(',').map(s => s.trim()).filter(Boolean) : [];

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

// Parse Markers
function parseSheetMarkers(rows) {
    return rows.map((row, idx) => {
        const id = String(row.id || `m-item-${idx + 1}`).trim();
        const nama = String(row.nama || id).trim();
        const lat = Number(row.latitude);
        const lng = Number(row.longitude);

        return {
            id,
            nama,
            koordinat: [isNaN(lat) ? 0 : lat, isNaN(lng) ? 0 : lng]
        };
    });
}

// Parse Jalur
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
                koordinat = typeof row.koordinat_json === 'string' ? JSON.parse(row.koordinat_json) : row.koordinat_json;
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

// Parse Wilayah
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
                koordinat = typeof row.koordinat_json === 'string' ? JSON.parse(row.koordinat_json) : row.koordinat_json;
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

// ==========================================
// 5. VALIDASI INTEGRITAS RELASI
// ==========================================
function validateIntegrity() {
    parsedData.errors = [];
    parsedData.logs = [];

    const markerIds = new Set(parsedData.dataMarker.map(m => m.id));
    const jalurIds = new Set(parsedData.dataJalur.map(j => j.id));
    const wilayahIds = new Set(parsedData.dataWilayah.map(w => w.id));

    // Validasi Relasi pada Objek Atlas
    parsedData.dataObjekAtlas.forEach(objek => {
        if (objek.relasi && objek.relasi.markers) {
            objek.relasi.markers.forEach(mId => {
                if (!markerIds.has(mId)) {
                    parsedData.errors.push(`[Objek '${objek.nama}'] Merujuk Marker '${mId}' yang belum terdaftar di Sheet Markers.`);
                }
            });
        }
        if (objek.relasi && objek.relasi.jalur) {
            objek.relasi.jalur.forEach(jId => {
                if (!jalurIds.has(jId)) {
                    parsedData.errors.push(`[Objek '${objek.nama}'] Merujuk Jalur '${jId}' yang belum terdaftar di Sheet Jalur.`);
                }
            });
        }
        if (objek.relasi && objek.relasi.wilayah) {
            objek.relasi.wilayah.forEach(wId => {
                if (!wilayahIds.has(wId)) {
                    parsedData.errors.push(`[Objek '${objek.nama}'] Merujuk Wilayah '${wId}' yang belum terdaftar di Sheet Wilayah.`);
                }
            });
        }
    });

    // Validasi Relasi pada Kurikulum
    parsedData.dataKurikulum.forEach(chap => {
        (chap.subMateri || []).forEach(sub => {
            if (sub.relasiPeta && sub.relasiPeta.markers) {
                sub.relasiPeta.markers.forEach(mId => {
                    if (!markerIds.has(mId)) {
                        parsedData.logs.push(`[Kurikulum: ${sub.judul}] Merujuk Marker '${mId}' yang tidak ditemukan di sheet Markers.`);
                    }
                });
            }
            if (sub.relasiPeta && sub.relasiPeta.jalur) {
                sub.relasiPeta.jalur.forEach(jId => {
                    if (!jalurIds.has(jId)) {
                        parsedData.logs.push(`[Kurikulum: ${sub.judul}] Merujuk Jalur '${jId}' yang tidak ditemukan di sheet Jalur.`);
                    }
                });
            }
            if (sub.relasiPeta && sub.relasiPeta.wilayah) {
                sub.relasiPeta.wilayah.forEach(wId => {
                    if (!wilayahIds.has(wId)) {
                        parsedData.logs.push(`[Kurikulum: ${sub.judul}] Merujuk Wilayah '${wId}' yang tidak ditemukan di sheet Wilayah.`);
                    }
                });
            }
        });
    });
}

// ==========================================
// 6. EXPORT / DOWNLOAD FILE JAVASCRIPT
// ==========================================

function downloadJSFile(varName, filename, dataObj) {
    const codeStr = `/**\n * GENERATED BY ATLAS SKI CONVERTER\n * Tanggal: ${new Date().toLocaleString('id-ID')}\n */\n\nconst ${varName} = ${JSON.stringify(dataObj, null, 2)};\n`;
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

function exportDataKurikulumJS() { downloadJSFile("dataKurikulum", "datakurikulum.js", parsedData.dataKurikulum); }
function exportDataObjekAtlasJS() { downloadJSFile("dataObjekAtlas", "dataObjekAtlas.js", parsedData.dataObjekAtlas); }
function exportDataMarkerJS() { downloadJSFile("dataMarker", "dataMarker.js", parsedData.dataMarker); }
function exportDataJalurJS() { downloadJSFile("dataJalur", "dataJalur.js", parsedData.dataJalur); }
function exportDataWilayahJS() { downloadJSFile("dataWilayah", "dataWilayah.js", parsedData.dataWilayah); }

// Unduh Semua File .JS sekaligus dalam 1 ZIP
function downloadAllAsZip() {
    if (typeof JSZip === 'undefined') {
        // Fallback: download satu per satu jika library JSZip tidak ada
        exportDataKurikulumJS();
        setTimeout(exportDataObjekAtlasJS, 300);
        setTimeout(exportDataMarkerJS, 600);
        setTimeout(exportDataJalurJS, 900);
        setTimeout(exportDataWilayahJS, 1200);
        return;
    }

    const zip = new JSZip();
    const dateStr = new Date().toLocaleString('id-ID');
    const header = `/**\n * GENERATED BY ATLAS SKI CONVERTER\n * Tanggal: ${dateStr}\n */\n\n`;

    zip.file("datakurikulum.js", `${header}const dataKurikulum = ${JSON.stringify(parsedData.dataKurikulum, null, 2)};\n`);
    zip.file("dataObjekAtlas.js", `${header}const dataObjekAtlas = ${JSON.stringify(parsedData.dataObjekAtlas, null, 2)};\n`);
    zip.file("dataMarker.js", `${header}const dataMarker = ${JSON.stringify(parsedData.dataMarker, null, 2)};\n`);
    zip.file("dataJalur.js", `${header}const dataJalur = ${JSON.stringify(parsedData.dataJalur, null, 2)};\n`);
    zip.file("dataWilayah.js", `${header}const dataWilayah = ${JSON.stringify(parsedData.dataWilayah, null, 2)};\n`);

    zip.generateAsync({ type: "blob" }).then(function (content) {
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Atlas_SKI_Database_JS.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

// Salin Kode ke Clipboard
function copyCodeToClipboard(varName) {
    let dataObj = parsedData[varName] || [];
    const codeStr = `const ${varName} = ${JSON.stringify(dataObj, null, 2)};`;
    navigator.clipboard.writeText(codeStr).then(() => {
        alert(`Kode ${varName} berhasil disalin ke clipboard!`);
    }).catch(err => {
        alert("Gagal menyalin: " + err);
    });
}
