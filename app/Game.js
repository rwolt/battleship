import Player from '../app/Player';
import Gameboard from '../app/Gameboard';

const Game = (() => {

    const players = [];
    const start = () => {
        const board1 = Gameboard(100);
        const player1 = Player('Player 1', board1);
        players.push(player1);

        const board2 = Gameboard(100);
        const player2 = Player('Computer', board2);
        players.push(player2);
}
return({
    players,
    start
})
})();

export default Game;

