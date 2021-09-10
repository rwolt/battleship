const Gameboard = (length) => {
    const grid = [];
    for(let i = 0; i < length; i++) {
        grid.push({
            id: `grid-${i}`,
            hasShip: false,
            beenSelected: false
        });
    }

    const checkBoundaries = (ship, startIndex, orientation) => {
        switch(orientation) {
            case 'horizontal':
                if(startIndex % 10 + (ship.length - 1) < 10){
                const squares = [];
                for(let i = 0; i < ship.length; i++){
                    squares.push(grid[i]);
                }
                if(squares.every(square => square.hasShip === false)) {
                    return true;
                }
                return false;
            }
            break;
            case 'vertical':
                if (startIndex + ((ship.length - 1) * 10) < 99) {
                    const squares = [];
                    for(let i = 0; i < ship.length; i++){
                        squares.push(grid[i]);
                    }
                    if(squares.every(square => square.hasShip === false)) {
                        return true;
                }
                    return false;
                }
            break;
        }
    };

    const placeShip = (ship, startIndex, orientation) => {
        switch (orientation){
            case 'horizontal':
                if(checkBoundaries(ship, startIndex, orientation)) {
                    for(let i = 0; i < ship.length; i++) {
                        const square = grid[startIndex + i]
                        square.hasShip = true;
                        square.ship = ship;
                    }
                }
                break;
            case 'vertical':
                if(checkBoundaries(ship, startIndex, orientation)) {
                    for(let i = 0; i < ship.length; i++) {
                        const square = grid[startIndex + (i * 10)];
                        square.hasShip = true;
                        square.ship = ship;
                    }
                }
                break;
            default:
                break;
        }
    }

    const receiveAttack = (index) => {
        let square = grid[index];
        if (square.beenSelected == false) {
            if(square.hasShip) {
                square.beenSelected = true;
                const ship = square.ship;
                return {ship, msg: `${square.ship.name} has been hit!`};
            } else {
                square.beenSelected = true;
                return {msg: 'Miss'}
            }
        } else {
            return {msg: 'Space has already been selected'};
        }
    }

    const allSunk = () => {
        const shipSpaces = grid.filter(space => space.hasShip);
        const allSunk = shipSpaces.every(space => space.beenSelected);
        return allSunk;
    }

    return {
        grid,
        placeShip,
        checkBoundaries,
        receiveAttack,
        allSunk
    }

    }


export default Gameboard;