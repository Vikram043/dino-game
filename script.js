// === DOM ELEMENTS ===
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const gameOverDisplay = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

// === GAME STATE VARIABLES ===
let isJumping = false;
let isGameOver = true;
let dinoPosition = 0;
let obstaclePosition = 600;
let score = 0;
let speed = 4;
let gameLoopInterval;

// === PHYSICS CONSTANTS ===
const gravity = 0.9;
let jumpVelocity = 0;

// === 1. JUMP MECHANISM ===
function jump() {
    if (isJumping || isGameOver) return;

    isJumping = true;
    jumpVelocity = 15;

    const jumpInterval = setInterval(() => {
        dinoPosition += jumpVelocity;
        jumpVelocity -= gravity;

        // Prevent going below ground
        if (dinoPosition <= 0) {
            dinoPosition = 0;
            clearInterval(jumpInterval);
            isJumping = false;
            jumpVelocity = 0;
        }

        dino.style.bottom = dinoPosition + "px";
    }, 20);
}

// === 2. START GAME LOOP ===
function startGame() {
    if (!isGameOver) return;

    // Reset state
    isGameOver = false;
    score = 0;
    speed = 4;
    obstaclePosition = 600;
    dinoPosition = 0;

    dino.style.bottom = dinoPosition + "px";
    obstacle.style.left = obstaclePosition + "px";
    dino.style.backgroundColor = "#555";
    gameOverDisplay.style.display = "none";
    obstacle.style.display = "block";
    scoreDisplay.textContent = "Score: 0";

    // Main loop
    gameLoopInterval = setInterval(() => {
        obstaclePosition -= speed;

        if (obstaclePosition < -20) {
            obstaclePosition = 600;
            score++;
            scoreDisplay.textContent = "Score: " + score;

            // Speed up every 5 points
            if (score % 5 === 0) speed += 0.5;
        }

        obstacle.style.left = obstaclePosition + "px";

        if (isCollision()) endGame();
    }, 15);
}

// === 3. COLLISION DETECTION ===
function isCollision() {
    const dinoLeft = 20;
    const dinoWidth = 25;
    const dinoHeight = 45;

    const obstacleLeft = obstaclePosition;
    const obstacleWidth = 20;
    const obstacleHeight = 35;

    const horizontalOverlap =
        dinoLeft + dinoWidth > obstacleLeft &&
        dinoLeft < obstacleLeft + obstacleWidth;

    const verticalOverlap = dinoPosition < obstacleHeight;

    return horizontalOverlap && verticalOverlap;
}

// === 4. END GAME ===
function endGame() {
    isGameOver = true;
    clearInterval(gameLoopInterval);
    obstacle.style.display = "none";
    dino.style.backgroundColor = "red";
    gameOverDisplay.style.display = "flex";
    gameOverDisplay.textContent = "💀 Game Over! Press SPACE to Restart";
}

// === 5. INPUT HANDLER ===
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        if (isGameOver) {
            startGame();
        } else {
            jump();
        }
    }
});

// === 6. INITIAL SETUP ===
obstacle.style.left = obstaclePosition + "px";
gameOverDisplay.style.display = "flex";
gameOverDisplay.textContent = "Press SPACE to Start Game";
