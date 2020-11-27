class Movimento {
  velocidade;

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

  up() {
    //gira a peca
  }
}

export { Movimento };
