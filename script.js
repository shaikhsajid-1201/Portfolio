// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // You can handle the form submission here
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Message sent successfully!');
            this.reset();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.timeline-item, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    const scrollTrack = document.querySelector('.scroll-track');
    
    // Reset animation smoothly
    function resetAnimation() {
        if (scrollTrack) {
            scrollTrack.addEventListener('animationend', () => {
                scrollTrack.style.animation = 'none';
                scrollTrack.offsetHeight; // Trigger reflow
                scrollTrack.style.animation = 'scroll 25s linear infinite';
            });
        }
    }

    resetAnimation();

    // Optional: Pause on hover
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        scrollContainer.addEventListener('mouseenter', () => {
            scrollTrack.style.animationPlayState = 'paused';
        });

        scrollContainer.addEventListener('mouseleave', () => {
            scrollTrack.style.animationPlayState = 'running';
        });
    }

    // Add ripple effect to nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = link.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.className = 'ripple';
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Footer gradient follow effect
    const footer = document.querySelector('footer');
    
    // Create gradient follower element
    const gradientFollow = document.createElement('div');
    gradientFollow.className = 'footer-gradient-follow';
    footer.appendChild(gradientFollow);
    
    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Smooth follow effect
    function updateGradientPosition() {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;
        
        gradientFollow.style.left = `${currentX}px`;
        gradientFollow.style.top = `${currentY}px`;
        
        rafId = requestAnimationFrame(updateGradientPosition);
    }
    
    footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
        
        if (rafId === null) {
            rafId = requestAnimationFrame(updateGradientPosition);
        }
    });
    
    footer.addEventListener('mouseleave', () => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        gradientFollow.style.opacity = '0';
    });
    
    footer.addEventListener('mouseenter', () => {
        gradientFollow.style.opacity = '1';
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Add this to your existing JavaScript file
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Add transition delay for each menu item
navLinksItems.forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.1}s`;
    
    // Add click event listener to each nav link
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Reset scroll position when menu opens
    if (navLinks.classList.contains('active')) {
        window.scrollTo(0, 0);
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
