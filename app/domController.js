
const domController = (() => {
    const drawGrid = (gridContainer) => {
        for(let i = 0; i < 100; i++) {
            const square = document.createElement('div');
            square.dataset.id = i;
            square.classList.add('grid-square');
            gridContainer.appendChild(square);
        };

    };

    return({
        drawGrid
    });
})();


export default domController;