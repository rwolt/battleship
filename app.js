import Game from './app/Game';
import Gameboard from './app/Gameboard';
import Player from './app/Player';
import Ship from './app/Ship';

const userGrid = document.querySelector('.grid-user');
const computerGrid = document.querySelector('.grid-computer');
const displayGrid = document.querySelector('.ship-select');
const ship = document.querySelectorAll('.ship');
const destroyer = document.querySelector('.destroyer-container');
const submarine = document.querySelector('.submarine-container');
const cruiser = document.querySelector('.cruiser-container');
const battleship = document.querySelector('.battleship-container');
const carrier = document.querySelector('.carrier-container');
const startButton = document.querySelector('#start');
const rotateButton = document.querySelector('#rotate');
const turnDisplay = document.querySelector('#turn')
const infoDisplay = document.querySelector('#info')

const createGrid = () => {
    for (let i = 0; i < 100; i++) {
        const userSquare = document.createElement('div');
        userSquare.id = `userGrid-${i}`
        userSquare.classList.add('user-grid-square grid-square')
        userGrid.appendChild(userSquare);
        const compSquare = document.createElement('div');
        compSquare.id = `compGrid-${i}`
        compSquare.classList.add('computer-grid-square grid-square')
        computerGrid.appendChild(compSquare);
    }



}