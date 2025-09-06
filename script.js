// Enhanced Elements
const giftBox = document.getElementById('giftBox');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const confettiContainer = document.getElementById('confettiContainer');
const fireworkContainer = document.getElementById('fireworkContainer');
const curtainReveal = document.getElementById('curtainReveal');
const particleCanvas = document.getElementById('particleCanvas');
const lyricsDisplay = document.getElementById('lyricsDisplay');
const btsGallery = document.getElementById('btsGallery');
const wishingWall = document.getElementById('wishingWall');
const wishInput = document.getElementById('wishInput');
const addWishBtn = document.getElementById('addWishBtn');
const wishesContainer = document.getElementById('wishesContainer');
const musicPlayer = document.getElementById('musicPlayer');
const playerToggle = document.getElementById('playerToggle');
const playlist = document.getElementById('playlist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const miniGame = document.getElementById('miniGame');
const gameArea = document.getElementById('gameArea');
const gameScore = document.getElementById('gameScore');
const startGameBtn = document.getElementById('startGameBtn');
const surpriseModal = document.getElementById('surpriseModal');
const surpriseTitle = document.getElementById('surpriseTitle');
const surpriseMessage = document.getElementById('surpriseMessage');
const closeSurprise = document.getElementById('closeSurprise');

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

// Enhanced Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Start curtain reveal animation
    setTimeout(() => {
        curtainReveal.style.display = 'none';
    }, 3000);
    
    // Initialize particle system
    initParticleSystem();
    
    // Initialize BTS lyrics rotation
    initLyricsRotation();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize wishing wall
    initWishingWall();
    
    // Initialize mini game
    initMiniGame();
    
    // Initialize surprise system
    initSurpriseSystem();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Start gift box animation
    setTimeout(() => {
        giftBox.style.animation = 'giftFloat 4s ease-in-out infinite';
    }, 1000);
    
    createFloatingElements();
    
    // Random surprise trigger
    setTimeout(() => {
        if (!surpriseShown && Math.random() < 0.3) {
            showRandomSurprise();
        }
    }, 10000);
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

// Particle System
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
        for (let i = 0; i < 50; i++) {
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
    
    // Mouse interaction
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.01;
                particle.vy += dy * force * 0.01;
            }
        });
    });
}

// BTS Lyrics Rotation
function initLyricsRotation() {
    const lyrics = [
        "Happy Birthday to you",
        "Forever and always",
        "Dreams come true",
        "You are beautiful"
    ];
    
    let currentLyricIndex = 0;
    
    setInterval(() => {
        const lyricsText = lyricsDisplay.querySelector('.lyrics-text');
        lyricsText.textContent = `"${lyrics[currentLyricIndex]}"`;
        currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;
    }, 4000);
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

// Enhanced Music Player
function initMusicPlayer() {
    const tracks = [
        { name: "Birthday Song", duration: "3:45", src: "music.mp3" },
        { name: "Spring Day", duration: "4:34", src: "music.mp3" },
        { name: "Dynamite", duration: "3:19", src: "music.mp3" }
    ];
    
    let currentAudio = new Audio();
    let isPlaying = false;
    
    // Player toggle
    playerToggle.addEventListener('click', () => {
        musicPlayer.classList.toggle('show');
    });
    
    // Track selection
    playlist.addEventListener('click', (e) => {
        const track = e.target.closest('.track');
        if (track) {
            document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
            track.classList.add('active');
            currentTrackIndex = Array.from(playlist.children).indexOf(track);
            loadTrack(tracks[currentTrackIndex]);
        }
    });
    
    // Play/Pause
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            currentAudio.pause();
            playBtn.textContent = '▶️';
            isPlaying = false;
        } else {
            currentAudio.play();
            playBtn.textContent = '⏸️';
            isPlaying = true;
        }
    });
    
    // Previous track
    prevBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        updateActiveTrack();
        loadTrack(tracks[currentTrackIndex]);
    });
    
    // Next track
    nextBtn.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        updateActiveTrack();
        loadTrack(tracks[currentTrackIndex]);
    });
    
    // Volume control
    volumeSlider.addEventListener('input', (e) => {
        currentAudio.volume = e.target.value / 100;
    });
    
    function loadTrack(track) {
        currentAudio.src = track.src;
        currentAudio.load();
    }
    
    function updateActiveTrack() {
        document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
        playlist.children[currentTrackIndex].classList.add('active');
    }
    
    // Initialize first track
    loadTrack(tracks[0]);
    currentAudio.volume = 0.7;
}

// Wishing Wall
function initWishingWall() {
    addWishBtn.addEventListener('click', addWish);
    wishInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addWish();
        }
    });
    
    function addWish() {
        const wishText = wishInput.value.trim();
        if (wishText) {
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.textContent = wishText;
            wishesContainer.appendChild(wishItem);
            wishInput.value = '';
            
            // Animate new wish
            wishItem.style.opacity = '0';
            wishItem.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                wishItem.style.transition = 'all 0.5s ease';
                wishItem.style.opacity = '1';
                wishItem.style.transform = 'translateX(0)';
            }, 100);
            
            // Play sound effect
            playSoundEffect('sparkle');
        }
    }
}

// Mini Game: Catch BTS Hearts
function initMiniGame() {
    startGameBtn.addEventListener('click', startGame);
    
    function startGame() {
        if (gameActive) return;
        
        gameActive = true;
        gameScoreValue = 0;
        gameScore.textContent = '0';
        startGameBtn.textContent = 'Game Active!';
        startGameBtn.disabled = true;
        
        // Start dropping hearts
        gameInterval = setInterval(() => {
            if (gameActive) {
                createFallingHeart();
            }
        }, 1000);
        
        // End game after 30 seconds
        setTimeout(() => {
            endGame();
        }, 30000);
    }
    
    function createFallingHeart() {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = '💜';
        heart.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
        heart.style.top = '-50px';
        
        gameArea.appendChild(heart);
        
        heart.addEventListener('click', () => {
            gameScoreValue++;
            gameScore.textContent = gameScoreValue;
            heart.remove();
            createSparkleEffect(heart.offsetLeft, heart.offsetTop);
            playSoundEffect('heart');
        });
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 3000);
    }
    
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        startGameBtn.textContent = 'Start Game';
        startGameBtn.disabled = false;
        
        // Show final score
        alert(`Game Over! Final Score: ${gameScoreValue}`);
    }
}

// Surprise System
function initSurpriseSystem() {
    closeSurprise.addEventListener('click', () => {
        surpriseModal.classList.remove('show');
    });
    
    surpriseModal.addEventListener('click', (e) => {
        if (e.target === surpriseModal) {
            surpriseModal.classList.remove('show');
        }
    });
}

function showRandomSurprise() {
    const surprises = [
        {
            title: "🎉 BTS Member Greeting! 🎉",
            message: "RM says: 'Happy Birthday! Keep shining bright like a diamond!' 💎"
        },
        {
            title: "🎂 Special Message! 🎂",
            message: "Jin wishes you: 'May your day be filled with laughter and joy!' 😄"
        },
        {
            title: "💜 Secret Surprise! 💜",
            message: "Suga's message: 'Dream big and never give up on your goals!' 🌟"
        },
        {
            title: "🎵 Birthday Song! 🎵",
            message: "J-Hope sings: 'Happy Birthday to you, my amazing sister!' 🎤"
        },
        {
            title: "✨ Magical Wish! ✨",
            message: "Jimin's wish: 'May all your dreams come true today!' 💫"
        },
        {
            title: "🎨 Creative Birthday! 🎨",
            message: "V's message: 'You're a masterpiece, keep creating beautiful memories!' 🖼️"
        },
        {
            title: "🏆 Golden Birthday! 🏆",
            message: "Jungkook's wish: 'You're the champion of our hearts!' 🥇"
        }
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    surpriseTitle.textContent = randomSurprise.title;
    surpriseMessage.textContent = randomSurprise.message;
    surpriseModal.classList.add('show');
    surpriseShown = true;
    
    // Play celebration sound
    playSoundEffect('celebration');
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

// Accessibility Features
function initAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll('button, input, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--bts-purple)';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// BTS Gallery Interaction
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const member = item.dataset.member;
        const memberNames = {
            'rm': 'RM',
            'jin': 'Jin',
            'suga': 'Suga',
            'jhope': 'J-Hope',
            'jimin': 'Jimin',
            'v': 'V',
            'jk': 'Jungkook'
        };
        
        showRandomSurprise();
        surpriseTitle.textContent = `💜 ${memberNames[member]} Says! 💜`;
        surpriseMessage.textContent = `Happy Birthday from ${memberNames[member]}! You're amazing! 🌟`;
    });
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
