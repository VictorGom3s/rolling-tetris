export default class Placar {
  linesElement;
  lines;
  pontosElement;
  pontos;
  levelElement;
  level;
  velocidade;

  constructor(partida) {
    this.linesElement = document.getElementById("lines");
    this.levelElement = document.getElementById("level");
    this.pontosElement = document.getElementById("pontos");
    this.pontos = 0;
    this.lines = 0;
    this.level = 1;
    this.velocidade = 1;
    this.partida = partida;
  }

  atualizarPlacar(linhasEliminadas) {
    this._atualizarLevel();
    this._atualizarLinhas(linhasEliminadas);
    this._atualizarPontos(linhasEliminadas);
  }

  _atualizarVelocidade() {
    this.partida.breakGameLoop();

    this.velocidade++;

    this.partida.game();
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
}
