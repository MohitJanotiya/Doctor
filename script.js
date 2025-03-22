// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    
    // Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // =========== CUSTOM CURSOR =========== //
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
            });
            
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.opacity = '0.5';
            });
            
            button.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }
    
    // =========== MOBILE NAVIGATION =========== //
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }
    
    // =========== SMOOTH SCROLLING =========== //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========== STICKY HEADER =========== //
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (header && hero) {
        const stickyHeader = () => {
            const heroHeight = hero.getBoundingClientRect().height;
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        };
        
        window.addEventListener('scroll', stickyHeader);
    }
    
    // =========== TESTIMONIAL SLIDER =========== //
    if (testimonialSlider && testimonialItems.length > 0) {
        let currentTestimonial = 0;
        const maxTestimonials = testimonialItems.length;
        
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Set first dot as active
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        
        // Function to show testimonial by index
        const showTestimonial = (index) => {
            // Hide current testimonial
            testimonialItems[currentTestimonial].style.display = 'none';
            
            // Update dots
            if (dots.length > 0) {
                dots[currentTestimonial].classList.remove('active');
                dots[index].classList.add('active');
            }
            
            // Show new testimonial
            testimonialItems[index].style.display = 'block';
            
            // Update current index
            currentTestimonial = index;
        };
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentTestimonial + 1) % maxTestimonials;
                showTestimonial(nextIndex);
            });
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentTestimonial - 1 + maxTestimonials) % maxTestimonials;
                showTestimonial(prevIndex);
            });
        }
        
        // Dot navigation
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showTestimonial(index);
                });
            });
        }
        
        // Auto slide every 5 seconds
        setInterval(() => {
            let nextIndex = (currentTestimonial + 1) % maxTestimonials;
            showTestimonial(nextIndex);
        }, 5000);
    }
    
    // =========== FORM VALIDATION =========== //
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const phoneInput = this.querySelector('input[name="phone"]');
            const serviceInput = this.querySelector('select[name="service"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            // Basic validation
            let valid = true;
            
            // Remove previous error messages
            const previousErrorMessage = this.querySelector('.form-message.error');
            if (previousErrorMessage) {
                previousErrorMessage.remove();
            }
            
            // Validate name
            if (!nameInput.value.trim()) {
                valid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                valid = false;
            }
            
            // Validate phone (optional but must be valid if provided)
            if (phoneInput.value.trim() && !/^[0-9+\- ]{10,15}$/.test(phoneInput.value.trim())) {
                valid = false;
            }
            
            // Validate service
            if (serviceInput.value === "") {
                valid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim() || messageInput.value.length < 10) {
                valid = false;
            }
            
            if (!valid) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-message error';
                errorMessage.textContent = 'Please fill all required fields correctly.';
                contactForm.appendChild(errorMessage);
            } else {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.textContent = 'Your message has been sent successfully. We will contact you soon!';
                contactForm.appendChild(successMessage);
                
                // Clear form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // =========== SCROLL ANIMATIONS =========== //
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check for elements in viewport
    setTimeout(revealOnScroll, 100);
    
    // Check for new elements on scroll
    window.addEventListener('scroll', revealOnScroll);
}); 