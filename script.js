let currentScore = 0;
let currentStreak = 0;
let timer;
let timeLeft;

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('open');
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById('sidebar').classList.remove('open');
    clearInterval(timer); // Stop timer if moving away from game
}

function startGame(difficulty) {
    showScreen('game-screen');
    if(difficulty === 'easy') timeLeft = 20;
    else if(difficulty === 'medium') timeLeft = 15;
    else timeLeft = 10;
    
    startTimer(timeLeft);
}

function startTimer(total) {
    let current = total;
    const bar = document.getElementById('timer-progress');
    
    timer = setInterval(() => {
        current -= 0.1;
        let width = (current / total) * 100;
        bar.style.width = width + "%";
        
        if(current <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            showScreen('difficulty-screen');
        }
    }, 100);
}

function checkAnswer() {
    const guess = document.getElementById('guess-input').value.toLowerCase();
    const main = document.getElementById('main-container');
    
    // Example Answer logic
    if(guess === "checks") {
        currentScore += 100;
        currentStreak++;
        document.getElementById('score-display').innerText = currentScore;
        document.getElementById('streak-display').innerText = currentStreak;
        flashBackground('correct');
    } else {
        currentStreak = 0;
        document.getElementById('streak-display').innerText = currentStreak;
        flashBackground('wrong');
    }
    document.getElementById('guess-input').value = "";
}

function flashBackground(type) {
    const color = type === 'correct' ? '#2ecc71' : '#e74c3c';
    const original = '#4a041a';
    document.body.style.backgroundColor = color;
    setTimeout(() => {
        document.body.style.backgroundColor = original;
    }, 300);
}
