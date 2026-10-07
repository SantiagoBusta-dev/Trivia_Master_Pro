let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1
};

const fixedLevels = {
    1: [
        { q: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Mercurio", "Marte", "Júpiter"], correct: 1 },
        { q: "¿Qué gas abunda más en la atmósfera terrestre?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], correct: 1 },
        { q: "¿Cuál es la fórmula química del agua?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
        { q: "¿Quién formuló la teoría de la relatividad?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], correct: 2 },
        { q: "¿Qué órgano humano consume más energía?", options: ["El corazón", "El cerebro", "El hígado", "Los músculos"], correct: 1 }
    ]
};
for (let i = 2; i <= 10; i++) {
    fixedLevels[i] = fixedLevels[1];
}

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentLevelNum = 1;

window.onload = function() {
    saveAndSyncState();
    renderLevels();
    renderCategories();
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    const coinEl = document.getElementById('coin-count');
    if(coinEl) coinEl.textContent = gameState.coins;
    const userEl = document.getElementById('welcome-msg');
    if(userEl) userEl.textContent = `¡Hola, ${gameState.username}!`;
    const labelEl = document.getElementById('header-username-label');
    if(labelEl) labelEl.textContent = gameState.username;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
}

function updateCoins(amount) {
    gameState.coins += amount;
    saveAndSyncState();
}

function interactWithPet() {
    const phrases = ["¡Miau! A ganar 🐾", "¡Qué buena partida! ✨", "¡Dale con todo! 🚀"];
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    document.getElementById('pet-speech').textContent = random;
}

function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if(!grid) return;
    grid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = `level-btn ${i > gameState.unlockedLevels ? 'locked' : ''}`;
        btn.textContent = i;
        if (i <= gameState.unlockedLevels) btn.onclick = () => startLevel(i);
        grid.appendChild(btn);
    }
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if(!grid) return;
    grid.innerHTML = '';
    const cats = { ciencia: "🔬 Ciencia", historia: "📜 Historia", cine: "🎬 Cine", deportes: "⚽ Deportes" };
    for (let key in cats) {
        const btn = document.createElement('button');
        btn.className = 'btn secondary-btn';
        btn.textContent = cats[key];
        btn.onclick = () => startCategoryQuiz(cats[key]);
        grid.appendChild(btn);
    }
}

function startLevel(num) {
    currentLevelNum = num; currentQuestions = fixedLevels[num]; currentIndex = 0; score = 0;
    document.getElementById('quiz-title').textContent = `Nivel ${num}`;
    showScreen('quiz-screen'); loadQuestion();
}

function startCategoryQuiz(name) {
    currentQuestions = fixedLevels[1]; currentIndex = 0; score = 0;
    document.getElementById('quiz-title').textContent = name;
    showScreen('quiz-screen'); loadQuestion();
}

function startSpecialEvent() {
    currentQuestions = fixedLevels[1]; currentIndex = 0; score = 0;
    document.getElementById('quiz-title').textContent = "⭐ Evento";
    showScreen('quiz-screen'); loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) { endGame(); return; }
    document.getElementById('question-counter').textContent = `Pregunta ${currentIndex + 1}/${currentQuestions.length}`;
    const qData = currentQuestions[currentIndex];
    document.getElementById('question-text').textContent = qData.q;
    const container = document.getElementById('answers-container');
    container.innerHTML = '';
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(idx, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(idx, btn) {
    const q = currentQuestions[currentIndex];
    document.querySelectorAll('.answer-btn').forEach(b => b.disabled = true);
    if (idx === q.correct) { btn.classList.add('correct'); score++; }
    else { btn.classList.add('wrong'); document.querySelectorAll('.answer-btn'][q.correct].classList.add('correct'); }
    setTimeout(() => { currentIndex++; loadQuestion(); }, 1000);
}

function endGame() {
    showScreen('result-screen');
    let earned = score * 5;
    document.getElementById('final-score').textContent = `${score} / ${currentQuestions.length}`;
    document.getElementById('earned-coins').textContent = `🪙 +${earned}`;
    updateCoins(earned);
    if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 10) {
        gameState.unlockedLevels++;
    }
    saveAndSyncState();
}

function returnToLevels() { renderLevels(); showScreen('levels-screen'); }
function watchAd() { updateCoins(15); alert("¡+15 monedas ganadas!"); }
function saveUserProfile() {
    const val = document.getElementById('username-input').value.trim();
    if (val) { gameState.username = val; saveAndSyncState(); showScreen('main-menu'); }
}
function openLeaderboard() {
    showScreen('leaderboard-screen');
    document.getElementById('leaderboard-list').innerHTML = `
        <div class="leaderboard-item"><span>1. 👑 MasterPro</span><span>🪙 850</span></div>
        <div class="leaderboard-item"><span>2. 🦸‍♂️ ${gameState.username} (Tú)</span><span>🪙 ${gameState.coins}</span></div>`;
}
