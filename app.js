let score = 0;
let isJumping = false;
let isGameOver = true;
let scoreInterval = null;
let collisionCheckInterval = null;

const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again');

function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  dino.classList.add('jump');
  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 500);
}

function updateScore() {
  if (!isGameOver) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

function checkCollision() {
  if (isGameOver) return;

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  if (
    dinoRect.right > cactusRect.left + 25 &&
    dinoRect.left < cactusRect.right - 25 &&
    dinoRect.bottom > cactusRect.top + 20
  ) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  clearInterval(scoreInterval);
  clearInterval(collisionCheckInterval);

  cactus.style.animationPlayState = 'paused';
  finalScoreDisplay.textContent = `Final Score: ${score}`;
  gameOverModal.classList.remove('hidden');
}

function resetGame() {
  score = 0;
  isJumping = false;
  isGameOver = false;

  scoreDisplay.textContent = 'Score: 0';
  gameOverModal.classList.add('hidden');

  // Restart cactus animation
  cactus.style.animation = 'none';
  setTimeout(() => {
    cactus.style.animation = 'moveCactus 2s linear infinite';
  }, 20);

  startGame();
}

function startGame() {
  scoreInterval = setInterval(updateScore, 100);
  collisionCheckInterval = setInterval(checkCollision, 10);
}

document.addEventListener('keydown', (e) => {
  if ((e.code === 'Space' || e.key === ' ') && isGameOver) {
    resetGame();
  } else if ((e.code === 'Space' || e.key === ' ') && !isJumping) {
    jump();
  }
});

document.addEventListener('click', () => {
  if (isGameOver) resetGame();
  else jump();
});

playAgainBtn.addEventListener('click', resetGame);
