const gameMaster = (function () {
    const gameBoard = (function () {
        const tttSize = 3;
        let board;
        let cellsFilled;

        const cleanBoard = () => {
            board = [];
            for (let x = 0; x < tttSize; x++) {
                board[x] = [];
                for (let y = 0; y < tttSize; y++) {
                    board[x][y] = " ";
                }
            }
            cellsFilled = 0;
        }

        cleanBoard();

        const fillCell = (x, y, value) => {
            if (board[x][y] == " ") {
                board[x][y] = value;
                cellsFilled++;
                return {x, y}; //succeeded in filling cell because it was empty
            } else {
                return undefined; //failed to fill cell because it was already full
            }
        }

        const getBoard = () => {
            return board;
        }

        const getMaxCells = () => {
            return tttSize ** 2;
        }

        const getCellsFilled = () => {
            return cellsFilled;
        }

        const logBoard = () => {
            alert(board[0] + "\n" + board[1] + "\n" + board[2] + "\n");
        }

        return {getBoard, getMaxCells, getCellsFilled, cleanBoard, fillCell, logBoard};
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
    players.push(createPlayer(prompt("Input Player 1 Name", "Mario"), "X"));
    players.push(createPlayer(prompt("Input Player 2 Name", "Luigi"), "O"));

    function displayScores() {
        alert(`${players[0].getName()}: ${players[0].getScore()} point(s) \nvs. \n${players[1].getName()}: ${players[1].getScore()} point(s)`);
    }
    
    function determineActivePlayerIndex() {
        let turnNumber = 0;
        return () => {
            return turnNumber++ % players.length; //Expected to always return 0 or 1 since tic tac toe is a 2 player game
        };
    }
    
    const activePlayerIndex = determineActivePlayerIndex();
    let gameOver = 0;

    function getGameOver(token, x, y) {
        const board = gameBoard.getBoard();

        let columnCompleted = ((board[x][0] == board[x][1]) && (board[x][1] == board[x][2]));
        let rowCompleted = ((board[0][y] == board[1][y]) && (board[1][y] == board[2][y]));
        let positiveDiagonalCompleted = false;
        let negativeDiagonalCompleted = false;
        let boardFull = (gameBoard.getCellsFilled() == gameBoard.getMaxCells());

        let onPositiveDiagonal =  (x + y == 2);
        let onNegativeDiagonal = (x == y);

        if (onPositiveDiagonal) {
            positiveDiagonalCompleted = ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]));
        }

        if (onNegativeDiagonal) {
            negativeDiagonalCompleted = ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]));
        }

        if (columnCompleted || rowCompleted || positiveDiagonalCompleted || negativeDiagonalCompleted) {
            return 2; //the current player won the game
        } else if (boardFull) {
            return 1; //the board is full but nobody won, so it's a draw
        } else {
            return 0; //the board is not full and nobody has won yet, so the match is still ongoing
        }
    }

    let gamePiece;
    let currentPlayer;
    let currentPlayerName;

    function playRound() {
        alert(currentPlayerName + "'s turn");
        let row = parseInt(prompt("Input row #0~2"));
        let column = parseInt(prompt("Input column #0~2"));
        let fillCoordinates = gameBoard.fillCell(row, column, gamePiece);

        if (fillCoordinates != undefined) {
            gameBoard.logBoard();
            gameOver = getGameOver(gamePiece, fillCoordinates.x, fillCoordinates.y);
        } else {
            alert("That cell is taken. Please try again.");
            playRound();
        }
    }

    function cleanUp() {
        gameOver = 0;
        gameBoard.cleanBoard();
    }

    function playGame() {
        while (gameOver == 0) {
            let index = activePlayerIndex();
            currentPlayer = players[index];
            currentPlayerName = currentPlayer.getName();
            gamePiece = currentPlayer.getTeam();
            playRound();
        }
    
        if (gameOver == 2) {
            alert(`${currentPlayerName} (Team ${gamePiece}) wins!`);
            currentPlayer.incrementScore();
        } else {
            alert("It's a draw!");
        }
    
        displayScores();

        if (window.confirm("Would you like to play again?")) {
            cleanUp();
            playGame();
        } else {
            alert("Thank you for playing!");
        }
    }

    playGame();
})();