const domController = () => {
    //Message output div gives instructions at the top of the screen
    const messageOut = () => {
        let messageOut = document.createElement('div');
        messageOut.classList.add('message-out');
        return messageOut;
    }
    //Draws a div for each space on the grid
    const drawGrid = (grid) => {
        const playerBoard = document.createElement('div');
        playerBoard.classList.add('player-board');
        grid.forEach(index => {
            const space = document.createElement('div');
            space.classList.add('grid-space');
            space.id = index.id;
            playerBoard.appendChild(space);
        });
        return playerBoard;
    }
    //Appends a click event listener to each space and calls receive attack

    const addClickHandlers = (grid) => {
        grid.forEach(space => {
            space.addEventListener('click', () => {
                
            })
        })
    }
    //Draws a ship on the grid
    //Adds a red mark for a hit or a white mark for a miss
}

export default domController;