// Estado inicial del juego y persistencia
let gameState = JSON.parse(localStorage.getItem('triviaMasterState')) || {
    username: "",
    coins: 100,
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

// Listado de Avatares disponibles en la tienda
const avatarsList = [
    { id: 0, name: "Básico", price: 0, icon: "👤" },
    { id: 1, name: "Cerebrito", price: 50, icon: "🧠" },
    { id: 2, name: "Robot", price: 100, icon: "🤖" },
    { id: 3, name: "Ninja", price: 150, icon: "🥷" }
];

// Listado de Mascotas disponibles en la tienda
const petsList = [
    { id: 0, name: "Gatito Feliz", price: 0, icon: "🐱" },
    { id: 1, name: "Perrito Fiel", price: 80, icon: "🐶" },
    { id: 2, name: "Oso Panda", price: 150, icon: "🐼" },
    { id: 3, name: "Conejo Saltarín", price: 200, icon: "🐰" },
    { id: 4, name: "Cabra Suprema", price: 500, icon: "🐐" }
];

window.onload = function() {
    if (!gameState.username || gameState.username.trim() === "") {
        showScreen('profile-screen');
    } else {
        showScreen('main-menu');
    }
    saveAndSyncState();
    renderLevels();
    renderStaticPet();
};

function saveAndSyncState() {
    localStorage.setItem('triviaMasterState', JSON.stringify(gameState));
    const coinEl = document.getElementById('coin-count');
    if (coinEl) coinEl.textContent = gameState.coins;
    
    const userEl = document.getElementById('welcome-msg');
    if (userEl) userEl.textContent = gameState.username ? `¡Hola, ${gameState.username}!` : `¡Hola, Jugador!`;
    
    renderHeaderAvatar();
    renderStaticPet();
}

function renderHeaderAvatar() {
    const headerAvatar = document.getElementById('header-avatar');
    if (headerAvatar) {
        const avatarObj = avatarsList.find(a => a.id === gameState.selectedAvatar) || avatarsList[0];
        headerAvatar.textContent = avatarObj.icon;
    }
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        if (screenId === 'shop-screen') openShop();
        if (screenId === 'levels-screen') renderLevels();
        if (screenId === 'leaderboard-screen') openLeaderboard();
        if (screenId === 'categories-screen') openCategories();
    }
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

function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = "";
    for (let i = 1; i <= 100; i++) {
        const btn = document.createElement('button');
        btn.className = `level-btn ${i > gameState.unlockedLevels ? 'locked' : ''}`;
        btn.textContent = i;
        btn.onclick = () => {
            if (i <= gameState.unlockedLevels) {
                startLevel(i);
            } else {
                alert("Nivel bloqueado. ¡Completa los anteriores para avanzar!");
            }
        };
        grid.appendChild(btn);
    }
}

function startLevel(num) {
    currentLevelNum = num;
    score = 0;
    currentIndex = 0;
    
    // Generación dinámica de preguntas escalables por nivel
    currentQuestions = [
        { q: `Nivel ${num}: ¿Cuál es el resultado de ${num} + 5?`, options: [`${num + 5}`, `${num + 3}`, `${num + 10}`, `${num - 2}`], correct: 0 },
        { q: `Nivel ${num}: ¿Qué tipo de desafío es el nivel ${num}?`, options: ["Principiante", "Intermedio", "Avanzado", "Legendario"], correct: num > 70 ? 3 : (num > 40 ? 2 : 0) },
        { q: `Nivel ${num}: Si tienes ${num} monedas y ganas 10, ¿cuántas tienes?`, options: [`${num + 10}`, `${num + 5}`, "100", `${num}`], correct: 0 }
    ];

    const titleEl = document.getElementById('quiz-title');
    if (titleEl) titleEl.textContent = `Nivel ${num}`;
    
    showScreen('quiz-screen');
    loadQuestion();
}

function loadQuestion() {
    if (currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }

    const counterEl = document.getElementById('question-counter');
    if (counterEl) counterEl.textContent = `Pregunta ${currentIndex + 1}/${currentQuestions.length}`;

    const qData = currentQuestions[currentIndex];
    const textEl = document.getElementById('question-text');
    if (textEl) textEl.textContent = qData.q;

    const container = document.getElementById('answers-container');
    if (!container) return;
    container.innerHTML = "";

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
        if (allButtons[q.correct]) {
            allButtons[q.correct].classList.add('correct');
        }
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
    if (scoreEl) scoreEl.textContent = `${score} / ${currentQuestions.length}`;

    const coinEl = document.getElementById('earned-coins');
    if (coinEl) {
        if (score > 0) {
            coinEl.textContent = `🪙 +${earned}`;
            gameState.coins += earned;
        } else {
            coinEl.textContent = `🪙 +0 (¡Inténtalo de nuevo!)`;
        }
    }

    if (score >= 2 && currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 100) {
        gameState.unlockedLevels++;
    }

    saveAndSyncState();
}

function returnToLevels() {
    showScreen('levels-screen');
}

function openCategories() {
    showScreen('categories-screen');
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    const categories = ["Ciencia y Tecnología", "Historia Universal", "Geografía Global", "Cultura Pop y Gaming"];
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn secondary-btn';
        btn.textContent = cat;
        btn.onclick = () => {
            alert(`¡Categoría "${cat}" seleccionada! Próximamente más preguntas temáticas.`);
        };
        grid.appendChild(btn);
    });
}

function startSpecialEvent() {
    alert("⚡ ¡Evento Relámpago activado! Responde rápido para ganar el doble de monedas.");
    startLevel(50);
}

function openLeaderboard() {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;
    
    let players = [
        { name: "ProPlayer99", level: 100 },
        { name: "TriviaQueen", level: 95 },
        { name: gameState.username || "Tú", level: gameState.unlockedLevels, isUser: true }
    ];

    players.sort((a, b) => b.level - a.level);
    
    list.innerHTML = `<h3>🏆 Top Jugadores</h3>` + players.map((p, index) => `
        <div class="leaderboard-item" style="${p.isUser ? 'border-color: #38bdf8;' : ''}">
            <span>#${index + 1}. ${p.name} ${p.isUser ? '(Tú)' : ''}</span>
            <span>Nivel ${p.level}</span>
        </div>
    `).join('');
}

function watchAd() {
    gameState.coins += 20;
    saveAndSyncState();
    alert("📺 ¡Has ganado 20 monedas extra por ver el anuncio!");
}

function openShop() {
    const container = document.getElementById('shop-container');
    if (!container) return;

    container.innerHTML = `
        <div class="shop-category-title">👤 Avatares</div>
        <div class="shop-items">
            ${avatarsList.map(av => {
                const owned = gameState.ownedAvatars.includes(av.id);
                const selected = gameState.selectedAvatar === av.id;
                return `
                    <div class="shop-item-card">
                        <span style="font-size: 2rem;">${av.icon}</span>
                        <span>${av.name}</span>
                        <button class="btn ${selected ? 'secondary-btn' : (owned ? 'primary-btn' : 'shop-btn')}" 
                            onclick="${selected ? '' : (owned ? `selectAvatar(${av.id})` : `buyAvatar(${av.id}, ${av.price})`)}">
                            ${selected ? 'Seleccionado' : (owned ? 'Usar' : `${av.price} 🪙`)}
                        </button>
                    </div>
                `;
            }).join('')}
        </div>

        <div class="shop-category-title" style="margin-top: 15px;">🐾 Mascotas</div>
        <div class="shop-items">
            ${petsList.map(pet => {
                const owned = gameState.ownedPets.includes(pet.id);
                const selected = gameState.selectedPet === pet.id;
                return `
                    <div class="shop-item-card">
                        <span style="font-size: 2rem;">${pet.icon}</span>
                        <span>${pet.name}</span>
                        <button class="btn ${selected ? 'secondary-btn' : (owned ? 'primary-btn' : 'shop-btn')}" 
                            onclick="${selected ? '' : (owned ? `selectPet(${pet.id})` : `buyPet(${pet.id}, ${pet.price})`)}">
                            ${selected ? 'Seleccionado' : (owned ? 'Usar' : `${pet.price} 🪙`)}
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function buyAvatar(id, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.ownedAvatars.push(id);
        gameState.selectedAvatar = id;
        saveAndSyncState();
        openShop();
        alert("¡Avatar comprado con éxito!");
    } else {
        alert("No tienes suficientes monedas.");
    }
}

function selectAvatar(id) {
    gameState.selectedAvatar = id;
    saveAndSyncState();
    openShop();
}

function buyPet(id, price) {
    if (gameState.coins >= price) {
        gameState.coins -= price;
        gameState.ownedPets.push(id);
        gameState.selectedPet = id;
        saveAndSyncState();
        openShop();
        alert("¡Mascota adoptada con éxito!");
    } else {
        alert("No tienes suficientes monedas.");
    }
}

function selectPet(id) {
    gameState.selectedPet = id;
    saveAndSyncState();
    openShop();
}

function renderStaticPet() {
    const footer = document.getElementById('footer-container');
    if (!footer) return;
    const petObj = petsList.find(p => p.id === gameState.selectedPet) || petsList[0];
    
    footer.innerHTML = `
        <div class="pet-container" onclick="interactPet()">
            <span style="font-size: 1.8rem;" id="pet-avatar">${petObj.icon}</span>
            <div class="pet-bubble" id="pet-speech">¡Hola! Toque aquí</div>
        </div>
    `;
}

function interactPet() {
    const petObj = petsList.find(p => p.id === gameState.selectedPet) || petsList[0];
    const speech = document.getElementById('pet-speech');
    if (!speech) return;

    if (petObj.id === 0) {
        speech.textContent = "¡Miau! ¡Mucho éxito en tu trivia! 🐾";
    } else if (petObj.id === 1) {
        speech.textContent = "¡Guau, guau! ¡Eres el mejor! 🐶";
    } else if (petObj.id === 2) {
        speech.textContent = "Masticando bambú... ¡Ñam ñam! 🐼";
    } else if (petObj.id === 3) {
        speech.textContent = "¡Boing! ¡Saltando hacia la victoria! 🐰";
    } else if (petObj.id === 4) {
        speech.textContent = "¡MESSIRVE! 🐐👑";
    }
}