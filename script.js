/**
 * PERSONAL PORTFOLIO - JAVASCRIPT
 * ASP.NET Core Backend Developer Portfolio
 * 
 * This file contains all interactive functionality for the portfolio website
 */

// ================================================
// INITIALIZATION - DOM CONTENT LOADED
// ================================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) Library
    initAOS();
    
    // Initialize Navbar Functionality
    initNavbar();
    
    // Initialize Contact Form
    initContactForm();
    
    // Set Current Year in Footer
    setCurrentYear();
    
    // Initialize Smooth Scrolling
    initSmoothScroll();
    
    // Initialize Active Navigation Highlighting
    initActiveNavigation();
});

// ================================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ================================================
function initAOS() {
    AOS.init({
        duration: 800,          // Animation duration in milliseconds
        easing: 'ease-in-out',  // Easing function
        once: true,             // Animation happens only once
        offset: 100,            // Offset from trigger point
        delay: 0,               // Delay before animation starts
        disable: false          // Disable on mobile if needed
    });
}

// ================================================
// NAVBAR FUNCTIONALITY
// ================================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close the mobile menu if it's open
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });
}

// ================================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ================================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ================================================
// ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
// ================================================
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in viewport
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// ================================================
// CONTACT FORM HANDLING
// ================================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form data
            if (!validateContactForm(formData)) {
                return;
            }
            
            // Simulate form submission (since there's no backend)
            handleFormSubmission(formData);
        });
    }
}

/**
 * Validate contact form fields
 */
function validateContactForm(data) {
    const { name, email, message } = data;
    
    // Name validation
    if (name.length < 2) {
        showFormError('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('Please enter a valid email address');
        return false;
    }
    
    // Message validation
    if (message.length < 10) {
        showFormError('Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

/**
 * Handle form submission (simulated)
 */
function handleFormSubmission(data) {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    
    // Simulate server delay
    setTimeout(function() {
        // Log form data (in real scenario, this would be sent to a backend)
        console.log('Form submitted with data:', data);
        
        // Show success message
        formSuccess.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            formSuccess.style.display = 'none';
        }, 5000);
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    }, 1500); // 1.5 second delay to simulate processing
}

/**
 * Show form error message
 */
function showFormError(message) {
    // Create or update error alert
    let errorAlert = document.getElementById('formError');
    
    if (!errorAlert) {
        errorAlert = document.createElement('div');
        errorAlert.id = 'formError';
        errorAlert.className = 'alert alert-danger mt-3';
        document.getElementById('contactForm').appendChild(errorAlert);
    }
    
    errorAlert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
    errorAlert.style.display = 'block';
    
    // Hide error after 4 seconds
    setTimeout(function() {
        errorAlert.style.display = 'none';
    }, 4000);
}

// ================================================
// SET CURRENT YEAR IN FOOTER
// ================================================
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ================================================
// BACK TO TOP BUTTON FUNCTIONALITY
// ================================================
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }
}

// Initialize back to top button
initBackToTop();

// ================================================
// TYPING EFFECT FOR HERO SUBTITLE (OPTIONAL)
// ================================================
function initTypingEffect() {
    const subtitleElement = document.querySelector('.hero-section .lead');
    
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        subtitleElement.textContent = '';
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < originalText.length) {
                subtitleElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 30); // Typing speed
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeChar, 800);
    }
}

// Uncomment to enable typing effect
// initTypingEffect();

// ================================================
// SCROLL REVEAL ANIMATIONS (FALLBACK)
// ================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on page load
}

// Initialize scroll reveal if needed
// initScrollReveal();

// ================================================
// PERFORMANCE OPTIMIZATION - DEBOUNCE FUNCTION
// ================================================
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

// ================================================
// LAZY LOADING FOR IMAGES (IF NEEDED)
// ================================================
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading if needed
// initLazyLoading();

// ================================================
// CONSOLE MESSAGE (OPTIONAL)
// ================================================
console.log('%c👋 Hello, Developer!', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out my portfolio!', 'color: #2ecc71; font-size: 14px;');
console.log('%cInterested in the code? Check out the repository!', 'color: #95a5a6; font-size: 12px;');

// ================================================
// PAGE LOAD PERFORMANCE TRACKING (OPTIONAL)
// ================================================
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});

// ================================================
// ERROR HANDLING
// ================================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add custom error handling here
});

// ================================================
// EXPORT FUNCTIONS (IF USING MODULES)
// ================================================
// Uncomment if using ES6 modules
// export { initAOS, initContactForm, validateContactForm };
