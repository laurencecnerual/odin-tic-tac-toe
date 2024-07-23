const gameBoard = (function () {
    const tttSize = 3;
    const board = [];

    for (let x = 0; x < tttSize; x++) {
        board[x] = [];
        for (let y = 0; y < tttSize; y++) {
            board[x][y] = "";
        }
    }

    const fillCell = (x, y, value) => {
        if (board[x][y] == "") {
            board[x][y] = value;
        }
    }

    return {board, fillCell};
})();

function createPlayer(name, team) {
    const getName = () => name;
    const getTeam = () => team;
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => score++;

    return {getName, getTeam, getScore, incrementScore};
}

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");
gameBoard.fillCell(2,2,player1.getTeam());
gameBoard.fillCell(1,1,player2.getTeam());
gameBoard.fillCell(0,0,player1.getTeam());

console.log(player1, player2, gameBoard.board);