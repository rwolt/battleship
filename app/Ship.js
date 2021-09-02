const Ship = (length) => {
    let _hit = 0;
    const hit = () => {
        _hit++;
    }
    const isSunk = () => {
        return _hit === length;
    }
    return({
        length,
        hit,
        isSunk
    });
}

export default Ship