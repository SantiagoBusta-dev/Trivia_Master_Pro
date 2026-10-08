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
    { id: 0, name: "Gatito Naranja", price: 0, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="65" rx="20" ry="25" fill="#fb923c"/><circle cx="50" cy="38" r="18" fill="#fb923c"/><polygon points="37,25 30,10 44,22" fill="#fb923c"/><polygon points="63,25 70,10 56,22" fill="#fb923c"/><circle cx="43" cy="36" r="2.5" fill="#000"/><circle cx="57" cy="36" r="2.5" fill="#000"/><path d="M 35 75 Q 50 90 65 75" fill="none" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/><ellipse cx="38" cy="58" rx="5" ry="8" fill="#fdba74" class="anim-paw"/></svg>` },
    { id: 1, name: "Gatito Negrito", price: 150, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="65" rx="20" ry="25" fill="#334155"/><circle cx="50" cy="38" r="18" fill="#334155"/><polygon points="37,25 30,10 44,22" fill="#334155"/><polygon points="63,25 70,10 56,22" fill="#334155"/><circle cx="43" cy="36" r="2.5" fill="#38bdf8"/><circle cx="57" cy="36" r="2.5" fill="#38bdf8"/><path d="M 35 75 Q 50 90 65 75" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round"/><ellipse cx="38" cy="58" rx="5" ry="8" fill="#64748b" class="anim-paw"/></svg>` },
    { id: 2, name: "Perrito Fiel", price: 200, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="65" rx="22" ry="25" fill="#d97706"/><ellipse cx="50" cy="40" rx="19" ry="17" fill="#d97706"/><ellipse cx="34" cy="40" rx="6" ry="12" fill="#b45309"/><ellipse cx="66" cy="40" rx="6" ry="12" fill="#b45309"/><circle cx="42" cy="38" r="2.5" fill="#000"/><circle cx="58" cy="38" r="2.5" fill="#000"/><path d="M 68 75 Q 85 65 80 50" fill="none" stroke="#d97706" stroke-width="5" stroke-linecap="round" class="anim-tail"/></svg>` },
    { id: 3, name: "Conejito Saltarín", price: 250, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="68" rx="18" ry="22" fill="#e2e8f0"/><circle cx="50" cy="45" r="15" fill="#e2e8f0"/><ellipse cx="44" cy="22" rx="4" ry="15" fill="#cbd5e1"/><ellipse cx="56" cy="22" rx="4" ry="15" fill="#cbd5e1"/><circle cx="43" cy="43" r="2" fill="#000"/><circle cx="57" cy="43" r="2" fill="#000"/></svg>` },
    { id: 4, name: "Osito Tierno", price: 300, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="65" rx="22" ry="25" fill="#a16207"/><circle cx="50" cy="40" r="18" fill="#a16207"/><circle cx="35" cy="26" r="6" fill="#a16207"/><circle cx="65" cy="26" r="6" fill="#a16207"/><circle cx="42" cy="38" r="2.5" fill="#000"/><circle cx="58" cy="38" r="2.5" fill="#000"/></svg>` },
    { id: 5, name: "Zorrito Astuto", price: 350, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points="50,45 32,78 68,78" fill="#f97316"/><polygon points="50,30 32,55 68,55" fill="#f97316"/><polygon points="32,38 20,18 42,32" fill="#f97316"/><polygon points="68,38 80,18 58,32" fill="#f97316"/><circle cx="42" cy="45" r="2.5" fill="#fff"/><circle cx="58" cy="45" r="2.5" fill="#fff"/></svg>` },
    { id: 6, name: "Panda Amigable", price: 400, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="65" rx="22" ry="25" fill="#f8fafc"/><circle cx="50" cy="40" r="18" fill="#f8fafc"/><circle cx="36" cy="38" r="7" fill="#0f172a"/><circle cx="64" cy="38" r="7" fill="#0f172a"/><circle cx="43" cy="38" r="2.5" fill="#0f172a"/><circle cx="57" cy="38" r="2.5" fill="#0f172a"/></svg>` },
    { id: 7, name: "Búho Sabio", price: 500, svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="60" rx="20" ry="25" fill="#64748b"/><circle cx="38" cy="48" r="7" fill="#fef08a"/><circle cx="62" cy="48" r="7" fill="#fef08a"/><circle cx="38" cy="48" r="2.5" fill="#000"/><circle cx="62" cy="48" r="2.5" fill="#000"/></svg>` }
];

// --- 2. BANCO MASIVO DE PREGUNTAS (ESCALONADO POR DIFICULTAD) ---
const questionBank = {
    ciencia: [
        { q: "¿Cuál es el planeta más cercano al Sol?", options: ["Venus", "Mercurio", "Marte", "Júpiter"], correct: 1, diff: 1 },
        { q: "¿Qué gas abunda más en la atmósfera terrestre?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], correct: 1, diff: 1 },
        { q: "¿Cuál es la fórmula química del agua?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1, diff: 1 },
        { q: "¿Quién formuló la teoría de la relatividad?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Galileo Galilei"], correct: 2, diff: 1 },
        { q: "¿Qué órgano humano consume más energía?", options: ["El corazón", "El cerebro", "El hígado", "Los músculos"], correct: 1, diff: 1 },
        { q: "¿Cuál es el metal más abundante en la corteza terrestre?", options: ["Hierro", "Aluminio", "Cobre", "Oro"], correct: 1, diff: 1 },
        { q: "¿A qué velocidad viaja la luz en el vacío?", options: ["300,000 km/s", "150,000 km/s", "1,080 km/s", "30,000 km/s"], correct: 0, diff: 1 },
        { q: "¿Cómo se llaman los animales que se alimentan de plantas?", options: ["Carnívoros", "Omnívoros", "Herbivoros", "Insectívoros"], correct: 2, diff: 1 },
        { q: "¿Qué fuerza nos mantiene anclados al suelo?", options: ["Magnetismo", "Gravedad", "Inercia", "Fricción"], correct: 1, diff: 1 },
        { q: "¿Cuál es el órgano principal del sistema nervioso?", options: ["El corazón", "El cerebro", "La médula", "El hígado"], correct: 1, diff: 1 },
        
        { q: "¿Cuál es el hueso más largo del cuerpo humano?", options: ["Húmero", "Tibia", "Fémur", "Radio"], correct: 2, diff: 2 },
        { q: "¿Qué elemento químico tiene el símbolo 'Au'?", options: ["Plata", "Oro", "Cobre", "Argón"], correct: 1, diff: 2 },
        { q: "¿En qué capa de la atmósfera se queman los meteoritos?", options: ["Troposfera", "Estratosfera", "Mesosfera", "Termosfera"], correct: 2, diff: 2 },
        { q: "¿Cuál es la unidad básica de la herencia genética?", options: ["Cromosoma", "Gen", "Proteína", "Neurona"], correct: 1, diff: 2 },
        { q: "¿Qué tipo de enlace químico une moléculas de agua?", options: ["Iónico", "Covalente", "Metálico", "Puente de hidrógeno"], correct: 3, diff: 2 },
        { q: "¿Cuál es el planeta más caliente del Sistema Solar?", options: ["Mercurio", "Venus", "Marte", "Júpiter"], correct: 1, diff: 2 },
        { q: "¿Qué científico descubrió la penicilina?", options: ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Gregor Mendel"], correct: 1, diff: 2 },
        { q: "¿Qué gas es responsable del efecto invernadero natural?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Helio"], correct: 2, diff: 2 },
        { q: "¿Cómo se llama el proceso de división celular en células sexuales?", options: ["Mitosis", "Meiosis", "Fisión", "Gemación"], correct: 1, diff: 2 },
        { q: "¿Cuál es la estrella más cercana a la Tierra después del Sol?", options: ["Sirio", "Próxima Centauri", "Betelgeuse", "Vega"], correct: 1, diff: 2 },

        { q: "¿Qué partícula subatómica tiene carga eléctrica negativa?", options: ["Protón", "Neutrón", "Electrón", "Positrón"], correct: 2, diff: 3 },
        { q: "¿Cuál es la constante universal de los gases ideales (R)?", options: ["8.314 J/(mol·K)", "6.626 x 10^-34", "9.81 m/s^2", "3.00 x 10^8"], correct: 0, diff: 3 },
        { q: "¿Qué isótopo se utiliza para datar por radiocarbono?", options: ["Carbono-12", "Carbono-14", "Uranio-235", "Nitrógeno-15"], correct: 1, diff: 3 },
        { q: "¿Cómo se denomina la presión ejercida por un fluido en reposo?", options: ["Presión atmosférica", "Hidrostática", "Osmótica", "Dinámica"], correct: 1, diff: 3 },
        { q: "¿Qué órgano produce la insulina en el cuerpo humano?", options: ["Hígado", "Páncreas", "Riñón", "Vesícula"], correct: 1, diff: 3 },
        { q: "¿Cuál es el punto triple del agua en Kelvin?", options: ["273.15 K", "273.16 K", "275.15 K", "277.00 K"], correct: 1, diff: 3 },
        { q: "¿Qué ley de la termodinámica introduce el concepto de entropía?", options: ["Cero", "Primera", "Segunda", "Tercera"], correct: 2, diff: 3 },
        { q: "¿Qué nombre recibe la estructura ósea interna de los equinodermos?", options: ["Exoesqueleto", "Endoesqueleto dérmico", "Caparazón", "Quitina"], correct: 1, diff: 3 },
        { q: "¿Qué tipo de onda es la luz electromagnética?", options: ["Longitudinal", "Transversal", "Sonora", "Mecánica"], correct: 1, diff: 3 },
        { q: "¿Cuál es el compuesto orgánico más abundante en la Tierra?", options: ["ADN", "Celulosa", "Glucosa", "Colágeno"], correct: 1, diff: 3 }
    ],
    historia: [
        { q: "¿En qué año comenzó la Primera Guerra Mundial?", options: ["1914", "1939", "1905", "1918"], correct: 0, diff: 1 },
        { q: "¿Quién fue el primer emperador de Roma?", options: ["Julio César", "Augusto", "Nerón", "Constantino"], correct: 1, diff: 1 },
        { q: "¿Qué civilización construyó Machu Picchu?", options: ["Maya", "Azteca", "Inca", "Olmeca"], correct: 2, diff: 1 },
        { q: "¿En qué año cayó el Imperio Romano de Occidente?", options: ["476 d.C.", "1453 d.C.", "395 d.C.", "500 a.C."], correct: 0, diff: 2 },
        { q: "¿Qué tratado puso fin formalmente a la Primera Guerra Mundial?", options: ["Tratado de Versalles", "Paz de Westfalia", "Tratado de Tordesillas", "Congreso de Viena"], correct: 0, diff: 2 }
    ],
    cine: [
        { q: "¿Quién dirigió la película 'El Padrino'?", options: ["Martin Scorsese", "Francis Ford Coppola", "Steven Spielberg", "Quentin Tarantino"], correct: 1, diff: 1 },
        { q: "¿Qué película ganó el Óscar a Mejor Película en 1998 y batió récords?", options: ["Titanic", "Gladiador", "Forrest Gump", "Matrix"], correct: 0, diff: 1 },
        { q: "¿Cómo se llama el villano principal en Star Wars original?", options: ["Darth Maul", "Darth Vader", "Emperador Palpatine", "Kylo Ren"], correct: 1, diff: 1 },
        { q: "¿Qué actor protagoniza la trilogía de 'Matrix'?", options: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Will Smith"], correct: 0, diff: 1 },
        { q: "¿Cuál fue el primer largometraje animado de Disney?", options: ["Bambi", "Cenicienta", "Blanca Nieves y los siete enanos", "Pinocho"], correct: 2, diff: 2 }
    ],
    deportes: [
        { q: "¿Cada cuántos años se celebran los Juegos Olímpicos?", options: ["2 años", "3 años", "4 años", "5 años"], correct: 2, diff: 1 },
        { q: "¿En qué país se originó el fútbol moderno?", options: ["Brasil", "Inglaterra", "Italia", "Argentina"], correct: 1, diff: 1 },
        { q: "¿Cuántos jugadores forman un equipo de básquetbol en cancha?", options: ["5", "7", "6", "11"], correct: 0, diff: 1 },
        { q: "¿Qué país ganó la Copa Mundial de Fútbol de 2022?", options: ["Francia", "Brasil", "Argentina", "Alemania"], correct: 2, diff: 1 },
        { q: "¿Cuántos anillos componen el símbolo olímpico?", options: ["4", "5", "6", "7"], correct: 1, diff: 1 }
    ]
};

// Auto-completar categorías secundarias para mantener consistencia
['historia', 'cine', 'deportes'].forEach(cat => {
    while (questionBank[cat].length < 30) {
        questionBank[cat].push({
            q: `Pregunta de nivel avanzado ${questionBank[cat].length + 1} sobre ${cat}`,
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

function interactWithPet() {
    const phrases = ["¡Miau! A ganar 🐾", "¡Qué buena partida! ✨", "¡Dale con todo! 🚀"];
    const random = phrases[Math.floor(Math.random() * phrases.length)];
    const speechEl = document.getElementById('pet-speech');
    if(speechEl) speechEl.textContent = random;
}

// --- GENERACIÓN DE 100 NIVELES MASIVOS ---
function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if(!grid) return;
    grid.innerHTML = '';
    
    for (let i = 1; i <= 100; i++) {
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
        btn.onclick = () => startCategoryQuiz(key, cats[key]);
        grid.appendChild(btn);
    }
}

function startLevel(num) {
    currentLevelNum = num;
    let targetDiff = num <= 30 ? 1 : (num <= 70 ? 2 : 3);
    let pool = questionBank['ciencia'].filter(q => q.diff <= targetDiff);
    if(pool.length < 5) pool = questionBank['ciencia'];
    
    currentQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0; 
    score = 0;
    
    document.getElementById('quiz-title').textContent = `Nivel ${num}`;
    showScreen('quiz-screen'); 
    loadQuestion();
}

function startCategoryQuiz(catKey, catName) {
    let pool = questionBank[catKey] || questionBank['ciencia'];
    currentQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0; 
    score = 0;
    
    document.getElementById('quiz-title').textContent = catName;
    showScreen('quiz-screen'); 
    loadQuestion();
}

function startSpecialEvent() {
    let allQ = [...questionBank['ciencia'], ...questionBank['historia'], ...questionBank['cine'], ...questionBank['deportes']];
    currentQuestions = allQ.sort(() => 0.5 - Math.random()).slice(0, 5);
    currentIndex = 0; 
    score = 0;
    
    document.getElementById('quiz-title').textContent = "⭐ Evento Relámpago";
    showScreen('quiz-screen'); 
    loadQuestion();
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
    if (currentLevelNum === gameState.unlockedLevels && gameState.unlockedLevels < 100) {
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

// --- 3. RENDERIZAR TIENDA DE AVATARES Y MASCOTAS ---
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
            if (!owned) {
                if (gameState.coins >= av.price) {
                    gameState.coins -= av.price;
                    if(!gameState.ownedAvatars) gameState.ownedAvatars = [0];
                    gameState.ownedAvatars.push(av.id);
                    saveAndSyncState();
                    renderShop();
                    alert(`¡Has comprado el avatar ${av.name}!`);
                } else {
                    alert("No tienes suficientes monedas.");
                }
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
            } else {
                if (gameState.coins >= pet.price) {
                    gameState.coins -= pet.price;
                    if(!gameState.ownedPets) gameState.ownedPets = [0];
                    gameState.ownedPets.push(pet.id);
                    localStorage.setItem('active_pet_id', pet.id);
                    saveAndSyncState();
                    renderStaticPet('footer-container');
                    renderShop();
                    alert(`¡Has adoptado a ${pet.name}!`);
                } else {
                    alert("No tienes suficientes monedas.");
                }
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
            <div class="pet-bubble" id="pet-speech">¡Hola! ¿Listo para la trivia?</div>
        </div>
    `;

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

window.addEventListener('DOMContentLoaded', () => {
    renderStaticPet('footer-container');
});
