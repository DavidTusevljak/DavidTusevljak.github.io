// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 30, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(102, 126, 234, 0.1)';
    } else {
        navbar.style.background = 'rgba(15, 15, 30, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer für Animationen beim Scrollen
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.skill-card, .timeline-content, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Profilbild korrekt als JPEG herunterladen.
// Die Datei wird zuerst als Bild geladen, damit nicht versehentlich HTML gespeichert wird.
async function downloadProfileImage() {
    try {
        const response = await fetch('profile.jpg', { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Bild konnte nicht geladen werden (${response.status})`);

        const imageBlob = await response.blob();
        const jpegBlob = new Blob([imageBlob], { type: 'image/jpeg' });
        const objectUrl = URL.createObjectURL(jpegBlob);
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = 'David-Tusevljak-Profilbild.jpeg';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(objectUrl);
    } catch (error) {
        console.error('Download des Profilbilds fehlgeschlagen:', error);
    }
}

// Automatischer Versuch beim Öffnen; Browser können ihn blockieren.
window.addEventListener('load', downloadProfileImage);

// Sicherer Fallback beim ersten Klick, falls der Browser den automatischen Download blockiert.
document.addEventListener('click', () => downloadProfileImage(), { once: true });

// Typing Animation für den Hero-Text
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index++);
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const subtitle = document.querySelector('.animate-subtitle');
    if (subtitle) typeWriter(subtitle, subtitle.textContent, 100);
});

// Aktuelle Navigation hervorheben
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) current = section.id;
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
}
