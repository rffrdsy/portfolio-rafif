/**
 * Rafif Firdausy Ahla - Portfolio Logic
 * Features: Mobile Nav, Theme Toggle, and Scroll Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('#nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburgerBtn = document.querySelector('.hamburger'); // Matches your HTML class
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.body;

    // --- 1. Mobile Navigation Logic ---
    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburgerBtn.classList.toggle('active'); // For potential animation
        
        // Update Accessibility attribute
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scroll when menu is open
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked (Mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });


    // --- 2. Dark/Light Mode Toggle ---
    const setTheme = (theme) => {
        // Find the icon inside the button
        const themeIcon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            localStorage.setItem('portfolio-theme', 'dark');
            // Change icon to Sun when in Dark Mode
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('portfolio-theme', 'light');
            // Change icon to Moon when in Light Mode
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    };

    // Initialize
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        setTheme(isDark ? 'light' : 'dark');
    });

    // --- 3. Scroll Effects & Smooth Scrolling ---
    
    // Header Shadow/Background Change on Scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed header height
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});


