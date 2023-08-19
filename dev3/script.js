const playArea = document.querySelector(".play-area");

let gemX,gemY;
let playerX=5,playerY = 10;

const changeGemPosition = () => {
   gemX = Math.floor(Math.random() * 30)+1;
   gemY = Math.floor(Math.random() * 30)+1;
}

const initGame = () => {
  let htmlMarkup = `<div class = "gem" style="grid-area: ${gemY}/${gemX}"></div>`;
   htmlMarkup += `<div class = "player" style="grid-area: ${playerY}/${playerX}"></div>`;
   playArea.innerHTML = htmlMarkup;
}
changeGemPosition();
initGame();