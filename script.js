document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll event to change header style
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '2rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // Add subtle fade-in animation for sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Add staggered animation for portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Add staggered animation for skills
    const skillItems = document.querySelectorAll('.skills-list li');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add hover effect to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            portfolioItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                    otherItem.style.transform = 'scale(0.95)';
                }
            });
        });
        
        item.addEventListener('mouseleave', () => {
            portfolioItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
                otherItem.style.transform = 'translateY(0)';
            });
        });
    });

    // Add typing effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-content p');
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('span');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Light Mode';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Language toggle functionality
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle.querySelector('span');
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('lang') || 'en';
    if (savedLang === 'no') {
        changeLanguage('no');
        langText.textContent = 'NO';
    }
    
    langToggle.addEventListener('click', function() {
        const currentLang = langText.textContent;
        if (currentLang === 'EN') {
            changeLanguage('no');
            langText.textContent = 'NO';
            localStorage.setItem('lang', 'no');
        } else {
            changeLanguage('en');
            langText.textContent = 'EN';
            localStorage.setItem('lang', 'en');
        }
    });
    
    function changeLanguage(lang) {
        const translations = {
            en: {
                // Navigation
                'nav-about': 'About',
                'nav-portfolio': 'Projects',
                'nav-resume': 'Resume',
                'nav-contact': 'Contact',
                
                // Hero
                'hero-title': 'Renewable Energy Engineer',
                'hero-btn': 'Learn More',
                
                // About
                'about-heading': 'About Me',
                'about-p1': 'I am honest, direct, and value clear, open communication. I express my opinions openly, welcome constructive feedback, and continually strive for personal and professional growth. I am goal-oriented, efficient, and passionate about productive activities.',
                'about-p2': 'With a solid foundation in engineering principles and a growing interest in programming and simulation tools, I am motivated by solving challenges within renewable energy. I strive to contribute to solutions that are both technically effective and environmentally sustainable.',
                'stat-years': 'Years Studying Engineering',
                'stat-projects': 'Engineering Projects',
                
                // Portfolio
                'portfolio-heading': 'Projects',
                'at-description': 'Charity project providing background music for a good cause. A collaborative initiative to support communities in need through music.',
                'tqh-description': 'A platform making music more accessible, providing music for focus and relaxation.',
                'visit-btn': 'Visit Website',
                'more-to-come': 'More to come',
                
                // Resume
                'resume-heading': 'Resume',
                'resume-subtitle': 'My academic background and engineering skills.',
                'download-btn': 'Download Resume',
                'education-heading': 'Education',
                'bachelor-title': 'Bachelor in Renewable Energy Engineering',
                'ntnu': 'Norwegian University of Science and Technology (NTNU)',
                'education-detail1': 'Focused on sustainable energy technologies and systems',
                'education-detail2': 'Exchange Program: UPV (Valencia), Fall 2024',
                'experience-heading': 'Experience',
                'experience-title1': 'Personal Assistant - Brageva',
                'experience-date1': '2024 - Present',
                'experience-desc1': 'Assisted a young individual with daily activities, enhancing his independence and balancing the needs of parents, child, and coordinator.',
                'experience-title2': 'Personal Assistant - Mio BPA',
                'experience-date2': '2022 - 2024',
                'experience-desc2': 'Supported an individual\'s daily activities, improved their comfort, and efficiently managed multiple simultaneous tasks.',
                'experience-title3': 'Security Soldier - Norwegian Armed Forces',
                'experience-date3': '2020 - 2021',
                'experience-desc3': 'Controlled inbound and outbound traffic, managed unexpected events at Lutvann Camp as part of a five-person team.',
                'additional-experience': 'Additional Experience',
                'additional-title1': 'Youth With A Mission (YWAM) - Volunteer Work',
                'additional-date1': '2022',
                'additional-desc1': 'Cross-cultural collaboration, adaptability, and problem-solving in challenging international settings in Hawaii/Colombia.',
                'additional-title2': 'Production Worker - Bergene Holm AS',
                'additional-date2': '2021',
                'additional-desc2': 'Tasks in production lines, quality control, and safety procedures, demonstrating structured and goal-oriented work.',
                'additional-title3': 'Barista - Café Sliperiet',
                'additional-date3': '2019 - 2021',
                'additional-desc3': 'Customer service and efficiency in a fast-paced environment, developing strong skills in communication and problem-solving.',
                'skills-heading': 'Skills',
                
                // Contact
                'contact-heading': 'Contact',
                'contact-text': 'Interested in discussing renewable energy solutions or collaboration opportunities? Feel free to reach out.',
                'email-btn': 'Email Me',
                'linkedin-btn': 'LinkedIn',
                'phone-btn': '+47 458 75 223',
                
                // Footer
                'copyright': '© 2023 Bror Tobias Rinde. All rights reserved.',
                'address': 'Holtermanns veg 41, 7031 Trondheim, Norway',
                'theme-btn': 'Dark Mode',
                'lang-btn': 'EN',
                
                // Skills
                'skill-norwegian': 'Norwegian (native)',
                'skill-english': 'English (fluent)',
                'skill-spanish': 'Spanish (basic)',
            },
            no: {
                // Navigation
                'nav-about': 'Om meg',
                'nav-portfolio': 'Prosjekter',
                'nav-resume': 'CV',
                'nav-contact': 'Kontakt',
                
                // Hero
                'hero-title': 'Fornybar Energiingeniør',
                'hero-btn': 'Lær mer',
                
                // About
                'about-heading': 'Om meg',
                'about-p1': 'Jeg er ærlig, direkte og verdsetter klar, åpen kommunikasjon. Jeg uttrykker mine meninger åpent, ønsker konstruktive tilbakemeldinger velkommen, og streber kontinuerlig etter personlig og faglig vekst. Jeg er målorientert, effektiv og lidenskapelig opptatt av produktive aktiviteter.',
                'about-p2': 'Med et solid grunnlag i ingeniørprinsipper og en voksende interesse for programmering og simuleringsverktøy, er jeg motivert av å løse utfordringer innen fornybar energi. Jeg streber etter å bidra til løsninger som er både teknisk effektive og miljømessig bærekraftige.',
                'stat-years': 'År med ingeniørstudier',
                'stat-projects': 'Ingeniørprosjekter',
                
                // Portfolio
                'portfolio-heading': 'Prosjekter',
                'at-description': 'Veldedighetsprosjekt som leverer bakgrunnsmusikk for en god sak. Et samarbeidsinitiativ for å støtte samfunn i nød gjennom musikk.',
                'tqh-description': 'En plattform som gjør musikk mer tilgjengelig, med musikk for fokus og avslapning.',
                'visit-btn': 'Besøk Nettsted',
                'more-to-come': 'Mer kommer',
                
                // Resume
                'resume-heading': 'CV',
                'resume-subtitle': 'Min akademiske bakgrunn og ingeniørferdigheter.',
                'download-btn': 'Last ned CV',
                'education-heading': 'Utdanning',
                'bachelor-title': 'Bachelor i Fornybar Energi',
                'ntnu': 'Norges teknisk-naturvitenskapelige universitet (NTNU)',
                'education-detail1': 'Fokusert på bærekraftige energiteknologier og systemer',
                'education-detail2': 'Utvekslingsprogram: UPV (Valencia), Høst 2024',
                'experience-heading': 'Erfaring',
                'experience-title1': 'Personlig Assistent - Brageva',
                'experience-date1': '2024 - Nåværende',
                'experience-desc1': 'Assistert en ung person med daglige aktiviteter, forbedret hans selvstendighet og balansert behovene til foreldre, barn og koordinator.',
                'experience-title2': 'Personlig Assistent - Mio BPA',
                'experience-date2': '2022 - 2024',
                'experience-desc2': 'Støttet en persons daglige aktiviteter, forbedret deres komfort og effektivt håndtert flere samtidige oppgaver.',
                'experience-title3': 'Sikkerhet Soldat - Norske Forsvaret',
                'experience-date3': '2020 - 2021',
                'experience-desc3': 'Kontrollerte inngående og utgående trafikk, håndterte uventede hendelser på Lutvann Leir som en del av et fem-personers team.',
                'additional-experience': 'Ytterligere Erfaring',
                'additional-title1': 'Ungdom med Oppdrag (UMO) - Frivillig Arbeid',
                'additional-date1': '2022',
                'additional-desc1': 'Tverrkulturellt samarbeid, tilpasningsevne og problemløsning i utfordrende internasjonale settinger i Hawaii/Colombia.',
                'additional-title2': 'Produksjonsarbeider - Bergene Holm AS',
                'additional-date2': '2021',
                'additional-desc2': 'Oppgaver i produksjonslinjer, kvalitetskontroll og sikkerhetsprosedyrer, som viser strukturert og målorientert arbeid.',
                'additional-title3': 'Barista - Café Sliperiet',
                'additional-date3': '2019 - 2021',
                'additional-desc3': 'Kundeservice og effektivitet i et hektisk miljø, med utvikling av sterke ferdigheter i kommunikasjon og problemløsning.',
                'skills-heading': 'Ferdigheter',
                
                // Contact
                'contact-heading': 'Kontakt',
                'contact-text': 'Interessert i å diskutere fornybare energiløsninger eller samarbeidsmuligheter? Ta gjerne kontakt.',
                'email-btn': 'E-post',
                'linkedin-btn': 'LinkedIn',
                'phone-btn': '+47 458 75 223',
                
                // Footer
                'copyright': '© 2023 Bror Tobias Rinde. Alle rettigheter reservert.',
                'address': 'Holtermanns veg 41, 7031 Trondheim, Norge',
                'theme-btn': 'Mørk Modus',
                'lang-btn': 'NO',
                
                // Skills
                'skill-norwegian': 'Norsk (morsmål)',
                'skill-english': 'Engelsk (flytende)',
                'skill-spanish': 'Spansk (grunnleggende)',
            }
        };
        
        // Update text content with translations
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update specific elements without data attributes
        document.querySelector('.hero-content p').textContent = translations[lang]['hero-title'];
        document.querySelector('.hero-content .btn').textContent = translations[lang]['hero-btn'];
        document.querySelectorAll('.nav-links li a')[0].textContent = translations[lang]['nav-about'];
        document.querySelectorAll('.nav-links li a')[1].textContent = translations[lang]['nav-portfolio'];
        document.querySelectorAll('.nav-links li a')[2].textContent = translations[lang]['nav-resume'];
        document.querySelectorAll('.nav-links li a')[3].textContent = translations[lang]['nav-contact'];
        
        document.querySelector('#about h2').textContent = translations[lang]['about-heading'];
        document.querySelectorAll('#about .about-text p')[0].textContent = translations[lang]['about-p1'];
        document.querySelectorAll('#about .about-text p')[1].textContent = translations[lang]['about-p2'];
        document.querySelectorAll('.stat-label')[0].textContent = translations[lang]['stat-years'];
        document.querySelectorAll('.stat-label')[1].textContent = translations[lang]['stat-projects'];
        
        document.querySelector('#portfolio h2').textContent = translations[lang]['portfolio-heading'];
        document.querySelectorAll('.portfolio-item p')[0].textContent = translations[lang]['at-description'];
        document.querySelectorAll('.portfolio-item p')[1].textContent = translations[lang]['tqh-description'];
        document.querySelectorAll('.portfolio-item .btn')[0].textContent = translations[lang]['visit-btn'];
        document.querySelectorAll('.portfolio-item .btn')[1].textContent = translations[lang]['visit-btn'];
        document.querySelector('.more-to-come h3').textContent = translations[lang]['more-to-come'];
        
        document.querySelector('#resume h2').textContent = translations[lang]['resume-heading'];
        document.querySelector('#resume > p').textContent = translations[lang]['resume-subtitle'];
        document.querySelector('.btn-download span').textContent = translations[lang]['download-btn'];
        
        // Update Resume sections
        document.querySelectorAll('.resume-section h3')[0].textContent = translations[lang]['education-heading'];
        document.querySelectorAll('.resume-section h3')[1].textContent = translations[lang]['experience-heading'];
        document.querySelectorAll('.resume-section h3')[2].textContent = translations[lang]['additional-experience'];
        document.querySelectorAll('.resume-section h3')[3].textContent = translations[lang]['skills-heading'];
        
        // Update Education details
        document.querySelector('.resume-section:nth-child(1) h4').textContent = translations[lang]['bachelor-title'];
        document.querySelector('.resume-section:nth-child(1) p:nth-child(3)').textContent = translations[lang]['ntnu'];
        document.querySelectorAll('.resume-section:nth-child(1) .resume-details li')[0].textContent = translations[lang]['education-detail1'];
        document.querySelectorAll('.resume-section:nth-child(1) .resume-details li')[1].textContent = translations[lang]['education-detail2'];
        
        // Update Experience details
        const experienceItems = document.querySelectorAll('.resume-section:nth-child(2) .resume-item');
        experienceItems[0].querySelector('h4').textContent = translations[lang]['experience-title1'];
        experienceItems[0].querySelector('.resume-date').textContent = translations[lang]['experience-date1'];
        experienceItems[0].querySelector('p:not(.resume-date)').textContent = translations[lang]['experience-desc1'];
        experienceItems[1].querySelector('h4').textContent = translations[lang]['experience-title2'];
        experienceItems[1].querySelector('.resume-date').textContent = translations[lang]['experience-date2'];
        experienceItems[1].querySelector('p:not(.resume-date)').textContent = translations[lang]['experience-desc2'];
        experienceItems[2].querySelector('h4').textContent = translations[lang]['experience-title3'];
        experienceItems[2].querySelector('.resume-date').textContent = translations[lang]['experience-date3'];
        experienceItems[2].querySelector('p:not(.resume-date)').textContent = translations[lang]['experience-desc3'];
        
        // Update Additional Experience details
        const additionalItems = document.querySelectorAll('.resume-section:nth-child(3) .resume-item');
        additionalItems[0].querySelector('h4').textContent = translations[lang]['additional-title1'];
        additionalItems[0].querySelector('.resume-date').textContent = translations[lang]['additional-date1'];
        additionalItems[0].querySelector('p:not(.resume-date)').textContent = translations[lang]['additional-desc1'];
        additionalItems[1].querySelector('h4').textContent = translations[lang]['additional-title2'];
        additionalItems[1].querySelector('.resume-date').textContent = translations[lang]['additional-date2'];
        additionalItems[1].querySelector('p:not(.resume-date)').textContent = translations[lang]['additional-desc2'];
        additionalItems[2].querySelector('h4').textContent = translations[lang]['additional-title3'];
        additionalItems[2].querySelector('.resume-date').textContent = translations[lang]['additional-date3'];
        additionalItems[2].querySelector('p:not(.resume-date)').textContent = translations[lang]['additional-desc3'];
        
        document.querySelector('#contact h2').textContent = translations[lang]['contact-heading'];
        document.querySelector('#contact > p').textContent = translations[lang]['contact-text'];
        document.querySelectorAll('.contact-item span')[0].textContent = translations[lang]['email-btn'];
        document.querySelectorAll('.contact-item span')[1].textContent = translations[lang]['linkedin-btn'];
        
        document.querySelectorAll('.footer-links a')[0].textContent = translations[lang]['nav-about'];
        document.querySelectorAll('.footer-links a')[1].textContent = translations[lang]['nav-portfolio'];
        document.querySelectorAll('.footer-links a')[2].textContent = translations[lang]['nav-resume'];
        document.querySelectorAll('.footer-links a')[3].textContent = translations[lang]['nav-contact'];
        
        document.querySelectorAll('.footer-bottom p')[0].textContent = translations[lang]['copyright'];
        document.querySelectorAll('.footer-bottom p')[1].textContent = translations[lang]['address'];
        
        // Update CV download link to use appropriate PDF based on language
        const resumeDownloadBtn = document.querySelector('.btn-download');
        if (lang === 'no') {
            resumeDownloadBtn.href = 'CV-Bror Tobias Rinde (NO).pdf';
        } else {
            resumeDownloadBtn.href = 'CV-Bror Tobias Rinde (EN).pdf';
        }

        // Update language skills
        const skillItems = document.querySelectorAll('.skills-list li');
        const norwegianSkill = Array.from(skillItems).find(item => 
            item.textContent.includes('Norwegian') || item.textContent.includes('Norsk'));
        const englishSkill = Array.from(skillItems).find(item => 
            item.textContent.includes('English') || item.textContent.includes('Engelsk'));
        const spanishSkill = Array.from(skillItems).find(item => 
            item.textContent.includes('Spanish') || item.textContent.includes('Spansk'));

        if (norwegianSkill) norwegianSkill.textContent = translations[lang]['skill-norwegian'];
        if (englishSkill) englishSkill.textContent = translations[lang]['skill-english'];
        if (spanishSkill) spanishSkill.textContent = translations[lang]['skill-spanish'];
    }

    // Also update the initial href when the page loads
    const resumeDownloadBtn = document.querySelector('.btn-download');
    if (savedLang === 'no') {
        resumeDownloadBtn.href = 'CV-Bror Tobias Rinde (NO).pdf';
    } else {
        resumeDownloadBtn.href = 'CV-Bror Tobias Rinde (EN).pdf';
    }
}); 