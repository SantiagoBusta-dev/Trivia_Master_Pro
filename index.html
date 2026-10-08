// --- 1. ESTADO DEL JUEGO ---
let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Santiago",
    coins: 235,
    unlockedLevels: 1,
    ownedAvatars: [0],
    selectedAvatar: 0,
    ownedPets: [0],
    selectedPet: 0
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let currentLevelNum = 1;

// Datos de Avatares y Mascotas para la Tienda
const avatarsList = [
    { id: 0, name: "Básico", price: 0, icon: "👤" },
    { id: 1, name: "Cerebrito", price: 50, icon: "🧠" },
    { id: 2, name: "Robots", price: 100, icon: "🤖" },
    { id: 3, name: "Ninja", price: 150, icon: "🥷" }
];

const petsList = [
    { id: 0, name: "Gatito Feliz", price: 0, type: "cat" },
    { id: 1, name: "Perrito Fiel", price: 80, type: "dog" }
];

window.onload = function() {
    saveAndSyncState();
    renderLevels();
    renderStaticPet();
    showScreen('main-menu'); // Inicia directo en el menú principal
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    const coinEl = document.getElementById('coin-count');
    if(coinEl) coinEl.textContent = gameState.coins;
    const userEl = document.getElementById('welcome-msg');
    if(userEl) userEl.textContent = `¡Hola, ${gameState.username}!`;
    renderHeaderAvatar();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
}

function saveUserProfile() {
    const input = document.getElementById('username-input');
    if (input && input.value.trim() !== "") {
        gameState.username = input.value.trim();
        saveAndSyncState();
        showScreen('main-menu');
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
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

function startLevel(num) {
    currentLevelNum = num;
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
    if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 100) {
        gameState.unlockedLevels++;
    }
    saveAndSyncState();
}

function returnToLevels() { 
    renderLevels(); 
    showScreen('levels-screen'); 
}

// --- 3. CATEGORÍAS, EVENTOS Y CLASIFICACIÓN ---
function openCategories() {
    showScreen('categories-screen');
    const grid = document.getElementById('categories-grid');
    if(!grid) return;
    grid.innerHTML = `
        <button class="btn primary-btn" onclick="startLevel(1)">Ciencia y Tecnología</button>
        <button class="btn primary-btn" onclick="startLevel(5)">Historia Universal</button>
        <button class="btn primary-btn" onclick="startLevel(10)">Geografía Global</button>
        <button class="btn primary-btn" onclick="startLevel(15)">Cultura Pop y Gaming</button>
    `;
}

function startSpecialEvent() {
    alert("¡Evento Relámpago activado! Responde rápido para ganar el doble de monedas.");
    startLevel(50);
}

function openLeaderboard() {
    showScreen('leaderboard-screen');
    const list = document.getElementById('leaderboard-list');
    if(!list) return;
    list.innerHTML = `
        <div class="leaderboard-item"><span>1. ProPlayer99</span><span>🌟 Nivel 100</span></div>
        <div class="leaderboard-item"><span>2. TriviaQueen</span><span>🌟 Nivel 95</span></div>
        <div class="leaderboard-item"><span>3. ${gameState.username} (Tú)</span><span>🌟 Nivel ${gameState.unlockedLevels}</span></div>
    `;
}

function watchAd() {
    gameState.coins += 20;
    saveAndSyncState();
    alert("¡Has ganado 20 monedas extra por ver el anuncio!");
}

// --- 4. TIENDA Y MASCOTAS ---
function openShop() {
    showScreen('shop-screen');
    const container = document.getElementById('shop-container');
    if(!container) return;
    
    container.innerHTML = `
        <div class="shop-category-title">Avatares</div>
        <div class="shop-items">
            ${avatarsList.map(av => `
                <div class="shop-item-card">
                    <div class="shop-item-visual" style="font-size: 2rem;">${av.icon}</div>
                    <span>${av.name}</span>
                    <button class="btn ${gameState.ownedAvatars.includes(av.id) ? 'secondary-btn' : 'shop-btn'}" 
                        onclick="buyAvatar(${av.id})">
                        ${gameState.ownedAvatars.includes(av.id) ? (gameState.selectedAvatar === av.id ? 'Seleccionado' : 'Usar') : `🪙 ${av.price}`}
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="shop-category-title" style="margin-top: 10px;">Mascotas</div>
        <div class="shop-items">
            ${petsList.map(pet => `
                <div class="shop-item-card">
                    <div class="shop-item-visual">
                        <svg width="40" height="45" viewBox="0 0 100 100">
                            <circle cx="50" cy="55" r="30" fill="#f59e0b"/>
                            <circle cx="38" cy="48" r="4" fill="#000"/>
                            <circle cx="62" cy="48" r="4" fill="#000"/>
                        </svg>
                    </div>
                    <span>${pet.name}</span>
                    <button class="btn ${gameState.ownedPets.includes(pet.id) ? 'secondary-btn' : 'shop-btn'}" 
                        onclick="buyPet(${pet.id})">
                        ${gameState.ownedPets.includes(pet.id) ? (gameState.selectedPet === pet.id ? 'Equipada' : 'Equipar') : `🪙 ${pet.price}`}
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function buyAvatar(id) {
    const av = avatarsList.find(a => a.id === id);
    if (gameState.ownedAvatars.includes(id)) {
        gameState.selectedAvatar = id;
    } else if (gameState.coins >= av.price) {
        gameState.coins -= av.price;
        gameState.ownedAvatars.push(id);
        gameState.selectedAvatar = id;
    } else {
        alert("No tienes suficientes monedas.");
    }
    saveAndSyncState();
    openShop();
}

function buyPet(id) {
    const pet = petsList.find(p => p.id === id);
    if (gameState.ownedPets.includes(id)) {
        gameState.selectedPet = id;
    } else if (gameState.coins >= pet.price) {
        gameState.coins -= pet.price;
        gameState.ownedPets.push(id);
        gameState.selectedPet = id;
    } else {
        alert("No tienes suficientes monedas.");
    }
    saveAndSyncState();
    openShop();
}

function renderHeaderAvatar() {
    const container = document.getElementById('header-avatar');
    if(!container) return;
    const currentAv = avatarsList.find(a => a.id === gameState.selectedAvatar) || avatarsList[0];
    container.innerHTML = `<span style="font-size: 1.2rem;">${currentAv.icon}</span>`;
}

function renderStaticPet() {
    const footer = document.getElementById('footer-container');
    if(!footer) return;
    footer.innerHTML = `
        <div class="pet-container" onclick="interactPet()">
            <div class="pet-visual-box">
                <svg width="35" height="40" viewBox="0 0 100 100" class="anim-tail">
                    <circle cx="50" cy="55" r="28" fill="#f59e0b"/>
                    <polygon points="30,35 20,15 40,28" fill="#f59e0b"/>
                    <polygon points="70,35 80,15 60,28" fill="#f59e0b"/>
                    <circle cx="40" cy="48" r="4" fill="#000"/>
                    <circle cx="60" cy="48" r="4" fill="#000"/>
                </svg>
            </div>
            <span class="pet-bubble" id="pet-speech">¡Hola! Juega conmigo 🐾</span>
        </div>
    `;
}

function interactPet() {
    const phrases = ["¡Hola jefe!", "¡A romper récords!", "¡Miau! 🐾", "¡Tengo hambre de preguntas!"];
    const speech = document.getElementById('pet-speech');
    if(speech) {
        speech.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    }
}
