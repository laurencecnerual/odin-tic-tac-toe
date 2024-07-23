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
        }
    }

    const getBoard = () => {
        return board;
    }

    const logBoard = () => {
        console.log(board[0] + "\n" + board[1] + "\n" + board[2]);
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

gameBoard.fillCell(2,2,players[0].getTeam());
gameBoard.fillCell(1,1,players[1].getTeam());
gameBoard.fillCell(0,0,players[0].getTeam());
gameBoard.logBoard();