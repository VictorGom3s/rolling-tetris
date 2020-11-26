export default class Modal {
  modal;
  altura = 30;
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

    this.addListeners();
  }

  addListeners() {
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

  log() {
    console.log(this);
  }
}
