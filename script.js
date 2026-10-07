// Niveles 100% fijos y predefinidos (no cambian ni se mezclan al azar)
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
    ],
    4: [
        { q: "¿Cada cuántos años se celebran los Juegos Olímpicos?", options: ["2 años", "3 años", "4 años", "5 años"], correct: 2 },
        { q: "¿En qué deporte destacó Michael Jordan?", options: ["Fútbol americano", "Béisbol", "Baloncesto", "Golf"], correct: 2 },
        { q: "¿Cuántos jugadores forman un equipo de fútbol en cancha?", options: ["10", "11", "12", "9"], correct: 1 },
        { q: "¿Qué país ganó la Copa Mundial de Fútbol de 2022?", options: ["Francia", "Brasil", "Argentina", "Alemania"], correct: 2 },
        { q: "¿En qué superficie se juega el torneo de tenis Roland Garros?", options: ["Césped", "Dura", "Arcilla / Polvo de ladrillo", "Alfombra"], correct: 2 }
    ],
    5: [
        { q: "¿Cuál es el río más largo del mundo?", options: ["Nilo", "Amazonas", "Misisipi", "Yangtsé"], correct: 1 },
        { q: "¿Cuál es la capital de Australia?", options: ["Sídney", "Melbourne", "Canberra", "Perth"], correct: 2 },
        { q: "¿En qué continente se encuentra el desierto del Sahara?", options: ["Asia", "África", "América", "Oceanía"], correct: 1 },
        { q: "¿Cuál es el país más grande del mundo por superficie?", options: ["Canadá", "China", "Estados Unidos", "Rusia"], correct: 3 },
        { q: "¿Qué país tiene forma de bota?", options: ["Grecia", "España", "Italia", "Chile"], correct: 2 }
    ],
    // Niveles 6 al 10 con combinaciones base
    6: [
        { q: "Símbolo químico del Oro", options: ["Ag", "Au", "Cu", "Fe"], correct: 1 },
        { q: "¿Quién pintó la Mona Lisa?", options: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Dalí"], correct: 2 },
        { q: "¿Cuál es el océano más grande del mundo?", options: ["Atlántico", "Índico", "Ártico", "Pacífico"], correct: 3 },
        { q: "¿En qué país se encuentra la torre Eiffel?", options: ["Italia", "Francia", "Inglaterra", "Alemania"], correct: 1 },
        { q: "¿Cuántos huesos tiene el cuerpo humano adulto?", options: ["206", "180", "215", "195"], correct: 0 }
    ],
    7: [
        { q: "¿Cuál es la moneda oficial de Japón?", options: ["Yuan", "Dólar", "Yen", "Won"], correct: 2 },
        { q: "¿Qué instrumento mide los terremotos?", options: ["Barómetro", "Termómetro", "Sismógrafo", "Anemómetro"], correct: 2 },
        { q: "¿En qué año llegó el hombre a la Luna?", options: ["1965", "1969", "1972", "1959"], correct: 1 },
        { q: "¿Cuál es el mamífero terrestre más rápido?", options: ["León", "Guepardo", "Caballo", "Cebra"], correct: 1 },
        { q: "¿Qué elemento químico es el diamante?", options: ["Carbono", "Silicio", "Oro", "Platino"], correct: 0 }
    ],
    8: [
        { q: "¿Quién escribió 'Don Quijote de la Mancha'?", options: ["Lope de Vega", "Cervantes", "Quevedo", "Góngora"], correct: 1 },
        { q: "¿Cuál es el país con más población del mundo?", options: ["India", "Estados Unidos", "China", "Rusia"], correct: 0 },
        { q: "¿Cuál es la capital de Canadá?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
        { q: "¿Qué gas es esencial para la fotosíntesis?", options: ["Oxígeno", "Nitrógeno", "Dióxido de Carbono", "Hidrógeno"], correct: 2 },
        { q: "¿En qué continente está Egipto?", options: ["Asia", "África", "Europa", "Oceanía"], correct: 1 }
    ],
    9: [
        { q: "¿Quién descubrió la penicilina?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Albert Einstein"], correct: 0 },
        { q: "¿Cuál es la montaña más alta del mundo?", options: ["K2", "Everest", "Aconcagua", "Makalu"], correct: 1 },
        { q: "¿Qué metal es líquido a temperatura ambiente?", options: ["Hierro", "Mercurio", "Plata", "Plomo"], correct: 1 },
        { q: "¿En qué año se fundó Google?", options: ["1995", "1998", "2001", "2004"], correct: 1 },
        { q: "¿Cuántos lados tiene un hexágono?", options: ["5", "6", "7", "8"], correct: 1 }
    ],
    10: [
        { q: "¿Cuál es el animal más grande del planeta?", options: ["Elefante africano", "Tiburón ballena", "Ballena azul", "Jirafa"], correct: 2 },
        { q: "¿Qué velocidad tiene la luz aproximadamente?", options: ["300,000 km/s", "150,000 km/s", "1,000 km/s", "3,000,000 km/s"], correct: 0 },
        { q: "¿En qué siglo ocurrió la Revolución Francesa?", options: ["Siglo XVI", "Siglo XVII", "Siglo XVIII", "Siglo XIX"], correct: 2 },
        { q: "¿Cuál es el país más pequeño del mundo?", options: ["Mónaco", "Vaticano", "San Marino", "Liechtenstein"], correct: 1 },
        { q: "¿Quién desarrolló la teoría de la evolución por selección natural?", options: ["Gregor Mendel", "Charles Darwin", "Jean-Baptiste Lamarck", "Louis Pasteur"], correct: 1 }
    ]
};

let coins = 100;
let currentLevel = 1;
let unlockedLevels = 1;
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let gameMode = ''; 
let canWatchAd = true;
let adTimerInterval = null;

const coinCountSpan = document.getElementById('coin-count');
const screens = document.querySelectorAll('.screen');

window.onload = function() {
    updateCoins(0);
    renderLevels();
    renderCategories();
};

function showScreen(screenId) {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updateCoins(amount) {
    coins += amount;
    coinCountSpan.textContent = coins;
}

function renderLevels() {
    const grid = document.getElementById('levels-grid');
    grid.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = `level-btn ${i > unlockedLevels ? 'locked' : ''}`;
        btn.textContent = `Nivel ${i}`;
        if (i <= unlockedLevels) {
            btn.onclick = () => startLevel(i);
        }
        grid.appendChild(btn);
    }
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    grid.innerHTML = '';
    const categoriesNames = {
        ciencia: "🔬 Ciencia y Tecnología",
        historia: "📜 Historia",
        cine: "🎬 Cine y Series",
        deportes: "⚽ Deportes",
        geografia: "🌍 Geografía"
    };

    for (let key in categoriesNames) {
        const btn = document.createElement('button');
        btn.className = 'btn secondary-btn';
        btn.textContent = categoriesNames[key];
        btn.onclick = () => startCategoryQuiz(key, categoriesNames[key]);
        grid.appendChild(btn);
    }
}

// Iniciar Nivel Fijo
function startLevel(levelNum) {
    gameMode = 'level';
    currentLevel = levelNum;
    currentQuestions = fixedLevels[levelNum];
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-title').textContent = `Nivel ${levelNum}`;
    showScreen('quiz-screen');
    loadQuestion();
}

function startCategoryQuiz(catKey, catName) {
    gameMode = 'category';
    // Para modo libre usamos una selección rápida
    currentQuestions = [
        { q: "¿Pregunta de práctica 1 de " + catName + "?", options: ["Opción A", "Opción B", "Opción C", "Opción D"], correct: 0 },
        { q: "¿Pregunta de práctica 2 de " + catName + "?", options: ["Opción A", "Opción B", "Opción C", "Opción D"], correct: 1 }
    ];
    currentIndex = 0;
    score = 0;
    document.getElementById('quiz-title').textContent = catName;
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

// Comodín 50:50
function useFiftyFifty() {
    if (coins < 15) {
        alert("❌ No tienes suficientes monedas (Necesitas 15 🪙).");
        return;
    }

    const qData = currentQuestions[currentIndex];
    const allButtons = document.querySelectorAll('.answer-btn');
    
    let incorrectButtons = [];
    allButtons.forEach((b, idx) => {
        if (idx !== qData.correct && b.style.display !== 'none') {
            incorrectButtons.push(b);
        }
    });

    if (incorrectButtons.length === 0) {
        alert("⚠️ Ya no hay más opciones para ocultar.");
        return;
    }

    updateCoins(-15);
    incorrectButtons.sort(() => Math.random() - 0.5);
    let hiddenCount = 0;
    incorrectButtons.forEach(btn => {
        if (hiddenCount < 2) {
            btn.style.display = 'none';
            hiddenCount++;
        }
    });
}

// Comodín Saltar
function useSkipQuestion() {
    if (coins < 20) {
        alert("❌ No tienes suficientes monedas (Necesitas 20 🪙).");
        return;
    }

    updateCoins(-20);
    alert("⏭️ ¡Pregunta saltada con éxito!");
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
    
    let earnedCoins = score * 5;
    document.getElementById('earned-coins').textContent = `🪙 +${earnedCoins}`;
    updateCoins(earnedCoins);

    if (gameMode === 'level' && score >= 3) {
        if (currentLevel === unlockedLevels && unlockedLevels < 10) {
            unlockedLevels++;
            renderLevels();
        }
        document.getElementById('result-title').textContent = "¡Nivel Superado! 🎉";
        document.getElementById('result-message').textContent = `Has avanzado con éxito.`;
    } else if (gameMode === 'level') {
        document.getElementById('result-title').textContent = "¡Inténtalo de nuevo! 💡";
        document.getElementById('result-message').textContent = `Necesitas al menos 3 aciertos para pasar el nivel.`;
    } else {
        document.getElementById('result-title').textContent = "¡Práctica Finalizada! 🎯";
        document.getElementById('result-message').textContent = `Buen trabajo entrenando.`;
    }
}

// Comprar accesorios en la tienda de avatar
function buyItem(itemName, cost, icon) {
    if (coins < cost) {
        alert(`❌ No tienes suficientes monedas para ${itemName} (Necesitas ${cost} 🪙).`);
        return;
    }

    updateCoins(-cost);
    document.getElementById('avatar-icon').textContent = icon;
    document.getElementById('player-title').textContent = itemName.split(" ")[1];
    alert(`🎉 ¡Has comprado y equipado: ${itemName}!`);
}

// Sistema de Anuncios con Cooldown
function watchAd() {
    if (!canWatchAd) return;

    alert("🎬 Simulando anuncio de Google AdSense... ¡Has ganado +10 monedas!");
    updateCoins(10);
    
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
