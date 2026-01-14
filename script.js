const translations = {
    en: {
        jobTitle: "Full Stack Web Developer & Technical Consultant",
        bio: "Building practical web solutions with performance, SEO, and user experience in mind. Founder of AhmedDevly, helping clients connect code, content, and brand.",
        grid: "Grid",
        list: "List",
        footerSub: "All Rights Reserved.",
        langBtn: "عربي"
    },
    ar: {
        jobTitle: "مطور ويب متكامل ومستشار تقني",
        bio: "بناء حلول ويب عملية مع التركيز على الأداء، السيو، وتجربة المستخدم. مؤسس AhmedDevly، أساعد العملاء على ربط الكود بالمحتوى والعلامة التجارية.",
        grid: "شبكة",
        list: "قائمة",
        footerSub: "جميع الحقوق محفوظة.",
        langBtn: "English"
    }
};

// --- Theme Management ---
function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', systemDark ? 'dark' : 'light');
    } else {
        html.setAttribute('data-theme', theme);
    }
    localStorage.setItem('theme_pref', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-btn i');
    if (theme === 'dark') icon.className = 'fas fa-moon';
    else if (theme === 'light') icon.className = 'fas fa-sun';
    else icon.className = 'fas fa-desktop';
}

function toggleTheme() {
    const current = localStorage.getItem('theme_pref') || 'system';
    const next = current === 'dark' ? 'light' : (current === 'light' ? 'system' : 'dark');
    applyTheme(next);
}

// --- Language Management ---
function applyLang(lang) {
    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.getElementById('lang-text').textContent = translations[lang].langBtn;
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.textContent = translations[lang][key];
    });
    localStorage.setItem('lang_pref', lang);
}

// --- View Layout Management ---
function setView(view) {
    const container = document.getElementById('links-container');
    const isList = view === 'list';
    container.classList.toggle('list-view', isList);
    container.classList.toggle('grid-view', !isList);
    document.getElementById('btn-list').classList.toggle('active', isList);
    document.getElementById('btn-grid').classList.toggle('active', !isList);
    localStorage.setItem('view_pref', view);
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    applyTheme(localStorage.getItem('theme_pref') || 'system');
    
    // Language
    applyLang(localStorage.getItem('lang_pref') || 'en');
    
    // View
    setView(localStorage.getItem('view_pref') || 'grid');

    // Listeners
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);
    document.getElementById('lang-btn').addEventListener('click', () => {
        const nextLang = document.documentElement.lang === 'en' ? 'ar' : 'en';
        applyLang(nextLang);
    });
    document.getElementById('btn-grid').addEventListener('click', () => setView('grid'));
    document.getElementById('btn-list').addEventListener('click', () => setView('list'));
    
    // Watch System Theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme_pref') === 'system') applyTheme('system');
    });
});
