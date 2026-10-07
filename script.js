let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1,
    currentOutfit: "batman",
    ownedOutfits: ["batman"],
    currentPet: "cat",
    ownedPets: ["cat"]
};

// Avatares detallados estilo Cartoon / Disfraces
const shopOutfits = [
    { 
        id: "batman", 
        name: "Héroe Nocturno", 
        price: 0,
        svg: `<svg viewBox="0 0 100 100" width="36" height="36">
                <circle cx="50" cy="55" r="26" fill="#ffccbc"/>
                <path d="M 28 45 L 34 14 L 47 34 L 53 34 L 66 14 L 72 45 Z" fill="#1e293b"/>
                <circle cx="41" cy="46" r="4" fill="#fff"/><circle cx="59" cy="46" r="4" fill="#fff"/>
                <circle cx="41" cy="46" r="1.5" fill="#000"/><circle cx="59" cy="46" r="1.5" fill="#000"/>
                <path d="M 45 56 Q 50 62 55 56" stroke="#c2410c" stroke-width="2.5" fill="none"/>
              </svg>`
    },
    { 
        id: "dino", 
        name: "Disfraz de Dino", 
        price: 40,
        svg: `<svg viewBox="0 0 100 100" width="36" height="36">
                <circle cx="50" cy="55" r="26" fill="#ffccbc"/>
                <path d="M 26 42 Q 50 10 74 42 L 70 58 L 30 58 Z" fill="#22c55e"/>
                <polygon points="42,20 46,10 50,20" fill="#86efac"/>
                <polygon points="50,20 54,10 58,20" fill="#86efac"/>
                <circle cx="41" cy="46" r="4" fill="#fff"/><circle cx="59" cy="46" r="4" fill="#fff"/>
                <circle cx="41" cy="46" r="1.5" fill="#000"/><circle cx="59" cy="46" r="1.5" fill="#000"/>
                <path d="M 45 56 Q 50 62 55 56" stroke="#15803d" stroke-width="2.5" fill="none"/>
              </svg>`
    },
    { 
        id: "shark", 
        name: "Disfraz de Tiburón", 
        price: 80,
        svg: `<svg viewBox="0 0 100 100" width="36" height="36">
                <circle cx="50" cy="55" r="26" fill="#ffccbc"/>
                <path d="M 25 45 Q 50 12 75 45 L 70 58 L 30 58 Z" fill="#0ea5e9"/>
                <polygon points="50,14 62,28 50,28" fill="#bae6fd"/>
                <circle cx="41" cy="46" r="4" fill="#fff"/><circle cx="59" cy="46" r="4" fill="#fff"/>
                <circle cx="41" cy="46" r="1.5" fill="#000"/><circle cx="59" cy="46" r="1.5" fill="#000"/>
                <path d="M 45 56 Q 50 62 55 56" stroke="#0369a1" stroke-width="2.5" fill="none"/>
              </svg>`
    }
];

// Mascotas interactivas
const shopPets = [
    { 
        id: "cat", 
        name: "Gatito Naranja", 
        price: 0,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="55" r="28" fill="#fb923c"/>
                <polygon points="28,36 33,12 46,30" fill="#fb923c"/>
                <polygon points="72,36 67,12 54,30" fill="#fb923c"/>
                <circle cx="40" cy="50" r="5" fill="#fff"/><circle cx="60" cy="50" r="5" fill="#fff"/>
                <circle cx="40" cy="50" r="2.5" fill="#000"/><circle cx="60" cy="50" r="2.5" fill="#000"/>
                <polygon points="50,57 47,54 53,54" fill="#c2410c"/>
                <path d="M 45 62 Q 50 68 55 62" stroke="#c2410c" stroke-width="2.5" fill="none"/>
              </svg>`
    },
    { 
        id: "bunny", 
        name: "Conepín", 
        price: 50,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <ellipse cx="40" cy="20" rx="6" ry="16" fill="#e5e7eb"/>
                <ellipse cx="60" cy="20" rx="6" ry="16" fill="#e5e7eb"/>
                <circle cx="50" cy="60" r="28" fill="#e5e7eb"/>
                <circle cx="40" cy="55" r="5" fill="#fff"/><circle cx="60" cy="55" r="5" fill="#fff"/>
                <circle cx="40" cy="55" r="2.5" fill="#000"/><circle cx="60" cy="55" r="2.5" fill="#000"/>
                <polygon points="50,63 48,60 52,60" fill="#ec4899"/>
                <path d="M 45 68 Q 50 73 55 68" stroke="#9ca3af" stroke-width="2.5" fill="none"/>
              </svg>`
    }
];

const petPhrases = [
    "¡Hola! Tócame para jugar 🐾",
    "¡Miau! ¿Qué nivel jugamos hoy?",
    "¡Excelente elección de avatar! ✨",
    "¡A ganar muchas monedas hoy! 🪙",
    "¡Ronroneo de felicidad cuando aciertas! 💛"
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
        { q: `Pregunta 2 del Nivel ${i}: Capital de país común`, options: ["Madrid", "París", "Roma", "Berlín"], correct: 0 },
        { q: `Pregunta 3 del Nivel ${i}: ¿Elemento de la tabla periódica?`, options: ["Oxígeno", "Agua", "Fuego", "Tierra"], correct: 0 },
        { q: `Pregunta 4 del Nivel ${i}: ¿Año actual de desarrollo?`, options: ["2024", "2025", "2026", "2027"], correct: 2 },
        { q: `Pregunta 5 del Nivel ${i}: ¿Color del cielo despejado?`, options: ["Verde", "Azul", "Rojo", "Amarillo"], correct: 1 }
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
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" onclick="selectOrBuyOutfit('${item.id}', ${item.price})">
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
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" onclick="selectOrBuyPet('${pet.id}', ${pet.price})">
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
    else { btn.classList.add('wrong'); document.querySelectorAll('.answer-btn')[q.correct].classList.add('correct'); }
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
