const gameMaster = (function () {
    const gameBoard = (function () {
        const tttSize = 3;
        let board;

        const cleanBoard = () => {
            board = [];
            for (let x = 0; x < tttSize; x++) {
                board[x] = [];
                for (let y = 0; y < tttSize; y++) {
                    board[x][y] = " ";
                }
            }
        }

        cleanBoard();

        const fillCell = (x, y, value) => {
            if (board[x][y] == " ") {
                board[x][y] = value;
                return true; //succeeded in filling cell because it was empty
            } else {
                return false; //failed to fill cell because it was already full
            }
        }

        const getBoard = () => {
            return board;
        }

        const logBoard = () => {
            console.log(board[0] + "\n" + board[1] + "\n" + board[2] + "\n");
        }

        return {getBoard, cleanBoard, fillCell, logBoard};
    })();

    function createPlayer(name, team) {
        const getName = () => name;
        const getTeam = () => team;
        let score = 0;
        const getScore = () => score;
        const incrementScore = () => score++;

        return {getName, getTeam, getScore, incrementScore};
    }

    const players = [];
    players.push(createPlayer("Player 1", "X"));
    players.push(createPlayer("Player 2", "O"));
    
    function determineActivePlayerIndex() {
        let turnNumber = 0;
        return () => {
            return turnNumber++ % players.length; //Expected to always return 0 or 1 since tic tac toe is a 2 player game
        };
    }
    
    const activePlayerIndex = determineActivePlayerIndex();
    let gameOver = false;

    function getGameOver(board, token) {
        // for (let x = 0; x < board.length; x++) {
        //     if (board[x][0] == board[x][1] == board[x][2]) {
        //         return true;
        //     }
        // }

        // for (let y = 0; y < board.length; y++) {
        //     if (board[0][y] == board[1][y] == board[2][y]) {
        //         return true;
        //     }
        // }
    }

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            let gamePiece = players[activePlayerIndex()].getTeam();
            gameBoard.fillCell(x, y, gamePiece);
            gameBoard.logBoard();
            gameOver = getGameOver(gameBoard.getBoard(), gamePiece);
        }
    }
})();