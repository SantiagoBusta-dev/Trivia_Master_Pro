let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1,
    bodyType: "🧍‍♂️",
    currentOutfit: "👕",
    ownedOutfits: ["👕"],
    currentPet: "🐱",
    ownedPets: ["🐱"],
    highScore: 0
};

// Tienda de Ropa / Vestimenta para el cuerpo
const shopOutfits = [
    { id: "👕", name: "Camiseta Básica", price: 0 },
    { id: "🧥", name: "Abrigo Elegante", price: 40 },
    { id: "🦺", name: "Chaleco Pro", price: 70 },
    { id: "🦸‍♂️", name: "Capa de Héroe", price: 120 },
    { id: "👑", name: "Armadura Real", price: 200 }
];

// Tienda de Mascotas Exploradoras
const shopPets = [
    { id: "🐱", name: "Gatito", price: 0 },
    { id: "🐶", name: "Perrito", price: 50 },
    { id: "👻", name: "Fantasmita", price: 100 },
    { id: "🐉", name: "Dragón", price: 250 }
];

const fixedLevels = {
    1: [
        { q: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Mercurio", "Marte", "Júpiter"], correct: 1 },
        { q: "¿Qué gas abunda más en la atmósfera terrestre?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], correct: 1 },
        { q: "¿Cuál es la fórmula química del agua?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
        { q: "¿Quién formuló la teoría de la relatividad?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], correct: 2 },
        { q: "¿Qué órgano humano consume más energía?", options: ["El corazón", "El cerebro", "El hígado", "Los músculos"], correct: 1 }
    ],
    2: [
        { q: "¿En qué año comenzó la Segunda Guerra Mundial?", options: ["1939", "1941", "1914", "1945"], correct: 0 },
        { q: "¿Qué civilización construyó Machu Picchu?", options: ["Azteca", "Maya", "Inca", "Olmeca"], correct: 2 },
        { q: "¿Quién fue el primer presidente de Estados Unidos?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], correct: 1 },
        { q: "¿En qué año cayó el Imperio Romano de Occidente?", options: ["476 d.C.", "1492 d.C.", "BC 300", "1054 d.C."], correct: 0 },
        { q: "¿En qué país se originó la Revolución Industrial?", options: ["Francia", "Alemania", "Estados Unidos", "Gran Bretaña"], correct: 3 }
    ],
    3: [
        { q: "¿Director de la trilogía de El Padrino?", options: ["Martin Scorsese", "Quentin Tarantino", "Francis Ford Coppola", "Stanley Kubrick"], correct: 2 },
        { q: "¿Cómo se llama el hobbit protagonista de El Señor de los Anillos?", options: ["Frodo Bolsón", "Sam Gamygi", "Bilbo Bolsón", "Aragorn"], correct: 0 },
        { q: "¿Qué película ganó más premios Óscar en la historia?", options: ["Titanic", "Ben-Hur", "El Señor de los Anillos: El retorno del rey", "Las tres empatan"], correct: 3 },
        { q: "¿En qué año se estrenó la primera película de Star Wars?", options: ["1975", "1977", "1980", "1983"], correct: 1 },
        { q: "¿Quién interpretó a Jack Dawson en Titanic?", options: ["Brad Pitt", "Tom Cruise", "Leonardo DiCaprio", "Johnny Depp"], correct: 2 }
    ]
};

for (let i = 4; i <= 10; i++) {
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
let canWatchAd = true;
let adTimerInterval = null;

window.onload = function() {
    saveAndSyncState();
    renderLevels();
    renderCategories();
    renderShop();
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    document.getElementById('coin-count').textContent = gameState.coins;
    document.getElementById('header-body').textContent = gameState.bodyType;
    document.getElementById('header-outfit').textContent = gameState.currentOutfit;
    document.getElementById('wandering-pet').textContent = gameState.currentPet;
    document.getElementById('welcome-msg').textContent = `¡Hola, ${gameState.username}!`;
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updateCoins(amount) {
    gameState.coins += amount;
    saveAndSyncState();
}

function renderLevels() {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
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
    grid.innerHTML = '';
    const cats = { ciencia: "🔬 Ciencia", historia: "📜 Historia", cine: "🎬 Cine", deportes: "⚽ Deportes", geografia: "🌍 Geografía" };
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
            <span style="font-size: 2rem;">${item.id}</span>
            <h4>${item.name}</h4>
            <p>${item.price === 0 ? 'Gratis' : item.price + ' 🪙'}</p>
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" onclick="selectOrBuyOutfit('${item.id}', ${item.price})">
                ${isEquipped ? 'Equipado' : (isOwned ? 'Equipar' : 'Comprar')}
            </button>
        `;
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
            <span style="font-size: 2rem;">${pet.id}</span>
            <h4>${pet.name}</h4>
            <p>${pet.price === 0 ? 'Gratis' : pet.price + ' 🪙'}</p>
            <button class="btn ${isEquipped ? 'secondary-btn' : 'primary-btn'}" onclick="selectOrBuyPet('${pet.id}', ${pet.price})">
                ${isEquipped ? 'Explorando' : (isOwned ? 'Elegir' : 'Comprar')}
            </button>
        `;
        petContainer.appendChild(card);
    });
}

function selectOrBuyOutfit(id, price) {
    if (gameState.ownedOutfits.includes(id)) {
        gameState.currentOutfit = id;
    } else {
        if (gameState.coins < price) {
            alert("❌ No tienes suficientes monedas.");
            return;
        }
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
        if (gameState.coins < price) {
            alert("❌ No tienes suficientes monedas.");
            return;
        }
        updateCoins(-price);
        gameState.ownedPets.push(id);
        gameState.currentPet = id;
    }
    saveAndSyncState();
    renderShop();
}

function saveUserProfile() {
    const nameInput = document.getElementById('username-input').value.trim();
    if (nameInput) {
        gameState.username = nameInput;
        saveAndSyncState();
        alert("✅ ¡Perfil guardado correctamente!");
        showScreen('main-menu');
    } else {
        alert("⚠️ Por favor ingresa un nombre válido.");
    }
}

function playAsGuest() {
    gameState.username = "Invitado";
    saveAndSyncState();
    alert("👤 Jugando en modo invitado.");
    showScreen('main-menu');
}

function startLevel(levelNum) {
    gameMode = 'level';
    currentLevelNum = levelNum;
    currentQuestions = fixedLevels[levelNum];
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-title').textContent = `Nivel ${levelNum}`;
    showScreen('quiz-screen');
    loadQuestion();
}

function startCategoryQuiz(catKey, catName) {
    gameMode = 'category';
    currentQuestions = [
        { q: `Pregunta rápida de ${catName} 1`, options: ["Opción A", "Opción B", "Opción C", "Opción D"], correct: 0 },
        { q: `Pregunta rápida de ${catName} 2`, options: ["Opción A", "Opción B", "Opción C", "Opción D"], correct: 1 }
    ];
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-title').textContent = catName;
    showScreen('quiz-screen');
    loadQuestion();
}

function startSpecialEvent() {
    gameMode = 'event';
    currentQuestions = [
        { q: "⭐ [EVENTO] ¿Cuál es la velocidad de la luz?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "Sin límite"], correct: 0 },
        { q: "⭐ [EVENTO] ¿Qué científico descubrió la gravedad?", options: ["Einstein", "Newton", "Tesla", "Galileo"], correct: 1 }
    ];
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-title').textContent = "⭐ Evento Especial";
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    document.getElementById('question-counter').textContent = `Pregunta ${currentIndex + 1}/${currentQuestions.length}`;
    const qData = currentQuestions[currentIndex];
    document.getElementById('question-text').textContent = qData.q;

    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = opt;
        btn.style.display = 'block';
        btn.onclick = () => checkAnswer(index, btn);
        answersContainer.appendChild(btn);
    });
}

function useFiftyFifty() {
    if (gameState.coins < 15) {
        alert("❌ No tienes suficientes monedas (15 🪙 requeridas).");
        return;
    }
    updateCoins(-15);
    const qData = currentQuestions[currentIndex];
    const allButtons = document.querySelectorAll('.answer-btn');
    let hidden = 0;
    allButtons.forEach((b, idx) => {
        if (idx !== qData.correct && hidden < 2 && b.style.display !== 'none') {
            b.style.display = 'none';
            hidden++;
        }
    });
}

function useSkipQuestion() {
    if (gameState.coins < 20) {
        alert("❌ No tienes suficientes monedas (20 🪙 requeridas).");
        return;
    }
    updateCoins(-20);
    alert("⏭️ ¡Pregunta saltada!");
    currentIndex++;
    loadQuestion();
}

function checkAnswer(selectedIndex, btnElement) {
    const qData = currentQuestions[currentIndex];
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(b => b.disabled = true);

    if (selectedIndex === qData.correct) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        allButtons[qData.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 1000);
}

function endGame() {
    showScreen('result-screen');
    document.getElementById('final-score').textContent = `${score} / ${currentQuestions.length}`;
    
    let earned = gameMode === 'event' ? score * 10 : score * 5;
    document.getElementById('earned-coins').textContent = `🪙 +${earned}`;
    updateCoins(earned);

    if (gameMode === 'level' && score >= 3) {
        if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 10) {
            gameState.unlockedLevels++;
            renderLevels();
        }
        document.getElementById('result-title').textContent = "¡Nivel Superado! 🎉";
        document.getElementById('result-message').textContent = `Has ganado ${earned} monedas.`;
    } else if (gameMode === 'level') {
        document.getElementById('result-title').textContent = "¡Inténtalo de nuevo! 💡";
        document.getElementById('result-message').textContent = `Necesitas al menos 3 aciertos.`;
    } else {
        document.getElementById('result-title').textContent = "¡Reto Finalizado! 🎯";
        document.getElementById('result-message').textContent = `¡Buen trabajo!`;
    }

    if (gameState.coins > gameState.highScore) {
        gameState.highScore = gameState.coins;
    }
    saveAndSyncState();
}

function returnToLevels() {
    renderLevels();
    showScreen('levels-screen');
}

function watchAd() {
    if (!canWatchAd) return;

    alert("🎬 Simulando anuncio... ¡Has ganado +15 monedas!");
    updateCoins(15);
    
    canWatchAd = false;
    const adBtn = document.getElementById('ad-btn');
    const adTimer = document.getElementById('ad-timer');
    const countdownSpan = document.getElementById('countdown');
    
    adBtn.style.display = 'none';
    adTimer.style.display = 'block';
    
    let timeLeft = 45;
    countdownSpan.textContent = timeLeft;

    adTimerInterval = setInterval(() => {
        timeLeft--;
        countdownSpan.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(adTimerInterval);
            canWatchAd = true;
            adBtn.style.display = 'block';
            adTimer.style.display = 'none';
        }
    }, 1000);
}

function openLeaderboard() {
    showScreen('leaderboard-screen');
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = `
        <div class="leaderboard-item"><span>1. 👑 MasterPro</span><span>🪙 850</span></div>
        <div class="leaderboard-item"><span>2. 🧙‍♂️ SabioTrivia</span><span>🪙 520</span></div>
        <div class="leaderboard-item"><span>3. ${gameState.bodyType}${gameState.currentOutfit} ${gameState.username} (Tú)</span><span>🪙 ${gameState.coins}</span></div>
    `;
}
