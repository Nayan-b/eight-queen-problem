// import { useState, useCallback } from "react";

const backTracking = (queenState, length, visitedBox=[], i=100) => {
    // console.log("5  ", queenState, length)
    // const [currentPos] = useState(null)
    let queenSt = queenState.slice()
    const idToRC = (id) => {
      const row = Math.floor(id/length);
      const col = id%length;
      return [row, col];
    }
    
    if(i-- === 0) return false

    const RCToId = (row, col) => {
      return row*length + col
    }
    

    if (queenSt.length === length) return true
    const [row, col] = idToRC(queenSt[queenSt.length-1])
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

    // let visitedBox = 
    for (let i=row; i<8; i++) {
        for (let j=0; j<8; j++) {
            const currendId = RCToId(i, j)
            if (!visitedBox.includes(currendId))
            queenSt = Array.from(new Set(queenSt).add(currendId));
            if (isMoveValid(queenSt)) {
                break
            }
            queenSt.pop()
        }
    }

    if (queenSt.length === length) return queenSt
    visitedBox = [...visitedBox, queenSt.pop()]
    return backTracking(queenSt, length, visitedBox, i)

    // return queenSt
}

export default backTracking;