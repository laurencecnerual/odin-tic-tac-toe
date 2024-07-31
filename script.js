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
    players.push(createPlayer("Player 1", "X"));
    players.push(createPlayer("Player 2", "O"));
    
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

    // for (let x = 0; x < 3; x++) {
    //     for (let y = 0; y < 3; y++) {
    //         let gamePiece = players[activePlayerIndex()].getTeam();
    //         let fillCoordinates = gameBoard.fillCell(x, y, gamePiece);
    //         gameBoard.logBoard();

    //         if (fillCoordinates != undefined) {
    //             gameOver = getGameOver(gamePiece, fillCoordinates.x, fillCoordinates.y);
    //             console.log(gameOver);
    //         }
    //     }
    // }

    let gamePiece;

    while (gameOver == 0) {
        gamePiece = players[activePlayerIndex()].getTeam();
        alert("Player " + gamePiece + "'s turn");
        let fillCoordinates = gameBoard.fillCell(parseInt(prompt("Input X")), parseInt(prompt("Input Y")), gamePiece);
        gameBoard.logBoard();

        if (fillCoordinates != undefined) {
            gameOver = getGameOver(gamePiece, fillCoordinates.x, fillCoordinates.y);
        }
    }

    //alert("Reached exit status " + gameOver);
    
    if (gameOver == 2) {
        alert("Player " + gamePiece + " wins!");
    } else {
        alert("It's a draw!");
    }

})();