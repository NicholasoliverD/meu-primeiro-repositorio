// Animação principal quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Animação do card principal
    const card = document.querySelector('.card');
    setTimeout(() => card.classList.add('loaded'), 100);

    // Animação de digitação no título
    typeWriterEffect(document.querySelector('h1'), 'Nicholas de Oliveira', 80);
    
    // Animação de elementos com atraso
    animateElements([
        '.subtitle',
        '.info p',
        '.interests li',
        '.social-links a'
    ]);
    
    // Contador de visitas
    updateVisitCounter();
    
    // Efeitos de hover
    setupHoverEffects();
});

// Função para animação de digitação
function typeWriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
}

// Função para animar múltiplos elementos
function animateElements(selectors) {
    selectors.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, elIndex) => {
            el.classList.add('fade-in');
            setTimeout(() => {
                el.classList.add('visible');
            }, 500 + (index * 300) + (elIndex * 100));
        });
    });
}

// Contador de visitas
function updateVisitCounter() {
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Mostrar contador brevemente
    const counter = document.createElement('div');
    counter.textContent = `👋 Visitante nº ${visitCount}`;
    counter.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: rgba(255,255,255,0.9); padding: 8px 12px;
        border-radius: 15px; font-size: 12px; color: #667eea;
        font-weight: 600; box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        opacity: 0; transform: translateY(20px); transition: all 0.4s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(counter);
    
    setTimeout(() => {
        counter.style.opacity = '1';
        counter.style.transform = 'translateY(0)';
        setTimeout(() => {
            counter.style.opacity = '0';
            setTimeout(() => counter.remove(), 400);
        }, 3000);
    }, 2000);
}

// Efeitos de hover
function setupHoverEffects() {
    // Links sociais
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-4px) scale(1.05)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito parallax suave no card
    const card = document.querySelector('.card');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(-5px)';
    });
}

// Efeito de confetti ao clicar (opcional)
document.addEventListener('click', (e) => {
    createConfetti(e.clientX, e.clientY);
});

function createConfetti(x, y) {
    for (let i = 0; i < 8; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed; width: 6px; height: 6px;
            background: #667eea; border-radius: 50%;
            pointer-events: none; z-index: 1000;
        `;
        
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 2;
        const xVel = Math.cos(angle) * velocity;
        const yVel = Math.sin(angle) * velocity;
        
        document.body.appendChild(confetti);
        
        let opacity = 1;
        const animate = () => {
            opacity -= 0.03;
            if (opacity <= 0) {
                confetti.remove();
                return;
            }
            
            confetti.style.opacity = opacity;
            confetti.style.transform = `translate(${xVel * (1 - opacity) * 30}px, ${yVel * (1 - opacity) * 30}px)`;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}
