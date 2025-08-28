// Yoga Studio Interactive Scripts

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const initSmoothScrolling = () => {
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
    };

    // Intersection Observer for fade-in animations
    const initScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section > div').forEach(el => {
            observer.observe(el);
        });

        // Also observe individual cards and elements
        document.querySelectorAll('.hover-lift').forEach(el => {
            observer.observe(el);
        });
    };

    // Mobile menu toggle (for future implementation)
    const initMobileMenu = () => {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    };

    // Form validation and submission
    const initContactForm = () => {
        const contactForm = document.querySelector('#contact form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const firstName = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const message = this.querySelector('textarea').value;
                
                // Basic validation
                if (!firstName || !email || !message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
            });
        }
    };

    // Notification system
    const showNotification = (message, type = 'info') => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Set notification style based on type
        switch(type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-blue-500', 'text-white');
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    };

    // Navbar background change on scroll
    const initNavbarScroll = () => {
        const navbar = document.querySelector('nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/90');
                navbar.classList.remove('glass-effect');
            } else {
                navbar.classList.remove('bg-white/90');
                navbar.classList.add('glass-effect');
            }
        });
    };

    // Class schedule interactions
    const initScheduleInteractions = () => {
        const scheduleRows = document.querySelectorAll('tbody tr');
        
        scheduleRows.forEach(row => {
            row.addEventListener('click', function() {
                const className = this.querySelector('.text-sage-600')?.textContent;
                if (className && className !== '-') {
                    showNotification(`Click to book: ${className}`, 'info');
                }
            });
        });
    };

    // CTA button interactions
    const initCTAButtons = () => {
        const ctaButtons = document.querySelectorAll('button');
        
        ctaButtons.forEach(button => {
            if (button.textContent.includes('Start Your Journey')) {
                button.addEventListener('click', () => {
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
            
            if (button.textContent.includes('View Classes')) {
                button.addEventListener('click', () => {
                    document.querySelector('#classes').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        });
    };

    // Parallax effect for hero section
    const initParallaxEffect = () => {
        const hero = document.querySelector('#home');
        const heroContent = hero?.querySelector('.hero-gradient');
        
        if (heroContent) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                heroContent.style.transform = `translateY(${rate}px)`;
            });
        }
    };

    // Down arrow scroll functionality
    const initDownArrowScroll = () => {
        const downArrow = document.querySelector('.animate-bounce');
        
        if (downArrow) {
            downArrow.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
            
            // Add cursor pointer to indicate it's clickable
            downArrow.style.cursor = 'pointer';
        }
    };

    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initMobileMenu();
    initContactForm();
    initNavbarScroll();
    initScheduleInteractions();
    initCTAButtons();
    initParallaxEffect();
    initDownArrowScroll();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('🧘‍♀️ Asana Studio website loaded successfully!');
});

// Utility functions
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}