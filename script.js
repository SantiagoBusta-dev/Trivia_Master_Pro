// --- 1. CATÁLOGO DE AVATARES Y MASCOTAS (SIN EMOJIS, 100% SVG) ---
const avatarsList = [
    { id: 0, name: "Clásico", price: 0, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#4f46e5"/><path d="M 20 90 Q 50 60 80 90" fill="#4f46e5"/></svg>` },
    { id: 1, name: "Cyberpunk", price: 100, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#06b6d4"/><rect x="30" y="35" width="40" height="10" fill="#f43f5e"/><path d="M 20 90 Q 50 60 80 90" fill="#06b6d4"/></svg>` },
    { id: 2, name: "Golden", price: 200, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#eab308"/><polygon points="50,10 58,25 75,28 62,40 65,57 50,48 35,57 38,40 25,28 42,25" fill="#facc15"/><path d="M 20 90 Q 50 60 80 90" fill="#eab308"/></svg>` },
    { id: 3, name: "Ninja", price: 150, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#1e293b"/><rect x="25" y="30" width="50" height="15" fill="#ef4444"/><path d="M 20 90 Q 50 60 80 90" fill="#1e293b"/></svg>` },
    { id: 4, name: "Neón Pink", price: 120, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#ec4899"/><circle cx="40" cy="35" r="4" fill="#fff"/><circle cx="60" cy="35" r="4" fill="#fff"/><path d="M 20 90 Q 50 60 80 90" fill="#ec4899"/></svg>` },
    { id: 5, name: "Biólogo", price: 180, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#10b981"/><path d="M 35 25 L 65 25 L 50 15 Z" fill="#fff"/><path d="M 20 90 Q 50 60 80 90" fill="#10b981"/></svg>` },
    { id: 6, name: "Galáctico", price: 250, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#8b5cf6"/><circle cx="35" cy="30" r="2" fill="#fef08a"/><circle cx="65" cy="45" r="2" fill="#fef08a"/><path d="M 20 90 Q 50 60 80 90" fill="#8b5cf6"/></svg>` },
    { id: 7, name: "Fuego", price: 300, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#f97316"/><path d="M 45 10 Q 65 25 50 40 Q 35 25 45 10" fill="#facc15"/><path d="M 20 90 Q 50 60 80 90" fill="#f97316"/></svg>` },
    { id: 8, name: "Glacial", price: 220, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#38bdf8"/><polygon points="50,15 55,28 68,32 57,42 60,55 50,48 40,55 43,42 32,32 45,28" fill="#bae6fd"/><path d="M 20 90 Q 50 60 80 90" fill="#38bdf8"/></svg>` },
    { id: 9, name: "Master", price: 500, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#e11d48"/><path d="M 30 20 L 50 5 L 70 20 Z" fill="#fbbf24"/><path d="M 20 90 Q 50 60 80 90" fill="#e11d48"/></svg>` }
];

const petsList = [
    { id: 0, name: "Gatito Naranja", price: 0, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="25" ry="20" fill="#fb923c"/><polygon points="30,40 20,20 40,30" fill="#fb923c"/><polygon points="70,40 80,20 60,30" fill="#fb923c"/><circle cx="40" cy="50" r="3" fill="#000"/><circle cx="60" cy="50" r="3" fill="#000"/></svg>` },
    { id: 1, name: "Gatito Negrito", price: 150, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="25" ry="20" fill="#334155"/><polygon points="30,40 20,20 40,30" fill="#334155"/><polygon points="70,40 80,20 60,30" fill="#334155"/><circle cx="40" cy="50" r="3" fill="#38bdf8"/><circle cx="60" cy="50" r="3" fill="#38bdf8"/></svg>` },
    { id: 2, name: "Perrito Fiel", price: 200, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="28" ry="20" fill="#d97706"/><ellipse cx="30" cy="50" rx="8" ry="15" fill="#b45309"/><ellipse cx="70" cy="50" rx="8" ry="15" fill="#b45309"/><circle cx="40" cy="50" r="3" fill="#000"/><circle cx="60" cy="50" r="3" fill="#000"/></svg>` },
    { id: 3, name: "Conejito Saltarín", price: 250, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="60" rx="22" ry="18" fill="#e2e8f0"/><ellipse cx="42" cy="30" rx="5" ry="18" fill="#cbd5e1"/><ellipse cx="58" cy="30" rx="5" ry="18" fill="#cbd5e1"/><circle cx="42" cy="55" r="2" fill="#000"/><circle cx="58" cy="55" r="2" fill="#000"/></svg>` },
    { id: 4, name: "Osito Tierno", price: 300, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="55" r="25" fill="#a16207"/><circle cx="30" cy="35" r="8" fill="#a16207"/><circle cx="70" cy="35" r="8" fill="#a16207"/><circle cx="42" cy="50" r="3" fill="#000"/><circle cx="58" cy="50" r="3" fill="#000"/></svg>` },
    { id: 5, name: "Zorrito Astuto", price: 350, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points="50,35 30,65 70,65" fill="#f97316"/><polygon points="30,35 20,15 45,30" fill="#f97316"/><polygon points="70,35 80,15 55,30" fill="#f97316"/><circle cx="42" cy="50" r="3" fill="#fff"/><circle cx="58" cy="50" r="3" fill="#fff"/></svg>` },
    { id: 6, name: "Panda Amigable", price: 400, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="55" r="25" fill="#f8fafc"/><circle cx="32" cy="35" r="9" fill="#0f172a"/><circle cx="68" cy="35" r="9" fill="#0f172a"/><circle cx="40" cy="52" r="5" fill="#0f172a"/><circle cx="60" cy="52" r="5" fill="#0f172a"/></svg>` },
    { id: 7, name: "Búho Sabio", price: 500, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="22" ry="25" fill="#64748b"/><circle cx="38" cy="45" r="8" fill="#fef08a"/><circle cx="62" cy="45" r="8" fill="#fef08a"/><circle cx="38" cy="45" r="3" fill="#000"/><circle cx="62" cy="45" r="3" fill="#000"/></svg>` }
];

// --- 2. SISTEMA DE COOLDOWN PARA MONEDAS / ANUNCIOS (1 HORA) ---
function checkCoinCooldown() {
    const lastClaim = localStorage.getItem('last_coin_claim');
    const cooldownTime = 60 * 60 * 1000; // 1 hora en milisegundos
    const now = new Date().getTime();

    if (lastClaim && (now - lastClaim < cooldownTime)) {
        const remainingMinutes = Math.ceil((cooldownTime - (now - lastClaim)) / (60 * 1000));
        return { allowed: false, minutes: remainingMinutes };
    }
    return { allowed: true, minutes: 0 };
}

function claimBonusCoins() {
    const status = checkCoinCooldown();
    if (!status.allowed) {
        alert(`Debes esperar ${status.minutes} minutos más para reclamar tu recompensa.`);
        return false;
    }

    // Guardar el tiempo actual
    localStorage.setItem('last_coin_claim', new Date().getTime());
    
    // Sumar monedas (asumiendo que manejas una variable de monedas guardada)
    let currentCoins = parseInt(localStorage.getItem('user_coins') || '0');
    currentCoins += 50; // Recompensa de ejemplo
    localStorage.setItem('user_coins', currentCoins);
    
    alert("¡Has reclamado 50 monedas con éxito!");
    return true;
}

// --- 3. LÓGICA DE LA MASCOTA AL PIE DE PÁGINA ---
function renderStaticPet(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    // Obtener la mascota seleccionada del usuario o la por defecto
    const activePetId = localStorage.getItem('active_pet_id') || 0;
    const currentPet = petsList[activePetId] || petsList[0];

    targetContainer.innerHTML = `
        <div class="pet-container" id="footer-pet">
            <div class="pet-visual-box">${currentPet.svg}</div>
            <div class="pet-bubble" id="pet-speech">¡Hola! ¿Listo para la trivia?</div>
        </div>
    `;

    // Interacción al hacer clic en la mascota
    const petElement = document.getElementById('footer-pet');
    const speechElement = document.getElementById('pet-speech');
    
    if (petElement) {
        petElement.addEventListener('click', () => {
            const phrases = [
                "¡Qué gran jugada!",
                "¡A por el puntaje perfecto!",
                "¡Revisa bien las opciones!",
                "¡Me encanta acompañarte a jugar!"
            ];
            speechElement.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        });
    }
}

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
    const allButtons = document.querySelectorAll('.answer-btn');
    
    allButtons.forEach(b => b.disabled = true);
    
    if (idx === q.correct) { 
        btn.classList.add('correct'); 
        score++; 
    } else { 
        btn.classList.add('wrong'); 
        allButtons[q.correct].classList.add('correct'); 
    }
    
    setTimeout(() => { 
        currentIndex++; 
        loadQuestion(); 
    }, 1000);
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
