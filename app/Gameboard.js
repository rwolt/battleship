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
                return startIndex % 10 + ship.length < 10;
            case 'vertical':
                return startIndex + (ship.length * 10) < 99;
        }
    }

    const placeShip = (ship, startIndex, orientation) => {
        switch (orientation){
            case 'horizontal':
                if(checkBoundaries(ship, startIndex, orientation)) {
                    for(let i = 0; i < ship.length; i++) {
                        grid[startIndex + i].hasShip = true;
                        grid[startIndex + i].ship = ship;
                    }
                }
                break;
            case 'vertical':
                if(checkBoundaries(ship, startIndex, orientation)) {
                    for(let i = 0; i < ship.length; i++) {
                        grid[startIndex + (i * 10)].hasShip = true;
                        grid[startIndex + (i * 10)].ship = ship;
                    }
                }
                break;
            default:
                break;
        }



    }

    return {
        grid,
        placeShip
    }
}

export default Gameboard;