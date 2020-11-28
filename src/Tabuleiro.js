import { Peca, Cores } from "./Peca.js";
import Modal from "./../assets/js/Modal.js";

const BLOCK_SIZE = 30;

export default class Tabuleiro {
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

    // this._peca = new Peca(this.ctx, this.ctxProxima);
    // this._proximaPeca = new Peca(this.ctx, this.ctxProxima);
    // this.mostrarProxima(this._proximaPeca);

    this.listen();
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

  inserir(peca) {
    peca.forma.forEach((linha, y) => {
      linha.forEach((value, x) => {
        if (value > 0) {
          this._linhas[y + peca.y][x + peca.x] = value;
        }
      });
    });
  }

  desenhar(peca) {
    this._peca = peca;
    this._peca.draw();
  }

  desenharProxima(peca) {
    this._proximaPeca = peca;
    this._proximaPeca.drawNext();
  }

  desenharTabuleiro() {
    this.ctx.clearRect(0, 0, 300, 900);
    this._linhas.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = Object.values(Cores)[value - 1];
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
    // this.inserir(this._peca);
    // this.desenharTabuleiro();
  }

  _precisaRotacionar() {
    return true;
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

  valid(peca) {
    return peca.forma.every((row, dy) => {
      return row.every((value, dx) => {
        let x = peca.x + dx;
        let y = peca.y + dy;
        return (
          value == 0 || (this.isInsideWalls(x, y) && this.notOccupied(x, y))
        );
      });
    });
  }

  podeMover(peca, x, y) {
    if (!x) x = peca.x;
    if (!y) y = peca.y;

    return this.valid({ ...peca, x, y });
  }

  isInsideWalls(x, y) {
    return x >= 0 && x < this._colunas.length && y < this._linhas.length;
  }

  notOccupied(x, y) {
    return this._linhas[y] && this._linhas[y][x] === 0;
  }

  listen() {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          if (this.podeMover(this._peca, this._peca.x - 1))
            this._peca.esquerda();
          break;
        case "ArrowRight":
          if (this.podeMover(this._peca, this._peca.x + 1))
            this._peca.direita();
          break;
        case "ArrowDown":
          if (this.podeMover(this._peca, this._peca.x, this._peca.y + 1))
            this._peca.baixo();
          break;
      }
    });
  }
}

// const canvas = document.getElementById("board");
// const preview = document.getElementById("next");

// const board = new Tabuleiro(10, 20, canvas, preview);
// board.obterPeca();

// const modal = new Modal("#modal");
// modal.show();
