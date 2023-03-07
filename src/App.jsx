import React, { useCallback, useState, useEffect } from 'react';
import ChessBoard from './components/Chessboard';
import Dropdown from './components/Dropdown';
import backTracking from './components/backtracking';

import './App.css';

const initialState = {row: 8, quenPosition: [], validity: true};

const App = () => {
  const [length, setLength] = useState(initialState.row);
  const [queenState, setQueenState] = useState(initialState.quenPosition);
  const [computerMode, setComputerMode] = useState(false)
  const [isSolveable, setSolveable] = useState(true)
  // const [validity, setValidity] = useState(initialState.validity);
  // const [clickedIndex, setClickedIndex] = useState(null);
  const [isGameOver, setGameOver] = useState(false);

  const idToRC = useCallback((id) => {
    const row = Math.floor(id/length);
    const col = id%length;
    return [row, col];
  }, [length]);

  const RCToId = useCallback((row, col) => {
    return row*length + col
  }, [length])

  const handleReset = useCallback(() => {
    setQueenState(initialState.quenPosition);
    setGameOver(false);
    setComputerMode(false)
    setSolveable(true);
  }, []);

  useEffect(() => {
    if (isSolveable && computerMode && !isGameOver) {
      
    }
  }, [queenState, length, idToRC, computerMode, isSolveable, isGameOver]);

  const chessEngine = useCallback((queenState) => {
    const queenStateRC = queenState.map((el) => idToRC(el));
    const [row, column] = queenStateRC.pop();
    // console.log("\nqueenState  ", queenStateRC)
    const checkRC = queenStateRC.find((el) => el[0] === row || el[1] === column);
    const checkDiagonal = queenStateRC.find((el) => Math.abs(el[0] - row) === Math.abs(el[1] - column))
    const isInvalidMove = checkRC || checkDiagonal; 
    if (isInvalidMove) return RCToId(...isInvalidMove)
    return isInvalidMove
  }, [idToRC, RCToId]);

  const handleBoxClick = useCallback((index) => {
    // console.log(index, idToRC(index))
    const isInvalidMove = chessEngine([...queenState, index])
    // if isInvalidMove is 
    if (!isInvalidMove && isInvalidMove !== 0) {
      // setClickedIndex(index);
      // console.log("is valid move")
      setQueenState((prev) => Array.from(new Set(prev).add(index)));
    }
  }, [chessEngine, queenState]);

  const handleSelection = useCallback((index) => {
    handleReset();
    setLength(+index);
  }, [handleReset]);

  useEffect(() => {
    if (queenState.length === length) {
      setGameOver(true);
    }
  }, [queenState, length]);

  const handleButtonClick = useCallback(() => {
    if (queenState.length === length) return
    const visitedRow = queenState.map(id => idToRC(id)[0])
    const rowArray = []
    for (let i=0; i<length; i++) {
      rowArray.push(i)
    }
    const unVisitedRow = rowArray.filter(row => !visitedRow.includes(row))
    const finalQueenState = backTracking(queenState.slice(), unVisitedRow, length)
    if (finalQueenState) {
      setQueenState(finalQueenState)
    } else {
      setSolveable(false)
    }
  }, [length, queenState, idToRC])

  return (
    <div className="app">
      <Dropdown onClick={handleSelection} />
      <ChessBoard queens={queenState} onClick={handleBoxClick} lengthOfBoard={length} />
      <button className="resetButton" onClick={handleReset}>Reset</button>
      {/* {validity ? 'Go on' : "Sorry It's wrong move"} */}
      <div className="checkButton">
        <input type="checkbox" checked={computerMode} onChange={handleButtonClick}/>
        <p>Computer Mode</p>
      </div>
      {isGameOver && <p>..............You have solved a puzzle..................</p>}
      {!isSolveable && <p>------------------------Can't be solved----------------------</p>}
      {/* <p>Go on</p> */}
    </div>
  );
}

export default App;
