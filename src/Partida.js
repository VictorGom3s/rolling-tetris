import { Peca } from "./Peca.js";
import Tabuleiro from "./Tabuleiro.js";
import Modal from "./../assets/js/Modal.js";
export default class Partida {
  player;
  tabuleiro;
  peca;
  proximaPeca;
  iniciado = false;
  timerElement;
  linesElement;
  lines;
  pontosElement;
  pontos;
  levelElement;
  level;
  velocidade;
  mins;
  secs;

  constructor(Tabuleiro) {
    this.pontosElement = 0;
    this.levelElement = 0;
    this.player = { nome: "Usuário" };
    this.tabuleiro = Tabuleiro;
    this.peca = this._obterPeca();
    this.proximaPeca = this._obterPeca();
    this.timerElement = document.getElementById("timer");
    this.linesElement = document.getElementById("lines");
    this.levelElement = document.getElementById("level");
    this.pontosElement = document.getElementById("pontos");
    this.pontos = 0;
    this.lines = 0;
    this.level = 1;
    this.velocidade = 1;
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

          this.atualizarPlacar(linhas.length);
        }

        this.peca = this.proximaPeca;
        this.proximaPeca = this._obterPeca();
        this._prepararPecas();
      }
    }, Math.floor(2000 / this.velocidade));
  }

  breakGameLoop() {
    clearInterval(this.gameIntervalID);
  }

  gameOver() {
    alert("Game Over");
    clearInterval(this.gameIntervalID);
    clearInterval(this.timerIntervalID);
    this.iniciado = false;
    window.location.reload();
  }

  _prepararPecas() {
    this.tabuleiro.desenhar(this.peca);
    this.tabuleiro.desenharProxima(this.proximaPeca);
  }

  atualizarPlacar(linhasEliminadas) {
    this._atualizarLevel();
    this._atualizarLinhas(linhasEliminadas);
    this._atualizarPontos(linhasEliminadas);
  }

  _atualizarVelocidade() {
    this.breakGameLoop();

    this.velocidade++;

    this.game();
  }

  _atualizarPontos(linhas) {
    this.pontos += 10 * linhas;
    let bonus = 0;

    if (linhas > 1) {
      bonus = 10 * linhas;
    }

    if (this.pontos % 300 == 0) {
      this._atualizarVelocidade();
    }

    this.pontos += bonus;

    this.pontosElement.innerText = ` ${this.pontos}`;
  }

  _atualizarLinhas(linhasEliminadas) {
    this.lines += linhasEliminadas;

    this.linesElement.innerText = ` ${this.lines}`;
  }

  _atualizarLevel() {
    this.level++;

    this.levelElement.innerText = ` ${this.level}`;
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

const btnPlay = document.querySelector("#btnPlay");
const canvas = document.getElementById("board");
const preview = document.getElementById("next");

btnPlay.addEventListener("click", (e) => {
  e.preventDefault();
  btnPlay.setAttribute("disabled", "");

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
