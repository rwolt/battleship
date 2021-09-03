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
                return startIndex % 10 + (ship.length - 1) < 10;
            case 'vertical':
                return startIndex + ((ship.length - 1) * 10) < 99
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
                return {ship, msg: `${square.ship.name} has been hit!`};
            } else {
                square.beenSelected = true;
                return {msg: 'Miss'}
            }
        } else {
            return {msg: 'Space has already been selected'};
        }
    }

    return {
        grid,
        placeShip,
        receiveAttack
    }

    }


export default Gameboard;