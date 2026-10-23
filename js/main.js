const typingEL = document.querySelector(".typing");

const role = [
    'Software Engineering student',
    'Open for networking',
    'Problem solver',
    'Always learning'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type(){
    const current = role[roleIndex];

    if (deleting){
        charIndex--;
    }
    else{
        charIndex++;
    }

    typingEL.textContent = current.slice(0, charIndex);

    let delay = deleting ? 40 : 80;

    if(!deleting && charIndex===current.length){
        deleting=true;
        delay=1500;
    }
    else if(deleting && charIndex===0){
        deleting = false;
        roleIndex = (roleIndex+1) % role.length;
        delay=400;
    }

    setTimeout(type, delay);
}

type();

const sections = document.querySelectorAll('section:not(.hero)');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.15 });

sections.forEach((section) => {
  section.classList.add('reveal');
  observer.observe(section);
});

const themeBtn = document.querySelector('.theme-toggle');

themeBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

const copyBtn = document.querySelector('.copy-btn');

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    copyBtn.textContent = 'Copied!';
  } catch (e) {
    copyBtn.textContent = 'Copy failed';
  }
  setTimeout(()=>{copyBtn.textContent='Copy email';}, 2000)
});

const navLinks = document.querySelectorAll('.nav nav a');
const trackedSections = document.querySelectorAll('main section');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

trackedSections.forEach((section) => navObserver.observe(section));


const scrollBar = document.querySelector('.scroll-bar');

function updateScrollBar() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = max > 0 ? window.scrollY / max : 0;
  scrollBar.style.transform = 'scaleX(' + fraction + ')';
}

window.addEventListener('scroll', updateScrollBar, { passive: true });
updateScrollBar();

document.querySelectorAll('.project-grid > *').forEach((card, i) => {
  card.style.setProperty('--i', i);
});

const magnets = document.querySelectorAll('.hero .btn');

if (window.matchMedia('(hover: hover)').matches){
  window.addEventListener('mousemove', (e) => {
  magnets.forEach((btn) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const distance = Math.hypot(dx, dy);

    if (distance < 120) {
      btn.style.translate = dx * 0.3 + 'px ' + dy * 0.3 + 'px';
    } else {
      btn.style.translate = '0 0';
    }
  });
});
}