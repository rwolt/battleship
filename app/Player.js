const Player = (name, board) => {
    const isHuman = name == 'Computer' ? false : true;
    const guesses = [];
    const makeGuess = () => {
        //Choose an index on the board that is not in the guesses array
        let n;
        do{
            n = Math.floor(Math.random() * 100)
        } while(guesses.some(index => index == n));
        guesses.push(n);
        return n;
    }
    return ({
        name,
        board,
        isHuman,
        makeGuess
    });
}

export default Player;