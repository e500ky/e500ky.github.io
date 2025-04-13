document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList = savedTheme === 'dark' ? 'dark-theme' : 'light-theme';
    } else {
        // If no saved preference, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList = 'dark-theme';
        }
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Navigation active state based on scroll position - FIXED
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    function setActiveNavItem() {
        let current = '';
        let scrollPosition = window.scrollY + 200; // Add offset for better section detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // If we're at the bottom of the page, ensure the last section is active
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            current = sections[sections.length - 1].getAttribute('id');
        }
        
        navItems.forEach(navItem => {
            navItem.classList.remove('active');
            if (navItem.getAttribute('href').substring(1) === current) {
                navItem.classList.add('active');
            }
        });
    }
    
    // Add click handlers to ensure correct section is marked as active when clicked
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Clear active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Optional: smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                e.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    window.addEventListener('scroll', setActiveNavItem);
    
    // Custom cursor
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 991) {
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mousedown', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        document.querySelectorAll('a, button, .expertise-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '30px';
                cursorFollower.style.height = '30px';
                cursorFollower.style.opacity = '0.3';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '20px';
                cursorFollower.style.height = '20px';
                cursorFollower.style.opacity = '0.5';
            });
        });
    }
    
    // Form submission (prevent default for demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would normally handle form submission
            alert('Thank you for your message! This is a demo site, so the form is not actually being submitted.');
        });
    }
    
    // Simple parallax effect for the shapes
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape-1, .shape-2, .shape-3');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            shapes.forEach((shape, index) => {
                const factor = (index + 1) * 20;
                const moveX = (mouseX - 0.5) * factor;
                const moveY = (mouseY - 0.5) * factor;
                
                shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // Signature animation when it comes into view
    const signature = document.querySelector('.signature-svg');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
            }
        });
    }, { threshold: 0.5 });
    
    if (signature) {
        observer.observe(signature);
    }
    
    // Initialize active nav state on page load
    setActiveNavItem();
});
