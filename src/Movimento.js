class Movimento {

  constructor() {
    if (this.constructor == Movimento) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  esquerda() {
    this.undraw();
    this.x = this.x - 1;
    this.draw();
  }
  direita() {
    this.undraw();
    this.x = this.x + 1;
    this.draw();
  }

  baixo() {
    this.undraw();
    this.y = this.y + 1;
    this.draw();
  }

  girar() {
    this.undraw();
    for (let y = 0; y < this.forma.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [this.forma[x][y],this.forma[y][x]] = 
        [this.forma[y][x], this.forma[x][y]];
      }
    }
    this.forma.forEach(row => row.reverse());
    this.draw();
  }
}

export { Movimento };
