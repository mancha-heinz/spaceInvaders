import Player from "../classes/Player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// inicializa player
const player = new Player(canvas.width, canvas.height);

const keys = {
  left: false,
  right: false,
};

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (keys.left && player.position.x >= 0) {
    player.moveLeft();
  }
  if (keys.right && player.position.x <= canvas.width - player.width) {
    player.moveRight();
  }
  player.draw(ctx);
  window.requestAnimationFrame(gameLoop);
};

// mapeamento das teclas
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "a") {
    // player.position.x -= 20;
    keys.left = true;
  }
  if (key === "d") {
    // player.position.x += 20;
    keys.right = true;
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key === "a") {
    keys.left = false;
  }
  if (key === "d") {
    keys.right = false;
  }
});

// inicializa loop
gameLoop();
