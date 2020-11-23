export default class Peca {
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
    this.x = 3; // TODO: must set the position correctly
    this.y = 0; // TODO: must set the position correctly
  }

  gerarAleatoria() {
    const shapes = [
      [
        [0, 0, 0], // Special piece
        [0, 1, 0], // Special piece
        [0, 0, 0], // Special piece
      ],
      [
        [0, 2, 2, 0],
        [0, 2, 2, 0],
      ],
      [
        [3, 3, 0], // Z
        [0, 3, 0],
        [0, 3, 3],
      ],
      [
        [0, 4, 4], // S
        [0, 4, 0],
        [4, 4, 0],
      ],
      [
        [0, 5, 5], // J
        [0, 5, 0],
        [0, 5, 0],
      ],
      [
        [6, 6, 0], // L
        [0, 6, 0],
        [0, 6, 0],
      ],
      [
        [0, 0, 0], // T
        [7, 7, 7],
        [0, 7, 0],
      ],
      [
        [0, 8, 0], // I
        [0, 8, 0],
        [0, 8, 0],
        [0, 8, 0],
      ],
    ];

    this.forma = Math.round(Math.random() * 7);
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
        shapeNumber = array[index];
      }
    });

    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "orange",
      "cyan",
      "magenta",
      "brown",
    ];

    switch (shapeNumber) {
      case 1:
        return (cor = colors[0]);

      case 2:
        return (cor = colors[1]);

      case 3:
        return (cor = colors[2]);

      case 4:
        return (cor = colors[3]);

      case 5:
        return (cor = colors[4]);

      case 6:
        return (cor = colors[5]);

      case 7:
        return (cor = colors[6]);

      case 8:
        return (cor = colors[7]);

      default:
        cor = "purple";
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
