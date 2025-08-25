// Função para criar partículas flutuantes
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamanho e posição aleatórios
        const size = Math.random() * 10 + 5;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Função para animar os elementos quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas flutuantes
    createParticles();

    // Marcar card como carregado para animação
    const card = document.querySelector('.card');
    setTimeout(() => {
        card.classList.add('loaded');
    }, 100);

    // Efeito de digitação no título
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    };
    setTimeout(typeWriter, 500);

    // Animação de digitação para o subtítulo
    const subtitle = document.querySelector('.subtitle');
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    
    let j = 0;
    const subtitleTypeWriter = () => {
        if (j < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(j);
            j++;
            setTimeout(subtitleTypeWriter, 60);
        }
    };
    setTimeout(subtitleTypeWriter, 1500);

    // Animação de entrada para elementos de informação
    const infoParagraphs = document.querySelectorAll('.info p');
    infoParagraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.transform = 'translateX(-30px)';
        setTimeout(() => {
            p.style.transition = 'all 0.6s ease';
            p.style.opacity = '1';
            p.style.transform = 'translateX(0)';
        }, 2000 + (index * 300));
    });

    // Animação de entrada para interesses
    const interestItems = document.querySelectorAll('.interests li');
    interestItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 2500 + (index * 200));
    });

    // Animação de entrada para links sociais
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px) scale(0.8)';
        setTimeout(() => {
            link.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0) scale(1)';
        }, 3000 + (index * 200));
    });

    // Efeitos de hover avançados
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-8px) scale(1.15)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito parallax suave no card
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 50;
        const y = (window.innerHeight / 2 - e.clientY) / 50;
        card.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-5px)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(-5px)';
    });

    // Contador de visitas com animação
    let visitCount = localStorage.getItem('visitCount') || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Mostrar contador de visitas com animação
    const visitCounter = document.createElement('div');
    visitCounter.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 14px;
        color: #667eea;
        font-weight: 600;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
        z-index: 1000;
    `;
    visitCounter.textContent = `👋 Visitante nº ${visitCount}`;
    document.body.appendChild(visitCounter);
    
    setTimeout(() => {
        visitCounter.style.opacity = '1';
        visitCounter.style.transform = 'translateY(0)';
    }, 4000);
    
    setTimeout(() => {
        visitCounter.style.opacity = '0';
        visitCounter.style.transform = 'translateY(20px)';
        setTimeout(() => visitCounter.remove(), 500);
    }, 8000);

    // Efeito de confetti ao clicar
    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });
});

// Função para criar efeito de confetti ao clicar
function createClickEffect(x, y) {
    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const xVel = Math.cos(angle) * velocity;
        const yVel = Math.sin(angle) * velocity;
        
        document.body.appendChild(confetti);
        
        let opacity = 1;
        const animate = () => {
            opacity -= 0.02;
            if (opacity <= 0) {
                confetti.remove();
                return;
            }
            
            confetti.style.opacity = opacity;
            confetti.style.transform = `translate(${xVel * (1 - opacity) * 50}px, ${yVel * (1 - opacity) * 50}px)`;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Função para modo escuro/claro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Função para rolar suavemente para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animação de digitação para qualquer elemento
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
