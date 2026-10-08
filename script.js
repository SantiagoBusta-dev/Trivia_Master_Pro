// --- 1. CONFIGURACIÓN DE AVATARES Y MASCOTAS ---
const avatarsList = [
    { id: 0, name: "Clásico", price: 0, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#4f46e5"/><path d="M 20 90 Q 50 60 80 90" fill="#4f46e5"/></svg>' },
    { id: 1, name: "Cyberpunk", price: 100, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#06b6d4"/><path d="M 20 90 Q 50 60 80 90" fill="#06b6d4"/></svg>' },
    { id: 2, name: "Golden", price: 200, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#eab308"/><path d="M 20 90 Q 50 60 80 90" fill="#eab308"/></svg>' },
    { id: 3, name: "Ninja", price: 150, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="40" r="25" fill="#1e293b"/><path d="M 20 90 Q 50 60 80 90" fill="#1e293b"/></svg>' }
];

const petsList = [
    { id: 0, name: "Gatito Naranja", price: 0, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="30" fill="#fb923c"/></svg>' },
    { id: 1, name: "Gatito Negrito", price: 150, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="30" fill="#334155"/></svg>' },
    { id: 2, name: "Perrito Fiel", price: 200, svg: '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="30" fill="#d97706"/></svg>' }
];

// --- 2. BANCO DE PREGUNTAS Y GENERADOR AUTOMÁTICO DE NIVELES ---
const questionBank = {
    ciencia: [
        { q: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Mercurio", "Marte", "Júpiter"], correct: 1, diff: 1 },
        { q: "¿Qué gas abunda más en la atmósfera terrestre?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], correct: 1, diff: 1 },
        { q: "¿Cuál es la fórmula química del agua?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1, diff: 1 },
        { q: "¿Quién formuló la teoría de la relatividad?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], correct: 2, diff: 1 },
        { q: "¿Qué órgano humano consume más energía?", options: ["El corazón", "El cerebro", "El hígado", "Los músculos"], correct: 1, diff: 1 }
    ],
    historia: [
        { q: "¿En qué año comenzó la Primera Guerra Mundial?", options: ["1914", "1939", "1905", "1918"], correct: 0, diff: 1 },
        { q: "¿Quién fue el primer emperador de Roma?", options: ["Julio César", "Augusto", "Nerón", "Constantino"], correct: 1, diff: 1 }
    ],
    cine: [
        { q: "¿Quién dirigió la película 'El Padrino'?", options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Quentin Tarantino"], correct: 1, diff: 1 }
    ],
    deportes: [
        { q: "¿Cada cuántos años se celebran los Juegos Olímpicos?", options: ["2 años", "3 años", "4 años", "5 años"], correct: 2, diff: 1 }
    ]
};

// Rellenar dinámicamente para asegurar contenido en los 100 niveles
['ciencia', 'historia', 'cine', 'deportes'].forEach(cat => {
    while (questionBank[cat].length < 25) {
        questionBank[cat].push({
            q: `Pregunta avanzada de ${cat} #${questionBank[cat].length + 1}`,
            options: ["Opción A", "Opción B", "Opción C", "Opción D"],
            correct: 0,
            diff: Math.floor(Math.random() * 3) + 1
        });
    }
});

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
    renderCategories();
    renderStaticPet('footer-container');
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
    
    if (screenId === 'shop-screen') {
        renderShop();
    }
}

function updateCoins(amount) {
    gameState.coins += amount;
    saveAndSyncState();
}

// --- 3. RENDERIZAR 100 NIVELES ---
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

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if(!grid) return;
    grid.innerHTML = '';
    const cats = { ciencia: "🔬 Ciencia", historia: "📜 Historia", cine: "🎬 Cine", deportes: "⚽ Deportes" };
    for (let key in cats) {
        const btn = document.createElement('button');
        btn.className = 'btn secondary-btn';
        btn.textContent = cats[key];
        btn.onclick = () => startCategoryQuiz(key, cats[key]);
        grid.appendChild(btn);
    }
}

function startLevel(num) {
    currentLevelNum = num;
    let pool = questionBank['ciencia'];
    currentQuestions = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0; 
    score = 0;
    
    const titleEl = document.getElementById('quiz-title');
    if(titleEl) titleEl.textContent = `Nivel ${num}`;
    showScreen('quiz-screen'); 
    loadQuestion();
}

function startCategoryQuiz(catKey, catName) {
    let pool = questionBank[catKey] || questionBank['ciencia'];
    currentQuestions = [...pool].sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0; 
    score = 0;
    
    const titleEl = document.getElementById('quiz-title');
    if(titleEl) titleEl.textContent = catName;
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
    let earned = score * 5;
    
    const scoreEl = document.getElementById('final-score');
    if(scoreEl) scoreEl.textContent = `${score} / ${currentQuestions.length}`;
    
    const coinsEl = document.getElementById('earned-coins');
    if(coinsEl) coinsEl.textContent = `🪙 +${earned}`;
    
    updateCoins(earned);
    
    if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 100) {
        gameState.unlockedLevels++;
    }
    saveAndSyncState();
}

function returnToLevels() { 
    renderLevels(); 
    showScreen('levels-screen'); 
}

function watchAd() { 
    updateCoins(15); 
    alert("¡+15 monedas ganadas!"); 
}

function saveUserProfile() {
    const input = document.getElementById('username-input');
    if (input) {
        const val = input.value.trim();
        if (val) { 
            gameState.username = val; 
            saveAndSyncState(); 
            showScreen('main-menu'); 
        }
    }
}

function openLeaderboard() {
    showScreen('leaderboard-screen');
    const list = document.getElementById('leaderboard-list');
    if(list) {
        list.innerHTML = `
            <div class="leaderboard-item"><span>1. 👑 MasterPro</span><span>🪙 850</span></div>
            <div class="leaderboard-item"><span>2. 🦸‍♂️ ${gameState.username} (Tú)</span><span>🪙 ${gameState.coins}</span></div>`;
    }
}

// --- 4. TIENDA Y MASCOTAS ---
function renderShop() {
    const shopContainer = document.getElementById('shop-container') || document.getElementById('shop-items');
    if (!shopContainer) return;

    shopContainer.innerHTML = `
        <div style="margin-bottom: 16px;">
            <div class="shop-category-title">Avatares</div>
            <div id="shop-avatars-grid" class="shop-items"></div>
        </div>
        <div>
            <div class="shop-category-title">Mascotas</div>
            <div id="shop-pets-grid" class="shop-items"></div>
        </div>
    `;

    const avatarsGrid = document.getElementById('shop-avatars-grid');
    avatarsList.forEach(av => {
        const owned = gameState.ownedAvatars && gameState.ownedAvatars.includes(av.id);
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
            <div class="shop-item-visual">${av.svg}</div>
            <p style="font-size: 13px; margin: 4px 0; font-weight: 600;">${av.name}</p>
            <button class="btn ${owned ? 'secondary-btn' : 'primary-btn'}">
                ${owned ? 'Comprado' : `🪙 ${av.price}`}
            </button>
        `;
        card.querySelector('button').onclick = () => {
            if (!owned && gameState.coins >= av.price) {
                gameState.coins -= av.price;
                if(!gameState.ownedAvatars) gameState.ownedAvatars = [0];
                gameState.ownedAvatars.push(av.id);
                saveAndSyncState();
                renderShop();
            }
        };
        avatarsGrid.appendChild(card);
    });

    const petsGrid = document.getElementById('shop-pets-grid');
    const activePetId = parseInt(localStorage.getItem('active_pet_id') || '0');
    petsList.forEach(pet => {
        const owned = gameState.ownedPets && gameState.ownedPets.includes(pet.id);
        const isCurrent = activePetId === pet.id;
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
            <div class="shop-item-visual">${pet.svg}</div>
            <p style="font-size: 13px; margin: 4px 0; font-weight: 600;">${pet.name}</p>
            <button class="btn ${isCurrent ? 'secondary-btn' : 'primary-btn'}">
                ${isCurrent ? 'Activa' : (owned ? 'Seleccionar' : `🪙 ${pet.price}`)}
            </button>
        `;
        card.querySelector('button').onclick = () => {
            if (isCurrent) return;
            if (owned) {
                localStorage.setItem('active_pet_id', pet.id);
                renderStaticPet('footer-container');
                renderShop();
            } else if (gameState.coins >= pet.price) {
                gameState.coins -= pet.price;
                if(!gameState.ownedPets) gameState.ownedPets = [0];
                gameState.ownedPets.push(pet.id);
                localStorage.setItem('active_pet_id', pet.id);
                saveAndSyncState();
                renderStaticPet('footer-container');
                renderShop();
            }
        };
        petsGrid.appendChild(card);
    });
}

function renderStaticPet(containerId) {
    const targetContainer = document.getElementById(containerId);
    if (!targetContainer) return;

    const activePetId = localStorage.getItem('active_pet_id') || 0;
    const currentPet = petsList[activePetId] || petsList[0];

    targetContainer.innerHTML = `
        <div class="pet-container" id="footer-pet">
            <div class="pet-visual-box">${currentPet.svg}</div>
            <div class="pet-bubble" id="pet-speech">¡Hola! ¿Listo para jugar?</div>
        </div>
    `;

    const petElement = document.getElementById('footer-pet');
    const speechElement = document.getElementById('pet-speech');
    
    if (petElement && speechElement) {
        petElement.addEventListener('click', () => {
            const phrases = ["¡A ganar!", "¡Tú puedes!", "¡Excelente partida!"];
            speechElement.innerText = phrases[Math.floor(Math.random() * phrases.length)];
        });
    }
}
