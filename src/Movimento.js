class Movimento {
  velocidade;

  constructor() {
    if (this.constructor == Movimento) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  esquerda() {
    console.log(this.x);
    this.undraw();
    this.x = this.x - 1;
    this.draw();
    console.log(this.x);
  }
  direita() {
    console.log(this.x);

    this.undraw();
    this.x = this.x + 1;
    this.draw();
    console.log(this.x);
  }

  baixo() {
    console.log(this.y);

    this.undraw();
    this.y = this.y + 1;
    this.draw();
    console.log(this.y);
  }

  up() {
    //gira a peca
  }
}

export { Movimento };
