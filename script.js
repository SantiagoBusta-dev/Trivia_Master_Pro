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

const avatarsList = [
    { id: 0, name: "Básico", price: 0, icon: "👤" },
    { id: 1, name: "Cerebrito", price: 50, icon: "🧠" },
    { id: 2, name: "Robot", price: 100, icon: "🤖" },
    { id: 3, name: "Ninja", price: 150, icon: "🥷" }
];

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
    if(coinEl) coinEl.textContent = gameState.coins;
    
    const userEl = document.getElementById('welcome-msg');
    if(userEl) {
        userEl.textContent = gameState.username ? `¡Hola, ${gameState.username}!` : "¡Hola, Jugador!";
    }
    renderHeaderAvatar();
    renderStaticPet();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
    if(screenId === 'shop-screen') {
        openShop();
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
    if (currentIndex >= currentQuestions.length) {
        endGame();
        return;
    }
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

function openCategories() {
    showScreen('categories-screen');
    const grid = document.getElementById('categories-grid');
    if(!grid) return;
    grid.innerHTML = `
        <button class="btn primary-btn" onclick="startLevel(1)">Ciencia y Tecnología</button>
        <button class="btn primary-btn" onclick="startLevel(25)">Historia Universal</button>
        <button class="btn primary-btn" onclick="startLevel(50)">Geografía Global</button>
        <button class="btn primary-btn" onclick="startLevel(75)">Cultura Pop y Gaming</button>
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
    let players = [
        { name: "ProPlayer99", level: 100 },
        { name: "TriviaQueen", level: 95 },
        { name: gameState.username || "Tú", level: gameState.unlockedLevels, isUser: true }
    ];
    players.sort((a, b) => b.level - a.level);
    list.innerHTML = players.map((p, index) => `
        <div class="leaderboard-item" style="${p.isUser ? 'background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8;' : ''}">
            <span>${index + 1}. ${p.name} ${p.isUser ? '(Tú)' : ''}</span>
            <span>🌟 Nivel ${p.level}</span>
        </div>
    `).join('');
}

function watchAd() {
    gameState.coins += 20;
    saveAndSyncState();
    alert("¡Has ganado 20 monedas extra por ver el anuncio!");
}

function openShop() {
    const container = document.getElementById('shop-container');
    if(!container) return;
    container.innerHTML = `
        <div class="shop-category-title">Avatares</div>
        <div class="shop-items">
            ${avatarsList.map(av => `
                <div class="shop-item-card">
                    <div class="shop-item-visual" style="font-size: 2rem;">${av.icon}</div>
                    <span>${av.name}</span>
                    <button class="btn ${gameState.ownedAvatars.includes(av.id) ? 'secondary-btn' : 'shop-btn'}" onclick="buyAvatar(${av.id})">
                        ${gameState.ownedAvatars.includes(av.id) ? (gameState.selectedAvatar === av.id ? 'Seleccionado' : 'Usar') : `🪙 ${av.price}`}
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="shop-category-title" style="margin-top: 15px;">Mascotas</div>
        <div class="shop-items">
            ${petsList.map(pet => `
                <div class="shop-item-card">
                    <div class="shop-item-visual" style="font-size: 2rem;">${pet.icon}</div>
                    <span>${pet.name}</span>
                    <button class="btn ${gameState.ownedPets.includes(pet.id) ? 'secondary-btn' : 'shop-btn'}" onclick="buyPet(${pet.id})">
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
    const currentPet = petsList.find(p => p.id === gameState.selectedPet) || petsList[0];
    footer.innerHTML = `
        <div class="pet-container" onclick="interactPet(${currentPet.id})" style="cursor: pointer; padding: 5px; display: inline-block;">
            <div class="pet-visual-box" id="pet-box" style="font-size: 2rem; transition: transform 0.2s;">${currentPet.icon}</div>
            <span class="pet-bubble" id="pet-speech" style="background: #1e293b; padding: 4px 8px; border-radius: 6px; font-size: 0.8rem; color: #38bdf8; display: inline-block; margin-top: 2px;">Tócame 🐾</span>
        </div>
    `;
}

function interactPet(petId) {
    const speech = document.getElementById('pet-speech');
    const box = document.getElementById('pet-box');
    if(!speech) return;
    
    if (petId === 0) {
        speech.textContent = "¡Miau... prrr, prrr! 🐾";
    } else if (petId === 1) {
        speech.textContent = "¡Guau, guau! 🐶";
    } else if (petId === 2) {
        speech.textContent = "Masticando bambú 🎋... ¡Ñam ñam!";
    } else if (petId === 3) {
        if (box) {
            box.style.transform = "translateY(-15px)";
            setTimeout(() => { box.style.transform = "translateY(0)"; }, 200);
        }
        speech.textContent = "¡Boing! ¡Saltando 🐰!";
    } else if (petId === 4) {
        let textToType = "¡¡MESSI!!";
        speech.textContent = "";
        let i = 0;
        if (box) {
            box.style.transform = "scale(1.3)";
            setTimeout(() => { box.style.transform = "scale(1)"; }, 300);
        }
        let interval = setInterval(() => {
            if (i < textToType.length) {
                speech.textContent += textToType.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }
}