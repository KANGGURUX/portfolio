// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const contentSections = document.querySelectorAll('.content-section');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
        navLinks.classList.remove('active');
    }
});

// Handle navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show corresponding section
        const sectionId = item.getAttribute('data-section');
        contentSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });

        // Close mobile menu after click
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for hero section buttons
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 60,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/**
 * Array of strings to be typed out in the typewriter
 * effect on the home page. The strings are chosen to
 * reflect my current career goals and interests.
 * @type {string[]}
 */
const texts = [
    "je cherche une alternance ou un contrat de professionnalisation en développement web et/ou backend",
    "je veux devenir software developpeur/backend developpeur",
    "je suis en train d'apprendre,",

]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let charcterIndex = 0;

function typeWriter() {
    if (charcterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else {
        setTimeout(eraseText, 1000)
    }
}

function eraseText() {
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1)
        setTimeout(eraseText, 50)
    }
    else {
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

// --- Circular Progress Animation for Skills ---
function animateCircularSkills() {
    document.querySelectorAll('.circle[data-percentage]').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percentage'));
        // Animate from 0 to percent
        let current = 0;
        const step = () => {
            current += 2;
            if (current > percent) current = percent;
            circle.style.setProperty('--percent', current);
            if (current < percent) {
                requestAnimationFrame(step);
            }
        };
        step();
    });
}

window.onload = function() {
    typeWriter();
    animateCircularSkills();
};
