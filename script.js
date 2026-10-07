let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "Invitado",
    coins: 100,
    unlockedLevels: 1,
    currentOutfit: "batman",
    ownedOutfits: ["batman"],
    currentPet: "cat",
    ownedPets: ["cat"],
    highScore: 0
};

// Definición de avatares estilo Cartoon / Chibi con disfraces divertidos
const shopOutfits = [
    { 
        id: "batman", 
        name: "Héroe Nocturno", 
        price: 0,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="55" r="24" fill="#ffccbc"/>
                <!-- Capucha / Antifaz tipo Batman -->
                <path d="M 30 45 L 35 15 L 48 35 L 52 35 L 65 15 L 70 45 Z" fill="#263238"/>
                <circle cx="42" cy="46" r="4" fill="#fff"/>
                <circle cx="58" cy="46" r="4" fill="#fff"/>
                <circle cx="42" cy="46" r="1.5" fill="#000"/>
                <circle cx="58" cy="46" r="1.5" fill="#000"/>
                <path d="M 45 55 Q 50 60 55 55" stroke="#d84315" stroke-width="2" fill="none"/>
              </svg>`
    },
    { 
        id: "dino", 
        name: "Disfraz de Dino", 
        price: 40,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="55" r="24" fill="#ffccbc"/>
                <!-- Capucha de Dinosaurio Verde -->
                <path d="M 26 40 Q 50 10 74 40 L 70 55 L 30 55 Z" fill="#4caf50"/>
                <polygon points="40,22 45,12 50,22" fill="#81c784"/>
                <polygon points="50,22 55,12 60,22" fill="#81c784"/>
                <circle cx="42" cy="46" r="4" fill="#fff"/>
                <circle cx="58" cy="46" r="4" fill="#fff"/>
                <circle cx="42" cy="46" r="1.5" fill="#000"/>
                <circle cx="58" cy="46" r="1.5" fill="#000"/>
                <path d="M 46 56 Q 50 61 54 56" stroke="#2e7d32" stroke-width="2" fill="none"/>
              </svg>`
    },
    { 
        id: "shark", 
        name: "Disfraz de Tiburón", 
        price: 80,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="55" r="24" fill="#ffccbc"/>
                <!-- Capucha de Tiburón Azul -->
                <path d="M 25 45 Q 50 12 75 45 L 70 58 L 30 58 Z" fill="#03a9f4"/>
                <polygon points="50,15 62,28 50,28" fill="#0288d1"/>
                <circle cx="42" cy="46" r="4" fill="#fff"/>
                <circle cx="58" cy="46" r="4" fill="#fff"/>
                <circle cx="42" cy="46" r="1.5" fill="#000"/>
                <circle cx="58" cy="46" r="1.5" fill="#000"/>
                <path d="M 46 56 Q 50 61 54 56" stroke="#01579b" stroke-width="2" fill="none"/>
              </svg>`
    },
    { 
        id: "bear", 
        name: "Disfraz de Osito", 
        price: 120,
        svg: `<svg viewBox="0 0 100 100" width="40" height="40">
                <circle cx="50" cy="55" r="24" fill="#ffccbc"/>
                <!-- Capucha de Oso -->
                <circle cx="32" cy="28" r="10" fill="#8d6e63"/>
                <circle cx="68" cy="28" r="10" fill="#8d6e63"/>
                <path d="M 28 48 Q 50 15 72 48 L 70 58 L 30 58 Z" fill="#8d6e63"/>
                <circle cx="42" cy="46" r="4" fill="#fff"/>
                <circle cx="58" cy="46" r="4" fill="#fff"/>
                <circle cx="42" cy="46" r="1.5" fill="#000"/>
                <circle cx="58" cy="46" r="1.5" fill="#000"/>
                <circle cx="50" cy="54" r="4" fill="#efebe9"/>
                <path d="M 46 58 Q 50 63 54 58" stroke="#4e342e" stroke-width="2" fill="none"/>
              </svg>`
    }
];

// Definición de Mascotas Cartoon
const shopPets = [
    { 
        id: "cat", 
        name: "Gatito Naranja", 
        price: 0,
        svg: `<svg viewBox="0 0 100 100" width="50" height="50">
                <circle cx="50" cy="55" r="26" fill="#ffa726"/>
                <polygon points="30,35 34,15 46,30" fill="#ffa726"/>
                <polygon points="70,35 66,15 54,30" fill="#ffa726"/>
                <circle cx="41" cy="50" r="5" fill="#fff"/>
                <circle cx="41" cy="50" r="2.5" fill="#000"/>
                <circle cx="59" cy="50" r="5" fill="#fff"/>
                <circle cx="59" cy="50" r="2.5" fill="#000"/>
                <polygon points="50,57 47,54 53,54" fill="#d84315"/>
                <path d="M 45 61 Q 50 66 55 61" stroke="#d84315" stroke-width="2" fill="none"/>
              </svg>`
    },
    { 
        id: "bunny", 
        name: "Conepín", 
        price: 50,
        svg: `<svg viewBox="0 0 100 100" width="50" height="50">
                <ellipse cx="40" cy="22" rx="6" ry="16" fill="#e0e0e0"/>
                <ellipse cx="60" cy="22" rx="6" ry="16" fill="#e0e0e0"/>
                <circle cx="50" cy="60" r="26" fill="#e0e0e0"/>
                <circle cx="41" cy="55" r="5" fill="#fff"/>
                <circle cx="41" cy="55" r="2.5" fill="#000"/>
                <circle cx="59" cy="55" r="5" fill="#fff"/>
                <circle cx="59" cy="55" r="2.5" fill="#000"/>
                <polygon points="50,62 48,60 52,60" fill="#e91e63"/>
                <path d="M 46 66 Q 50 70 54 66" stroke="#9e9e9e" stroke-width="2" fill="none"/>
              </svg>`
    }
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
    document.getElementById('welcome-msg').textContent = `¡Hola, ${gameState.username}!`;

    // Renderizar Avatar actual en cabecera
    const currentOutfitObj = shopOutfits.find(o => o.id === gameState.currentOutfit) || shopOutfits[0];
    document.getElementById('header-avatar-svg').innerHTML = currentOutfitObj.svg;

    // Renderizar Mascota actual flotando por pantalla
    const currentPetObj = shopPets.find(p => p.id === gameState.currentPet) || shopPets[0];
    document.getElementById('wandering-pet').innerHTML = currentPetObj.svg;
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
            <div class="shop-item-visual">${item.svg}</div>
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
            <div class="shop-item-visual">${pet.svg}</div>
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
        <div class="leaderboard-item"><span>3. 🦸‍♂️ ${gameState.username} (Tú)</span><span>🪙 ${gameState.coins}</span></div>
    `;
}
