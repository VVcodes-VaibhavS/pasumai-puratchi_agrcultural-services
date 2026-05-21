// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollPos = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    lastScrollPos = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.service-card, .about-item, .why-card').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.textContent);
                animateCounter(num, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Service card hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// WhatsApp link functionality
const whatsappLinks = document.querySelectorAll('.btn-whatsapp, [href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Track WhatsApp clicks
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'phone_number': '919092910945'
            });
        }
    });
});

// Form validation (if forms are added later)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll to top button functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '⬆️';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2d8f3d, #4aaf5d);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 8px 16px rgba(45, 143, 61, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.boxShadow = '0 12px 24px rgba(45, 143, 61, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 8px 16px rgba(45, 143, 61, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        hero.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Service cards click interaction
document.querySelectorAll('.service-link').forEach(link => {
    link.addEventListener('click', function() {
        const card = this.closest('.service-card');
        if (card) {
            // Scroll to WhatsApp section for inquiries
            const whatsappSection = document.querySelector('.whatsapp-section');
            if (whatsappSection) {
                whatsappSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Mobile responsive navigation
function handleResponsiveNav() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('navLinks');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
    }
}

window.addEventListener('resize', handleResponsiveNav);

// Add analytics event tracking
function trackEvent(eventName, eventData = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    } else {
        console.log('Event:', eventName, eventData);
    }
}

// Track section views
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                'section': entry.target.id
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Initialize tooltips (if needed)
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(elem => {
        elem.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        });
    });
}

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listener
const optimizedScroll = debounce(() => {
    // Scroll handler code
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Service cards dynamically add click to WhatsApp
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const serviceTitle = card.querySelector('h3').textContent;
        const encodedMessage = encodeURIComponent(
            `வணக்கம் மருதமுத்து அவர்களே, "${serviceTitle}" சேவை குறித்து விரிவு தகவல் வேண்டிய்கிறேன்.`
        );
        window.open(`https://wa.me/919092910945?text=${encodedMessage}`, '_blank');
    });
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
    }
    
    // Keyboard navigation for links
    if (e.key === 'Enter' && e.target.classList.contains('service-link')) {
        e.target.click();
    }
});

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Stagger animations for list items
function staggerAnimation(selector, delay = 100) {
    const items = document.querySelectorAll(selector);
    items.forEach((item, index) => {
        item.style.animationDelay = `${index * delay}ms`;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize stagger animations
    staggerAnimation('.service-card', 100);
    staggerAnimation('.about-item', 100);
    staggerAnimation('.why-card', 100);
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add page load event
    trackEvent('page_view', {
        'page_title': document.title
    });
});

// Service card click tracking
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').textContent;
        trackEvent('service_click', {
            'service': serviceName
        });
    });
});

// CTA button click tracking
document.querySelectorAll('.btn-primary, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('cta_click', {
            'button_text': btn.textContent
        });
    });
});

// Add smooth fade-in on scroll
const fadeInElements = document.querySelectorAll('.service-card, .stat-card, .about-item');
fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
document.querySelectorAll('.footer-bottom p').forEach(p => {
    if (p.textContent.includes('2024')) {
        p.textContent = p.textContent.replace('2024', currentYear);
    }
});

// Monitor network status
window.addEventListener('online', () => {
    console.log('Connection restored');
});

window.addEventListener('offline', () => {
    console.log('Connection lost');
    // You can show a notification here
});

// Service card enhanced interaction
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseover', function() {
        this.style.cursor = 'pointer';
    });
    
    card.addEventListener('focus', function() {
        this.style.outline = '2px solid #2d8f3d';
        this.style.outlineOffset = '2px';
    });
    
    card.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Accessibility - Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'பிரधான உள்ளடக்கத்திற்கு செல்க';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #2d8f3d;
    color: white;
    padding: 8px;
    z-index: 100;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

console.log('Pasumai Puratchi Agricultural Services - Website Loaded Successfully');
