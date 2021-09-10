
import { test } from '@jest/globals';
import Game from '../app/Game';

test('Game can create players and gameboards', () => {
    Game.start();
    expect(Game.players).toHaveProperty('length', 2);
});

test('Game can create players and gameboards', () => {
    Game.start();
    expect(Game.players[1]).toHaveProperty('isHuman', false);
});

test('Game can keep track of player turns', () => {
    Game.start();
    expect(Game.players[Game.turn]).toBe(Game.players[0]);
});


test('Game can keep track of player turns', () => {
    Game.start();
    Game.switchTurn();
    expect(Game.players[Game.turn]).toBe(Game.players[]);
});

// // test('Check if all ships are sunk', () => {

// // });




