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
                    board[x][y] = "";
                }
            }
            cellsFilled = 0;
        }

        cleanBoard();

        const fillCell = (x, y, value) => {
            if (board[x][y] == "") {
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

    const displayController = (function () {
        const displayNames = () => {
            document.querySelector("#p1 > .player-name").textContent = players[0].getName();
            document.querySelector("#p2 > .player-name").textContent = players[1].getName();
        }

        const displayScores = () => {
            document.querySelector("#p1 > .player-score").textContent = "Score: " + players[0].getScore();
            document.querySelector("#p2 > .player-score").textContent = "Score: " + players[1].getScore();
        }

        const displayBoard = () => {
            const currentBoard = gameBoard.getBoard();
            document.querySelector("#c0-0").textContent = currentBoard[0][0];
            document.querySelector("#c0-1").textContent = currentBoard[0][1];
            document.querySelector("#c0-2").textContent = currentBoard[0][2];
            document.querySelector("#c1-0").textContent = currentBoard[1][0];
            document.querySelector("#c1-1").textContent = currentBoard[1][1];
            document.querySelector("#c1-2").textContent = currentBoard[1][2];
            document.querySelector("#c2-0").textContent = currentBoard[2][0];
            document.querySelector("#c2-1").textContent = currentBoard[2][1];
            document.querySelector("#c2-2").textContent = currentBoard[2][2];
        }

        const displayTurn = (i) => {
            if (i == 0) {
                document.querySelector("#p1").style.fontWeight = "bold";
                document.querySelector("#p2").style.fontWeight = "normal";
            } else {
                document.querySelector("#p2").style.fontWeight = "bold";
                document.querySelector("#p1").style.fontWeight = "normal";

            }
        }

        return {displayNames, displayScores, displayBoard, displayTurn};
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
    players.push(createPlayer(prompt("Input Player 1 (Team X) Name", "Mario"), "X"));
    players.push(createPlayer(prompt("Input Player 2 (Team O) Name", "Luigi"), "O"));
    displayController.displayNames();
    
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

    let index;
    let currentPlayer;
    let currentPlayerName;
    let gamePiece;
    setPlayerTurn();

    const uiBoardCells = Array.from(document.querySelectorAll("button.cell"));
    uiBoardCells.forEach((cell) => {
        cell.addEventListener("click", () => {
            playRound(cell.id[1], cell.id[3]); //send the row and column information from the button's id
        });
    });

    function playRound(r, c) {
        let row = parseInt(r);
        let column = parseInt(c);
        let fillCoordinates = gameBoard.fillCell(row, column, gamePiece);

        if (fillCoordinates != undefined) {
            displayController.displayBoard();
            gameOver = getGameOver(gamePiece, fillCoordinates.x, fillCoordinates.y);
            setPlayerTurn(); // newly added
        } else {
            alert("That cell is taken. Please try again.");
        }
    }

    function cleanUp() {
        gameOver = 0;
        gameBoard.cleanBoard();
    }

    function setPlayerTurn() {
        index = activePlayerIndex();
        currentPlayer = players[index];
        currentPlayerName = currentPlayer.getName();
        gamePiece = currentPlayer.getTeam();
        //alert(currentPlayerName + "'s turn");
        displayController.displayTurn(index);
    }

    function displayResults() {
        if (gameOver == 2) {
            alert(`${currentPlayerName} (Team ${gamePiece}) wins!`);
            currentPlayer.incrementScore();
        } else {
            alert("It's a draw!");
        }
    
        displayController.displayScores();
    }

    // function promptPlayAgain() {
    //     if (window.confirm("Would you like to play again?")) {
    //         cleanUp();
    //         playGame();
    //     } else {
    //         alert("Thank you for playing!");
    //     }
    // }
})();