// ==========================================
// 💕 Valentine's Quiz for Olivia
// ==========================================

// Quiz Questions
const questions = [
    {
        question: "When did we first start talking? 💬",
        options: [
            "At a party",
            "Through mutual friends",
            "Online / Social media",
            "At school or work"
        ],
        correct: 1  // Through mutual friends
    },
    {
        question: "What's my favourite thing about you? 🥰",
        options: [
            "Your beautiful smile",
            "Your sense of humour",
            "Your kind heart",
            "Everything — I can't pick just one!"
        ],
        correct: 3  // Correct answer: "Everything"
    },
    {
        question: "What's our go-to thing to do together? 🎬",
        options: [
            "Watching movies / TV shows",
            "Going out to eat",
            "Taking long walks",
            "Just vibing and talking for hours"
        ],
        correct: 0  // Watching movies / TV shows
    },
    {
        question: "What would I choose for our dream Valentine's date? 💕",
        options: [
            "Fancy dinner and a movie",
            "A cozy night in with snacks and a movie",
            "A surprise adventure somewhere new",
            "Anywhere, as long as I'm with you"
        ],
        correct: 1  // Correct answer: A cozy night in with snacks and a movie
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

// ==========================================
// Floating Hearts Background
// ==========================================
function createFloatingHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '♥', '❤️', '🩷', '🌹'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heart.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        container.appendChild(heart);
    }
}

// ==========================================
// Screen Transitions
// ==========================================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    // Re-trigger card animation
    const card = target.querySelector('.card');
    if (card) {
        card.style.animation = 'none';
        card.offsetHeight; // trigger reflow
        card.style.animation = '';
    }
    target.classList.add('active');
}

// ==========================================
// Start Quiz
// ==========================================
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showScreen('quizScreen');
    loadQuestion();
}

// ==========================================
// Load Question
// ==========================================
function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    const counter = document.getElementById('questionCounter');
    const text = document.getElementById('questionText');
    const options = document.getElementById('optionsContainer');
    const progress = document.getElementById('progressFill');

    counter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    text.textContent = q.question;
    progress.style.width = ((currentQuestion) / questions.length * 100) + '%';

    options.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.textContent = opt;
        btn.addEventListener('click', () => selectAnswer(i, btn));
        options.appendChild(btn);
    });
}

// ==========================================
// Select Answer
// ==========================================
function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const allBtns = document.querySelectorAll('.option-btn');

    // Disable all buttons
    allBtns.forEach(b => {
        b.style.pointerEvents = 'none';
    });

    if (index === q.correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        // Show correct answer
        allBtns[q.correct].classList.add('correct');
    }

    // Auto-advance
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showScore();
        }
    }, 1200);
}

// ==========================================
// Show Score
// ==========================================
function showScore() {
    const progress = document.getElementById('progressFill');
    progress.style.width = '100%';

    setTimeout(() => {
        showScreen('scoreScreen');

        const scoreNum = document.getElementById('scoreNumber');
        const scoreMsg = document.getElementById('scoreMessage');
        const scoreIcon = document.getElementById('scoreIcon');

        scoreNum.textContent = score;

        if (score === 4) {
            scoreIcon.textContent = '🏆';
            scoreMsg.textContent = "Perfect score! !0 Pc wings combo and famous bowl coming up 💕";
        } else if (score === 3) {
            scoreIcon.textContent = '🌟';
            scoreMsg.textContent = "Jah Jah ute second place, 1st loser that (still getting the food) 💖";
        } else if (score === 2) {
            scoreIcon.textContent = '💝';
            scoreMsg.textContent = "Jah ";
        } else {
            scoreIcon.textContent = '💗';
            scoreMsg.textContent = "Pooorrrrrrrrrrrrrrrrrr";
        }
    }, 400);
}

// ==========================================
// Show Proposal
// ==========================================
function showProposal() {
    showScreen('proposalScreen');
    // Reset error state
    document.getElementById('errorMessage').classList.remove('show');
}

// ==========================================
// Answer: YES
// ==========================================
function answerYes() {
    showScreen('celebrationScreen');
    launchCelebration();
}

// ==========================================
// Answer: NO
// ==========================================
function answerNo() {
    const errorMsg = document.getElementById('errorMessage');
    const noBtn = document.getElementById('noBtn');

    // Show error with re-trigger animation
    errorMsg.classList.remove('show');
    void errorMsg.offsetHeight; // reflow
    errorMsg.classList.add('show');

    // Make the No button smaller and Yes button bigger each time
    const yesBtn = document.getElementById('yesBtn');
    const currentYesScale = parseFloat(yesBtn.dataset.scale || '1');
    const newYesScale = Math.min(currentYesScale + 0.12, 1.5);
    yesBtn.dataset.scale = newYesScale;
    yesBtn.style.transform = `scale(${newYesScale})`;

    const currentNoScale = parseFloat(noBtn.dataset.scale || '1');
    const newNoScale = Math.max(currentNoScale - 0.1, 0.6);
    noBtn.dataset.scale = newNoScale;
    noBtn.style.transform = `scale(${newNoScale})`;

    // Shake the whole card
    const card = document.querySelector('.proposal-card');
    card.style.animation = 'none';
    void card.offsetHeight;
    card.style.animation = 'wrongShake 0.5s ease';
}

// ==========================================
// Celebration Effects
// ==========================================
function launchCelebration() {
    const container = document.getElementById('celebrationHearts');
    container.innerHTML = '';

    const emojis = ['💕', '💖', '💗', '💓', '💝', '🌹', '✨', '🥰', '❤️', '💐'];

    setInterval(() => {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'absolute';
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        span.style.fontSize = (1.5 + Math.random() * 3) + 'rem';
        span.style.opacity = '0';
        span.style.pointerEvents = 'none';
        span.style.animation = `celebPop ${1.5 + Math.random()}s ease forwards`;
        container.appendChild(span);

        setTimeout(() => span.remove(), 2500);
    }, 100);

    // Add celebPop keyframes dynamically
    if (!document.getElementById('celebStyles')) {
        const style = document.createElement('style');
        style.id = 'celebStyles';
        style.textContent = `
      @keyframes celebPop {
        0% { opacity: 0; transform: scale(0) translateY(0); }
        30% { opacity: 1; transform: scale(1.3) translateY(-20px); }
        100% { opacity: 0; transform: scale(0.5) translateY(-80px); }
      }
    `;
        document.head.appendChild(style);
    }
}

// ==========================================
// Initialize
// ==========================================
// ==========================================
// Music Control
// ==========================================
let isMusicPlaying = false;

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');

    if (isMusicPlaying) {
        music.pause();
        btn.textContent = '🎵';
        btn.classList.remove('playing');
    } else {
        music.play();
        btn.textContent = '⏸';
        btn.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
}

// ==========================================
// Initialize & Autoplay
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();

    // 1. Try to autoplay music
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.6;
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                isMusicPlaying = true;
                const btn = document.getElementById('musicBtn');
                if (btn) {
                    btn.textContent = '⏸';
                    btn.classList.add('playing');
                }
            }).catch(error => {
                // Autoplay was prevented.
                // Add a one-time click listener to start music on first interaction
                document.body.addEventListener('click', () => {
                    if (!isMusicPlaying) {
                        toggleMusic();
                    }
                }, { once: true });
            });
        }
    }

    // 2. Interactive: Click to spawn hearts
    document.addEventListener('click', (e) => {
        // Avoid spawning if clicking a button (to prevent visual clutter)
        if (e.target.tagName === 'BUTTON') return;

        const heart = document.createElement('span');
        heart.classList.add('click-heart');
        heart.textContent = '💖';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    });
});

