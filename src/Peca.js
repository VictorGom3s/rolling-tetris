class Peca {
    ctx;
    forma;
    cor;
    especial;
    x;
    y;

    constructor(ctx) {
        this.ctx = this._canvas.getContext("2d");
        this.forma = gerarAleatoria();
        this.cor = gerarCor();
        this.x = 0; // TODO: must set the position correctly
        this.y = 0; // TODO: must set the position correctly
    }

    gerarAleatoria() {
        shapes = [
            [
                [0, 0, 0], // Special piece
                [0, 2, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0], // O
                [0, 2, 2],
                [0, 2, 2]
            ],
            [
                [2, 2, 0], // Z
                [0, 2, 0],
                [0, 2, 2]
            ],
            [
                [0, 2, 2], // S
                [0, 2, 0],
                [2, 2, 0]
            ],
            [
                [0, 2, 2], // J
                [0, 2, 0],
                [0, 2, 0]
            ],
            [
                [2, 2, 0], // L
                [0, 2, 0],
                [0, 2, 0]
            ],
            [
                [0, 0, 0], // T
                [2, 2, 2],
                [0, 2, 0]
            ],
            [
                [0, 0, 2, 0], // I
                [0, 0, 2, 0],
                [0, 0, 2, 0],
                [0, 0, 2, 0]
            ]
        ];

        forma = Math.round(Math.random(9));
        if (forma == 0) {
            this.especial = true;
            return shapes[forma];
        }
        else {
            this.especial = false;
            return shapes[forma];
        }
    }

    gerarCor() {
        colors = ["red", "green", "blue", "yellow", "orange", "cyan", "magenta", "brown"];

        switch (this.forma) {
            case 0:
                return colors[0];
                break;
            case 1:
                return colors[1];
                break;
            case 2:
                return colors[2];
                break;
            case 3:
                return colors[3];
                break;
            case 4:
                return colors[4];
                break;
            case 5:
                return colors[5];
                break;
            case 6:
                return colors[6];
                break;
            case 7:
                return colors[7];
                break;
            default:
                break;
        }
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }
}