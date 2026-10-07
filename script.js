let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1,
    currentOutfit: "casual",
    ownedOutfits: ["casual"],
    currentPet: "cat",
    ownedPets: ["cat"]
};

// Avatares vectoriales de cuerpo completo
const shopOutfits = [
    { 
        id: "casual", 
        name: "Ropa Casual", 
        price: 0,
        svg: `<svg viewBox="0 0 100 120" width="45" height="65">
            <circle cx="50" cy="22" r="14" fill="#ffccbc"/>
            <circle cx="45" cy="20" r="2" fill="#000"/><circle cx="55" cy="20" r="2" fill="#000"/>
            <path d="M 46 27 Q 50 31 54 27" stroke="#c2410c" stroke-width="1.5" fill="none"/>
            <rect x="38" y="38" width="24" height="30" rx="4" fill="#38bdf8"/>
            <line x1="38" y1="42" x2="25" y2="55" stroke="#ffccbc" stroke-width="4" stroke-linecap="round"/>
            <line x1="62" y1="42" x2="75" y2="55" stroke="#ffccbc" stroke-width="4" stroke-linecap="round"/>
            <line x1="44" y1="68" x2="42" y2="95" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <line x1="56" y1="68" x2="58" y2="95" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
        </svg>`
    },
    { 
        id: "hero", 
        name: "Superhéroe", 
        price: 50,
        svg: `<svg viewBox="0 0 100 120" width="45" height="65">
            <circle cx="50" cy="22" r="14" fill="#ffccbc"/>
            <path d="M 40 18 L 60 18 L 58 24 L 42 24 Z" fill="#1e293b"/>
            <circle cx="45" cy="21" r="1.5" fill="#fff"/><circle cx="55" cy="21" r="1.5" fill="#fff"/>
            <path d="M 46 27 Q 50 30 54 27" stroke="#c2410c" stroke-width="1.5" fill="none"/>
            <path d="M 35 36 L 50 32 L 65 36 L 62 70 L 38 70 Z" fill="#ef4444"/>
            <line x1="38" y1="42" x2="25" y2="55" stroke="#ffccbc" stroke-width="4" stroke-linecap="round"/>
            <line x1="62" y1="42" x2="75" y2="55" stroke="#ffccbc" stroke-width="4" stroke-linecap="round"/>
            <line x1="44" y1="70" x2="42" y2="95" stroke="#374151" stroke-width="5" stroke-linecap="round"/>
            <line x1="56" y1="70" x2="58" y2="95" stroke="#374151" stroke-width="5" stroke-linecap="round"/>
        </svg>`
    }
];

// Mascotas vectoriales reales
const shopPets = [
    { 
        id: "cat", 
        name: "Gatito Copión", 
        price: 0,
        svg: `<svg viewBox="0 0 100 100" width="38" height="38">
            <circle cx="50" cy="55" r="24" fill="#fb923c"/>
            <polygon points="32,38 36,16 46,32" fill="#fb923c"/>
            <polygon points="68,38 64,16 54,32" fill="#fb923c"/>
            <circle cx="41" cy="50" r="3.5" fill="#fff"/><circle cx="59" cy="50" r="3.5" fill="#fff"/>
            <circle cx="41" cy="50" r="1.5" fill="#000"/><circle cx="59" cy="50" r="1.5" fill="#000"/>
            <polygon points="50,56 47,53 53,53" fill="#c2410c"/>
            <path d="M 46 62 Q 50 67 54 62" stroke="#c2410c" stroke-width="2" fill="none"/>
        </svg>`
    },
    { 
        id: "bunny", 
        name: "Conejito Saltarín", 
        price: 40,
        svg: `<svg viewBox="0 0 100 100" width="38" height="38">
            <ellipse cx="40" cy="20" rx="5" ry="14" fill="#e5e7eb"/>
            <ellipse cx="60" cy="20" rx="5" ry="14" fill="#e5e7eb"/>
            <circle cx="50" cy="58" r="24" fill="#e5e7eb"/>
            <circle cx="41" cy="54" r="3.5" fill="#fff"/><circle cx="59" cy="54" r="3.5" fill="#fff"/>
            <circle cx="41" cy="54" r="1.5" fill="#000"/><circle cx="59" cy="54" r="1.5" fill="#000"/>
            <polygon points="50,60 48,58 52,58" fill="#ec4899"/>
            <path d="M 46 65 Q 50 69 54 65" stroke="#9ca3af" stroke-width="2" fill="none"/>
        </svg>`
    }
];

const petPhrases = [
    "¡Hola! Tócame para charlar 🐾",
    "¡Miau! ¿Qué nivel jugamos hoy?",
    "¡Qué facha tiene ese traje! ✨",
    "¡A ganar monedas hoy! 🪙",
    "¡Vamos con todo! 💛"
];

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
    fixedLevels[i] = [
        { q: `Pregunta 1 del Nivel ${i}: ¿Cuánto es 5 + ${i}?`, options: [`${4+i}`, `${5+i}`, `${6+i}`, `${7+i}`], correct: 1 },
        { q: `Pregunta 2 del Nivel ${i}: Capital común`, options: ["Madrid", "París", "Roma", "Berlín"], correct: 0 },
        { q: `Pregunta 3 del Nivel ${i}: ¿Elemento químico?`, options: ["Oxígeno", "Agua", "Fuego", "Tierra"], correct: 0 },
        { q: `Pregunta 4 del Nivel ${i}: ¿Año actual?`, options: ["2024", "2025", "2026", "2027"], correct: 2 },
        { q: `Pregunta 5 del Nivel ${i}: ¿Color del cielo?`, options: ["Verde", "Azul", "Rojo", "Amarillo"], correct: 1 }
    ];
}

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let gameMode = '';
let currentLevelNum = 1;

window.onload = function() {
    saveAndSyncState();
    renderLevels();
    renderCategories();
    renderShop();
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    document.getElementById('coin-count').textContent = gameState.coins;
    document.getElementById('welcome-msg').textContent = `¡Hola, ${gameState.username}!`;

    const outfitObj = shopOutfits.find(o => o.id === gameState.currentOutfit) || shopOutfits[0];
    document.getElementById('header-avatar-svg').innerHTML = outfitObj.svg;
    const profileFull = document.getElementById('profile-avatar-full');
    if (profileFull) profileFull.innerHTML = outfitObj.svg;

    const petObj = shopPets.find(p => p.id === gameState.currentPet) || shopPets[0];
    document.getElementById('companion-pet-svg').innerHTML = petObj.svg;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updateCoins(amount) {
    gameState.coins += amount;
    saveAndSyncState();
}

function interactWithPet() {
    const randomPhrase = petPhrases[Math.floor(Math.random() * petPhrases.length)];
    document.getElementById('pet-speech').textContent = randomPhrase;
}

function renderLevels() {
    const grid = document.getElementById('levels-grid');
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

function renderShop() {
    const outfitContainer = document.getElementById('outfit-shop-container');
    outfitContainer.innerHTML = '';
    shopOutfits.forEach(item => {
        const isOwned = gameState.ownedOutfits.includes(item.id);
        const isEquipped = gameState.currentOutfit === item.id;
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
            <div class="shop-item-visual">${item.svg}</div>
            <h4>${item.name}</h4>
            <p>${item.price === 0 ? 'Gratis' : item.price + ' 🪙'}</p>
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" style="padding: 6px; font-size: 0.75rem;" onclick="selectOrBuyOutfit('${item.id}', ${item.price})">
                ${isEquipped ? 'Equipado' : (isOwned ? 'Equipar' : 'Comprar')}
            </button>`;
        outfitContainer.appendChild(card);
    });

    const petContainer = document.getElementById('pet-shop-container');
    petContainer.innerHTML = '';
    shopPets.forEach(pet => {
        const isOwned = gameState.ownedPets.includes(pet.id);
        const isEquipped = gameState.currentPet === pet.id;
        const card = document.createElement('div');
        card.className = 'shop-item-card';
        card.innerHTML = `
            <div class="shop-item-visual">${pet.svg}</div>
            <h4>${pet.name}</h4>
            <p>${pet.price === 0 ? 'Gratis' : pet.price + ' 🪙'}</p>
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" style="padding: 6px; font-size: 0.75rem;" onclick="selectOrBuyPet('${pet.id}', ${pet.price})">
                ${isEquipped ? 'Acompañando' : (isOwned ? 'Elegir' : 'Comprar')}
            </button>`;
        petContainer.appendChild(card);
    });
}

function selectOrBuyOutfit(id, price) {
    if (gameState.ownedOutfits.includes(id)) {
        gameState.currentOutfit = id;
    } else {
        if (gameState.coins < price) { alert("❌ Monedas insuficientes"); return; }
        updateCoins(-price);
        gameState.ownedOutfits.push(id);
        gameState.currentOutfit = id;
    }
    saveAndSyncState();
    renderShop();
}

function selectOrBuyPet(id, price) {
    if (gameState.ownedPets.includes(id)) {
        gameState.currentPet = id;
    } else {
        if (gameState.coins < price) { alert("❌ Monedas insuficientes"); return; }
        updateCoins(-price);
        gameState.ownedPets.push(id);
        gameState.currentPet = id;
    }
    saveAndSyncState();
    renderShop();
}

function saveUserProfile() {
    const val = document.getElementById('username-input').value.trim();
    if (val) { gameState.username = val; saveAndSyncState(); showScreen('main-menu'); }
}
function playAsGuest() { gameState.username = "Invitado"; saveAndSyncState(); showScreen('main-menu'); }

function startLevel(num) {
    gameMode = 'level'; currentLevelNum = num; currentQuestions = fixedLevels[num]; currentIndex = 0; score = 0;
    document.getElementById('quiz-title').textContent = `Nivel ${num}`;
    showScreen('quiz-screen'); loadQuestion();
}
function startCategoryQuiz(key, name) {
    gameMode = 'category'; currentQuestions = fixedLevels[1]; currentIndex = 0; score = 0;
    document.getElementById('quiz-title').textContent = name;
    showScreen('quiz-screen'); loadQuestion();
}
function startSpecialEvent() {
    gameMode = 'event'; currentQuestions = fixedLevels[1]; currentIndex = 0; score = 0;
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

function useFiftyFifty() {
    if (gameState.coins < 15) return;
    updateCoins(-15);
    const q = currentQuestions[currentIndex];
    let hidden = 0;
    document.querySelectorAll('.answer-btn').forEach((b, i) => {
        if (i !== q.correct && hidden < 2) { b.style.display = 'none'; hidden++; }
    });
}

function useSkipQuestion() {
    if (gameState.coins < 20) return;
    updateCoins(-20);
    currentIndex++; loadQuestion();
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
    if (gameMode === 'level' && score >= 3 && currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 10) {
        gameState.unlockedLevels++;
    }
    saveAndSyncState();
}

function returnToLevels() { renderLevels(); showScreen('levels-screen'); }
function watchAd() { updateCoins(15); alert("¡+15 monedas ganadas!"); }
function openLeaderboard() {
    showScreen('leaderboard-screen');
    document.getElementById('leaderboard-list').innerHTML = `
        <div class="leaderboard-item"><span>1. 👑 MasterPro</span><span>🪙 850</span></div>
        <div class="leaderboard-item"><span>2. 🦸‍♂️ ${gameState.username} (Tú)</span><span>🪙 ${gameState.coins}</span></div>`;
}
