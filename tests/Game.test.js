import { test } from '@jest/globals';
import Game from '../app/Game';

test('Game can create players and gameboards', () => {
    Game.start();
    expect(Game.players).toHaveProperty('length', 2);
});

// test('Game can create players and gameboards', () => {
//     Game.start();
//     expect(Game.players).toHaveProperty('player2');
// });

// test('Game can keep track of player turns', () => {
//     Game.init();
// });

// test('Game can keep track of player turns', () => {
//     Game.init();
//     Game.switchTurn();
//     expect(Game.playerTurn).toBe()
// });

// test('Check if all ships are sunk', () => {

// });




