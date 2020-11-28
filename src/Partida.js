import { Peca } from "./Peca.js";
import Tabuleiro from "./Tabuleiro.js";
import Modal from "./../assets/js/Modal.js";
export default class Partida {
  player;
  tabuleiro;
  peca;
  proximaPeca;
  iniciado = false;
  timer;
  lines;
  pontos;
  level;
  mins;
  secs;

  constructor(Tabuleiro) {
    this.pontos = 0;
    this.level = 0;
    this.player = { nome: "Usuário" };
    this.tabuleiro = Tabuleiro;
    this.peca = this._obterPeca();
    this.proximaPeca = this._obterPeca();
    this.timer = document.getElementById("timer");
    this.lines = document.getElementById("lines");
    this.level = document.getElementById("level");
    this.pontos = document.getElementById("pontos");
    this.mins = 0;
    this.secs = 0;
  }

  iniciarPartida() {
    this.tabuleiro.desenhar(this.peca);
    this.tabuleiro.desenharProxima(this.proximaPeca);
    this._iniciarTimer();
    this.tabuleiro.listen();

    this.iniciado = true;
  }

  _atualizarPontos() {}

  _atualizarLinhas() {}

  _iniciarTimer() {
    setInterval(() => {
      if (this.secs < 59) {
        this.secs++;
      } else if (this.secs >= 59) {
        this.secs = 0;
        this.mins++;
      }

      this.timer.innerText = `${this.mins < 10 ? "0" + this.mins : this.mins}:${
        this.secs < 10 ? "0" + this.secs : this.secs
      }`;
    }, 1000);
  }

  _calcularBonus() {}

  _obterPeca() {
    return new Peca(this.tabuleiro.ctx, this.tabuleiro.ctxProxima);
  }
}

const btnPlay = document.querySelector("#btnPlay");
const canvas = document.getElementById("board");
const preview = document.getElementById("next");

btnPlay.addEventListener("click", (e) => {
  e.preventDefault();

  document.documentElement.requestFullscreen();

  const medidas = modal.getSelectedSize();

  const tabuleiro = new Tabuleiro(
    medidas.largura || 10,
    medidas.altura || 20,
    canvas,
    preview
  );

  const partida = new Partida(tabuleiro);

  partida.iniciarPartida();
});

const modal = new Modal("#modal");
modal.show();
