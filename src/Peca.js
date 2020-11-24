const Cores = {
  special: "gold",
  pink: "#FE46A5",
  green: "#35EBBD",
  blue: "#247AFD",
  yellow: "#FFAB0F",
  salmon: "#F98272",
  purple: "#C353F8",
};

class Peca {
  ctx;
  forma;
  cor;
  especial;
  x;
  y;

  constructor(ctx, ctxNext) {
    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.forma = this.gerarAleatoria();
    this.cor = this.gerarCor();
    this.x = 3;
    this.y = 0;
  }

  gerarAleatoria() {
    const shapes = [
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 2, 2, 0],
        [0, 2, 2, 0],
      ],
      [
        [0, 0, 3],
        [0, 0, 3],
        [0, 3, 3],
      ],
      [
        [0, 0, 0],
        [4, 0, 4],
        [4, 4, 4],
      ],
      [
        [0, 5, 0],
        [0, 5, 0],
        [0, 5, 5],
      ],
      [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
      ],
      [
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
        [0, 7, 0, 0],
      ],
    ];

    this.forma = Math.round(Math.random() * 6);
    if (this.forma == 0) {
      this.especial = true;
      return shapes[this.forma];
    } else {
      this.especial = false;
      return shapes[this.forma];
    }
  }

  gerarCor() {
    let cor;
    let shapeNumber;

    this.forma.forEach((array, index) => {
      if (array[index] != 0) {
        shapeNumber = array[index] || array[index - 1];
      }
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

  drawNext() {
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
