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