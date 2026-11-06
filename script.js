/**
 * PERSONAL PORTFOLIO - JAVASCRIPT
 * Bilawal Hussain | Software Engineer (.NET & Angular)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) Library
    initAOS();
    
    // Initialize Navbar Functionality
    initNavbar();
    
    // Initialize Contact Form with FormSubmit AJAX
    initContactForm();
    
    // Set Current Year in Footer
    setCurrentYear();
    
    // Initialize Smooth Scrolling
    initSmoothScroll();
    
    // Initialize Active Navigation Highlighting
    initActiveNavigation();
    
    // Initialize Project Lightbox Modal
    initProjectLightbox();
    
    // Initialize Floating Go To Top Button
    initGoToTop();
    
    // Initialize Hero Email Interaction
    initHeroEmail();
});

// ================================================
// AOS (ANIMATE ON SCROLL) INITIALIZATION
// ================================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80,
            delay: 0,
            disable: false
        });
    }
}

// ================================================
// NAVBAR FUNCTIONALITY
// ================================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Add scroll effect to navbar via CSS class
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Close mobile menu when clicking on a nav link or resume button
    const navLinks = document.querySelectorAll('.nav-link:not(.mode-switch-pill), .nav-resume-btn');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
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
            if (href === '#' || href === '') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, href);
            }
        });
    });
}

// ================================================
// ACTIVE NAVIGATION HIGHLIGHTING ON SCROLL
// ================================================
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    if (!navLinks.length) return;
    
    const isFreelance = document.body.classList.contains('theme-freelance');

    // Mapping of page sections to the corresponding navbar navigation target:
    // Supports both corporate portfolio and freelance portfolio
    const sectionToNavTarget = {
        'home': 'home',
        'services': 'services',
        'enterprise-values': 'enterprise-values',
        'about': 'about',
        'skills': isFreelance ? 'technologies' : 'about',
        'why-me': 'why-me',
        'projects': 'projects',
        'technologies': 'technologies',
        'competencies': 'technologies',
        'experience': 'experience',
        'education': 'education',
        'certifications': 'experience',
        'testimonials': 'why-me',
        'contact': 'contact'
    };

    // Collect DOM elements and sort in sequential document order
    const monitoredSections = [];
    Object.keys(sectionToNavTarget).forEach(sectionId => {
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
            monitoredSections.push({
                id: sectionId,
                targetNavId: sectionToNavTarget[sectionId],
                element: sectionEl
            });
        }
    });

    // Sort by DOM tree appearance so scroll detection evaluates in exact visual order
    monitoredSections.sort((a, b) => {
        return (a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });

    if (!monitoredSections.length) return;

    function updateActiveState() {
        const scrollThreshold = 140;
        let activeNavTarget = null;

        // Check if user is scrolled to the very bottom of the page
        const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);
        if (isBottom) {
            activeNavTarget = 'contact';
        } else {
            // Check which section is in view
            for (let i = 0; i < monitoredSections.length; i++) {
                const rect = monitoredSections[i].element.getBoundingClientRect();
                if (rect.top <= scrollThreshold && rect.bottom > scrollThreshold) {
                    activeNavTarget = monitoredSections[i].targetNavId;
                    break;
                }
            }
        }

        // Default to 'home' if near the top
        if (!activeNavTarget && window.scrollY < 200) {
            activeNavTarget = 'home';
        }

        // Apply active class to the matching link and remove from all others
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (activeNavTarget && linkHref === `#${activeNavTarget}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Listen on scroll and resize
    window.addEventListener('scroll', updateActiveState, { passive: true });
    window.addEventListener('resize', updateActiveState, { passive: true });
    
    // Run on initial load
    updateActiveState();

    // Also update when navbar collapse opens/closes
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        navbarCollapse.addEventListener('shown.bs.collapse', updateActiveState);
        navbarCollapse.addEventListener('hidden.bs.collapse', updateActiveState);
    }
}

// ================================================
// CONTACT FORM HANDLING & ADVANCED VALIDATION
// ================================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    const nameCounter = document.getElementById('nameCounter');
    const messageCounter = document.getElementById('messageCounter');

    // 1. Live Name Counter & Length Validation (Max 100)
    if (nameInput && nameCounter) {
        nameInput.addEventListener('input', function() {
            if (this.value.length > 100) {
                this.value = this.value.substring(0, 100);
            }
            const len = this.value.length;
            nameCounter.textContent = `${len} / 100`;

            if (len >= 100) {
                nameCounter.classList.add('text-danger', 'fw-bold');
                setFieldError(this, 'nameError', 'Maximum 100 characters limit reached.');
            } else {
                nameCounter.classList.remove('text-danger', 'fw-bold');
                if (this.classList.contains('is-invalid')) {
                    clearFieldError(this, 'nameError');
                }
            }
        });
    }

    // 2. Live Email Validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            clearFieldError(this, 'emailError');
        });
        emailInput.addEventListener('blur', function() {
            const val = this.value.trim();
            if (val && !validateEmailFormat(val)) {
                setFieldError(this, 'emailError', 'Please enter a valid email address (e.g. name@company.com).');
            }
        });
    }

    // 3. Direct Contact Number Validation (Max 15 Characters)
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            if (this.value.length > 15) {
                this.value = this.value.substring(0, 15);
            }
            clearFieldError(this, 'phoneError');
        });

        phoneInput.addEventListener('blur', function() {
            const val = this.value.trim();
            if (val) {
                const phoneCheck = validatePhoneNumber(val);
                if (!phoneCheck.isValid) {
                    setFieldError(this, 'phoneError', phoneCheck.message);
                }
            }
        });
    }

    // 4. Live Message Counter & Strict 5000 Character Enforcement
    if (messageInput && messageCounter) {
        messageInput.addEventListener('input', function() {
            if (this.value.length > 5000) {
                this.value = this.value.substring(0, 5000);
            }
            const len = this.value.length;
            messageCounter.textContent = `${len} / 5000`;
            
            if (len >= 5000) {
                messageCounter.classList.add('text-danger', 'fw-bold');
                setFieldError(this, 'messageError', 'Maximum 5000 characters limit reached.');
            } else {
                messageCounter.classList.remove('text-danger', 'fw-bold');
                if (this.classList.contains('is-invalid')) {
                    clearFieldError(this, 'messageError');
                }
            }
        });
    }

    // 5. Form Submit Handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const data = {
            name: nameInput ? nameInput.value.trim() : '',
            email: emailInput ? emailInput.value.trim() : '',
            phone: phoneInput ? phoneInput.value.trim() : '',
            message: messageInput ? messageInput.value.trim() : ''
        };

        const isValid = validateAllContactFields(data);
        if (!isValid) {
            console.warn('[ContactForm] Halting submission because validation failed.');
            return;
        }

        handleFormSubmission(data);
    });
}

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phone) {
    if (!phone || phone.trim().length === 0) {
        return {
            isValid: false,
            message: 'Contact number is required.'
        };
    }

    const trimmed = phone.trim();
    if (trimmed.length > 15) {
        return {
            isValid: false,
            message: 'Contact number cannot exceed 15 characters.'
        };
    }

    // Extract digits to ensure sufficient phone digits (standard international range: 7 to 15 digits)
    const digitsOnly = trimmed.replace(/\D/g, '');
    const validCharsRegex = /^[+]?[\d\s\-\(\)\.]{7,15}$/;

    if (!validCharsRegex.test(trimmed) || digitsOnly.length < 7 || digitsOnly.length > 15) {
        return {
            isValid: false,
            message: 'Please enter a valid phone number (7 to 15 digits, e.g. with country code).'
        };
    }

    return { isValid: true, message: '' };
}

function setFieldError(fieldElement, errorElementId, message) {
    if (fieldElement) {
        fieldElement.classList.add('is-invalid');
        fieldElement.classList.remove('is-valid');
    }
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
        errEl.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i>${escapeHtml(message)}`;
        errEl.style.display = 'block';
    }
}

function clearFieldError(fieldElement, errorElementId) {
    if (fieldElement) {
        fieldElement.classList.remove('is-invalid');
    }
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
        errEl.innerHTML = '';
        errEl.style.display = 'none';
    }
}

function validateAllContactFields(data) {
    let isValid = true;
    let firstInvalidField = null;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // 1. Name Check (Max 100 chars, Min 2 chars)
    if (!data.name || data.name.length < 2) {
        setFieldError(nameInput, 'nameError', 'Please enter your full name (at least 2 characters).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = nameInput;
    } else if (data.name.length > 100) {
        setFieldError(nameInput, 'nameError', 'Name cannot exceed 100 characters.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = nameInput;
    } else {
        clearFieldError(nameInput, 'nameError');
        if (nameInput) nameInput.classList.add('is-valid');
    }

    // 2. Email Check
    if (!data.email || !validateEmailFormat(data.email)) {
        setFieldError(emailInput, 'emailError', 'Please enter a valid email address (e.g. yourname@company.com).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = emailInput;
    } else {
        clearFieldError(emailInput, 'emailError');
        if (emailInput) emailInput.classList.add('is-valid');
    }

    // 3. Phone Check (Max 15 characters, 7-15 digits)
    if (phoneInput) {
        const phoneCheck = validatePhoneNumber(data.phone);
        if (!phoneCheck.isValid) {
            setFieldError(phoneInput, 'phoneError', phoneCheck.message);
            isValid = false;
            if (!firstInvalidField) firstInvalidField = phoneInput;
        } else {
            clearFieldError(phoneInput, 'phoneError');
            phoneInput.classList.add('is-valid');
        }
    }

    // 4. Message Check (Min 10, Max 5000 chars)
    if (!data.message || data.message.length < 10) {
        setFieldError(messageInput, 'messageError', 'Please enter your message (at least 10 characters).');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = messageInput;
    } else if (data.message.length > 5000) {
        setFieldError(messageInput, 'messageError', 'Message cannot exceed 5000 characters.');
        isValid = false;
        if (!firstInvalidField) firstInvalidField = messageInput;
    } else {
        clearFieldError(messageInput, 'messageError');
        if (messageInput) messageInput.classList.add('is-valid');
    }

    if (!isValid && firstInvalidField) {
        console.warn('[ContactForm] Invalid field detected:', firstInvalidField.id);
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}

// ================================================
// EMAIL SERVICE CONFIGURATION (READ FROM INJECTED CONFIG)
// ================================================
const EMAIL_SERVICE_CONFIG = (typeof window !== 'undefined' && window.EMAIL_CONFIG) ? window.EMAIL_CONFIG : {
    serviceId: '',
    publicKey: '',
    templateAdmin: '',
    templateClient: '',
    formSubmitToken: ''
};

/**
 * Handle form submission with EmailJS dual-template delivery
 */
function handleFormSubmission(data) {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';

    // Update button state (professional transmission indicator)
    submitButton.disabled = true;
    const originalButtonHtml = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending Message...';

    const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
    };

    // Primary Delivery: EmailJS Dual-Template Transmission
    if (typeof emailjs !== 'undefined') {
        try {
            emailjs.init({ publicKey: EMAIL_SERVICE_CONFIG.publicKey });

            Promise.all([
                // 1. Send inquiry notification to Bilawal (bilawalali21222@gmail.com)
                emailjs.send(
                    EMAIL_SERVICE_CONFIG.serviceId,
                    EMAIL_SERVICE_CONFIG.templateAdmin,
                    templateParams
                ),
                // 2. Send acknowledgment auto-reply to client
                emailjs.send(
                    EMAIL_SERVICE_CONFIG.serviceId,
                    EMAIL_SERVICE_CONFIG.templateClient,
                    templateParams
                )
            ])
            .then(([adminRes, clientRes]) => {
                displaySubmissionSuccess(data, originalButtonHtml);
            })
            .catch(emailJsError => {
                console.warn('[ContactForm] EmailJS encountered an error:', emailJsError);
                sendViaFormSubmitFallback(data, originalButtonHtml);
            });
            return;
        } catch (initErr) {
            console.warn('[ContactForm] EmailJS initialization error:', initErr);
        }
    }

    // Direct fallback if EmailJS SDK not available
    sendViaFormSubmitFallback(data, originalButtonHtml);
}

function displaySubmissionSuccess(data, originalButtonHtml) {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
    }

    if (formSuccess) {
        formSuccess.innerHTML = `
            <div class="d-flex align-items-start text-start p-2">
                <i class="fas fa-check-circle fa-2x me-3 text-success mt-1"></i>
                <div>
                    <h5 class="mb-1 fw-bold">Message Sent Successfully!</h5>
                    <p class="mb-2">Thank you, <strong>${escapeHtml(data.name)}</strong>. I have received your inquiry, and a confirmation receipt has been emailed to <strong>${escapeHtml(data.email)}</strong>.</p>
                    <small class="text-secondary d-block"><i class="fas fa-phone-alt me-1"></i>Direct callback number recorded: <strong>${escapeHtml(data.phone)}</strong></small>
                </div>
            </div>
        `;
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    if (contactForm) {
        contactForm.reset();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (messageInput) messageInput.value = '';

        const nameCounter = document.getElementById('nameCounter');
        const messageCounter = document.getElementById('messageCounter');
        if (nameCounter) nameCounter.textContent = '0 / 100';
        if (messageCounter) messageCounter.textContent = '0 / 5000';

        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => input.classList.remove('is-valid', 'is-invalid'));
    }

    setTimeout(() => {
        if (formSuccess) formSuccess.style.display = 'none';
    }, 12000);
}

function sendViaFormSubmitFallback(data, originalButtonHtml) {
    const endpoint = `https://formsubmit.co/ajax/${EMAIL_SERVICE_CONFIG.formSubmitToken}`;
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        _subject: `Software Engineering Inquiry from ${data.name} (${data.phone})`,
        _template: 'table',
        _captcha: 'false'
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return response.json();
    })
    .then(result => {
        if (result.success === 'true' || result.success === true) {
            displaySubmissionSuccess(data, originalButtonHtml);
        } else {
            handleFormSubmitNotice(result.message || 'Form submission notice received.', data);
            const submitButton = document.querySelector('#contactForm button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonHtml;
            }
        }
    })
    .catch(error => {
        console.error('[ContactForm] FormSubmit backup also failed:', error);
        const submitButton = document.querySelector('#contactForm button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHtml;
        }
        handleFormSubmitNotice('Unable to connect to the email transmission service.', data);
    });
}

function handleFormSubmitNotice(reasonMessage, data) {
    const formError = document.getElementById('formError');
    if (!formError) return;

    const emailSubject = encodeURIComponent(`Software Engineering Inquiry — ${data.name}`);
    const emailBody = encodeURIComponent(
        `Hi Bilawal,\n\nI reviewed your portfolio and would like to discuss a software engineering opportunity / project.\n\nBest regards,\n${data.name}\n\n[Contact: ${data.phone} | ${data.email}]`
    );

    const isActivationNeeded = /activation|activate/i.test(reasonMessage);
    const title = isActivationNeeded ? 'One-Time Form Activation Required' : 'Local File Protocol Notice';
    const description = isActivationNeeded
        ? 'FormSubmit has sent an activation link to <strong>bilawalali21222@gmail.com</strong>. Please check your Gmail inbox (or Spam folder) and click the <strong>Activate Form</strong> button once. After that single click, all submissions will automatically deliver to your inbox.'
        : `${escapeHtml(reasonMessage)}<br><span class="text-muted small mt-1 d-block">Browsers block automated email transmission when browsing directly as an offline file (<code>file://</code>). When running on a web server (e.g. <code>http://localhost:8000</code> or hosted on GitHub Pages / Vercel), automated delivery works seamlessly.</span>`;

    formError.innerHTML = `
        <div class="text-start p-2">
            <div class="d-flex align-items-center mb-2">
                <i class="fas fa-info-circle fa-lg text-danger me-2"></i>
                <h6 class="mb-0 fw-bold text-danger">${title}</h6>
            </div>
            <p class="small mb-3 text-dark">
                ${description}
            </p>
            <div class="d-flex flex-wrap gap-2">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bilawalali21222@gmail.com&su=${emailSubject}&body=${emailBody}" 
                   target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-danger">
                    <i class="fab fa-google me-1"></i>Send via Gmail Now
                </a>
                <a href="#emailChoiceModal" data-bs-toggle="modal" data-bs-target="#emailChoiceModal" class="btn btn-sm btn-outline-secondary">
                    <i class="fas fa-envelope me-1"></i>Other Email Options
                </a>
            </div>
        </div>
    `;
    formError.style.display = 'block';
    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showFormError(message) {
    const formError = document.getElementById('formError');
    if (!formError) return;
    formError.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
    formError.style.display = 'block';
    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideFormError() {
    const formError = document.getElementById('formError');
    if (formError) {
        formError.style.display = 'none';
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ================================================
// SET CURRENT YEAR IN FOOTER
// ================================================
function setCurrentYear() {
    const currentYearElements = document.querySelectorAll('#currentYear');
    const year = new Date().getFullYear();
    currentYearElements.forEach(el => {
        el.textContent = year;
    });
}

// ================================================
// PROJECT LIGHTBOX & SPECIFIC IMAGE DETAIL MODAL
// ================================================
const projectGalleries = {
    'honest-abe': {
        id: 'honest-abe',
        name: 'Honest Abe Roofing',
        title: 'Honest Abe Roofing — Sales Quoting & Job Platform',
        subtitle: '23 Platform Walkthrough Screenshots • Enterprise estimating, roof measurements, contracts, and scheduling workflows.',
        images: [
            { src: 'assets/projects/honest-abe/ro-0.png', alt: 'Honest Abe Roofing - Customer Portal & Dashboard' },
            { src: 'assets/projects/honest-abe/ro-1.png', alt: 'Honest Abe Roofing - Lead & Customer Profile' },
            { src: 'assets/projects/honest-abe/ro-2.png', alt: 'Honest Abe Roofing - Quote Estimation & Pricing' },
            { src: 'assets/projects/honest-abe/ro-3.png', alt: 'Honest Abe Roofing - Roof Slope & Measurement Calculator' },
            { src: 'assets/projects/honest-abe/ro-4.png', alt: 'Honest Abe Roofing - Material Selection & Package Comparison' },
            { src: 'assets/projects/honest-abe/ro-5.png', alt: 'Honest Abe Roofing - Contract Generation & Signatures' },
            { src: 'assets/projects/honest-abe/ro-6.png', alt: 'Honest Abe Roofing - Job Scheduling & Crew Assignment' },
            { src: 'assets/projects/honest-abe/ro-7.png', alt: 'Honest Abe Roofing - Material Ordering & Supplier Dispatch' },
            { src: 'assets/projects/honest-abe/ro-8.png', alt: 'Honest Abe Roofing - Work Orders & Inspection Checklist' },
            { src: 'assets/projects/honest-abe/ro-9.png', alt: 'Honest Abe Roofing - Payment Processing & Financing Portal' },
            { src: 'assets/projects/honest-abe/ro-10.png', alt: 'Honest Abe Roofing - Invoice Generation & Receipts' },
            { src: 'assets/projects/honest-abe/ro-11.png', alt: 'Honest Abe Roofing - Warranty Certificate & Signoff' },
            { src: 'assets/projects/honest-abe/ro-12.png', alt: 'Honest Abe Roofing - Franchise Reporting & Analytics' },
            { src: 'assets/projects/honest-abe/ro-13.png', alt: 'Honest Abe Roofing - Multi-Branch Operations Overview' },
            { src: 'assets/projects/honest-abe/ro-14.png', alt: 'Honest Abe Roofing - Field Technician Workflows' },
            { src: 'assets/projects/honest-abe/ro-15.png', alt: 'Honest Abe Roofing - Material Catalog & Pricing Matrix' },
            { src: 'assets/projects/honest-abe/ro-16.png', alt: 'Honest Abe Roofing - Commission & Sales Rep Tracking' },
            { src: 'assets/projects/honest-abe/ro-17.png', alt: 'Honest Abe Roofing - Customer Communications & SMS' },
            { src: 'assets/projects/honest-abe/ro-18.png', alt: 'Honest Abe Roofing - Insurance Claim Documentation' },
            { src: 'assets/projects/honest-abe/ro-19.png', alt: 'Honest Abe Roofing - System Activity & Audit Trail' },
            { src: 'assets/projects/honest-abe/ro-20.png', alt: 'Honest Abe Roofing - User Roles & Access Control' },
            { src: 'assets/projects/honest-abe/ro-21.png', alt: 'Honest Abe Roofing - System Settings & Integrations' },
            { src: 'assets/projects/honest-abe/ro-22.png', alt: 'Honest Abe Roofing - Platform Summary & Diagnostics' }
        ]
    },
    'data-warehouse': {
        id: 'data-warehouse',
        name: 'TrueBook Data Warehouse',
        title: 'TrueBook ERP — Data Warehouse & ETL Pipeline',
        subtitle: '6 Platform Walkthrough Screenshots • Data warehouse schema, ETL pipelines, reporting cubes, and financial analytics.',
        images: [
            { src: 'assets/projects/data-warehouse/dw1.png', alt: 'TrueBook DW - Schema & Table Architecture' },
            { src: 'assets/projects/data-warehouse/dw2.png', alt: 'TrueBook DW - ETL Data Transformation Pipeline' },
            { src: 'assets/projects/data-warehouse/dw3.png', alt: 'TrueBook DW - Star Schema & Fact-Dimension Tables' },
            { src: 'assets/projects/data-warehouse/dw4.png', alt: 'TrueBook DW - Automated Batch Ingestion & Logging' },
            { src: 'assets/projects/data-warehouse/dw5.png', alt: 'TrueBook DW - Cube Aggregations & Query Optimization' },
            { src: 'assets/projects/data-warehouse/dw6.png', alt: 'TrueBook DW - Executive BI Analytics & Financial Dashboard' }
        ]
    },
    'o3sigma': {
        id: 'o3sigma',
        name: 'O3Sigma MES',
        title: 'O3Sigma — Industrial Desktop + Cloud Application',
        subtitle: '67 Platform Walkthrough Screenshots • Multi-plant OEE monitoring, edge desktop application, and MES operations.',
        images: [
            { src: 'assets/projects/o3sigma/f1.png', alt: 'O3Sigma MES - Screen 1' },
            { src: 'assets/projects/o3sigma/f2.png', alt: 'O3Sigma MES - Screen 2' },
            { src: 'assets/projects/o3sigma/f3.png', alt: 'O3Sigma MES - Screen 3' },
            { src: 'assets/projects/o3sigma/f4.png', alt: 'O3Sigma MES - Screen 4' },
            { src: 'assets/projects/o3sigma/f5.png', alt: 'O3Sigma MES - Screen 5' },
            { src: 'assets/projects/o3sigma/f6.png', alt: 'O3Sigma MES - Screen 6' },
            { src: 'assets/projects/o3sigma/f7.png', alt: 'O3Sigma MES - Screen 7' },
            { src: 'assets/projects/o3sigma/f8.png', alt: 'O3Sigma MES - Screen 8' },
            { src: 'assets/projects/o3sigma/f9.png', alt: 'O3Sigma MES - Screen 9' },
            { src: 'assets/projects/o3sigma/f10.png', alt: 'O3Sigma MES - Screen 10' },
            { src: 'assets/projects/o3sigma/f11.png', alt: 'O3Sigma MES - Screen 11' },
            { src: 'assets/projects/o3sigma/f12.png', alt: 'O3Sigma MES - Screen 12' },
            { src: 'assets/projects/o3sigma/f13.png', alt: 'O3Sigma MES - Screen 13' },
            { src: 'assets/projects/o3sigma/f14.png', alt: 'O3Sigma MES - Screen 14' },
            { src: 'assets/projects/o3sigma/f15.png', alt: 'O3Sigma MES - Screen 15' },
            { src: 'assets/projects/o3sigma/f16.png', alt: 'O3Sigma MES - Screen 16' },
            { src: 'assets/projects/o3sigma/f17.png', alt: 'O3Sigma MES - Screen 17' },
            { src: 'assets/projects/o3sigma/f18.png', alt: 'O3Sigma MES - Screen 18' },
            { src: 'assets/projects/o3sigma/f19.png', alt: 'O3Sigma MES - Screen 19' },
            { src: 'assets/projects/o3sigma/f20.png', alt: 'O3Sigma MES - Screen 20' },
            { src: 'assets/projects/o3sigma/f21.png', alt: 'O3Sigma MES - Screen 21' },
            { src: 'assets/projects/o3sigma/f22.png', alt: 'O3Sigma MES - Screen 22' },
            { src: 'assets/projects/o3sigma/f23.png', alt: 'O3Sigma MES - Screen 23' },
            { src: 'assets/projects/o3sigma/f24.png', alt: 'O3Sigma MES - Screen 24' },
            { src: 'assets/projects/o3sigma/f25.png', alt: 'O3Sigma MES - Screen 25' },
            { src: 'assets/projects/o3sigma/f26.png', alt: 'O3Sigma MES - Screen 26' },
            { src: 'assets/projects/o3sigma/f27.png', alt: 'O3Sigma MES - Screen 27' },
            { src: 'assets/projects/o3sigma/f28.png', alt: 'O3Sigma MES - Screen 28' },
            { src: 'assets/projects/o3sigma/f29.png', alt: 'O3Sigma MES - Screen 29' },
            { src: 'assets/projects/o3sigma/f30.png', alt: 'O3Sigma MES - Screen 30' },
            { src: 'assets/projects/o3sigma/f31.png', alt: 'O3Sigma MES - Screen 31' },
            { src: 'assets/projects/o3sigma/f32.png', alt: 'O3Sigma MES - Screen 32' },
            { src: 'assets/projects/o3sigma/f33.png', alt: 'O3Sigma MES - Screen 33' },
            { src: 'assets/projects/o3sigma/f34.png', alt: 'O3Sigma MES - Screen 34' },
            { src: 'assets/projects/o3sigma/f35.png', alt: 'O3Sigma MES - Screen 35' },
            { src: 'assets/projects/o3sigma/f36.png', alt: 'O3Sigma MES - Screen 36' },
            { src: 'assets/projects/o3sigma/f37.png', alt: 'O3Sigma MES - Screen 37' },
            { src: 'assets/projects/o3sigma/f38.png', alt: 'O3Sigma MES - Screen 38' },
            { src: 'assets/projects/o3sigma/f39.png', alt: 'O3Sigma MES - Screen 39' },
            { src: 'assets/projects/o3sigma/f40.png', alt: 'O3Sigma MES - Screen 40' },
            { src: 'assets/projects/o3sigma/f41.png', alt: 'O3Sigma MES - Screen 41' },
            { src: 'assets/projects/o3sigma/f42.png', alt: 'O3Sigma MES - Screen 42' },
            { src: 'assets/projects/o3sigma/f43.png', alt: 'O3Sigma MES - Screen 43' },
            { src: 'assets/projects/o3sigma/f44.png', alt: 'O3Sigma MES - Screen 44' },
            { src: 'assets/projects/o3sigma/f45.png', alt: 'O3Sigma MES - Screen 45' },
            { src: 'assets/projects/o3sigma/f46.png', alt: 'O3Sigma MES - Screen 46' },
            { src: 'assets/projects/o3sigma/f47.png', alt: 'O3Sigma MES - Screen 47' },
            { src: 'assets/projects/o3sigma/f48.png', alt: 'O3Sigma MES - Screen 48' },
            { src: 'assets/projects/o3sigma/f49.png', alt: 'O3Sigma MES - Screen 49' },
            { src: 'assets/projects/o3sigma/f50.png', alt: 'O3Sigma MES - Screen 50' },
            { src: 'assets/projects/o3sigma/f51.png', alt: 'O3Sigma MES - Screen 51' },
            { src: 'assets/projects/o3sigma/f52.png', alt: 'O3Sigma MES - Screen 52' },
            { src: 'assets/projects/o3sigma/f53.png', alt: 'O3Sigma MES - Screen 53' },
            { src: 'assets/projects/o3sigma/f54.png', alt: 'O3Sigma MES - Screen 54' },
            { src: 'assets/projects/o3sigma/f55.png', alt: 'O3Sigma MES - Screen 55' },
            { src: 'assets/projects/o3sigma/f56.png', alt: 'O3Sigma MES - Screen 56' },
            { src: 'assets/projects/o3sigma/f57.png', alt: 'O3Sigma MES - Screen 57' },
            { src: 'assets/projects/o3sigma/f58.png', alt: 'O3Sigma MES - Screen 58' },
            { src: 'assets/projects/o3sigma/f59.png', alt: 'O3Sigma MES - Screen 59' },
            { src: 'assets/projects/o3sigma/f60.png', alt: 'O3Sigma MES - Screen 60' },
            { src: 'assets/projects/o3sigma/f61.png', alt: 'O3Sigma MES - Screen 61' },
            { src: 'assets/projects/o3sigma/f62.png', alt: 'O3Sigma MES - Screen 62' },
            { src: 'assets/projects/o3sigma/f63.png', alt: 'O3Sigma MES - Screen 63' },
            { src: 'assets/projects/o3sigma/f64.png', alt: 'O3Sigma MES - Screen 64' },
            { src: 'assets/projects/o3sigma/f65.png', alt: 'O3Sigma MES - Screen 65' },
            { src: 'assets/projects/o3sigma/f66.png', alt: 'O3Sigma MES - Screen 66' },
            { src: 'assets/projects/o3sigma/f67.png', alt: 'O3Sigma MES - Screen 67' }
        ]
    },
    'mesonex': {
        id: 'mesonex',
        name: 'Mesonex MES',
        title: 'Mesonex — Manufacturing Execution System (MES) Platform',
        subtitle: '16 Platform Walkthrough Screenshots • Shop-floor execution, downtime tracking, historical OEE dashboards, and palletization workflows.',
        images: [
            { src: 'assets/projects/mesonex/m1.png', alt: 'Mesonex MES - Screen 1' },
            { src: 'assets/projects/mesonex/m2.png', alt: 'Mesonex MES - Screen 2' },
            { src: 'assets/projects/mesonex/m3.png', alt: 'Mesonex MES - Screen 3' },
            { src: 'assets/projects/mesonex/m4.png', alt: 'Mesonex MES - Screen 4' },
            { src: 'assets/projects/mesonex/m5.png', alt: 'Mesonex MES - Screen 5' },
            { src: 'assets/projects/mesonex/m6.png', alt: 'Mesonex MES - Screen 6' },
            { src: 'assets/projects/mesonex/m7.png', alt: 'Mesonex MES - Screen 7' },
            { src: 'assets/projects/mesonex/m8.png', alt: 'Mesonex MES - Screen 8' },
            { src: 'assets/projects/mesonex/m9.png', alt: 'Mesonex MES - Screen 9' },
            { src: 'assets/projects/mesonex/m10.png', alt: 'Mesonex MES - Screen 10' },
            { src: 'assets/projects/mesonex/m11.png', alt: 'Mesonex MES - Screen 11' },
            { src: 'assets/projects/mesonex/m12.png', alt: 'Mesonex MES - Screen 12' },
            { src: 'assets/projects/mesonex/m13.png', alt: 'Mesonex MES - Screen 13' },
            { src: 'assets/projects/mesonex/m14.png', alt: 'Mesonex MES - Screen 14' },
            { src: 'assets/projects/mesonex/m15.png', alt: 'Mesonex MES - Screen 15' },
            { src: 'assets/projects/mesonex/m16.png', alt: 'Mesonex MES - Screen 16' }
        ]
    },
    'digitly': {
        id: 'digitly',
        name: 'Digitly Agency',
        title: 'Digitly — Marketing Agency & CMS Platform',
        subtitle: '15 Platform Walkthrough Screenshots • Content management, client portals, campaigns, and digital marketing workflows.',
        images: [
            { src: 'assets/projects/digitly/d1.png', alt: 'Digitly Agency - Screen 1' },
            { src: 'assets/projects/digitly/d2.png', alt: 'Digitly Agency - Screen 2' },
            { src: 'assets/projects/digitly/d3.png', alt: 'Digitly Agency - Screen 3' },
            { src: 'assets/projects/digitly/d4.png', alt: 'Digitly Agency - Screen 4' },
            { src: 'assets/projects/digitly/d5.png', alt: 'Digitly Agency - Screen 5' },
            { src: 'assets/projects/digitly/d6.png', alt: 'Digitly Agency - Screen 6' },
            { src: 'assets/projects/digitly/d7.png', alt: 'Digitly Agency - Screen 7' },
            { src: 'assets/projects/digitly/d8.png', alt: 'Digitly Agency - Screen 8' },
            { src: 'assets/projects/digitly/d9.png', alt: 'Digitly Agency - Screen 9' },
            { src: 'assets/projects/digitly/d10.png', alt: 'Digitly Agency - Screen 10' },
            { src: 'assets/projects/digitly/d11.png', alt: 'Digitly Agency - Screen 11' },
            { src: 'assets/projects/digitly/d12.png', alt: 'Digitly Agency - Screen 12' },
            { src: 'assets/projects/digitly/d13.png', alt: 'Digitly Agency - Screen 13' },
            { src: 'assets/projects/digitly/d14.png', alt: 'Digitly Agency - Screen 14' },
            { src: 'assets/projects/digitly/d15.png', alt: 'Digitly Agency - Screen 15' }
        ]
    },
    'arenalads': {
        id: 'arenalads',
        name: 'Arenalads',
        title: 'Arenalads — Gaming & Esports Platform',
        subtitle: '19 Platform Walkthrough Screenshots • Tournament brackets, player matchmaking, real-time gaming statistics, and team hubs.',
        images: [
            { src: 'assets/projects/arenalads/a1.png', alt: 'Arenalads Esports - Screen 1' },
            { src: 'assets/projects/arenalads/a2.png', alt: 'Arenalads Esports - Screen 2' },
            { src: 'assets/projects/arenalads/a3.png', alt: 'Arenalads Esports - Screen 3' },
            { src: 'assets/projects/arenalads/a4.png', alt: 'Arenalads Esports - Screen 4' },
            { src: 'assets/projects/arenalads/a5.png', alt: 'Arenalads Esports - Screen 5' },
            { src: 'assets/projects/arenalads/a6.png', alt: 'Arenalads Esports - Screen 6' },
            { src: 'assets/projects/arenalads/a7.png', alt: 'Arenalads Esports - Screen 7' },
            { src: 'assets/projects/arenalads/a8.png', alt: 'Arenalads Esports - Screen 8' },
            { src: 'assets/projects/arenalads/a9.png', alt: 'Arenalads Esports - Screen 9' },
            { src: 'assets/projects/arenalads/a10.png', alt: 'Arenalads Esports - Screen 10' },
            { src: 'assets/projects/arenalads/a11.png', alt: 'Arenalads Esports - Screen 11' },
            { src: 'assets/projects/arenalads/a12.png', alt: 'Arenalads Esports - Screen 12' },
            { src: 'assets/projects/arenalads/a13.png', alt: 'Arenalads Esports - Screen 13' },
            { src: 'assets/projects/arenalads/a14.png', alt: 'Arenalads Esports - Screen 14' },
            { src: 'assets/projects/arenalads/a15.png', alt: 'Arenalads Esports - Screen 15' },
            { src: 'assets/projects/arenalads/a16.png', alt: 'Arenalads Esports - Screen 16' },
            { src: 'assets/projects/arenalads/a17.png', alt: 'Arenalads Esports - Screen 17' },
            { src: 'assets/projects/arenalads/a18.png', alt: 'Arenalads Esports - Screen 18' },
            { src: 'assets/projects/arenalads/a19.png', alt: 'Arenalads Esports - Screen 19' }
        ]
    },
    'deskmates': {
        id: 'deskmates',
        name: 'Deskmates',
        title: 'Deskmates — Coworking Space & Booking Platform',
        subtitle: '18 Platform Walkthrough Screenshots • Real-time floor plan booking, meeting room scheduling, access control, and membership billing.',
        images: [
            { src: 'assets/projects/deskmates/de1.png', alt: 'Deskmates Coworking - Screen 1' },
            { src: 'assets/projects/deskmates/de2.png', alt: 'Deskmates Coworking - Screen 2' },
            { src: 'assets/projects/deskmates/de3.png', alt: 'Deskmates Coworking - Screen 3' },
            { src: 'assets/projects/deskmates/de4.png', alt: 'Deskmates Coworking - Screen 4' },
            { src: 'assets/projects/deskmates/de5.png', alt: 'Deskmates Coworking - Screen 5' },
            { src: 'assets/projects/deskmates/de6.png', alt: 'Deskmates Coworking - Screen 6' },
            { src: 'assets/projects/deskmates/de7.png', alt: 'Deskmates Coworking - Screen 7' },
            { src: 'assets/projects/deskmates/de8.png', alt: 'Deskmates Coworking - Screen 8' },
            { src: 'assets/projects/deskmates/de9.png', alt: 'Deskmates Coworking - Screen 9' },
            { src: 'assets/projects/deskmates/de10.png', alt: 'Deskmates Coworking - Screen 10' },
            { src: 'assets/projects/deskmates/de11.png', alt: 'Deskmates Coworking - Screen 11' },
            { src: 'assets/projects/deskmates/de12.png', alt: 'Deskmates Coworking - Screen 12' },
            { src: 'assets/projects/deskmates/de13.png', alt: 'Deskmates Coworking - Screen 13' },
            { src: 'assets/projects/deskmates/de14.png', alt: 'Deskmates Coworking - Screen 14' },
            { src: 'assets/projects/deskmates/de15.png', alt: 'Deskmates Coworking - Screen 15' },
            { src: 'assets/projects/deskmates/de16.png', alt: 'Deskmates Coworking - Screen 16' },
            { src: 'assets/projects/deskmates/de17.png', alt: 'Deskmates Coworking - Screen 17' },
            { src: 'assets/projects/deskmates/de18.png', alt: 'Deskmates Coworking - Screen 18' }
        ]
    }
};

const slideToProjectMap = {
    0: 'o3sigma',
    1: 'mesonex',
    2: 'honest-abe',
    3: 'data-warehouse',
    4: 'digitly',
    5: 'arenalads',
    6: 'deskmates'
};

function initProjectLightbox() {
    const modalEl = document.getElementById('projectLightboxModal');
    const carouselEl = document.getElementById('projectLightboxCarousel');
    const detailModalEl = document.getElementById('projectImageDetailModal');
    if (!carouselEl) return;

    let currentProjectKey = 'honest-abe';
    let currentSlideIndex = 0;
    let returningToCarousel = false;

    // Track active slide when carousel slides
    carouselEl.addEventListener('slid.bs.carousel', function(event) {
        if (typeof event.to === 'number') {
            currentSlideIndex = event.to;
            updateCounter();
        }
    });

    function updateCounter() {
        const counterEl = document.getElementById('gallerySlideCounter');
        const gallery = projectGalleries[currentProjectKey];
        if (counterEl && gallery) {
            counterEl.innerHTML = `<i class="fas fa-images me-1"></i>Screenshot ${currentSlideIndex + 1} of ${gallery.images.length}`;
        }
    }

    function loadProjectGallery(projectKey, targetSlide = 0) {
        if (!projectGalleries[projectKey]) {
            projectKey = 'honest-abe';
        }
        currentProjectKey = projectKey;
        const gallery = projectGalleries[projectKey];

        // Update titles
        const titleEl = document.getElementById('galleryProjectTitle');
        const subtitleEl = document.getElementById('galleryProjectSubtitle');
        if (titleEl) titleEl.textContent = gallery.title;
        if (subtitleEl) subtitleEl.textContent = gallery.subtitle;

        // Ensure any old indicators container is removed so Bootstrap Carousel never attempts to set active indicators
        const oldIndicators = carouselEl.querySelector('.carousel-indicators');
        if (oldIndicators) {
            oldIndicators.remove();
        }

        // Build Carousel Inner
        const innerEl = carouselEl.querySelector('.carousel-inner') || document.getElementById('galleryCarouselInner');
        if (innerEl) {
            let innerHtml = '';
            gallery.images.forEach((imgObj, idx) => {
                const isActive = idx === targetSlide ? 'active' : '';
                innerHtml += `
                    <div class="carousel-item ${isActive}">
                        <div class="carousel-img-frame">
                            <img src="${imgObj.src}" class="d-block w-100 img-fluid" alt="${imgObj.alt}">
                        </div>
                    </div>`;
            });
            innerEl.innerHTML = innerHtml;
        }

        currentSlideIndex = Math.min(targetSlide, gallery.images.length - 1);
        updateCounter();

        // Bind image click listener for zoom modal
        bindImageZoomListeners();

        // Dispose previous carousel instance and create a clean one without indicators
        if (typeof bootstrap !== 'undefined') {
            const existingCarousel = bootstrap.Carousel.getInstance(carouselEl);
            if (existingCarousel) {
                existingCarousel.dispose();
            }
            const bsCarousel = new bootstrap.Carousel(carouselEl, {
                interval: false,
                ride: false,
                wrap: true
            });
            if (currentSlideIndex > 0) {
                bsCarousel.to(currentSlideIndex);
            }
        }
    }

    // Listen to Bootstrap modal show event to automatically load clicked project
    if (modalEl) {
        modalEl.addEventListener('show.bs.modal', function(event) {
            const trigger = event.relatedTarget;
            if (trigger) {
                const projectAttr = trigger.getAttribute('data-project');
                const slideAttr = trigger.getAttribute('data-slide-to');
                let targetKey = projectAttr;
                if (!targetKey && slideAttr !== null) {
                    targetKey = slideToProjectMap[parseInt(slideAttr, 10)] || 'honest-abe';
                }
                if (targetKey) {
                    loadProjectGallery(targetKey, 0);
                }
            }
        });
    }

    // Direct click fallback on all lightbox trigger buttons
    const triggers = document.querySelectorAll('.view-project-modal-btn, .project-mockup-trigger, [data-bs-target="#projectLightboxModal"]');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const projectAttr = this.getAttribute('data-project');
            const slideAttr = this.getAttribute('data-slide-to');
            let targetKey = projectAttr;
            if (!targetKey && slideAttr !== null) {
                targetKey = slideToProjectMap[parseInt(slideAttr, 10)] || 'honest-abe';
            }
            if (targetKey) {
                loadProjectGallery(targetKey, 0);
            }
        });
    });

    // Handle clicking any specific image in the carousel to open in Dedicated Image Modal
    function bindImageZoomListeners() {
        if (!detailModalEl) return;
        const detailImg = document.getElementById('projectDetailModalImg');
        const carouselImages = carouselEl.querySelectorAll('.carousel-item img');

        carouselImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.setAttribute('title', 'Click to view full resolution image');

            img.addEventListener('click', function(e) {
                e.preventDefault();
                const parentItem = this.closest('.carousel-item');
                if (!parentItem) return;

                const allItems = Array.from(parentItem.parentElement.children);
                currentSlideIndex = allItems.indexOf(parentItem);

                const src = this.getAttribute('src');
                const alt = this.getAttribute('alt') || 'Project Screenshot';

                if (detailImg) {
                    detailImg.src = src;
                    detailImg.alt = alt;
                }

                returningToCarousel = true;

                if (typeof bootstrap !== 'undefined') {
                    const lightboxModal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
                    const detailModal = bootstrap.Modal.getOrCreateInstance(detailModalEl);

                    if (lightboxModal) {
                        const onLightboxHidden = function() {
                            modalEl.removeEventListener('hidden.bs.modal', onLightboxHidden);
                            detailModal.show();
                        };
                        modalEl.addEventListener('hidden.bs.modal', onLightboxHidden);
                        lightboxModal.hide();
                    } else {
                        detailModal.show();
                    }
                }
            });
        });
    }

    // Initialize Dedicated Image Detail Modal (Zoom & Pan)
    if (detailModalEl) {
        const detailImg = document.getElementById('projectDetailModalImg');
        const viewportEl = document.getElementById('imageZoomViewport');
        const btnHeaderClose = document.getElementById('btnDetailModalHeaderClose');
        const btnZoomIn = document.getElementById('btnZoomIn');
        const btnZoomReset = document.getElementById('btnZoomReset');
        const btnZoomOut = document.getElementById('btnZoomOut');

        // Zoom & Pan state variables
        let zoomScale = 1;
        let translateX = 0;
        let translateY = 0;
        let isPanning = false;
        let hasMoved = false;
        let startX = 0;
        let startY = 0;
        const MIN_SCALE = 1;
        const MAX_SCALE = 3.5;

        function applyTransform(withTransition = true) {
            if (!detailImg) return;
            if (withTransition) {
                detailImg.classList.remove('no-transition');
            } else {
                detailImg.classList.add('no-transition');
            }
            detailImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
            
            if (viewportEl) {
                if (zoomScale > 1) {
                    viewportEl.classList.add('is-zoomed');
                } else {
                    viewportEl.classList.remove('is-zoomed', 'is-panning');
                }
            }
        }

        function resetZoom() {
            zoomScale = 1;
            translateX = 0;
            translateY = 0;
            isPanning = false;
            hasMoved = false;
            applyTransform(true);
        }

        function setZoom(newScale) {
            const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, Math.round(newScale * 100) / 100));
            zoomScale = clamped;
            if (zoomScale <= 1) {
                translateX = 0;
                translateY = 0;
            }
            applyTransform(true);
        }

        // Zoom button controls
        if (btnZoomIn) {
            btnZoomIn.addEventListener('click', function(e) {
                e.stopPropagation();
                setZoom(zoomScale + 0.4);
            });
        }

        if (btnZoomOut) {
            btnZoomOut.addEventListener('click', function(e) {
                e.stopPropagation();
                setZoom(zoomScale - 0.4);
            });
        }

        if (btnZoomReset) {
            btnZoomReset.addEventListener('click', function(e) {
                e.stopPropagation();
                resetZoom();
            });
        }

        // Image click-to-zoom toggle (1x <-> 1.85x)
        if (detailImg) {
            detailImg.addEventListener('click', function(e) {
                if (hasMoved) return;
                e.stopPropagation();
                if (zoomScale > 1) {
                    resetZoom();
                } else {
                    setZoom(1.85);
                }
            });
        }

        // Mouse wheel zoom over viewport
        if (viewportEl) {
            viewportEl.addEventListener('wheel', function(e) {
                e.preventDefault();
                const delta = e.deltaY < 0 ? 0.25 : -0.25;
                setZoom(zoomScale + delta);
            }, { passive: false });

            // Drag to pan when zoomed
            viewportEl.addEventListener('mousedown', function(e) {
                if (zoomScale <= 1 || e.button !== 0) return;
                isPanning = true;
                hasMoved = false;
                startX = e.clientX - translateX;
                startY = e.clientY - translateY;
                viewportEl.classList.add('is-panning');
                e.preventDefault();
            });

            window.addEventListener('mousemove', function(e) {
                if (!isPanning) return;
                const currentX = e.clientX - startX;
                const currentY = e.clientY - startY;
                if (Math.abs(currentX - translateX) > 4 || Math.abs(currentY - translateY) > 4) {
                    hasMoved = true;
                }
                translateX = currentX;
                translateY = currentY;
                applyTransform(false);
            });

            window.addEventListener('mouseup', function() {
                if (!isPanning) return;
                isPanning = false;
                if (viewportEl) viewportEl.classList.remove('is-panning');
            });

            // Touch support for mobile devices
            let touchStartX = 0;
            let touchStartY = 0;

            viewportEl.addEventListener('touchstart', function(e) {
                if (zoomScale <= 1 || e.touches.length !== 1) return;
                isPanning = true;
                hasMoved = false;
                touchStartX = e.touches[0].clientX - translateX;
                touchStartY = e.touches[0].clientY - translateY;
            }, { passive: true });

            viewportEl.addEventListener('touchmove', function(e) {
                if (!isPanning || e.touches.length !== 1) return;
                const currentX = e.touches[0].clientX - touchStartX;
                const currentY = e.touches[0].clientY - touchStartY;
                if (Math.abs(currentX - translateX) > 4 || Math.abs(currentY - translateY) > 4) {
                    hasMoved = true;
                }
                translateX = currentX;
                translateY = currentY;
                applyTransform(false);
            }, { passive: true });

            viewportEl.addEventListener('touchend', function() {
                isPanning = false;
            }, { passive: true });

            // Click empty viewport background to dismiss when not zoomed
            viewportEl.addEventListener('click', function(e) {
                if (e.target === viewportEl && zoomScale <= 1 && !hasMoved) {
                    returningToCarousel = true;
                    if (typeof bootstrap !== 'undefined') {
                        const detailModal = bootstrap.Modal.getInstance(detailModalEl);
                        if (detailModal) detailModal.hide();
                    }
                }
            });
        }

        // Floating Close (×) button returns cleanly to carousel
        if (btnHeaderClose) {
            btnHeaderClose.addEventListener('click', function(e) {
                e.stopPropagation();
                returningToCarousel = true;
                if (typeof bootstrap !== 'undefined') {
                    const detailModal = bootstrap.Modal.getInstance(detailModalEl);
                    if (detailModal) detailModal.hide();
                }
            });
        }

        // When Detail Modal is hidden
        detailModalEl.addEventListener('hidden.bs.modal', function() {
            resetZoom();
            if (detailImg) detailImg.src = '';

            if (returningToCarousel && modalEl && typeof bootstrap !== 'undefined') {
                const lightboxModal = bootstrap.Modal.getOrCreateInstance(modalEl);
                const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);

                const onLightboxShown = function() {
                    modalEl.removeEventListener('shown.bs.modal', onLightboxShown);
                    if (!isNaN(currentSlideIndex)) {
                        bsCarousel.to(currentSlideIndex);
                    }
                };
                modalEl.addEventListener('shown.bs.modal', onLightboxShown);
                lightboxModal.show();
            }
            returningToCarousel = false;
        });
    }

    // Initial gallery load
    loadProjectGallery('honest-abe', 0);
}

// ================================================
// FLOATING GO TO TOP BUTTON
// ================================================
function initGoToTop() {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (!goToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 350) {
            goToTopBtn.classList.add('show');
        } else {
            goToTopBtn.classList.remove('show');
        }
    });

    goToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ================================================
// EMAIL PROVIDER CHOICE MODAL & COPY INTERACTION
// ================================================
function initHeroEmail() {
    // Copy email button inside the choice modal
    const copyChoiceBtn = document.getElementById('copyEmailChoiceBtn');
    const copyChoiceText = document.getElementById('copyEmailBtnText');
    const emailToCopy = 'bilawalali21222@gmail.com';

    if (copyChoiceBtn) {
        copyChoiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailToCopy).then(() => {
                    if (copyChoiceText) {
                        copyChoiceBtn.innerHTML = '<i class="fas fa-check text-success me-1"></i>Copied!';
                        setTimeout(() => {
                            copyChoiceBtn.innerHTML = '<i class="fas fa-copy me-1"></i><span id="copyEmailBtnText">Copy</span>';
                        }, 2500);
                    }
                }).catch(() => {});
            }
        });
    }

    // Enhanced default desktop mail client click feedback & clipboard copy fallback
    const defaultMailClientLink = document.getElementById('defaultMailClientLink');
    if (defaultMailClientLink) {
        defaultMailClientLink.addEventListener('click', function() {
            // Do NOT call e.preventDefault() to allow browser to trigger native mailto
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailToCopy).catch(() => {});
            }
            const origHtml = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check text-success me-2"></i>Email Copied & Opening App...';
            const note = document.getElementById('clientLaunchedNote');
            if (note) note.style.display = 'block';
            setTimeout(() => {
                this.innerHTML = origHtml;
            }, 3500);
        });
    }

    // Prevent Bootstrap aria-hidden accessibility focus console warnings on all modals
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modalEl => {
        modalEl.addEventListener('hide.bs.modal', function() {
            if (document.activeElement && modalEl.contains(document.activeElement)) {
                document.activeElement.blur();
            }
        });
    });

    // Ensure any hero email icon triggers the email choice modal
    const heroEmailButtons = document.querySelectorAll('.hero-email-icon');
    heroEmailButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevent default hash jump if modal is attached
            const emailModalEl = document.getElementById('emailChoiceModal');
            if (emailModalEl && typeof bootstrap !== 'undefined') {
                e.preventDefault();
                const bsModal = bootstrap.Modal.getOrCreateInstance(emailModalEl);
                bsModal.show();
            }
        });
    });
}



