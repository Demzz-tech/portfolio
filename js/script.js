// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 20, 38, 0.98)';
    } else {
        navbar.style.background = 'rgba(11, 20, 38, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about-card, .skill-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1500);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-image');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Glitch effect for title on hover
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.hero-title');
    if (title) {
        title.addEventListener('mouseenter', () => {
            title.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        title.addEventListener('animationend', () => {
            title.style.animation = '';
        });
    }
});

// Add glitch animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Cursor trail effect
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Create trail dots
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00D4FF;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - i * 0.08};
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(dot);
            this.dots.push({
                element: dot,
                x: 0,
                y: 0
            });
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.pageX - window.scrollX;
            this.mouse.y = e.pageY - window.scrollY;
        });
        
        // Hide dots when mouse leaves window
        document.addEventListener('mouseleave', () => {
            this.dots.forEach(dot => {
                dot.element.style.opacity = '0';
            });
        });
        
        document.addEventListener('mouseenter', () => {
            this.dots.forEach((dot, i) => {
                dot.element.style.opacity = 1 - i * 0.08;
            });
        });
        
        this.animate();
    }
    

    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            
            x = dot.x;
            y = dot.y;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail on desktop only
if (window.innerWidth > 768) {
    new CursorTrail();
}

// Page transition effect
function pageTransition(url) {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Apply page transition to navigation links
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        pageTransition(link.href);
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

document.addEventListener('DOMContentLoaded', function() {
    // Dropdown for Personal Narrative
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    if (dropdown && dropdownToggle) {
        dropdownToggle.addEventListener('mouseenter', () => {
            dropdown.classList.add('open');
        });
        dropdownToggle.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdown.classList.remove('open');
                }
            }, 100);
        });
        dropdown.addEventListener('mouseleave', () => {
            dropdown.classList.remove('open');
        });
        dropdown.addEventListener('mouseenter', () => {
            dropdown.classList.add('open');
        });
        // For accessibility: open on focus, close on blur
        dropdownToggle.addEventListener('focus', () => {
            dropdown.classList.add('open');
        });
        dropdownToggle.addEventListener('blur', () => {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdown.classList.remove('open');
                }
            }, 100);
        });
    }
});

