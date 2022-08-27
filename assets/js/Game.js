
class Game {
    constructor() {
        this.buttonGame = document.querySelectorAll('.button--game');
        this.buttonReset = document.querySelector('.bar__button');
        this.playerTurn = document.querySelector('.bar__turn--select');
        this.scoreElement = {
            player1: document.querySelector('.score__point.player1'),
            player2: document.querySelector('.score__point.player2'),
            ties: document.querySelector('.score__point.ties')
        };
        this.score = {
            player1: 0,
            player2: 0,
            ties: 0
        }
        this.turns = ["x", "o"];
        this.turn = "x";
        this.gameOver = false;

        this.modal = document.querySelector('.modal');
        this.modalTitle = this.modal.querySelector('.modal__title');
        this.modalFigure = this.modal.querySelector('.modal__figure');
        this.modalButtonNext = this.modal.querySelector('.modal__button-next');
        this.modalButtonQuit = this.modal.querySelector('.modal__button-quit');
        this.modalSheet = document.querySelector('.modal__sheet');
    }

    init() {
        this.start();

    }

    start() {
        if (!this.gameOver) {
            this.playerTurn.textContent = this.turn;

            this.buttonGame.forEach(button => {
                button.removeAttribute("data-figure");
    
                button.addEventListener('click', () => {
                    button.setAttribute("data-figure", this.turn);
                    button.setAttribute("disabled", "none");

                    console.log(button.getAttribute("data-figure"));
                    
                    
                    if (this.turn === this.turns[0]) this.turn = this.turns[1];
                    else this.turn = this.turns[0];
    
                    this.playerTurn.textContent = this.turn;

                    this.validButtons();
                });
            });
        }

        this.buttonReset.addEventListener('click', ()=> this.clear());
        this.modalButtonNext.addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.modalSheet.classList.remove('active');
            this.clear();
        });
        this.modalButtonQuit.addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.modalSheet.classList.remove('active');
            this.reset();
        })

    }

    reset() {
        this.clear();

        this.turn = this.turns[0];
        this.playerTurn.textContent = this.turn;
        this.score.player1 = 0;
        this.scoreElement.player1.textContent = this.score.player1;
        this.score.player2 = 0;
        this.scoreElement.player2.textContent = this.score.player2;
        this.score.ties = 0;
        this.scoreElement.ties.textContent = this.score.ties;
    }

    clear() {
        this.buttonGame.forEach(button => {
            button.removeAttribute("data-figure");
            button.removeAttribute("disabled");
        });
    }

    #getButtonValue(index) {
        return this.buttonGame[index].getAttribute("data-figure");
    }

    #validation(point1, point2, point3, turn) {
        // Obtener valor de boton
        if (
            this.#getButtonValue(point1) === this.turns[turn] && 
            this.#getButtonValue(point2) === this.turns[turn] && 
            this.#getButtonValue(point3) === this.turns[turn]
        ) {

            this.modal.classList.add('active');
            this.modalTitle.setAttribute("data-color", this.turns[turn]);
            this.modalFigure.textContent = this.turns[turn];
            this.modalSheet.classList.add('active');

            if (this.turns[turn] === this.turns[0]) {
                this.score.player1++;
                this.scoreElement.player1.textContent = this.score.player1;
                this.turn = this.turns[turn + 1];
                this.playerTurn.textContent = this.turns[turn + 1];
            } else if (this.turns[turn] === this.turns[1]) {
                this.score.player2++;
                this.scoreElement.player2.textContent = this.score.player2;
                this.turn = this.turns[turn - 1];
                this.playerTurn.textContent = this.turns[turn - 1];
            }
        }
    }

    validButtons() {
        /**
         * Marco de validacion de posiciones(index)
         * 
         * 0    1   2
         * 
         * 3    4   5
         * 
         * 6    7   8
         */

        /**
         * Marco de validacion de figura
         * 0 => X
         * 1 => O
         */

        // Validaciones X
        this.#validation(0, 1, 2, 0);
        this.#validation(0, 3, 6, 0);
        this.#validation(6, 7, 8, 0);
        this.#validation(8, 5, 2, 0);
        this.#validation(0, 4, 8, 0);
        this.#validation(2, 4, 6, 0);
        this.#validation(3, 4, 5, 0);
        this.#validation(1, 4, 7, 0);

        // Validaciones O
        this.#validation(0, 1, 2, 1);
        this.#validation(0, 3, 6, 1);
        this.#validation(6, 7, 8, 1);
        this.#validation(8, 5, 2, 1);
        this.#validation(0, 4, 8, 1);
        this.#validation(2, 4, 6, 1);
        this.#validation(3, 4, 5, 1);
        this.#validation(1, 4, 7, 1);
    }
}

const game = new Game();

game.init();