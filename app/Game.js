import domController from './domController.js'
import Player from './Player.js';
import Gameboard from './Gameboard.js';
import Ship from './Ship.js';

const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const startBtn = document.querySelector('.start-button');
const resetBtn = document.querySelector('.reset-button');
let players = [];


const createPlayers = () => {
    const player1 = Player('Player 1', Gameboard(100));
    const player2 = Player('Computer', Gameboard(100));
    return ([player1, player2]);
}

const switchTurn = () => {
    if(players.every(player => !player.isTurn)) {
        players[0].isTurn = true;
        const currentTurn = players[0];
    } else {
        //Switch the state of isTurn for both players
        players.forEach(player => player.isTurn = !player.isTurn);
        const currentTurn = players.filter(player => player.isTurn)[0];
        if (currentTurn.name === 'Computer') {
            document.querySelector('.computer-container').classList.toggle('active');
            document.querySelector('.user-container').classList.toggle('active');
        } else {
            document.querySelector('.computer-container').classList.toggle('active');
            document.querySelector('.user-container').classList.toggle('active');
        }
    }


}

const drawGrid = () => {
    domController.drawGrid(userGrid);
    domController.drawGrid(document.querySelector('.grid-computer'));
    const squares = document.querySelectorAll('.grid-computer .grid-square');
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            if (e.target.parentElement.parentElement.classList.contains('active')) {
                const playersIndex = e.target.parentElement === userGrid ? 0 : 1;
                let opponentSquare = players[playersIndex].board.grid[square.dataset.id]
                const response = players[playersIndex].board.receiveAttack(square.dataset.id);
                if (response.id === 'selected') {
                    document.querySelector('#info').innerText = response.msg
                    return;
                } else if(opponentSquare.hasShip) {
                    square.classList.add('hit')
                } else {
                    square.classList.add('miss')
                }
                document.querySelector('#info').innerText = response.msg === 'Miss' ? 'Miss' : `Computer's ${response.msg}`;
                if (checkWinner() === false) {
                    switchTurn();
                    //Wait before making a guess
                    setTimeout(computerGuess, 1200);
                }
            }
        });
    });
}

const computerGuess = () => {
    let guess = players[1].makeGuess();
    let opponentSquare = players[0].board.grid[guess];
    while(opponentSquare.beenSelected) {
        guess = players[1].makeGuess();
        opponentSquare = player[0].board.grid[guess];
    }
    let response = players[0].board.receiveAttack(guess);
    if(opponentSquare.hasShip) {
        userGrid.querySelector(`[data-id='${guess}']`).classList.add('hit');
    } else {
        userGrid.querySelector(`[data-id='${guess}']`).classList.add('miss');
    }
    document.querySelector('#info').innerText = response.msg === 'Miss' ? 'Miss' : `Player 1's ${response.msg}`;
    if (checkWinner() === false) {
        switchTurn();
    };
}

const drawShips = (board) => {
    const gridSpaces = userGrid.querySelectorAll('.grid-square');
    board.grid.forEach(space => {
        if(space.hasShip){
            gridSpaces[space.id].style.backgroundColor = '#888';
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
        //Pick a random index on the grid
        let randomGrid = Math.floor(Math.random() * 100);
        //Pick a random index of the orientations array
        let randomDirection = Math.floor(Math.random() * 2);
        const orientations = ['horizontal', 'vertical'];
        //Check if the randomly generated location and orientation is valid
        let inBounds = board.checkBoundaries(ship, randomGrid, orientations[randomDirection]);
        while(inBounds === false){
            randomGrid = Math.floor(Math.random() * 100);
            randomDirection = Math.floor(Math.random() * 2);
            inBounds = board.checkBoundaries(ship, randomGrid, orientations[randomDirection]);
        }
        board.placeShip(ship, randomGrid, orientations[randomDirection]);
    });
}

const checkWinner = () => {
    const opponent = players.filter(player => !player.isTurn);
    if (opponent[0].board.allSunk() === true) {
                        const winner = players.filter(player => player.isTurn)[0];
                        document.querySelector('#turn').innerText = '';
                        document.querySelector('#info').innerText = `${winner.name} is the Winner!`;
                        stopGame();
                      } else {
                          return false;
                      }
}

const stopGame = () => {
    //Remove event listeners from the computer grid by cloning the node
    const oldComputerGrid = document.querySelector('.grid-computer');
    const newComputerGrid =oldComputerGrid.cloneNode(true);
    oldComputerGrid.parentNode.replaceChild(newComputerGrid, oldComputerGrid);
    newComputerGrid.classList.add('.grid-computer');
    resetBtn.classList.remove('hidden');
}

const ships = [
    {
        name: 'Carrier',
        length: 5
    },
    {
        name: 'Battleship',
        length: 4
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
        name: 'Destroyer',
        length: 2
    }
]

const init = () => {
    players = createPlayers();
    drawGrid();
    const computerShips = generateShipObjects(ships);
    const userShips = generateShipObjects(ships);
    placeRandomly(userShips, players[0].board);
    placeRandomly(computerShips, players[1].board);
}

const startGame = () => {
    drawShips(players[0].board);
    switchTurn();
    document.querySelector('#info').innerText = 'The Game is About to Start';
}

const resetGame = () => {
    domController.resetBoard();
    resetBtn.classList.add('hidden');
    init();
    startGame();
}


startBtn.addEventListener('click', () => {
    startGame();
    startBtn.classList.add('hidden');
});

resetBtn.addEventListener('click', resetGame);

init();







