import { Peca } from "./Peca.js";
import Placar from "./Placar.js";

export default class Partida {
  tabuleiro;
  placar;
  peca;
  proximaPeca;
  iniciado = false;
  timerElement;
  mins;
  secs;

  constructor(Tabuleiro) {
    this.pontosElement = 0;
    this.levelElement = 0;
    this.tabuleiro = Tabuleiro;
    this.placar = new Placar(this);
    this.peca = this._obterPeca();
    this.proximaPeca = this._obterPeca();
    this.timerElement = document.getElementById("timer");
    this.mins = 0;
    this.secs = 0;
  }

  iniciarPartida() {
    this._prepararPecas();

    this._iniciarTimer();

    this.iniciado = true;

    this.game();
  }

  game() {
    this.gameIntervalID = setInterval(() => {
      if (this.tabuleiro.podeMover(this.peca, this.peca.x, this.peca.y + 1)) {
        this.peca.baixo();
      } else if (this.peca.y === 0) {
        this.gameOver();
      } else {
        this.tabuleiro.inserir(this.peca);
        this.tabuleiro.desenharTabuleiro();

        const linhas = this.tabuleiro.precisaEliminar();

        if (linhas.length > 0) {
          linhas.forEach((linha) => {
            this.tabuleiro.eliminar(linha);
          });

          this.placar.atualizarPlacar(linhas.length);
        }

        this.peca = this.proximaPeca;
        this.proximaPeca = this._obterPeca();
        this._prepararPecas();
      }
    }, Math.floor(2000 / this.placar.velocidade));
  }

  breakGameLoop() {
    clearInterval(this.gameIntervalID);
  }

  gameOver() {
    alert("Game Over");
    clearInterval(this.gameIntervalID);
    clearInterval(this.timerIntervalID);
    this.iniciado = false;

    const tempoFinal = `${this.mins < 10 ? "0" + this.mins : this.mins}:${
      this.secs < 10 ? "0" + this.secs : this.secs
    }`;

    this.placar.registrarPlacar(tempoFinal);
    this.placar.atualizarHistorico();
  }

  _prepararPecas() {
    this.tabuleiro.desenhar(this.peca);
    this.tabuleiro.desenharProxima(this.proximaPeca);
  }

  _iniciarTimer() {
    this.timerIntervalID = setInterval(() => {
      if (this.secs < 59) {
        this.secs++;
      } else if (this.secs >= 59) {
        this.secs = 0;
        this.mins++;
      }

      this.timerElement.innerText = `${
        this.mins < 10 ? "0" + this.mins : this.mins
      }:${this.secs < 10 ? "0" + this.secs : this.secs}`;
    }, 1000);
  }

  _obterPeca() {
    return new Peca(this.tabuleiro.ctx, this.tabuleiro.ctxProxima);
  }
}
