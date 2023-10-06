document.addEventListener("DOMContentLoaded", init);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;
const tankWidth = 200; // Increase tank width
const tankHeight = 200; // Increase tank height
const bulletWidth = 5;
const bulletHeight = 10;

const tank = {
    x: canvasWidth / 2 - tankWidth / 2,
    y: canvasHeight - tankHeight,
    speed: 5,
    image: new Image()
};

const bullets = [];

function init() {
    canvas.addEventListener("mousemove", moveTank);
    canvas.addEventListener("click", shoot);

    tank.image.src = "assests/Tank 1.png";

    tank.image.onload = function () {
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
}

function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawTank();
    drawBullets();
    moveBullets();

    requestAnimationFrame(update);
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

function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}
