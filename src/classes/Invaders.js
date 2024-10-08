import { PATH_INVADER_IMAGE } from "../utils/constants.js";
import Projectile from "./Projectile.js";

class Invader {
  constructor(position, velocity) {
    this.width = 50 * 0.8;
    this.height = 37 * 0.8;
    this.velocity = 0;
    this.position = position;
    this.image = this.getImage(PATH_INVADER_IMAGE);
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

  moveDown() {
    // move uma linha p baixo, de acordo c/ a altura do invasor
    this.position.y += this.height;
  }

  incrementVelocity(boost) {
    this.velocity += boost;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  shoot(projectiles) {
    const p = new Projectile(
      {
        x: this.position.x + this.width / 2 - 1,
        y: this.position.y + this.height,
      },
      10
    );
    projectiles.push(p);
  }

  hit(projectile) {
    return (
      // posicao x do projetil tem q ser maior ou igual a posicao x do invasor
      // e posicao x do pojetil tem q ser menor ou igual a posicao x + a largura do invasor
      // em suma, posicao do projetil é igual a posicao do invasor
      projectile.position.x >= this.position.x &&
      projectile.position.x <= this.position.x + this.width &&
      projectile.position.y >= this.position.y &&
      projectile.position.y <= this.position.x + this.height
    );
  }
}

export default Invader;
