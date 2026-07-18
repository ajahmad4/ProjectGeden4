/**
 * LOGIKA PENGATURAN TEMA (DARK/LIGHT MODE)
 * File: js/theme.js
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Cek preferensi user yang tersimpan atau preferensi sistem
    const currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    // Terapkan tema saat load
    applyTheme(currentTheme);

    // Event listener untuk tombol toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = 'light_mode'; 
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = 'dark_mode';
        }

        // Trigger custom event so other scripts (like map.js) can react
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
});
