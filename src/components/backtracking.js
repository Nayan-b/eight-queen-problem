// import { useState, useCallback } from "react";

const backTracking = (visitedState, unVisitedRow, length, i=20000) => {
    // console.log("5  ", queenState, length)
    // const [currentPos] = useState(null)
    if (unVisitedRow.length === 0 && visitedState.length === length) {
        console.log("??? 7   ", unVisitedRow, visitedState)
        return visitedState;
    }
    // let queenSt = queenState.slice()
    const idToRC = (id) => {
      const row = Math.floor(id/length);
      const col = id%length;
      return [row, col];
    }
    
    if(i-- === 0) return false;

    const RCToId = (row, col) => {
      return row*length + col
    }
    

    // if (queenSt.length === length) return true
    // const [row, col] = idToRC(visitedState[visitedState.length-1])
    // const checkWin = () => {

    // }

    const isMoveValid = (gameState) => {
        const queenStRC = gameState.map((el) => idToRC(el));
        const [row, column] = queenStRC.pop();

        const checkRC = queenStRC.some((el) => el[0] === row || el[1] === column);
        const checkDiagonal = queenStRC.some((el) => Math.abs(el[0] - row) === Math.abs(el[1] - column))
        const isMoveInvalid = checkRC || checkDiagonal;
        // if (!isMoveInvalid) console.log(gameState)
        return !isMoveInvalid
    }

    const row = unVisitedRow[0]
    for (let col=0; col<length; col++) {
        const currentId = RCToId(row, col)
        visitedState = Array.from(new Set(visitedState).add(currentId))
        if (isMoveValid(visitedState)) {
            unVisitedRow = unVisitedRow.filter(el => el !== row)
            if (backTracking(visitedState, unVisitedRow, length, i)) return visitedState;
            unVisitedRow.splice(0, 0, row)
            // console.log('unvisited  -- ', unVisitedRow, visitedState)
        }
        visitedState = visitedState.filter(el => el !== currentId)
    }
    // console.log("false  ", visitedState, i, unVisitedRow)
    return false;
}

export default backTracking;