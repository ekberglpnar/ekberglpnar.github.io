// Carousel durumu
const state = {
    currentSlide: 0,
    totalSlides: 7,
    autoAdvanceInterval: 5000,
    isPaused: false,
    timer: null,
    progressInterval: null,
    progressValue: 0,
    currentLang: 'tr',
    currentTheme: localStorage.getItem('theme') || 'dark'
};

// Dil çevirileri
const translations = {
    tr: {
        // Navigation
        navHome: 'Ana Sayfa',
        navAbout: 'Hakkımda',
        navEducation: 'Eğitim',
        navProjects: 'Projeler',
        navSkills: 'Yetenekler',
        navVolunteer: 'Gönüllü',
        navContact: 'İletişim',
        // Hero Section
        greeting: 'Merhaba, Ben',
        title: 'Backend Developer & Öğrenci',
        tagline: 'Backend teknolojileri ile güçlü ve ölçeklenebilir uygulamalar geliştiriyorum',
        btnContact: 'İletişime Geç',
        btnAbout: 'Hakkımda',
        scrollHint: 'Kaydır veya tıkla',
        // About Section
        aboutTitle: 'Hakkımda',
        aboutIntro: 'Backend geliştirme tutkusuyla dolu bir bilgisayar mühendisliği öğrencisiyim.',
        aboutDesc: 'Modern backend teknolojileri kullanarak güçlü ve ölçeklenebilir web uygulamaları geliştiriyorum. Sürekli öğrenmeye ve kendimi geliştirmeye odaklanıyorum.',
        statYears: 'Yıl Deneyim',
        statProjects: 'Proje',
        personalInfo: 'Kişisel Bilgiler',
        labelName: 'İsim:',
        labelLocation: 'Konum:',
        labelEmail: 'E-posta:',
        labelLanguages: 'Diller:',
        locationValue: 'Kütahya, Türkiye',
        languagesValue: 'Türkçe, İngilizce',
        // Education Section
        educationTitle: 'Eğitim',
        eduDate1: '2024 - Günümüz',
        eduDegree1: 'Bilgisayar Mühendisliği Lisans',
        eduPlace1: 'Kütahya Sağlık Bilimleri Üniversitesi',
        eduDesc1: 'Yazılım mühendisliği, veri yapıları, algoritmalar ve web teknolojileri üzerine kapsamlı eğitim aldım ve eğitimime devam ediyorum.',
        eduDate2: '2022 - 2024',
        eduDegree2: 'Bilgisayar Programcılığı',
        eduPlace2: 'Bursa Uludağ Üniversitesi',
        eduDesc2: 'Yazılım ve üniversite hayatıma ilk adımı burada attım.',
        // Projects Section
        projectsTitle: 'Projeler',
        projDate1: 'Yakında',
        projTitle1: 'Kişisel Projeler',
        projPlace1: 'Çeşitli Teknolojiler',
        projDesc1: 'Node.js, React, MongoDB ve Docker kullanarak geliştirdiğim projeler yakında burada paylaşılacak.',
        // Skills Section
        skillsTitle: 'Yetenekler',
        // Volunteer Section
        volunteerTitle: 'Gönüllü Çalışmalar',
        volTitle1: 'TEMA Vakfı Gönüllüsü',
        volOrg1: 'TEMA Vakfı',
        volDesc1: 'Doğa koruma ve çevre bilinci oluşturma çalışmalarına aktif olarak katılıyorum. Fidan dikimi etkinlikleri ve diğer TEMA aktivitelerinde gönüllü olarak yer alarak sürdürülebilir bir gelecek için katkıda bulunuyorum.',
        // Contact Section
        contactTitle: 'İletişim',
        contactHeading: 'Bana Ulaşın',
        contactDesc: 'Projeleriniz veya iş teklifleri için benimle iletişime geçebilirsiniz.',
        formHeading: 'Mesaj Gönder',
        formName: 'Adınız',
        formEmail: 'E-posta Adresiniz',
        formMessage: 'Mesajınız',
        formSubmit: 'Gönder'
    },
    en: {
        // Navigation
        navHome: 'Home',
        navAbout: 'About',
        navEducation: 'Education',
        navProjects: 'Projects',
        navSkills: 'Skills',
        navVolunteer: 'Volunteer',
        navContact: 'Contact',
        // Hero Section
        greeting: 'Hello, I am',
        title: 'Backend Developer & Student',
        tagline: 'Building powerful and scalable applications with backend technologies',
        btnContact: 'Get in Touch',
        btnAbout: 'About Me',
        scrollHint: 'Scroll or click',
        // About Section
        aboutTitle: 'About Me',
        aboutIntro: 'A computer engineering student passionate about backend development.',
        aboutDesc: 'I develop powerful and scalable web applications using modern backend technologies. I am constantly learning and improving myself.',
        statYears: 'Years Experience',
        statProjects: 'Projects',
        personalInfo: 'Personal Information',
        labelName: 'Name:',
        labelLocation: 'Location:',
        labelEmail: 'Email:',
        labelLanguages: 'Languages:',
        locationValue: 'Kutahya, Turkey',
        languagesValue: 'Turkish, English',
        // Education Section
        educationTitle: 'Education',
        eduDate1: '2024 - Present',
        eduDegree1: 'Computer Engineering Bachelor\'s',
        eduPlace1: 'Kutahya Health Sciences University',
        eduDesc1: 'Receiving comprehensive education in software engineering, data structures, algorithms and web technologies.',
        eduDate2: '2022 - 2024',
        eduDegree2: 'Computer Programming',
        eduPlace2: 'Bursa Uludag University',
        eduDesc2: 'I took my first step into software and university life here.',
        // Projects Section
        projectsTitle: 'Projects',
        projDate1: 'Coming Soon',
        projTitle1: 'Personal Projects',
        projPlace1: 'Various Technologies',
        projDesc1: 'Projects I developed using Node.js, React, MongoDB and Docker will be shared here soon.',
        // Skills Section
        skillsTitle: 'Skills',
        // Volunteer Section
        volunteerTitle: 'Volunteer Work',
        volTitle1: 'TEMA Foundation Volunteer',
        volOrg1: 'TEMA Foundation',
        volDesc1: 'I actively participate in nature conservation and environmental awareness activities. I contribute to a sustainable future by volunteering in tree planting events and other TEMA activities.',
        // Contact Section
        contactTitle: 'Contact',
        contactHeading: 'Get in Touch',
        contactDesc: 'Feel free to contact me for your projects or job opportunities.',
        formHeading: 'Send Message',
        formName: 'Your Name',
        formEmail: 'Your Email',
        formMessage: 'Your Message',
        formSubmit: 'Send'
    }
};

// DOM Elementleri
const carouselTrack = document.getElementById('carouselTrack');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pauseBtn = document.getElementById('pauseBtn');
const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const navDots = document.querySelectorAll('.nav-dot');
const slides = document.querySelectorAll('.slide');

// Dil değiştirme fonksiyonu
function toggleLanguage() {
    state.currentLang = state.currentLang === 'tr' ? 'en' : 'tr';
    langBtn.textContent = state.currentLang === 'tr' ? 'ENG' : 'TR';
    document.documentElement.lang = state.currentLang;
    applyTranslations();
}

// Tema değiştirme
function toggleTheme() {
    state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    localStorage.setItem('theme', state.currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const sunIcon = themeBtn.querySelector('.sun-icon');
    const moonIcon = themeBtn.querySelector('.moon-icon');

    if (state.currentTheme === 'dark') {
        // In dark mode, show sun icon (to switch to light)
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        // In light mode, show moon icon (to switch to dark)
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

function initTheme() {
    // Set initial theme based on saved preference or default to dark
    document.documentElement.setAttribute('data-theme', state.currentTheme);
    updateThemeIcon();
}

function applyTranslations() {
    const t = translations[state.currentLang];

    // Navigation dots labels
    const dotLabels = document.querySelectorAll('.dot-label');
    const navTexts = [t.navHome, t.navAbout, t.navEducation, t.navProjects, t.navSkills, t.navVolunteer, t.navContact];
    dotLabels.forEach((label, i) => {
        if (navTexts[i]) label.textContent = navTexts[i];
    });

    // Hero Section
    document.querySelector('.greeting').textContent = t.greeting;
    document.querySelector('.tagline').textContent = t.tagline;
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons[0]) heroButtons[0].textContent = t.btnContact;
    if (heroButtons[1]) heroButtons[1].textContent = t.btnAbout;
    document.querySelector('.scroll-indicator span').textContent = t.scrollHint;

    // About Section
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
    document.querySelector('.about-intro').textContent = t.aboutIntro;
    document.querySelector('.about-text p:not(.about-intro)').textContent = t.aboutDesc;

    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.statYears;
    if (statLabels[1]) statLabels[1].textContent = t.statProjects;

    document.querySelector('.about-details h3').textContent = t.personalInfo;
    const infoLabels = document.querySelectorAll('.info-label');
    if (infoLabels[0]) infoLabels[0].textContent = t.labelName;
    if (infoLabels[1]) infoLabels[1].textContent = t.labelLocation;
    if (infoLabels[2]) infoLabels[2].textContent = t.labelEmail;
    if (infoLabels[3]) infoLabels[3].textContent = t.labelLanguages;

    // Update location and languages values
    const infoListItems = document.querySelectorAll('.info-list li');
    if (infoListItems[1]) {
        infoListItems[1].innerHTML = `<span class="info-label">${t.labelLocation}</span> ${t.locationValue}`;
    }
    if (infoListItems[3]) {
        infoListItems[3].innerHTML = `<span class="info-label">${t.labelLanguages}</span> ${t.languagesValue}`;
    }

    // Education Section
    const eduTitle = document.querySelector('#education .section-title');
    if (eduTitle) eduTitle.textContent = t.educationTitle;
    const eduItems = document.querySelectorAll('#education .timeline-item');
    if (eduItems[0]) {
        eduItems[0].querySelector('.timeline-title').textContent = t.eduDegree1;
        eduItems[0].querySelector('.timeline-place').textContent = t.eduPlace1;
        eduItems[0].querySelector('.timeline-desc').textContent = t.eduDesc1;
    }
    if (eduItems[1]) {
        eduItems[1].querySelector('.timeline-title').textContent = t.eduDegree2;
        eduItems[1].querySelector('.timeline-place').textContent = t.eduPlace2;
        eduItems[1].querySelector('.timeline-desc').textContent = t.eduDesc2;
    }

    // Projects Section
    const projTitle = document.querySelector('#projects .section-title');
    if (projTitle) projTitle.textContent = t.projectsTitle;
    const projItems = document.querySelectorAll('#projects .timeline-item');
    if (projItems[0]) {
        projItems[0].querySelector('.timeline-date').textContent = t.projDate1;
        projItems[0].querySelector('.timeline-title').textContent = t.projTitle1;
        projItems[0].querySelector('.timeline-place').textContent = t.projPlace1;
        projItems[0].querySelector('.timeline-desc').textContent = t.projDesc1;
    }

    // Skills Section
    const skillsTitle = document.querySelector('#skills .section-title');
    if (skillsTitle) skillsTitle.textContent = t.skillsTitle;

    // Volunteer Section
    const volTitle = document.querySelector('#volunteer .section-title');
    if (volTitle) volTitle.textContent = t.volunteerTitle;
    const volCards = document.querySelectorAll('.volunteer-card');
    if (volCards[0]) {
        volCards[0].querySelector('h3').textContent = t.volTitle1;
        volCards[0].querySelector('.volunteer-org').textContent = t.volOrg1;
        volCards[0].querySelector('.volunteer-desc').textContent = t.volDesc1;
    }

    // Contact Section
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    document.querySelector('.contact-info h3').textContent = t.contactHeading;
    document.querySelector('.contact-info p').textContent = t.contactDesc;
    document.querySelector('.contact-form h3').textContent = t.formHeading;
    document.querySelector('#name').placeholder = t.formName;
    document.querySelector('#email').placeholder = t.formEmail;
    document.querySelector('#message').placeholder = t.formMessage;
    document.querySelector('.contact-form .btn').textContent = t.formSubmit;
}

// Initialize
function init() {
    initTheme();
    updateSlide(0);
    startAutoAdvance();
    addEventListeners();
    addKeyboardNavigation();
    addTouchSupport();

    // Language toggle event
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }

    // Theme toggle event
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
}

// Slayt pozisyonunu güncelle
function updateSlide(index) {
    // Handle wrap-around
    if (index < 0) index = state.totalSlides - 1;
    if (index >= state.totalSlides) index = 0;

    state.currentSlide = index;

    // Move carousel track
    const translateX = -index * 12.5; // Each slide is 12.5% width
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    // Update navigation dots
    navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    // Update slide active class
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    // Reset progress
    resetProgress();
}

// Belirli bir slayta git
function goToSlide(index) {
    updateSlide(index);
    resetAutoAdvance();
}

// goToSlide fonksiyonunu global yap
window.goToSlide = goToSlide;

// Sonraki slayt
function nextSlide() {
    updateSlide(state.currentSlide + 1);
    resetAutoAdvance();
}

// Önceki slayt
function prevSlide() {
    updateSlide(state.currentSlide - 1);
    resetAutoAdvance();
}

// İlerleme çubuğu
function startProgress() {
    state.progressValue = 0;
    progressBar.style.width = '0%';

    const incrementTime = 50; // Update every 50ms
    const incrementValue = (incrementTime / state.autoAdvanceInterval) * 100;

    state.progressInterval = setInterval(() => {
        if (!state.isPaused) {
            state.progressValue += incrementValue;
            progressBar.style.width = `${Math.min(state.progressValue, 100)}%`;
        }
    }, incrementTime);
}

function resetProgress() {
    clearInterval(state.progressInterval);
    state.progressValue = 0;
    progressBar.style.width = '0%';
    if (!state.isPaused) {
        startProgress();
    }
}

// Otomatik ilerleme
function startAutoAdvance() {
    if (state.timer) clearInterval(state.timer);

    state.timer = setInterval(() => {
        if (!state.isPaused) {
            updateSlide(state.currentSlide + 1);
        }
    }, state.autoAdvanceInterval);

    startProgress();
}

function resetAutoAdvance() {
    if (!state.isPaused) {
        startAutoAdvance();
    }
}

// Durdur/Oynat
function togglePause() {
    state.isPaused = !state.isPaused;

    const pauseIcon = pauseBtn.querySelector('.pause-icon');
    const playIcon = pauseBtn.querySelector('.play-icon');

    if (state.isPaused) {
        pauseIcon.classList.add('hidden');
        playIcon.classList.remove('hidden');
        clearInterval(state.progressInterval);
    } else {
        pauseIcon.classList.remove('hidden');
        playIcon.classList.add('hidden');
        startProgress();
    }
}

// Olay dinleyicileri
function addEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Pause button
    pauseBtn.addEventListener('click', togglePause);

    // Navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Pause on hover (optional - for better UX)
    const carousel = document.getElementById('carousel');
    carousel.addEventListener('mouseenter', () => {
        if (!state.isPaused) {
            clearInterval(state.progressInterval);
        }
    });

    carousel.addEventListener('mouseleave', () => {
        if (!state.isPaused) {
            startProgress();
        }
    });
}

// Klavye navigasyonu
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                prevSlide();
                break;
            case 'ArrowRight':
                nextSlide();
                break;
            case ' ':
                e.preventDefault();
                togglePause();
                break;
            case 'Home':
                goToSlide(0);
                break;
            case 'End':
                goToSlide(state.totalSlides - 1);
                break;
        }
    });
}

// Dokunmatik ekran desteği
function addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const carousel = document.getElementById('carousel');

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
}

// İletişim formu işlemcisi
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // For static site, open mailto
        const mailtoLink = `mailto:ekber.code@gmail.com?subject=Portfolio İletişim: ${encodeURIComponent(name)}&body=${encodeURIComponent(`İsim: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`)}`;
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();
    });
}

// DOM hazır olunca başlat
document.addEventListener('DOMContentLoaded', init);
