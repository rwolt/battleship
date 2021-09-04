import Player from '../app/Player';

test('Player factory returns name', () => {
    let player1 = Player('Ray');
    expect(player1.name).toBe('Ray');
});

test('isTurn property on Player object', () => {
    let player1 = Player('Ray');
    expect(player1).toHaveProperty('isTurn', false);
});

test('isHuman keeps track of computer player', () => {
    let player1 = Player('Ray');
    expect(player1).toHaveProperty('isHuman', true);
});

test('isHuman keeps track of computer player', () => {
    let player1 = Player('Computer');
    expect(player1).toHaveProperty('isHuman', false);
});

test('Player object stores a reference to the players board', () => {
    const board = {grid: [{'id': 'grid-0'}]};
    let player1 = Player('Ray', board);
    expect(player1.board.grid[0]).toHaveProperty('id', 'grid-0');
});

test('AI keeps track of guesses and can make a guess', () => {
    let player2 = Player('Computer');
    expect(player2.makeGuess()).toBeLessThan(100);
});

test('AI keeps track of guesses and can make a guess', () => {
    let player2 = Player('Computer');
    expect(player2.makeGuess()).toBeGreaterThan(-1)
});
