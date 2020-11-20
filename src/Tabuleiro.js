const BLOCK_SIZE = 30;

class Tabuleiro {
  _colunas;
  _linhas;
  _canvas;
  _peca;
  _proximaPeca;
  ctx;
  ctxProximaPeca;

  constructor(colunas, linhas, canvas, canvasProximaPeca) {
    this._canvas = canvas;
    this.ctx = this._canvas.getContext("2d");
    this.ctxProximaPeca = canvasProximaPeca.getContext("2d");
    this._colunas = new Array(colunas);
    this._peca = new MockPiece(this.ctx);

    this._init(colunas, linhas);
  }

  _init(colunas, linhas) {
    /* 
      Inicia o tabuleiro.

      Define o contexto 2d do canvas,
      popula os arrays de linhas
      e colunas e define tamanho e escala do canvas
    */

    this._colunas.fill(0, 0, colunas);
    this._linhas = Array.from({ length: linhas }, () => Array(colunas).fill(0));

    this.ctx.canvas.width = colunas * BLOCK_SIZE;
    this.ctx.canvas.height = linhas * BLOCK_SIZE;

    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.mostrarProximaPeca();
  }

  reset() {
    this._init(this._colunas.length, this._linhas.length);
  }

  rotaciona() {
    this.ctx.save();

    let rads = (180 * Math.PI * 2.0) / 360.0;
    this.ctx.rotate(rads);
    // this.ctx.translate(degrees * -0.55, degrees * -0.0167);
    this.ctx.translate(-10, -30);
  }

  desrotaciona() {
    this.ctx.restore();
  }

  eliminar(linha) {}

  _inserirPeca(peca) {
    peca.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this._linhas[y + peca.y][x + peca.x] = value;
        }
      });
    });
  }

  obterPeca() {
    if (this._precisaRotacionar()) {
      this.rotaciona();
    }

    this._proximaPeca = this._peca.gerarAleatoria();

    this._proximaPeca.draw();
    this._inserirPeca(this._proximaPeca);
  }

  _precisaRotacionar() {
    return true;
  }

  mostrarProximaPeca() {
    this.ctxProximaPeca.fillText("Preview da próxima peça", 85, 85);
  }

  log() {
    console.table(this._linhas);
  }
}

class MockPiece {
  /*
   Just a mock class to test the board.
   Will be deleted
  */
  constructor(ctx) {
    this.ctx = ctx;
    this.color = "orange";
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

    // Starting position.
    this.x = 7;
    this.y = 0;
  }

  gerarAleatoria() {
    return this;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
}

class MockMovement {
  /*
   Just a mock class to test the board.
   Will be deleted
  */
  _KEY = {
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40,
  };

  _moves = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  };

  constructor() {
    throw new Error("This is an abstract class. It shouldn't be instantiated");
  }
}

const canvas = document.getElementById("board");
const preview = document.getElementById("next");

const board = new Tabuleiro(10, 30, canvas, preview);
board.obterPeca();
board.log();

console.log(board);
