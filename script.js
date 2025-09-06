// Simple Elements
const giftBox = document.getElementById('giftBox');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const confettiContainer = document.getElementById('confettiContainer');
const fireworkContainer = document.getElementById('fireworkContainer');
const curtainReveal = document.getElementById('curtainReveal');
const particleCanvas = document.getElementById('particleCanvas');
const surpriseModal = document.getElementById('surpriseModal');
const surpriseTitle = document.getElementById('surpriseTitle');
const surpriseMessage = document.getElementById('surpriseMessage');
const closeSurprise = document.getElementById('closeSurprise');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

// Global Variables
let currentTrackIndex = 0;
let gameActive = false;
let gameScoreValue = 0;
let particles = [];
let particleAnimationId;
let gameInterval;
let surpriseShown = false;

// Устанавливаем фоновый градиент в зависимости от времени
function setBackgroundByTime() {
    const hour = new Date().getHours() + 5; // Корректировка для +05
    if (hour >= 12 && hour < 17) {
        document.body.classList.add('afternoon');
    }
}
setBackgroundByTime();

// Mobile Detection and Optimization
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Performance optimization for mobile devices
if (isMobile) {
    // Reduce particle count on mobile
    window.mobileOptimized = true;
    
    // Disable some animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
    }
}

// Simple Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Start curtain reveal animation
    if (curtainReveal) {
        setTimeout(() => {
            curtainReveal.style.display = 'none';
        }, 3000);
    }
    
    // Initialize particle system with mobile optimization
    if (particleCanvas) {
        initParticleSystem();
    }
    
    // Initialize surprise system
    if (surpriseModal && surpriseTitle && surpriseMessage && closeSurprise) {
        initSurpriseSystem();
    }
    
    // Start gift box animation
    if (giftBox) {
        setTimeout(() => {
            giftBox.style.animation = 'giftFloat 4s ease-in-out infinite';
        }, 1000);
    }
    
    createFloatingElements();
    
    // Random surprise trigger (less frequent on mobile)
    const surpriseDelay = isMobile ? 15000 : 10000;
    setTimeout(() => {
        if (!surpriseShown && Math.random() < 0.3) {
            showRandomSurprise();
        }
    }, surpriseDelay);
    
    // Add touch event listeners for better mobile interaction
    if (isTouchDevice) {
        addTouchOptimizations();
    }
});

// Обработчик клика и клавиатуры по подарку
if (giftBox) {
    giftBox.addEventListener('click', function() {
        console.log('Подарок нажат!');
        openGift();
    });
    
    // Поддержка клавиатуры для доступности
    giftBox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            console.log('Подарок активирован клавиатурой!');
            openGift();
        }
    });
}

// Обработчик закрытия модального окна
if (closeModal) {
    closeModal.addEventListener('click', function() {
        console.log('Закрытие модального окна');
        closeGift();
        createCloseConfetti();
    });
}

// Закрытие по клику вне модального окна (отключено для фиксированного модального окна)
// if (videoModal) {
//     videoModal.addEventListener('click', function(e) {
//         if (e.target === videoModal) {
//             closeGift();
//             createCloseConfetti();
//         }
//     });
// }

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('show')) {
        closeGift();
        createCloseConfetti();
    }
});

// Функция открытия подарка
function openGift() {
    console.log('Функция openGift вызвана');
    
    if (giftBox) {
        giftBox.classList.add('opening');
    }
    
    setTimeout(() => {
        if (giftBox) {
            giftBox.style.transform = 'scale(1.5) translateY(-10%)';
            giftBox.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }
        if (videoModal) {
            videoModal.classList.add('show');
        }
        createConfetti();
        createSparkles();
        createFireworks();
        playGiftSound();
        const video = document.getElementById('birthdayVideo');
        if (video) {
            // Добавляем обработчики событий для видео
            video.addEventListener('loadeddata', function() {
                console.log('Видео загружено');
            });
            
            video.addEventListener('error', function(e) {
                console.log('Ошибка загрузки видео:', e);
                showVideoError();
            });
            
            video.addEventListener('canplay', function() {
                console.log('Видео готово к воспроизведению');
            });
            
            // Попытка воспроизведения с обработкой ошибок
            video.play().catch(e => {
                console.log('Автовоспроизведение заблокировано:', e);
                // Показываем кнопку воспроизведения
                showVideoPlayButton();
            });
        }
    }, 1500);
}

// Функция закрытия подарка
function closeGift() {
    if (videoModal) {
        videoModal.classList.remove('show');
    }
    if (giftBox) {
        giftBox.classList.remove('opening');
        giftBox.style.transform = 'scale(1)';
        giftBox.style.transition = 'transform 0.5s ease-in-out';
    }
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// Создание конфетти
function createConfetti() {
    if (!confettiContainer) return;
    
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8e8e', '#a8e6cf', '#ffb3ba'];
    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 1.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Создание искр
function createSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    document.body.appendChild(sparkleContainer);
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.animationDelay = Math.random() * 1 + 's';
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 20);
    }
    setTimeout(() => sparkleContainer.remove(), 2500);
}

// Создание фейерверков
function createFireworks() {
    if (!fireworkContainer) return;
    
    const fireworkCount = 10;
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 100 + 'vh';
            fireworkContainer.appendChild(firework);
            setTimeout(() => firework.remove(), 1500);
        }, i * 200);
    }
}

// Создание конфетти при закрытии
function createCloseConfetti() {
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = '#ffeb3b';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }, i * 20);
    }
}

// Создание дополнительных плавающих элементов с оптимизацией
function createFloatingElements() {
    const container = document.querySelector('.background');
    if (!container) return;
    
    // Reduce number of elements on mobile
    const elementCount = isMobile ? 4 : 8;
    
    for (let i = 0; i < elementCount; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            const emojis = ['🎉', '🎊', '🎈', '🎁', '🍰', '💝', '🌟', '✨', '🎬', '💜', '🎭', '🍿', '🎪', '🎨', '🎵', '🎤'];
            element.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            element.style.position = 'absolute';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.fontSize = clamp(1, Math.random() * 1.5 + 0.8, 2) + 'rem';
            element.style.opacity = '0.6';
            
            // Use CSS classes for better performance
            element.className = 'floating-element';
            element.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`;
            element.style.animationDelay = Math.random() * 2 + 's';
            
            container.appendChild(element);
        }, i * (isMobile ? 1200 : 800));
    }
}

function clamp(min, val, max) {
    return Math.min(Math.max(val, min), max);
}

// Функция для показа кнопки воспроизведения видео
function showVideoPlayButton() {
    const video = document.getElementById('birthdayVideo');
    const playButton = document.getElementById('playButton');
    
    if (video && playButton) {
        playButton.style.display = 'flex';
        playButton.style.opacity = '1';
        
        // Добавляем обработчик клика на кнопку
        playButton.addEventListener('click', function() {
            // Убираем muted атрибут для воспроизведения
            video.muted = false;
            
            video.play().then(() => {
                playButton.style.display = 'none';
            }).catch(e => {
                console.log('Ошибка воспроизведения:', e);
                // Показываем сообщение пользователю
                showVideoError();
            });
        });
    }
}

// Функция для показа ошибки воспроизведения видео
function showVideoError() {
    const video = document.getElementById('birthdayVideo');
    if (video) {
        // Создаем сообщение об ошибке
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10;
            max-width: 300px;
        `;
        errorDiv.innerHTML = `
            <h3>🎬 Проблема с видео</h3>
            <p>Не удалось автоматически воспроизвести видео.</p>
            <p>Попробуйте:</p>
            <ul style="text-align: left; margin: 10px 0;">
                <li>Нажать на видео напрямую</li>
                <li>Обновить страницу</li>
                <li>Проверить подключение к интернету</li>
            </ul>
            <button onclick="this.parentElement.remove()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 10px;
            ">Понятно</button>
        `;
        
        const videoContainer = video.parentElement;
        videoContainer.appendChild(errorDiv);
        
        // Автоматически убираем сообщение через 10 секунд
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
    }
}

// Звуковой эффект открытия подарка
function playGiftSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // High A note
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.8);
    } catch (e) {
        console.log('Звук не поддерживается в этом браузере');
    }
}

// Эффекты при наведении и клике
if (giftBox) {
    giftBox.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.5))';
    });

    giftBox.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) drop-shadow(0 15px 30px rgba(0,0,0,0.2))';
    });

    giftBox.addEventListener('mousedown', function() {
        this.style.animation = 'shake 0.5s ease-in-out';
    });

    giftBox.addEventListener('mouseup', function() {
        setTimeout(() => {
            this.style.animation = 'giftFloat 4s ease-in-out infinite';
        }, 500);
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.gift-container, .main-title');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

function animateBTSHearts() {
    const hearts = document.querySelectorAll('.bts-hearts span');
    hearts.forEach((heart, index) => {
        setTimeout(() => {
            heart.style.transform = 'scale(1.5) rotate(15deg)';
            heart.style.filter = 'brightness(1.5) drop-shadow(0 0 10px #ff69b4)';
            setTimeout(() => {
                heart.style.transform = 'scale(1) rotate(0deg)';
                heart.style.filter = 'brightness(1) drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))';
            }, 300);
        }, index * 200);
    });
}

setInterval(animateBTSHearts, 3000);

if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '⏸️';
            musicToggle.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '▶️';
            musicToggle.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
        }
    });
}

// Touch Optimizations
function addTouchOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add haptic feedback for supported devices
    if (navigator.vibrate) {
        giftBox.addEventListener('touchstart', function() {
            navigator.vibrate(50);
        });
        
        closeModal.addEventListener('touchstart', function() {
            navigator.vibrate(30);
        });
    }
    
    // Improve touch scrolling
    document.body.style.webkitOverflowScrolling = 'touch';
}

// Particle System with Mobile Optimization
function initParticleSystem() {
    const canvas = particleCanvas;
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.color = `hsl(${Math.random() * 60 + 270}, 70%, 60%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createParticles() {
        // Reduce particle count on mobile devices
        const particleCount = isMobile ? 25 : 50;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particleAnimationId = requestAnimationFrame(animateParticles);
    }
    
    createParticles();
    animateParticles();
    
    // Mouse/Touch interaction
    function handleInteraction(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        if (!clientX || !clientY) return;
        
        const interactionX = clientX - rect.left;
        const interactionY = clientY - rect.top;
        
        particles.forEach(particle => {
            const dx = interactionX - particle.x;
            const dy = interactionY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.01;
                particle.vy += dy * force * 0.01;
            }
        });
    }
    
    canvas.addEventListener('mousemove', handleInteraction);
    canvas.addEventListener('touchmove', handleInteraction);
}

// Simple Music Toggle
if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicToggle.textContent = '⏸️';
        } else {
            backgroundMusic.pause();
            musicToggle.textContent = '🎵';
        }
    });
}

// Auto-play music on first click
document.addEventListener('click', function() {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            if (musicToggle) {
                musicToggle.textContent = '⏸️';
            }
        }).catch(e => console.log('Автовоспроизведение заблокировано'));
    }
}, { once: true });

// Surprise System
function initSurpriseSystem() {
    if (!closeSurprise || !surpriseModal) return;
    
    closeSurprise.addEventListener('click', () => {
        surpriseModal.classList.remove('show');
    });
    
    surpriseModal.addEventListener('click', (e) => {
        if (e.target === surpriseModal) {
            surpriseModal.classList.remove('show');
        }
    });
}


// Sound Effects
function playSoundEffect(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        let frequency;
        switch(type) {
            case 'sparkle':
                frequency = 800;
                break;
            case 'heart':
                frequency = 600;
                break;
            case 'celebration':
                frequency = 1000;
                break;
            default:
                frequency = 500;
        }
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Sparkle Effect
function createSparkleEffect(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '2rem';
    sparkle.style.color = 'gold';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.textContent = '✨';
    
    document.body.appendChild(sparkle);
    
    sparkle.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 1 },
        { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => sparkle.remove();
}

// Simple Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('show')) {
        closeGift();
        createCloseConfetti();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (particleAnimationId) {
        cancelAnimationFrame(particleAnimationId);
    }
    if (gameInterval) {
        clearInterval(gameInterval);
    }
});
