const Gameboard = (length) => {
    const grid = [];
    for(let i = 0; i < length; i++) {
        grid.push({
            id: `${i}`,
            hasShip: false,
            beenSelected: false
        });
    }

    const checkBoundaries = (ship, startIndex, orientation) => {
        switch(orientation) {
            case 'horizontal':
                if(startIndex + ship.length - 1 < 10) {
                    for (let i = 0; i < ship.length; i++) {
                    if(grid[startIndex + i].hasShip === true) {
                        return false;
                        }
                    }
                    return true;
                }
                return false;
            case 'vertical':
                if(startIndex + ((ship.length-1) * 10) < 99) {
                    for(let i = 0; i < ship.length; i++) {
                        if(grid[startIndex + (i * 10)].hasShip === true){
                            return false;
                        }
                    }
                    return true;
                }
                return false;
        }
    }

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
                ship.hit();
                return ship.isSunk() ? {ship, msg: `${square.ship.name} has been sunk!`} : {ship, msg: `${square.ship.name} has been hit!`};
            } else {
                square.beenSelected = true;
                return {msg: 'Miss'}
            }
        } else {
            return {id: 'selected', msg: 'Space has already been selected'};
        }
    }

    const allSunk = () => {
        const shipSpaces = grid.filter(space => space.hasShip === true);
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