// EmailJS Configuration
(function() {    // Initialize EmailJS with public key from environment variable or default
    const emailjsPublicKey = 'tZzTKdOBYc27u36ng'; // Public key - DO NOT SHARE
    emailjs.init(emailjsPublicKey);
})();

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const navHamburger = document.getElementById('nav-hamburger');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

// Navigation functionality
class Navigation {
    constructor() {
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleSmoothScrolling();
        this.handleActiveLinks();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    handleMobileMenu() {
        navHamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navHamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navHamburger.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navMenu.classList.remove('active');
                navHamburger.classList.remove('active');
            }
        });
    }

    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleActiveLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animatedElements = [
            { selector: '.qualification-item', animation: 'fade-in-up' },
            { selector: '.skill-item', animation: 'fade-in-up' },
            { selector: '.stat-card', animation: 'fade-in-up' },
            { selector: '.project-card', animation: 'fade-in-up' },
            { selector: '.contact-item', animation: 'fade-in-left' },
            { selector: '.contact-form', animation: 'fade-in-right' }
        ];

        animatedElements.forEach(({ selector, animation }) => {
            document.querySelectorAll(selector).forEach((element, index) => {
                element.classList.add(animation);
                element.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(element);
            });
        });
    }
}

// Progress bar animations
class ProgressAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.animateProgressBars();
    }

    animateProgressBars() {
        const progressSection = document.querySelector('.jee-subjects');
        const progressBars = document.querySelectorAll('.progress-fill');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.style.getPropertyValue('--progress');
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (progressSection) {
            observer.observe(progressSection);
        }
    }
}

// Contact form functionality
class ContactForm {    constructor() {
        this.serviceID = 'service_4dqnjmi'; // EmailJS service ID
        this.templateID = 'template_nflmf9p'; // EmailJS template ID
        this.init();
    }

    init() {
        this.handleFormSubmission();
        this.handleFormValidation();
    }

    handleFormSubmission() {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    handleFormValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styles
        field.classList.remove('error');
        this.removeErrorMessage(field);

        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Name validation
        if (field.name === 'from_name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
        }

        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'hsl(var(--error-color))';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        errorElement.style.display = 'block';
        
        field.parentNode.appendChild(errorElement);
    }

    removeErrorMessage(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    validateForm() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async submitForm() {
        // Validate form before submission
        if (!this.validateForm()) {
            this.showStatus('Please fix the errors above', 'error');
            return;
        }

        // Show loading state
        this.setLoadingState(true);
        this.showStatus('Sending message...', 'loading');

        try {
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('from_name'),
                from_email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_name: 'Portfolio Owner', // You can customize this
            };

            // Send email using EmailJS
            const response = await emailjs.send(this.serviceID, this.templateID, templateParams);

            if (response.status === 200) {
                this.showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                this.clearFieldErrors();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            this.showStatus('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            this.setLoadingState(false);
        }
    }

    setLoadingState(isLoading) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        if (isLoading) {
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            btnIcon.innerHTML = '<div class="loading"></div>';
        } else {
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        }
    }

    showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';

        // Hide status after 5 seconds for success/error messages
        if (type !== 'loading') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    clearFieldErrors() {
        const errorElements = contactForm.querySelectorAll('.field-error');
        errorElements.forEach(error => error.remove());

        const errorInputs = contactForm.querySelectorAll('.error');
        errorInputs.forEach(input => input.classList.remove('error'));
    }
}

// Utility functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeScrollEvents();
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    optimizeScrollEvents() {
        // Throttle scroll events for better performance
        const throttledScroll = Utils.throttle(() => {
            // Scroll-dependent operations are already handled in their respective classes
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    lazyLoadImages() {
        // If you add images later, implement lazy loading
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload critical fonts and resources
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        ];

        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }
}

// Keyboard navigation and accessibility
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.handleKeyboardNavigation();
        this.enhanceFocusManagement();
        this.addSkipLinks();
    }

    handleKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close mobile menu
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navHamburger.classList.remove('active');
            }

            // Enter/Space to activate hamburger menu
            if ((e.key === 'Enter' || e.key === ' ') && e.target === navHamburger) {
                e.preventDefault();
                navHamburger.click();
            }
        });
    }

    enhanceFocusManagement() {
        // Add focus indicators for better keyboard navigation
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid hsl(var(--accent-color))';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });
    }

    addSkipLinks() {
        // Add skip to main content link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: hsl(var(--accent-color));
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Theme management (for future dark/light theme toggle)
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark'; // Default theme
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setTheme(this.currentTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        return newTheme;
    }
}

// Initialize application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all components
            new Navigation();
            new ScrollAnimations();
            new ProgressAnimations();
            new ContactForm();
            new PerformanceOptimizer();
            new AccessibilityEnhancer();
            new ThemeManager();

            // Add custom styles for form validation
            this.addValidationStyles();

            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }

    addValidationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .form-group input.error,
            .form-group textarea.error {
                border-color: hsl(var(--error-color));
                box-shadow: 0 0 0 3px hsla(var(--error-color), 0.1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Start the application
new App();

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, Navigation, ContactForm, Utils };
}

