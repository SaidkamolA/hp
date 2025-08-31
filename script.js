// Основные элементы
const giftBox = document.getElementById('giftBox');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const confettiContainer = document.getElementById('confettiContainer');
const fireworkContainer = document.getElementById('fireworkContainer');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

// Устанавливаем фоновый градиент в зависимости от времени
function setBackgroundByTime() {
    const hour = new Date().getHours() + 5; // Корректировка для +05
    if (hour >= 12 && hour < 17) {
        document.body.classList.add('afternoon');
    }
}
setBackgroundByTime();

// Анимация подарка при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        giftBox.style.animation = 'giftFloat 4s ease-in-out infinite';
    }, 1000);
    
    createFloatingElements();
    
    console.log('Gift box:', giftBox);
    console.log('Video modal:', videoModal);
    console.log('Close modal:', closeModal);
    console.log('Background music:', backgroundMusic);
    console.log('Music toggle:', musicToggle);
});

// Обработчик клика по подарку
giftBox.addEventListener('click', function() {
    console.log('Подарок нажат!');
    openGift();
});

// Обработчик закрытия модального окна
closeModal.addEventListener('click', function() {
    console.log('Закрытие модального окна');
    closeGift();
    createCloseConfetti();
});

// Закрытие по клику вне модального окна
videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        closeGift();
        createCloseConfetti();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        closeGift();
        createCloseConfetti();
    }
});

// Функция открытия подарка
function openGift() {
    console.log('Функция openGift вызвана');
    
    giftBox.classList.add('opening');
    
    setTimeout(() => {
        giftBox.style.transform = 'scale(1.5) translateY(-10%)';
        giftBox.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        videoModal.classList.add('show');
        createConfetti();
        createSparkles();
        createFireworks();
        playGiftSound();
        const video = document.getElementById('birthdayVideo');
        if (video) {
            video.play().catch(e => console.log('Автовоспроизведение заблокировано'));
        }
    }, 1500);
}

// Функция закрытия подарка
function closeGift() {
    videoModal.classList.remove('show');
    giftBox.classList.remove('opening');
    giftBox.style.transform = 'scale(1)';
    giftBox.style.transition = 'transform 0.5s ease-in-out';
    const video = document.getElementById('birthdayVideo');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// Создание конфетти
function createConfetti() {
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

// Создание дополнительных плавающих элементов
function createFloatingElements() {
    const container = document.querySelector('.background');
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            const emojis = ['🎉', '🎊', '🎈', '🎁', '🍰', '💝', '🌟', '✨', '🎬', '💜', '🎭', '🍿', '🎪', '🎨', '🎵', '🎤'];
            element.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            element.style.position = 'absolute';
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.fontSize = clamp(1, Math.random() * 1.5 + 0.8, 2) + 'rem';
            element.style.opacity = '0.6';
            element.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite`;
            element.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(element);
        }, i * 800);
    }
}

function clamp(min, val, max) {
    return Math.min(Math.max(val, min), max);
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

if (musicToggle) {
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

document.addEventListener('click', function() {
    if (backgroundMusic && backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            if (musicToggle) {
                musicToggle.textContent = '⏸️';
                musicToggle.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
            }
        }).catch(e => console.log('Автовоспроизведение заблокировано'));
    }
}, { once: true });