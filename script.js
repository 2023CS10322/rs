// Floating Hearts Animation
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Create hearts periodically
setInterval(createHeart, 800);

// Initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 300);
}

// Interactive Rose Garden Cards
const roseCards = document.querySelectorAll('.rose-card');

roseCards.forEach(card => {
    card.addEventListener('click', function() {
        if (!this.classList.contains('revealed')) {
            const message = this.getAttribute('data-message');
            const messageElement = this.querySelector('.card-message');
            messageElement.textContent = message;
            this.classList.add('revealed');
            
            // Create sparkle effect
            createSparkles(this);
        }
    });
});

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 15;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '1000';
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let opacity = 1;
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += vx * 0.016;
            y += vy * 0.016;
            opacity -= 0.02;
            
            sparkle.style.transform = `translate(${x}px, ${y}px)`;
            sparkle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        animate();
    }
}

// Love Counter
const counterElement = document.getElementById('counter');
const countBtn = document.getElementById('countBtn');
let count = 0;
let isInfinity = true;

countBtn.addEventListener('click', function() {
    if (isInfinity) {
        isInfinity = false;
        count = 1;
        counterElement.textContent = count;
        this.textContent = 'Keep Counting!';
    } else {
        count++;
        counterElement.textContent = count;
        
        // Create floating number animation
        createFloatingNumber(count);
        
        if (count === 100) {
            counterElement.textContent = '∞';
            this.textContent = 'Told you! It\'s infinite! 💕';
            setTimeout(() => {
                isInfinity = true;
                count = 0;
                this.textContent = 'Click to Count (if you dare!)';
            }, 3000);
        }
    }
    
    // Button animation
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
});

function createFloatingNumber(num) {
    const button = countBtn.getBoundingClientRect();
    const floatingNum = document.createElement('div');
    floatingNum.textContent = '+1 ❤️';
    floatingNum.style.position = 'fixed';
    floatingNum.style.left = button.left + button.width / 2 + 'px';
    floatingNum.style.top = button.top + 'px';
    floatingNum.style.fontSize = '24px';
    floatingNum.style.fontWeight = 'bold';
    floatingNum.style.color = '#ff1744';
    floatingNum.style.pointerEvents = 'none';
    floatingNum.style.zIndex = '1000';
    document.body.appendChild(floatingNum);
    
    let y = 0;
    let opacity = 1;
    
    const animate = () => {
        y -= 2;
        opacity -= 0.02;
        
        floatingNum.style.transform = `translateY(${y}px)`;
        floatingNum.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            floatingNum.remove();
        }
    };
    
    animate();
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('.rose-garden, .love-letter, .timeline, .counter-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Timeline items animation
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    if (item.querySelector('.timeline-content').parentElement.classList.contains('timeline-item')) {
        const isOdd = Array.from(item.parentElement.children).indexOf(item) % 2 === 0;
        item.style.transform = isOdd ? 'translateX(-50px)' : 'translateX(50px)';
    }
    
    timelineObserver.observe(item);
});

// Add cursor trail effect
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) { // Only create trail sometimes to avoid too many elements
        const trail = document.createElement('div');
        trail.innerHTML = '💕';
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.fontSize = '12px';
        trail.style.zIndex = '9999';
        trail.style.opacity = '0.6';
        trail.style.transition = 'all 1s ease';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'translateY(-20px) scale(0.5)';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
            cursorTrail.shift();
        }, 1000);
        
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
    }
});

// Easter egg: Konami code for special message
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-8);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showSecretMessage();
    }
});

function showSecretMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: linear-gradient(135deg, #ff1744, #ff4081); 
                    color: white; padding: 40px; border-radius: 20px; 
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3); z-index: 10000;
                    text-align: center; font-size: 1.5rem; max-width: 500px;">
            <h2 style="margin-bottom: 20px; font-family: 'Playfair Display', serif;">🎉 Secret Unlocked! 🎉</h2>
            <p style="margin-bottom: 20px;">You found the secret message, Rashi!</p>
            <p style="font-style: italic;">You're not just special, you're extraordinary! ✨</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="margin-top: 30px; padding: 12px 30px; background: white; 
                           color: #ff1744; border: none; border-radius: 25px; 
                           font-weight: bold; cursor: pointer; font-size: 1rem;">
                Close 💖
            </button>
        </div>
        <div onclick="this.parentElement.remove()" 
             style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.5); z-index: 9999;"></div>
    `;
    document.body.appendChild(message);
    
    // Create celebration effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createCelebrationEmoji();
        }, i * 50);
    }
}

function createCelebrationEmoji() {
    const emojis = ['🎉', '✨', '💖', '🌹', '💕', '⭐', '🎊'];
    const emoji = document.createElement('div');
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = Math.random() * 100 + '%';
    emoji.style.top = '-50px';
    emoji.style.fontSize = '30px';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '10001';
    document.body.appendChild(emoji);
    
    let y = -50;
    let rotation = 0;
    const fallSpeed = 2 + Math.random() * 3;
    
    const animate = () => {
        y += fallSpeed;
        rotation += 5;
        emoji.style.top = y + 'px';
        emoji.style.transform = `rotate(${rotation}deg)`;
        
        if (y < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            emoji.remove();
        }
    };
    
    animate();
}

console.log('%c💖 Happy Rose Day, Rashi! 💖', 'font-size: 20px; color: #ff1744; font-weight: bold;');
console.log('%cMade with love just for you! ✨', 'font-size: 14px; color: #ff4081;');
console.log('%cTry the Konami code for a surprise! (↑ ↑ ↓ ↓ ← → ← →)', 'font-size: 12px; color: #ff80ab;');
