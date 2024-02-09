const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let birdX = 50;
let birdY = canvas.height / 2;
let gravity = 0.06;
let jump = -3;
let velocity = 0;
let pipes = [];
let pipeWidth = 80;
let pipeGap = 300;
let pipeVelocity = -0.77;
let score = 0;
let gameStarted = false; // Variable to track game state
let pipeCount = 0;
let drawCheetos = false; // Flag to toggle cheetos drawing
let image = document.querySelector('cheeto.png'); 

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(birdX, birdY, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function drawPipe(x, height) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, 0, pipeWidth, height);
    ctx.fillRect(x, height + pipeGap, pipeWidth, canvas.height - height - pipeGap);
}

function drawCheeto(x, height) {
    const cheetoImg = new Image();
    cheetoImg.src = 'cheeto.png';
    cheetoImg.onload = function () {
        ctx.drawImage(cheetoImg, x, height, pipeWidth, pipeGap);
    };
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('            Score: ' + score, 10, 30);
}

function drawStartScreen() {
    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2);
}

function checkCollision() {
    if (birdY > canvas.height || birdY < 0) {
        gameOver();
    }
    for (let pipe of pipes) {
        if (birdX + 15 > pipe.x && birdX - 15 < pipe.x + pipeWidth &&
            (birdY - 15 < pipe.height || birdY + 15 > pipe.height + pipeGap)) {
            gameOver();
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameStarted) {
        velocity += gravity;
        birdY += velocity;

        if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
            let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
            pipes.push({ x: canvas.width, height: pipeHeight });
            pipeCount++; // Increment pipe count
        }

        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x += pipeVelocity;
            drawPipe(pipes[i].x, pipes[i].height);
            if (pipes[i].x + pipeWidth < 0) {
                pipes.splice(i, 1);
                score++;
            }
        }
        drawBird();
        drawScore();
        checkCollision();
    } else {
        drawStartScreen();
    }

    requestAnimationFrame(update);
}

function gameOver() {
    alert('Game Over! Your score: ' + score);
    resetGame();
}

function resetGame() {
    birdY = canvas.height / 2;
    velocity = 0;
    pipes = [];
    score = 0;
    pipeCount = 0; // Reset pipe count
    gameStarted = false; // Reset game state to start screen
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true; // Start the game when Space is pressed
        } else {
            velocity = jump; // Otherwise, jump if the game is already running
        }
    }

    if (event.code === 'KeyC') {
        // Open cheeto image in a new tab when 'C' key is pressed
        window.open('cheeto.png', '_blank');
        document.documentElement.requestFullscreen();
        image.requestFullscreen();
    }
});

canvas.addEventListener('touchstart', function (event) {
    if (!gameStarted) {
        gameStarted = true;
    }
    velocity = jump;
});

canvas.addEventListener('touchend', function (event) {
    velocity = jump;
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true; // Start the game when Space is pressed
        } else {
            velocity = jump; // Otherwise, jump if the game is already running
        }
    }

    if (event.code === 'KeyC') {
        // Open cheeto image in a new tab when 'C' key is pressed
        document.documentElement.requestFullscreen();
        window.open('cheeto.png', '_blank');
    }
});

document.getElementById('cheetosConstantlyButton').addEventListener('click', function () {
    // Open cheeto image in a new tab when cheetos button is clicked
    document.documentElement.requestFullscreen();
    window.open('cheeto.png', '_blank');
});

document.getElementById('cheetosConstantlyButton').addEventListener('click', function () {
    // Open cheeto image in a new tab when cheetos button is clicked
    window.open('cheeto.png', '_blank');
    document.documentElement.requestFullscreen();
    image.requestFullscreen();
});

update();
