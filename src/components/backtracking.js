
const idToRC = (id, length) => {
    const row = Math.floor(id/length);
    const col = id%length;
    return [row, col];
}

const RCToId = (row, col, length) => {
    return row*length + col
}

const isMoveValid = (gameState, length) => {
    const queenStRC = gameState.map((el) => idToRC(el, length));
    const [row, column] = queenStRC.pop();
    const checkRC = queenStRC.some((el) => el[0] === row || el[1] === column);
    const checkDiagonal = queenStRC.some((el) => Math.abs(el[0] - row) === Math.abs(el[1] - column))
    const isMoveInvalid = checkRC || checkDiagonal;
    return !isMoveInvalid
}

const backTracking = (visitedState, unVisitedRow, length) => {
    if (unVisitedRow.length === 0 && visitedState.length === length) {
        return true;
    }

    const row = unVisitedRow[0]
    for (let col=0; col<length; col++) {
        const currentId = RCToId(row, col, length)
        visitedState = Array.from(new Set(visitedState).add(currentId))
        if (isMoveValid(visitedState, length)) {
            unVisitedRow = unVisitedRow.filter(el => el !== row)
            if (backTracking(visitedState, unVisitedRow, length)) return visitedState;
            unVisitedRow.splice(0, 0, row)
        }
        visitedState = visitedState.filter(el => el !== currentId)
    }
    return false;
}

export default backTracking;