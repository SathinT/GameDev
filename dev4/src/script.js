const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tankWidth = 50;
const tankHeight = 30;
const tankSpeed = 5;
const bulletSpeed = 8;
const enemySpeed = 3;
const maxEnemies = 5;

const playerTank = {
    x: canvas.width / 2 - tankWidth / 2,
    y: canvas.height - tankHeight,
    width: tankWidth,
    height: tankHeight,
    speed: tankSpeed,
    score: 0,
};

let bullets = [];
let enemies = [];

function drawTank() {
    ctx.fillStyle = "green";
    ctx.fillRect(playerTank.x, playerTank.y, playerTank.width, playerTank.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillRect(bullets[i].x, bullets[i].y, 5, 10);
    }
}

function drawEnemies() {
    ctx.fillStyle = "blue";
    for (let i = 0; i < enemies.length; i++) {
        ctx.fillRect(enemies[i].x, enemies[i].y, tankWidth, tankHeight);
    }
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bulletSpeed;
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }
}

function updateEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].y += enemySpeed;

        // Collision detection with player bullets
        for (let j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x + 5 >= enemies[i].x &&
                bullets[j].x <= enemies[i].x + tankWidth &&
                bullets[j].y <= enemies[i].y + tankHeight
            ) {
                bullets.splice(j, 1);
                j--;

                // Remove the enemy and update the score
                enemies.splice(i, 1);
                playerTank.score += 10;
                i--;
            }
        }

        // Collision detection with player tank
        if (
            playerTank.x + playerTank.width >= enemies[i].x &&
            playerTank.x <= enemies[i].x + tankWidth &&
            playerTank.y <= enemies[i].y + tankHeight
        ) {
            // Game over logic (You can implement a game over screen)
            alert("Game Over! Your Score: " + playerTank.score);
            document.location.reload();
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTank();
    drawBullets();
    drawEnemies();
    updateBullets();
    updateEnemies();

    // Add new enemies
    if (enemies.length < maxEnemies) {
        const enemyX = Math.random() * (canvas.width - tankWidth);
        enemies.push({ x: enemyX, y: 0 });
    }

    // Display the player's score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + playerTank.score, 20, 30);

    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerTank.x > 0) {
        playerTank.x -= playerTank.speed;
    } else if (e.key === "ArrowRight" && playerTank.x < canvas.width - playerTank.width) {
        playerTank.x += playerTank.speed;
    } else if (e.key === " ") {
        bullets.push({ x: playerTank.x + playerTank.width / 2 - 2.5, y: playerTank.y });
    }
});

gameLoop();
