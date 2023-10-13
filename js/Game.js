document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;
const tankWidth = 200;
const tankHeight = 200;
const bulletWidth = 5;
const bulletHeight = 10;
const enemyWidth = 50;
const enemyHeight = 50;
let isGameOver = false;
let score = 0;

const tank = {
    x: canvasWidth / 2 - tankWidth / 2,
    y: canvasHeight - tankHeight,
    speed: 5,
    image: new Image()
};

const bullets = [];
const enemies = [];

function init() {
    canvas.addEventListener("mousemove", moveTank);
    canvas.addEventListener("click", shoot);

    tank.image.src = "assests/Tank1.png";

    tank.image.onload = function () {
        setInterval(spawnEnemy, 2000);
        update();
    };
}

function moveTank(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    tank.x = mouseX - tankWidth / 2;
}

function shoot() {
    const bullet = {
        x: tank.x + tankWidth / 2 - bulletWidth / 2,
        y: tank.y,
        speed: 10
    };
    bullets.push(bullet);

    const bulletAudio = document.getElementById("shoot");
    bulletAudio.play();
}

function spawnEnemy() {
    const enemy = {
        x: Math.random() * (canvasWidth - enemyWidth),
        y: 0,
        speed: 3
    };
    enemies.push(enemy);
}

function update() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        drawTank();
        drawBullets();
        drawEnemies();
        moveBullets();
        moveEnemies();
        detectCollisions();

        requestAnimationFrame(update);
    } else {
        let opacity = 0;
        let animationInterval = setInterval(function () {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = "white";
            ctx.font = "48px Arial";
            ctx.fillText("Game Over", canvasWidth / 2 - 100, canvasHeight / 2 - 24);

            ctx.fillStyle = "red";
            ctx.font = "52px Arial";
            ctx.fillText("Camp Destroyed!", canvasWidth / 2 - 100, canvasHeight / 2 + 24);

            // Display the final score
            ctx.fillStyle = "white";
            ctx.font = "36px Arial";
            ctx.fillText("Score: " + score, canvasWidth / 2 - 70, canvasHeight / 2 + 80);

            if (opacity < 0.7) {
                opacity += 0.01;
            } else {
                clearInterval(animationInterval);
            }
        }, 30);
    }

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 20, 30);
}

function drawTank() {
    ctx.drawImage(tank.image, tank.x, tank.y, tankWidth, tankHeight);
}

function drawBullets() {
    ctx.fillStyle = "red";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
    });
}

function drawEnemies() {
    ctx.fillStyle = "blue";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    });
}

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        if (enemy.y > canvasHeight) {
            enemies.splice(index, 1);
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemyWidth &&
                bullet.x + bulletWidth > enemy.x &&
                bullet.y < enemy.y + enemyHeight &&
                bullet.y + bulletHeight > enemy.y
            ) {
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10;
            }
        });
    });

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (enemy.y + enemyHeight > canvasHeight) {
            isGameOver = true;
            break;
        }
    }
}
