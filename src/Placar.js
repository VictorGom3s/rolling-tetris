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
    this.player = {
      id: localStorage.getItem("id_usuario"),
      nome: localStorage.getItem("nome"),
    };
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
    const formData = new FormData();
    formData.append("id", this.player.id);
    formData.append("score", this.pontos);
    formData.append("level", this.level);
    formData.append("time", tempo);

    fetch("../controller/insertScoreboard.php", {
      method: "POST",
      body: formData,
    }).then((response) => {
      console.log(response);
      if (response.status != 200) {
        alert("Error saving your score. Sorry :P");
      }
    });
  }
}
