export default class Placar {
  player;
  linesElement;
  lines;
  pontosElement;
  pontos;
  levelElement;
  level;
  velocidade;

  constructor(partida) {
    this.player = { nome: "Usuário" };
    this.historico = [];
    this.linesElement = document.getElementById("lines");
    this.levelElement = document.getElementById("level");
    this.pontosElement = document.getElementById("pontos");
    this.pontos = 0;
    this.lines = 0;
    this.level = 1;
    this.velocidade = 1;
    this.partida = partida;
    this.tableHistorico = document.querySelector("table tbody");
  }

  zerarPlacar() {
    this.pontos = 0;
    this.lines = 0;
    this.level = 1;
    this.velocidade = 1;

    this.atualizarPlacar(0);
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

  registrarPlacar(tempo) {
    let historicoExistente = JSON.parse(localStorage.getItem("historico"));

    if (!historicoExistente) historicoExistente = [];

    let partida = {
      usuario: this.player.nome,
      pontos: this.pontos,
      level: this.level,
      tempo: tempo,
    };

    localStorage.setItem("partida", JSON.stringify(partida));
    historicoExistente.push(partida);

    localStorage.setItem("historico", JSON.stringify(historicoExistente));

    this.historico.push();
  }

  _obterPlacares() {
    return JSON.parse(localStorage.getItem("historico"));
  }

  atualizarHistorico() {
    const placares = this._obterPlacares();
    this.tableHistorico.innerHTML = "";

    placares.forEach((partida) => {
      this.tableHistorico.innerHTML += `
        <tr>
          <td>${partida.usuario || "Eu"}</td>
          <td>${partida.pontos || "0"}</td>
          <td>${partida.level || "0"}</td>
          <td>${partida.tempo || "00:00"}</td>
        </tr>
      `;
    });
  }
}
