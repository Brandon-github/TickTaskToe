
class Game {
    constructor() {
        this.buttonGame = document.querySelectorAll('.button--game');
        this.buttonReset = document.querySelector('.bar__button');
        this.playerTurn = document.querySelector('.bar__turn--select');
        this.score = {
            player1: document.querySelector('.score__point.player1'),
            player2: document.querySelector('.score__point.player2'),
            ties: document.querySelector('.score__point.ties')
        };
        this.turns = ["x", "o"];
        this.turn = "x";
        this.gameOver = false;
    }

    init() {
        this.start();
    }

    start() {
        if (!this.gameOver) {
            this.buttonGame.forEach(button => {
                button.removeAttribute("data-figure");
    
                button.addEventListener('click', () => {
                    button.setAttribute("data-figure", this.turn);
                    button.setAttribute("disabled", "none");
                    
                    if (this.turn === this.turns[0]) this.turn = this.turns[1];
                    else this.turn = this.turns[0];
    
                    this.playerTurn.textContent = this.turn;
                });
            });
        }

        this.buttonReset.addEventListener('click', ()=> this.reset());

    }

    reset() {
        this.buttonGame.forEach(button => {
            button.removeAttribute("data-figure");
            button.removeAttribute("disabled");
        });

        this.turn = this.turns[0];
        this.playerTurn.textContent = this.turn;
    }
}

const game = new Game();

game.init();