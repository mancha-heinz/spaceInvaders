import {
  INITIAL_FRAMES,
  PATH_ENGINE_IMAGE,
  PATH_ENGINE_SPRITES,
  PATH_SPACESHIP_IMAGE,
} from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Player {
  constructor(canvasWidth, canvasHeight) {
    this.width = 48 * 2;
    this.height = 48 * 2;
    this.velocity = 8;
    this.position = {
      x: canvasWidth / 2 - this.width / 2,
      y: canvasHeight - this.height - 30,
    };
    this.image = this.getImage(PATH_SPACESHIP_IMAGE);
    this.engineImage = this.getImage(PATH_ENGINE_IMAGE);
    this.engineSprites = this.getImage(PATH_ENGINE_SPRITES);
    this.sx = 0; // posição 'janela'
    this.framesCounter = INITIAL_FRAMES; // controla a troca de img
  }

  getImage(path) {
    const image = new Image();
    image.src = path;
    return image;
  }

  moveLeft() {
    this.position.x -= this.velocity;
  }

  moveRight() {
    this.position.x += this.velocity;
  }

  draw(ctx) {
    // desenho nave
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    // desenho foquetes
    ctx.drawImage(
      this.engineSprites,
      this.sx,
      0,
      48,
      48,
      this.position.x,
      this.position.y + 10,
      this.width,
      this.height
    );
    // desenho motor
    ctx.drawImage(
      this.engineImage,
      this.position.x,
      this.position.y + 8,
      this.width,
      this.height
    );
    this.update();
  }

  update() {
    if (this.framesCounter === 0) {
      this.sx = this.sx == 96 ? 0 : this.sx + 48;
      this.framesCounter = INITIAL_FRAMES; // reset
    }
    this.framesCounter--;
  }

  shoot(projectiles) {
    const p = new Projectile(
      {
        x: this.position.x + this.width / 2 - 1, // posicao do player centralizada
        y: this.position.y + 2,
      },
      -10
    );
    projectiles.push(p);
  }
}

export default Player;
