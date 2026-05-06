// FAQ accordion
document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const answer = btn.nextElementSibling;

        // Close all
        document.querySelectorAll('.faq-item__question').forEach(b => {
            b.setAttribute('aria-expanded', 'false');
            b.nextElementSibling.hidden = true;
        });

        // Toggle clicked
        if (!isOpen) {
            btn.setAttribute('aria-expanded', 'true');
            answer.hidden = false;
        }
    });
});

// Mobile nav toggle
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!isOpen));
        mobileMenu.setAttribute('aria-hidden', String(isOpen));
        mobileMenu.classList.toggle('is-open', !isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenu.classList.remove('is-open');
        });
    });
}

// Smooth scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 76;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Subtle scroll-in animation
const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
    '.product-card, .benefit-item, .testimonial-card, .faq-item'
).forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Inject animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
