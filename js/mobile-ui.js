/**
 * MOBILE UI INTERACTION SCRIPT
 * Menangani logika interaksi spesifik mobile seperti:
 * 1. Toggle Dropdown Era (Panel Kiri)
 * 2. Bottom Sheet Drag & Snap (Panel Kanan)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. MOBILE NAV TOGGLE (DROPDOWN ERA)
    // ==========================================
    const navToggle = document.getElementById("mobile-nav-toggle");
    const listPanel = document.getElementById("list-panel");
    
    if (navToggle && listPanel) {
        // Secara default di mobile, tutup list panel saat pertama load (beri class mobile-closed)
        if (window.innerWidth <= 768) {
            listPanel.classList.add("mobile-closed");
        }

        navToggle.addEventListener("click", () => {
            listPanel.classList.toggle("mobile-closed");
            
            // Ubah icon tombol menu
            const icon = navToggle.querySelector('.material-symbols-outlined');
            if (listPanel.classList.contains("mobile-closed")) {
                icon.textContent = "menu_open";
                navToggle.classList.remove("bg-accent", "text-white");
                navToggle.classList.add("bg-badge", "text-title");
            } else {
                icon.textContent = "close";
                navToggle.classList.add("bg-accent", "text-white");
                navToggle.classList.remove("bg-badge", "text-title");
            }
        });
    }

    // ==========================================
    // 2. BOTTOM SHEET TOUCH LOGIC
    // ==========================================
    const detailPanel = document.getElementById("detail-panel");
    
    if (detailPanel) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        let startTransform = 0;

        // Membaca nilai translateY saat ini secara akurat dari computed style
        function getCurrentTranslateY() {
            try {
                const style = window.getComputedStyle(detailPanel);
                const transform = style.transform;
                if (transform !== 'none') {
                    const matrix = new DOMMatrix(transform);
                    return matrix.m42;
                }
            } catch(e) {}
            
            // Fallback kasar jika DOMMatrix gagal
            if (detailPanel.classList.contains('snap-full')) return 0;
            if (detailPanel.classList.contains('snap-half')) return window.innerHeight * 0.5;
            if (detailPanel.classList.contains('snap-peek')) return window.innerHeight * 0.65;
            return window.innerHeight;
        }

        // Event sekarang ditempel ke seluruh panel, BUKAN hanya handle kecil di atas
        detailPanel.addEventListener("touchstart", (e) => {
            // Jangan halangi drag jika disentuh di area teks deskripsi (agar bisa scroll native)
            const scrollableArea = e.target.closest('.overflow-y-auto');
            if (scrollableArea && scrollableArea.scrollHeight > scrollableArea.clientHeight) {
                // Biarkan native text scroll berjalan
                return;
            }

            isDragging = true;
            startY = e.touches[0].clientY;
            startTransform = getCurrentTranslateY();
            
            // Matikan transisi CSS sementara saat digeser dengan jari
            detailPanel.style.transition = "none";
        }, { passive: true });

        detailPanel.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            
            const deltaY = e.touches[0].clientY - startY;
            currentY = startTransform + deltaY;
            
            // Cegah ditarik melewati atap layar
            if (currentY < 0) currentY = 0;
            
            detailPanel.style.transform = `translateY(${currentY}px)`;
        }, { passive: true });

        detailPanel.addEventListener("touchend", () => {
            if (!isDragging) return;
            isDragging = false;
            
            // Kembalikan transisi CSS yang mulus
            detailPanel.style.transition = "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
            detailPanel.style.transform = ""; // Bersihkan style inline, biarkan CSS class yang bekerja

            // Kalkulasi posisi jepretan (snap) berdasarkan tinggi layar
            const screenH = window.innerHeight;
            const ratio = currentY / screenH;
            
            detailPanel.classList.remove("snap-peek", "snap-half", "snap-full");
            
            if (ratio < 0.35) {
                // Ditarik lebih dari setengah layar ke atas
                detailPanel.classList.add("snap-full");
            } else if (ratio < 0.70) {
                // Di posisi tengah layar
                detailPanel.classList.add("snap-half");
            } else if (ratio < 0.90) {
                // Di posisi mengintip di atas timeline
                detailPanel.classList.add("snap-peek");
            } else {
                // Disapu habis ke bawah, tutup panel
                if (typeof tutupDetailPanel === 'function') tutupDetailPanel();
            }
        });
    }
});
