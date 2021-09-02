import { expect, it } from '@jest/globals';
import Gameboard from '../app/Gameboard';
import Ship from '../app/Ship';

it('the gameboard has the correct number of spaces', () => {
    const board = Gameboard(100);
    expect(board.grid).toHaveProperty('length', 100);
});

it('the gameboard stores an index inside an object', () => {
    const board = Gameboard(100);
    expect(board.grid[44]).toHaveProperty('id', 'grid-44');
});

it('the gameboard stores an index inside an object', () => {
    const board = Gameboard(100);
    expect(board.grid[0]).toHaveProperty('id', 'grid-0');
});

it('the gameboard stores an index inside an object', () => {
    const board = Gameboard(100);
    expect(board.grid[99]).toHaveProperty('id', 'grid-99');
});

it('gameboard correctly stores hasShip property', () => {
    const submarine = Ship(4);
    const board = Gameboard(100);
    board.placeShip(submarine, 91, 'horizontal');
    expect(board.grid[94]).toHaveProperty('hasShip', true);
})

it('gameboard correctly stores hasShip property', () => {
    const cruiser = Ship(3);
    const board = Gameboard(100);
    board.placeShip(cruiser, 41, 'vertical');
    expect(board.grid[61]).toHaveProperty('hasShip', true);
})

it('gameboard correctly stores hasShip property', () => {
    const submarine = Ship(4);
    const board = Gameboard(100);
    board.placeShip(submarine, 91, 'horizontal');
    expect(board.grid[71]).toHaveProperty('hasShip', false);
})

it('gameboard correctly stores hasShip property', () => {
    const cruiser = Ship(3);
    const board = Gameboard(100);
    board.placeShip(cruiser, 41, 'vertical');
    expect(board.grid[43]).toHaveProperty('hasShip', false);
})

it('placing a ship stores a reference to ship', () => {
    const battleShip = Ship(4);
    const board = Gameboard(100);
    board.placeShip(battleShip, 5, 'horizontal');
    expect(board.grid[6]).toHaveProperty('ship', battleShip);
});

it('placing a ship stores a reference to ship', () => {
    const carrier = Ship(5);
    const board = Gameboard(100);
    board.placeShip(carrier, 44, 'vertical');
    expect(board.grid[64]).toHaveProperty('ship', carrier);
});

it('no reference to ship where it has not been placed', () => {
    const battleShip = Ship(4);
    const board = Gameboard(100);
    board.placeShip(battleShip, 5, 'horizontal');
    expect(board.grid[4]).not.toHaveProperty('ship', battleShip);
});

it('no reference to ship where it has not been placed', () => {
    const carrier = Ship(5);
    const board = Gameboard(100);
    board.placeShip(carrier, 44, 'vertical');
    expect(board.grid[9]).not.toHaveProperty('ship', carrier);
});


