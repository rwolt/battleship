import domController from './domController.js'
import Player from './Player.js';
import Gameboard from './Gameboard.js';
import Ship from './Ship.js';

const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');

const createPlayers = () => {
    const player1 = Player('Player 1', Gameboard(100));
    const player2 = Player('Computer', Gameboard(100));
    return ([player1, player2]);
}

const drawGrid = () => {
    domController.drawGrid(userGrid);
    domController.drawGrid(computerGrid);
    const squares = document.querySelectorAll('.grid-computer .grid-square');
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            const playersIndex = e.target.parentElement === userGrid ? 0 : 1;
            let opponentSquare = players[playersIndex].board.grid[square.dataset.id]
            const response = players[playersIndex].board.receiveAttack(square.dataset.id);
            if(opponentSquare.hasShip) {
                square.classList.add('hit')
            } else {
                square.classList.add('miss')
            }
            document.querySelector('#info').innerText = response.msg;
        });
    });
}

const drawShips = (board) => {
    board.grid.forEach(space => {
        if(space.hasShip){
            userGrid[parseInt(space.id)].style.backgroundColor = 'navy';
        }
    })
}

const generateShipObjects = (shipsData) => {
    const shipObjects = [];
    shipsData.forEach(ship => {
        let newShip = Ship(ship.name, ship.length);
        shipObjects.push(newShip);
    });
    return shipObjects;
};

const placeRandomly = (ships, board) => {
    ships.forEach(ship => {
        let randomGrid = Math.floor(Math.random() * 100);
        let randomDirection = Math.floor(Math.random() * 2);
        const orientations = ['horizontal', 'vertical'];
        while(!board.checkBoundaries(ship, randomGrid, orientations[randomDirection])){
            randomGrid = Math.floor(Math.random() * 100);
            randomDirection = Math.floor(Math.random() * 2);
        }
        board.placeShip(ship, randomGrid, orientations[randomDirection]);
    });
}

const ships = [
    {
        name: 'Destroyer',
        length: 2
    },
    {
        name: 'Submarine',
        length: 3
    },
    {
        name: 'Cruiser',
        length: 3
    },
    {
        name: 'Battleship',
        length: 4
    },
    {
        name: 'Carrier',
        length: 5
    }
]

const players = createPlayers();
drawGrid();
const computerShips = generateShipObjects(ships);
const userShips = generateShipObjects(ships);
placeRandomly(userShips, players[0].board);
placeRandomly(computerShips, players[1].board);
drawShips(player[0].board);





