document.addEventListener('DOMContentLoaded', () => {
    // Force start at top on load/refresh with smooth animation
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // Smooth scroll to top on page load
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    
    // Handle page refresh and navigation
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
    
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Additional smooth scroll on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 100);
    });

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
    const skillItemsStagger = document.querySelectorAll('.skills-list li');
    skillItemsStagger.forEach((item, index) => {
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

    // Typing effect utilities
    let typingInterval = null;
    function startTyping(text) {
        const heroSubtitle = document.querySelector('.hero-content p');
        if (!heroSubtitle) return;
        if (typingInterval) {
            clearInterval(typingInterval);
            typingInterval = null;
        }
        heroSubtitle.textContent = '';
        let i = 0;
        typingInterval = setInterval(() => {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                typingInterval = null;
            }
        }, 100);
    }

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
    } else {
        // Ensure English also uses the translations map so the subtitle matches the intended text
        changeLanguage('en');
        langText.textContent = 'EN';
    }

    // After applying saved language, start typing with the current subtitle text
    const currentSubtitleText = document.querySelector('.hero-content p').textContent;
    startTyping(currentSubtitleText);
    
    langToggle.addEventListener('click', function() {
        const currentLang = langText.textContent;
        if (currentLang === 'EN') {
            changeLanguage('no');
            langText.textContent = 'NO';
            localStorage.setItem('lang', 'no');
            startTyping('Prosjektingeniør med fornybar energi bakgrunn');
        } else {
            changeLanguage('en');
            langText.textContent = 'EN';
            localStorage.setItem('lang', 'en');
            startTyping('Renewable Energy Project Engineer');
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
                'hero-title': 'Renewable Energy Project Engineer',
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
                'gridville-description': 'GridVille is a student project at NTNU that develops sustainable power systems for communities lacking reliable electricity.',
                
                // Resume
                'resume-heading': 'Resume',
                'resume-subtitle': 'My academic background, experience, and engineering skills.',
                'download-btn': 'Download Resume',
                'education-heading': 'Education',
                'msc-title': 'Master in Project Management Engineering',
                'msc-date': '2025 - Present',
                'bachelor-title': 'Bachelor in Renewable Energy Engineering',
                'bachelor-date': '2022 - 2025',
                'ntnu': 'Norwegian University of Science and Technology (NTNU)',
                'education-detail1': 'Focused on sustainable energy technologies and systems',
                'education-detail2': 'Exchange Program: UPV (Valencia), Fall 2024',
                'experience-heading': 'Experience',
                'experience-title1': 'Electrical Engineer - GridVille EWB',
                'experience-date1': '2025 - Present',
                'experience-desc1': 'Contributing to the development of a microgrid providing sustainable energy solutions to areas lacking stable electricity access. Part of planning, building, and testing solar, wind, and battery systems to deliver reliable power.',
                'experience-title2': 'Personal Assistant - Mio BPA',
                'experience-date2': '2022 - Present',
                'experience-desc2': 'Assist a young boy with daily tasks, strengthening his independence. Balanced the needs of both parents, child, and coordinator.',
                'experience-title3': 'Production Worker - Bergene Holm AS',
                'experience-date3': '2021 - 2022',
                'experience-desc3': 'Performed tasks in the production line, quality control, and safety. Worked in a structured, independent, and goal-oriented manner.',
                'personal-projects': 'Personal Projects',
                'project-title1': 'All Together',
                'project-desc1': 'Charity project creating background music for a good cause.',
                'project-link1': 'alltogetherofficial.com',
                'project-title2': 'The Quiet Hub',
                'project-desc2': 'A platform for music designed to support focus and relaxation.',
                'project-link2': 'thequiethub.com',
                'additional-experience': 'Additional Experience',
                'additional-title1': 'Youth With A Mission (YWAM) - Volunteer Work',
                'additional-date1': '2022',
                'additional-desc1': 'Cross-cultural collaboration, adaptability, and problem-solving in challenging international settings in Hawaii/Colombia.',
                'additional-title2': 'Guard Soldier - Norwegian Armed Forces',
                'additional-date2': '2020 - 2021',
                'additional-desc2': 'Controlled incoming and outgoing traffic, carried out security checks, handled unforeseen incidents, and followed all orders in close collaboration with superiors at Lutvann camp.',
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
                'address': 'Eidsvolls Gate 43, 7052 Trondheim, Norway',
                'theme-btn': 'Dark Mode',
                'lang-btn': 'EN',
                // Footer subtitle under logo
                'footer-role': 'MSc student in Project Management Engineering',
                
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
                'hero-title': 'Prosjektingeniør med fornybar energi bakgrunn',
                'hero-btn': 'Lær mer',
                
                // About
                'about-heading': 'Om meg',
                'about-p1': 'Jeg er ærlig, direkte og verdsetter klar, åpen kommunikasjon. Jeg uttrykker mine meninger åpent, ønsker konstruktive tilbakemeldinger velkommen, og streber kontinuerlig etter personlig og faglig vekst. Jeg er målorientert, effektiv og lidenskapelig opptatt av produktive aktiviteter.',
                'about-p2': 'Med et solid grunnlag i ingeniørprinsipper og en voksende interesse for programmering og simuleringsverktøy, er jeg motivert av å løse utfordringer innen fornybar energi. Jeg streber etter å bidra til løsninger som er både teknisk effektive og miljømessig bærekraftige.',
                'stat-years': 'År med ingeniørstudier',
                'stat-projects': 'Ingeniørprosjekter',
                
                // Portfolio
                'portfolio-heading': 'Prosjekter',
                'at-description': 'Veldedighetsprosjekt som leverer bakgrunnsmuskikk for en god sak. Et samarbeidsinitiativ for å støtte samfunn i nød gjennom musikk.',
                'tqh-description': 'En plattform som gjør musikk mer tilgjengelig, med musikk for fokus og avslapning.',
                'visit-btn': 'Besøk Nettsted',
                'more-to-come': 'Mer kommer',
                'gridville-description': 'GridVille er et teknisk verv som utvikler bærekraftige mikronett som kan etableres der behovet oppstår.',
                
                // Resume
                'resume-heading': 'CV',
                'resume-subtitle': 'Min akademiske bakgrunn, erfaring og ingeniørferdigheter.',
                'download-btn': 'Last ned CV',
                'education-heading': 'Utdanning',
                'msc-title': 'Master i prosjektledelse (sivilingeniør)',
                'msc-date': '2025 - Nåværende',
                'bachelor-title': 'Bachelor i fornybar energi (ingeniør)',
                'bachelor-date': '2022 - 2025',
                'ntnu': 'Norges teknisk-naturvitenskapelige universitet (NTNU)',
                'education-detail1': 'Fokusert på bærekraftige energiteknologier og systemer',
                'education-detail2': 'Utvekslingsprogram: UPV (Valencia), Høst 2024',
                'experience-heading': 'Erfaring',
                'experience-title1': 'Elektroingeniør - GridVille IUG',
                'experience-date1': '2025 - Nåværende',
                'experience-desc1': 'Bidrar til utvikling av et mikronett som gir bærekraftige energiløsninger til områder som mangler stabil elektrisitetstilgang. Del av planlegging, bygging og testing av sol-, vind- og batterisystemer for å levere pålitelig strøm.',
                'experience-title2': 'Personlig Assistent - Mio BPA',
                'experience-date2': '2022 - Nåværende',
                'experience-desc2': 'Assisterer en ung gutt med daglige oppgaver, styrker hans selvstendighet. Balanserte behovene til både foreldre, barn og koordinator.',
                'experience-title3': 'Produksjonsarbeider - Bergene Holm AS',
                'experience-date3': '2021 - 2022',
                'experience-desc3': 'Utførte oppgaver i produksjonslinjen, kvalitetskontroll og sikkerhet. Arbeidet på en strukturert, uavhengig og målorientert måte.',
                'personal-projects': 'Personlige Prosjekter',
                'project-title1': 'All Together',
                'project-desc1': 'Veldedighetsprosjekt som lager bakgrunnsmusikk for en god sak.',
                'project-link1': 'alltogetherofficial.com',
                'project-title2': 'The Quiet Hub',
                'project-desc2': 'En plattform for musikk designet for å støtte fokus og avslapning.',
                'project-link2': 'thequiethub.com',
                'additional-experience': 'Ytterligere Erfaring',
                'additional-title1': 'Ungdom i Oppdrag (UIO) - Frivillig arbeid',
                'additional-date1': '2022',
                'additional-desc1': 'Tverrkulturellt samarbeid, tilpasningsevne og problemløsning i utfordrende internasjonale settinger i Hawaii/Colombia.',
                'additional-title2': 'Vakt Soldat - Norske Forsvaret',
                'additional-date2': '2020 - 2021',
                'additional-desc2': 'Kontrollerte inngående og utgående trafikk, utførte sikkerhetskontroller, håndterte uventede hendelser og fulgte alle ordre i nært samarbeid med overordnede på Lutvann leir.',
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
                'address': 'Eidsvolls Gate 43, 7052 Trondheim, Norge',
                'theme-btn': 'Mørk Modus',
                'lang-btn': 'NO',
                // Footer subtitle under logo
                'footer-role': 'Masterstudent i prosjektledelse',
                
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
        // GridVille description and buttons
        const portfolioButtons = document.querySelectorAll('.portfolio-item .btn');
        if (portfolioButtons[0]) portfolioButtons[0].textContent = translations[lang]['visit-btn'];
        if (portfolioButtons[1]) portfolioButtons[1].textContent = translations[lang]['visit-btn'];
        if (portfolioButtons[2]) portfolioButtons[2].textContent = translations[lang]['visit-btn'];
        const gridVille = document.querySelector('#project-gridville p');
        if (gridVille) gridVille.textContent = translations[lang]['gridville-description'];
        
        document.querySelector('#resume h2').textContent = translations[lang]['resume-heading'];
        document.querySelector('#resume > p').textContent = translations[lang]['resume-subtitle'];
        document.querySelector('.btn-download span').textContent = translations[lang]['download-btn'];
        
        // Update Resume sections
        document.querySelectorAll('.resume-section h3')[0].textContent = translations[lang]['education-heading'];
        document.querySelectorAll('.resume-section h3')[1].textContent = translations[lang]['experience-heading'];
        document.querySelectorAll('.resume-section h3')[2].textContent = translations[lang]['personal-projects'];
        document.querySelectorAll('.resume-section h3')[3].textContent = translations[lang]['additional-experience'];
        document.querySelectorAll('.resume-section h3')[4].textContent = translations[lang]['skills-heading'];
        
        // Update Education details
        const educationItems = document.querySelectorAll('.resume-section:nth-child(1) .resume-item');
        educationItems[0].querySelector('h4').textContent = translations[lang]['msc-title'];
        educationItems[0].querySelector('.resume-date').textContent = translations[lang]['msc-date'];
        // Ensure institution name switches language for MSc as well
        educationItems[0].querySelector('p:not(.resume-date)').textContent = translations[lang]['ntnu'];
        educationItems[1].querySelector('h4').textContent = translations[lang]['bachelor-title'];
        educationItems[1].querySelector('.resume-date').textContent = translations[lang]['bachelor-date'];
        educationItems[1].querySelector('p:not(.resume-date)').textContent = translations[lang]['ntnu'];
        educationItems[1].querySelectorAll('.resume-details li')[0].textContent = translations[lang]['education-detail1'];
        educationItems[1].querySelectorAll('.resume-details li')[1].textContent = translations[lang]['education-detail2'];
        
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
        
        // Update Personal Projects details
        const projectItems = document.querySelectorAll('.resume-section:nth-child(3) .resume-item');
        if (projectItems[0]) {
            projectItems[0].querySelector('h4').textContent = translations[lang]['project-title1'];
            projectItems[0].querySelectorAll('p')[0].textContent = translations[lang]['project-desc1'];
            projectItems[0].querySelector('a').textContent = translations[lang]['project-link1'];
        }
        if (projectItems[1]) {
            projectItems[1].querySelector('h4').textContent = translations[lang]['project-title2'];
            projectItems[1].querySelectorAll('p')[0].textContent = translations[lang]['project-desc2'];
            projectItems[1].querySelector('a').textContent = translations[lang]['project-link2'];
        }
        
        // Update Additional Experience details
        const additionalItems = document.querySelectorAll('.resume-section:nth-child(4) .resume-item');
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
        // Update footer subtitle under logo
        const footerSubtitle = document.querySelector('.footer-logo p');
        if (footerSubtitle) {
            footerSubtitle.textContent = translations[lang]['footer-role'];
        }
        
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