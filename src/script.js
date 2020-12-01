class Placar {
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

    if (!placares) return;

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

class Movimento {
  constructor() {
    if (this.constructor == Movimento) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  esquerda() {
    this.undraw();
    this.x = this.x - 1;
    this.draw();
  }
  direita() {
    this.undraw();
    this.x = this.x + 1;
    this.draw();
  }

  baixo() {
    this.undraw();
    this.y = this.y + 1;
    this.draw();
  }

  girar() {
    this.undraw();
    for (let y = 0; y < this.forma.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [this.forma[x][y], this.forma[y][x]] = [
          this.forma[y][x],
          this.forma[x][y],
        ];
      }
    }
    this.forma.forEach((row) => row.reverse());
    this.draw();
  }
}

class Modal {
  modal;
  altura = 20;
  largura = 10;
  inputCustomAltura;
  inputCustomLargura;
  btnDefault;
  btnBig;
  btnConfirm;
  btnClose;

  constructor(modalId) {
    if (!modalId) {
      throw new Error(
        "An ID needs to be provided in order to instantiate the modal"
      );
    }

    this.modal = document.querySelector(modalId);
    this.inputCustomAltura = this.modal.querySelector("#altura");
    this.inputCustomLargura = this.modal.querySelector("#largura");
    this.btnDefault = this.modal.querySelector("#btnDefault");
    this.btnBig = this.modal.querySelector("#btnBig");
    this.btnConfirm = this.modal.querySelector(".btn-primary");
    this.btnClose = this.modal.querySelector(".btn-close");

    this._addListeners();
  }

  _addListeners() {
    this.btnClose.addEventListener("click", this.close.bind(this));

    this.btnDefault.addEventListener("click", this._setSize.bind(this, 10, 20));

    this.btnBig.addEventListener("click", this._setSize.bind(this, 22, 44));

    this.btnConfirm.addEventListener(
      "click",
      this._setSize.bind(this, null, null)
    );
  }

  show() {
    this.modal.classList.remove("hide");
    this.modal.classList.add("show");
  }

  close(e) {
    if (e) e.preventDefault();

    this.modal.classList.add("hide");
  }

  _setSize(largura, altura) {
    this.largura = largura || parseInt(this.inputCustomLargura.value, 10);
    this.altura = altura || parseInt(this.inputCustomAltura.value, 10);

    this.close();
  }

  getSelectedSize() {
    return { altura: this.altura, largura: this.largura };
  }
}

const Cores = {
  special: "gold",
  pink: "#FE46A5",
  green: "#35EBBD",
  blue: "#247AFD",
  yellow: "#FFAB0F",
  salmon: "#F98272",
  purple: "#C353F8",
};

class Peca extends Movimento {
  ctx;
  forma;
  cor;
  especial;
  x;
  y;

  shapes = [
    [[1]],
    [
      [2, 2],
      [2, 2],
    ],
    [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0],
    ],
    [
      [0, 0, 0],
      [4, 0, 4],
      [4, 4, 4],
    ],
    [
      [5, 0, 0],
      [5, 0, 0],
      [5, 5, 0],
    ],
    [
      [0, 0, 0],
      [0, 6, 0],
      [6, 6, 6],
    ],
    [
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
      [0, 7, 0, 0],
    ],
  ];

  constructor(ctx, ctxNext) {
    super();

    this.ctx = ctx;
    this.ctxNext = ctxNext;
    this.forma = this.gerarAleatoria();
    this.cor = this.gerarCor();
    this.x = this.ctx.canvas.width / 30 / 2;
    this.x -= 1;
    this.y = 0;
  }

  gerarAleatoria() {
    this.forma = Math.round(Math.random() * 6);
    if (this.forma == 0) {
      this.especial = true;
      return this.shapes[this.forma];
    } else {
      this.especial = false;
      return this.shapes[this.forma];
    }
  }

  gerarCor() {
    let cor;
    let shapeNumber;

    this.forma.forEach((array) => {
      array.forEach((val) => {
        if (val != 0) {
          shapeNumber = val;
        }
      });
    });

    switch (shapeNumber) {
      case 1:
        return (cor = Object.values(Cores)[0]);

      case 2:
        return (cor = Object.values(Cores)[1]);

      case 3:
        return (cor = Object.values(Cores)[2]);

      case 4:
        return (cor = Object.values(Cores)[3]);

      case 5:
        return (cor = Object.values(Cores)[4]);

      case 6:
        return (cor = Object.values(Cores)[5]);

      case 7:
        return (cor = Object.values(Cores)[6]);

      default:
        cor = "grey";
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

  undraw() {
    this.forma.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.clearRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }

  drawNext() {
    this.ctxNext.clearRect(
      0,
      0,
      this.ctxNext.canvas.width,
      this.ctxNext.canvas.height
    );

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

    this.listen();
  }

  reset() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this._init(this._colunas.length + 1, this._linhas.length + 1);
  }
  rotaciona() {
    this.ctx.save();

    let rads = (180 * Math.PI * 2.0) / 360.0;
    this.ctx.rotate(rads);
    this.ctx.translate(
      -this.ctx.canvas.width / 30,
      -this.ctx.canvas.height / 30
    );
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
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this._linhas.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx.fillStyle = Object.values(Cores)[value - 1];
          this.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  precisaEliminar() {
    const eliminar = [];

    this._linhas.forEach((row, index) => {
      if (row.every((val) => val != 0)) {
        eliminar.push(index);
      }
    });

    return eliminar;
  }

  eliminar(numeroLinha) {
    if (this._precisaRotacionar(numeroLinha)) {
      this.rotaciona();
    }

    this._linhas.splice(numeroLinha, 1);
    this._linhas.unshift(Array(this._colunas.length).fill(0));

    this.desenharTabuleiro();
  }

  _precisaRotacionar(numeroLinha) {
    let rotacionar = false;

    if (this._linhas[numeroLinha].includes(1)) rotacionar = true;

    return rotacionar;
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
        case "ArrowUp":
          if (this.podeMover(this._peca, this._peca.x, this._peca.y + 1))
            this._peca.girar();
          break;
      }
    });
  }
}

class Partida {
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

const btnPlay = document.querySelector("#btnPlay");
const canvas = document.getElementById("board");
const preview = document.getElementById("next");

const placar = new Placar();
placar.atualizarHistorico();

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
