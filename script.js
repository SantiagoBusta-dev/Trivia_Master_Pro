// --- 1. ESTADO DEL JUEGO ---
let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1,
    ownedAvatars: [0],
    ownedPets: [0]
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentLevelNum = 1;

window.onload = function() {
    saveAndSyncState();
    renderLevels();
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    const coinEl = document.getElementById('coin-count');
    if(coinEl) coinEl.textContent = gameState.coins;
    const userEl = document.getElementById('welcome-msg');
    if(userEl) userEl.textContent = `¡Hola, ${gameState.username}!`;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
}

// --- 2. RENDERIZAR LOS 100 NIVELES ---
function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if(!grid) return;
    grid.innerHTML = '';
    
    for (let i = 1; i <= 100; i++) {
        const btn = document.createElement('button');
        btn.className = `level-btn ${i > gameState.unlockedLevels ? 'locked' : ''}`;
        btn.textContent = i;
        if (i <= gameState.unlockedLevels) {
            btn.onclick = () => startLevel(i);
        }
        grid.appendChild(btn);
    }
}

// --- 3. GENERADOR AUTOMÁTICO PARA LOS 100 NIVELES ---
function startLevel(num) {
    currentLevelNum = num;
    
    // Genera preguntas dinámicas para cada uno de los 100 niveles sin errores de texto
    currentQuestions = [
        { q: `Nivel ${num}: ¿Cuál es el resultado de ${num} + 5?`, options: [`${num + 5}`, `${num + 3}`, `${num + 10}`, `${num - 2}`], correct: 0 },
        { q: `Nivel ${num}: ¿Qué tipo de desafío es el nivel ${num}?`, options: ["Principiante", "Intermedio", "Avanzado", "Legendario"], correct: num > 70 ? 3 : (num > 40 ? 2 : 0) },
        { q: `Nivel ${num}: Si tienes ${num} monedas y ganas 10, ¿cuántas tienes?`, options: [`${num + 10}`, `${num}`, `${num + 5}`, "100"], correct: 0 }
    ];
    
    currentIndex = 0;
    score = 0;
    
    const titleEl = document.getElementById('quiz-title');
    if(titleEl) titleEl.textContent = `Nivel ${num}`;
    showScreen('quiz-screen'); 
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) { endGame(); return; }
    
    const counterEl = document.getElementById('question-counter');
    if(counterEl) counterEl.textContent = `Pregunta ${currentIndex + 1}/${currentQuestions.length}`;
    
    const qData = currentQuestions[currentIndex];
    const textEl = document.getElementById('question-text');
    if(textEl) textEl.textContent = qData.q;
    
    const container = document.getElementById('answers-container');
    if(!container) return;
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
    const allButtons = document.querySelectorAll('.answer-btn');
    
    allButtons.forEach(b => b.disabled = true);
    
    if (idx === q.correct) { 
        btn.classList.add('correct'); 
        score++; 
    } else { 
        btn.classList.add('wrong'); 
        if(allButtons[q.correct]) allButtons[q.correct].classList.add('correct'); 
    }
    
    setTimeout(() => { 
        currentIndex++; 
        loadQuestion(); 
    }, 1000);
}

function endGame() {
    showScreen('result-screen');
    let earned = score * 10;
    
    const scoreEl = document.getElementById('final-score');
    if(scoreEl) scoreEl.textContent = `${score} / ${currentQuestions.length}`;
    
    const coinsEl = document.getElementById('earned-coins');
    if(coinsEl) coinsEl.textContent = `🪙 +${earned}`;
    
    gameState.coins += earned;
    
    // Desbloquea el siguiente nivel automáticamente
    if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 100) {
        gameState.unlockedLevels++;
    }
    saveAndSyncState();
}

function returnToLevels() { 
    renderLevels(); 
    showScreen('levels-screen'); 
}
