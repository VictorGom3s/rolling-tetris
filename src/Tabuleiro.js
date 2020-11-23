import Peca from "./Peca.js";

const BLOCK_SIZE = 30;

class Tabuleiro {
  _colunas;
  _linhas;
  _peca;
  _proximaPeca;
  ctx;
  ctxProxima;

  constructor(colunas, linhas, canvas, canvasProxima) {
    this.ctx = canvas.getContext("2d");
    this.ctxProxima = canvasProxima.getContext("2d");
    this._colunas = new Array(colunas);
    this._peca = new Peca(this.ctx, this.ctxProxima);

    this._init(colunas, linhas);
  }

  _init(colunas, linhas) {
    this._colunas.fill(0, 0, colunas);
    this._linhas = Array.from({ length: linhas }, () => Array(colunas).fill(0));

    this.ctx.canvas.width = colunas * BLOCK_SIZE;
    this.ctx.canvas.height = linhas * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    this.ctxProxima.canvas.width = 5 * BLOCK_SIZE;
    this.ctxProxima.canvas.height = 5 * BLOCK_SIZE;
    this.ctxProxima.scale(BLOCK_SIZE, BLOCK_SIZE);

    this._proximaPeca = new Peca(this.ctx, this.ctxProxima);
    this.mostrarProxima(this._proximaPeca);
  }

  reset() {
    this._init(this._colunas.length, this._linhas.length);
  }

  rotaciona() {
    this.ctx.save();

    let rads = (180 * Math.PI * 2.0) / 360.0;
    this.ctx.rotate(rads);
    this.ctx.translate(-10, -30);
  }

  desrotaciona() {
    this.ctx.restore();
  }

  valid(peca) {
    return peca.forma.every((row, dy) => {
      return row.every((value, dx) => {
        let x = peca.x + dx;
        let y = peca.y + dy;
        return (
          this.isEmpty(value) || (this.insideWalls(x) && this.aboveFloor(y))
        );
      });
    });
  }

  isInsideWalls(x, y) {
    return x >= 0 && x < this._colunas.length && y <= this._linhas.length;
  }

  notOccupied(x, y) {
    return this._linhas[y] && this._linhas[y][x] === 0;
  }

  inserir(peca) {
    peca.forma.forEach((linha, y) => {
      linha.forEach((value, x) => {
        if (value > 0) {
          this._linhas[y + peca.y][x + peca.x] = value;
        }
      });
    });
  }

  desenharTabuleiro() {
    this.ctx.clearRect(0, 0, 300, 900);
    this._linhas.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = "orange";
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  obterPeca() {
    /* Mover para Partida */
    if (this._precisaRotacionar()) {
      // this.rotaciona();
    }

    // this._peca.draw();
    this.inserir(this._peca);
    this.desenharTabuleiro();
  }

  _precisaRotacionar() {
    return true;
  }

  mostrarProxima(peca) {
    peca.drawNext();
  }

  precisaEliminar() {
    const eliminar = {};

    this._linhas.forEach((row, index) => {
      eliminar[index] = row.every((val) => val != 0);
    });

    return eliminar;
  }

  eliminar(numeroLinha) {
    this._linhas.splice(numeroLinha, 1);
    this._linhas.unshift(Array(this._colunas.length).fill(0));

    this.desenharTabuleiro();
  }

  log() {
    console.table(this._linhas);
  }
}

const canvas = document.getElementById("board");
const preview = document.getElementById("next");

const board = new Tabuleiro(10, 30, canvas, preview);
board.obterPeca();
// board.eliminar(0);
// board.log();
