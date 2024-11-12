document.querySelectorAll('.navbar a').forEach(anchor => { anchor.addEventListener('click', function (e) { e.preventDefault(); document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }); }); const revealElements = document.querySelectorAll('.reveal'); window.addEventListener('scroll', revealOnScroll); function revealOnScroll() { revealElements.forEach(element => { const elementTop = element.getBoundingClientRect().top; const windowHeight = window.innerHeight; if (elementTop < windowHeight - 100) { element.classList.add('active'); } }); } document.querySelectorAll('section, .navbar').forEach(section => { section.classList.add('reveal'); }); window.addEventListener('scroll', () => { const navbar = document.querySelector('.navbar'); if (window.scrollY > 100) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); } }); const downloadButton = document.querySelector('.download .button'); setInterval(() => { downloadButton.classList.toggle('pulse'); }, 1500);