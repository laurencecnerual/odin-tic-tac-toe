function createPlayer(name) {
    let score = 0;
    const getScore = () => score;
    const incrementScore = () => score++;

    return {name, getScore, incrementScore};
}

const player1 = createPlayer("Player 1");
const player2 = createPlayer("Player 2");

console.log(player1, player2);