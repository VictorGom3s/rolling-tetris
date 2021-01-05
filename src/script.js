import Modal from "./../assets/js/Modal.js";
import Partida from "./Partida.js";
import Tabuleiro from "./Tabuleiro.js";
import Placar from "./Placar.js";

const btnPlay = document.querySelector("#btnPlay");
const canvas = document.getElementById("board");
const preview = document.getElementById("next");

const placar = new Placar();

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
