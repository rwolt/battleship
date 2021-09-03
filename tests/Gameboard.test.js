import { expect, it } from '@jest/globals';
import Gameboard from '../app/Gameboard';

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
    const submarine = {name: 'Submarine', length: 4};
    const board = Gameboard(100);
    board.placeShip(submarine, 91, 'horizontal');
    expect(board.grid[94]).toHaveProperty('hasShip', true);
})

it('gameboard correctly stores hasShip property', () => {
    const cruiser = {name: 'Cruiser', length: 3};
    const board = Gameboard(100);
    board.placeShip(cruiser, 41, 'vertical');
    expect(board.grid[61]).toHaveProperty('hasShip', true);
})

it('gameboard correctly stores hasShip property', () => {
    const submarine = {name: 'Submarine', length: 4};
    const board = Gameboard(100);
    board.placeShip(submarine, 91, 'horizontal');
    expect(board.grid[71]).toHaveProperty('hasShip', false);
})

it('gameboard correctly stores hasShip property', () => {
    const cruiser = {name: 'Cruiser', length: 3};
    const board = Gameboard(100);
    board.placeShip(cruiser, 41, 'vertical');
    expect(board.grid[43]).toHaveProperty('hasShip', false);
})

it('placing a ship stores a reference to ship', () => {
    const battleShip = {name: 'Battleship', length: 4};
    const board = Gameboard(100);
    board.placeShip(battleShip, 5, 'horizontal');
    expect(board.grid[6]).toHaveProperty('ship', battleShip);
});

it('placing a ship stores a reference to ship', () => {
    const carrier = {name: 'Carrier', length: 5};
    const board = Gameboard(100);
    board.placeShip(carrier, 44, 'vertical');
    expect(board.grid[64]).toHaveProperty('ship', carrier);
});

it('no reference to ship where it has not been placed', () => {
    const battleShip = {name: 'Battleship', length: 4};
    const board = Gameboard(100);
    board.placeShip(battleShip, 5, 'horizontal');
    expect(board.grid[4]).not.toHaveProperty('ship', battleShip);
});

it('no reference to ship where it has not been placed', () => {
    const carrier = {name: 'Carrier', length: 5};
    const board = Gameboard(100);
    board.placeShip(carrier, 44, 'vertical');
    expect(board.grid[9]).not.toHaveProperty('ship', carrier);
});

it('board keeps track of spaces that have been selected', () => {
    const board = Gameboard(100);
    board.receiveAttack(30);
    expect(board.grid[30]).toHaveProperty('beenSelected', true);
});

it('board keeps track of spaces that have been selected', () => {
    const board = Gameboard(100);
    board.receiveAttack(97);
    expect(board.grid[99]).toHaveProperty('beenSelected', false);
});

it('board correctly identifies a miss on empty board', () => {
    const board = Gameboard(100);
    expect(board.receiveAttack(50).msg).toBe('Miss');
});

it('board correctly identifies a miss with ship on board', () => {
    const board = Gameboard(100);
    const battleship = {name: 'Battleship', length: 4};
    board.placeShip(battleship, 60, 'vertical');
    expect(board.receiveAttack(50).msg).toBe('Miss');
});

it('board correctly identifies a hit', () => {
    const board = Gameboard(100);
    const battleship = {name: 'Battleship', length: 4};
    board.placeShip(battleship, 60, 'vertical');
    expect(board.receiveAttack(80).msg).toBe('Battleship has been hit!');
});

it('board correctly identifies a hit at 99 index', () => {
    const board = Gameboard(100);
    const battleship = {name: 'Battleship', length: 4};
    board.placeShip(battleship, 96, 'horizontal');
    expect(board.receiveAttack(99).msg).toBe('Battleship has been hit!');
});

it('board correctly identifies a space that has already been selected', () => {
    const board = Gameboard(100);
    const battleship = {name: 'Battleship', length: 4};
    board.placeShip(battleship, 60, 'vertical');
    board.receiveAttack(80);
    expect(board.receiveAttack(80).msg).toBe('Space has already been selected');
});

