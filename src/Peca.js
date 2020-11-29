import { Movimento } from "./Movimento.js";

const Cores = {
  special: "gold",
  pink: "#FE46A5",
  green: "#35EBBD",
  blue: "#247AFD",
  yellow: "#FFAB0F",
  salmon: "#F98272",
  purple: "#C353F8",
};

class Peca extends Movimento {
  ctx;
  forma;
  cor;
  especial;
  x;
  y;

  shapes = [
    [[1]],
    [
      [2, 2],
      [2, 2],
    ],
    [
      [0, 3],
      [0, 3],
      [3, 3],
    ],
    [
      [4, 0, 4],
      [4, 4, 4],
    ],
    [
      [5, 0],
      [5, 0],
      [5, 5],
    ],
    [
      [0, 6, 0],
      [6, 6, 6],
    ],
    [
      [0, 7, 0],
      [0, 7, 0],
      [0, 7, 0],
      [0, 7, 0],
    ],
  ];

  constructor(ctx, ctxNext) {
    super();

    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.forma = this.gerarAleatoria();
    this.cor = this.gerarCor();
    this.x = this.ctx.canvas.width / 30 / 2;
    this.x -= 1;
    this.y = 0;
  }

  gerarAleatoria() {
    this.forma = Math.round(Math.random() * 6);
    if (this.forma == 0) {
      this.especial = true;
      return this.shapes[this.forma];
    } else {
      this.especial = false;
      return this.shapes[this.forma];
    }
  }

  gerarCor() {
    let cor;
    let shapeNumber;

    this.forma.forEach((array) => {
      array.forEach((val) => {
        if (val != 0) {
          shapeNumber = val;
        }
      });
    });

    switch (shapeNumber) {
      case 1:
        return (cor = Object.values(Cores)[0]);

      case 2:
        return (cor = Object.values(Cores)[1]);

      case 3:
        return (cor = Object.values(Cores)[2]);

      case 4:
        return (cor = Object.values(Cores)[3]);

      case 5:
        return (cor = Object.values(Cores)[4]);

      case 6:
        return (cor = Object.values(Cores)[5]);

      case 7:
        return (cor = Object.values(Cores)[6]);

      default:
        cor = "grey";
    }

    return cor;
  }

  draw() {
    this.ctx.fillStyle = this.cor;
    this.forma.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  undraw() {
    this.forma.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.clearRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  drawNext() {
    this.ctxNext.clearRect(
      0,
      0,
      this.ctxNext.canvas.width,
      this.ctxNext.canvas.height
    );

    this.ctxNext.fillStyle = this.cor;
    this.forma.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctxNext.fillRect(x + 1, y + 1, 1, 1);
        }
      });
    });
  }
}

export { Peca, Cores };
