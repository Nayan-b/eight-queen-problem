import React, { useCallback, useState, useEffect } from 'react';
import ChessBoard from './components/Chessboard';
import Dropdown from './components/Dropdown';
import backTracking from './components/backtracking';

import './App.css';

const initialState = {row: 8, quenPosition: [], validity: true};

const App = () => {
  const [length, setLength] = useState(+initialState.row);
  const [queenState, setQueenState] = useState(initialState.quenPosition);
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
    // setValidity(initialState.validity);
    setGameOver(false);
    // setClickedIndex(null);
  }, []);

  useEffect(() => {
    // console.log("34  ", queenState, length)
    console.log(backTracking(queenState, length))
  }, [queenState, length]);

  const chessEngine = useCallback((queenState) => {
    const queenStateRC = queenState.map((el) => idToRC(el));
    const [row, column] = queenStateRC.pop();
    console.log("\nqueenState  ", queenStateRC)
    const checkRC = queenStateRC.find((el) => el[0] === row || el[1] === column);
    const checkDiagonal = queenStateRC.find((el) => Math.abs(el[0] - row) === Math.abs(el[1] - column))
    const isInvalidMove = checkRC || checkDiagonal || checkRC;
    console.log(isInvalidMove);
    if (isInvalidMove) return RCToId(...isInvalidMove)
    return isInvalidMove
  }, [idToRC, RCToId]);

  const handleBoxClick = useCallback((index) => {
    // console.log(index, idToRC(index))
    const isInvalidMove = chessEngine([...queenState, index])
    if (!isInvalidMove && isInvalidMove !== 0) {
      // setClickedIndex(index);
      console.log("is valid move")
      setQueenState((prev) => Array.from(new Set(prev).add(index)));
    }
  }, [chessEngine, queenState]);

  const handleSelection = useCallback((index) => {
    handleReset();
    setLength(index);
  }, [handleReset]);

  useEffect(() => {
    if (queenState.length === +length) {
      console.log(queenState, queenState.map(el => idToRC(el)))
      setGameOver(true);
      // setTimeout(() => {
      //   handleReset();
      //   setGameOver(false);
      // }, 3000);
    }
  }, [handleReset, queenState, length, idToRC]);

  return (
    <div className="app">
      <Dropdown onClick={handleSelection} />
      {isGameOver && <p>..............You have solved a problem..................</p>}
      <ChessBoard queens={queenState} onClick={handleBoxClick} lengthOfBoard={length} />
      <button className="resetButton" onClick={handleReset}>Reset</button>
      {/* {validity ? 'Go on' : "Sorry It's wrong move"} */}
      <p>Go on</p>
    </div>
  );
}

export default App;
