import Invader from "./Invaders.js";

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.direction = "right"; // posicao inicial, direita -> esq
    this.moveDown = false;
    this.invadersVelocity = 1;
    this.invaders = this.init();
  }

  init() {
    const array = [];
    // desenha as linhas
    for (let row = 0; row < this.rows; row += 1) {
      // desenha as colunas
      for (let col = 0; col < this.cols; col += 1) {
        const invader = new Invader(
          {
            x: col * 50 + 20,
            y: row * 37 + 20,
          },
          this.invadersVelocity
        );
        array.push(invader);
      }
    }
    return array;
  }

  draw(ctx) {
    this.invaders.forEach((invader) => invader.draw(ctx));
  }

  update() {
    // quando invasor chegar no canto da tela, descer uma linha e inverter a direção
    if (this.reachedRightBoundary()) {
      this.direction = "left";
      this.moveDown = true;
    } else if (this.reachedLeftBoundary()) {
      this.direction = "right";
      this.moveDown = true;
    }
    // movimentacao invasores
    this.invaders.forEach((invader) => {
      // if (this.direction == "right") console.log('direita');
      if (this.moveDown) {
        invader.moveDown();
        invader.incrementVelocity(0.1);
        this.invadersVelocity = invader.velocity; // salva spd atualizada
      }
      if (this.direction === "right") invader.moveRight();
      if (this.direction === "left") invader.moveLeft();
    });
    this.moveDown = false;
  }

  // detecta se atingiu borda direita da tela
  reachedRightBoundary() {
    return this.invaders.some(
      (invader) => invader.position.x + invader.width >= window.innerWidth
    );
  }

  // detecta se atingiu borda esquerda da tela
  reachedLeftBoundary() {
    return this.invaders.some((invader) => invader.position.x <= 0);
  }

  // escolha aleatoriamente um invasor para atirar
  getRandomInvader() {
    const index = Math.floor(Math.random() * this.invaders.length);
    return this.invaders[index];
  }
}

export default Grid;
