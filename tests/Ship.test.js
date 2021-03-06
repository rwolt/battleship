import { expect } from '@jest/globals';
import Ship from '../app/Ship';

it('Ship factory creates correct length', () => {
    expect(Ship('Carrier', 5)).toHaveProperty('length', 5);
});

it('Ship factory creates correct length', () => {
    expect(Ship('Patrol Boat', 2)).toHaveProperty('length', 2);;
});

it('Ship factory returns name property', () => {
    expect(Ship('Submarine', 3)).toHaveProperty('name', 'Submarine');
});

it('isSunk function return false if hits less than length', () => {
    const battleship = Ship(4);
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBeFalsy;
});

it('isSunk function return true if hits equals length', () => {
    const battleship = Ship(4);
    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit();
    expect(battleship.isSunk()).toBeTruthy;
});







