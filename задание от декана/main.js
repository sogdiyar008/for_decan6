gameScreen = document.querySelector('.game-screen')
gameScreen.innerHTML = 
    `
    <h1>Добро Пожаловать в Игру</h1>
    <form id="login-form">
        <label for="username">Введите ваше имя:</label><br>
        <input type="text" id="username" name="username"><br><br>
        <input type="button" value="Начать игру" onclick="startGame()">
    </form>

    `

gamePole=document.querySelector('.game-pole')
gamePole.style.display = 'none'

//для реального времени
function updateTime() {
    data = new Date();
    h = data.getHours();
    m = data.getMinutes();
    s = data.getSeconds();

    if (m<10){
        m = '0'+m
    }
    if (s<10){
        s = '0'+s
    }
    
    let currentTime = `${h}:${m}:${s}`;
    document.getElementById('currentTime').innerText = `Настоящее время: ${currentTime}`;
}

//для счпета времени в игре
let timerSec = -1
let timerMin = 0
function timer(){
    timerSec += 1
    if (timerSec == 60){
        timerMin+=1
        timerSec=0
    }

    let timer = `${timerMin}:${timerSec}`
    document.getElementById('timer').innerText = `Время в живых: ${timer}`;
}

//начала игры после нажатия на кнопку
let username = ''

function startGame() {
    let username = document.getElementById('username').value;
    if (username === ''){
        alert('Простите, вы забыли ввести свое имя');
    } else {
        gameScreen.classList.add('in-game')
        boardGame()
        gamePole.style.display = 'block'
    }
}

let health = 5

function boardGame(){
    let username = document.getElementById('username').value;
    gameScreen.innerHTML = `
    <div class=board-game>
        <h1>Ваше имя: ${username}</h1>
        <h2>
            <p id="currentTime"></p>
            <p id="timer"></p>
            <p>Осталось жизней 5</p>
        </h2>
    </div>
    `;
    updateTime()
    timer()

    setInterval(updateTime, 1000); // Обновление времени каждую секунду
    setInterval(timer, 1000); // обновление Таймера каждую секунду
}

///////GAAMEEE\\\\\\
const player = document.querySelector('.player');

let playerX = 0;
let playerY = 0;

document.addEventListener('keydown', function(event) {

    console.log(event.key)
    if(event.key === 'w') {
        playerY -= 10;
    } else if(event.key === 's') {
        playerY += 10;
    } else if(event.key === 'a') {
        playerX -= 10;
    } else if(event.key === 'd') {
        playerX += 10;
    }
    
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
});

const gameField = document.querySelector('.game-field');

function createMonster() { 
    const monster = document.createElement('div'); 
    monster.classList.add('monster'); 
    monster.style.top = Math.random() * 100 + 'px'; 
    monster.style.left = Math.random() * 100 + 'px'; 
    gameField.appendChild(monster);

    let interval = setInterval(() => { const direction = Math.floor(Math.random() * 4); 
        const top = parseFloat(monster.style.top); 
        const left = parseFloat(monster.style.left); 
        switch(direction) { 
        case 0: 
            monster.style.top = Math.max(0, top - 5) + '%'; 
            break; 
        case 1:
            monster.style.left = Math.min(95, left + 5) + '%'; 
            break; 
        case 2:
            monster.style.top = Math.min(95, top + 5) + '%'; 
            break;
        case 3:
            monster.style.left = Math.max(0, left - 5) + '%'; 
            break; }

 
// Remove monster if it goes out of bounds
if (top <= 0 || left >= 1100 || top >= 1000 || left <= 0) {
  clearInterval(interval);
  gameField.removeChild(monster);
}
}, 300); }

function createTrap() { const trap = document.createElement('div'); 
trap.classList.add('trap'); 
trap.style.top = Math.random() * 100 + 'px'; 
trap.style.left = Math.random() * 100 + 'px'; 
gameField.appendChild(trap); }

setInterval(() => { 
    for (let i = 0; i < 10; i++) { 
        createMonster(); }
    for (let i = 0; i < 2; i++) { 
        createTrap(); } }, 3000);