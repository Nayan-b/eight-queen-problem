import React, { useCallback, useState, useEffect } from 'react';
import ChessBoard from './components/Chessboard';
import Dropdown from './components/Dropdown';

import './App.css';

const initialState = {row: 8, quenPosition: [], validity: true};

const App = () => {
  const [length, setLength] = useState(+initialState.row);
  const [queenState, setQueenState] = useState(initialState.quenPosition);
  const [validity, setValidity] = useState(initialState.validity);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isGameOver, setGameOver] = useState(false);

  const idToRC = useCallback((id) => {
    const row = Math.floor(id/length);
    const col = id%length;
    return [row, col];
  }, [length]);

  const handleReset = useCallback(() => {
    setQueenState(initialState.quenPosition);
    setValidity(initialState.validity);
    setClickedIndex(null);
  }, []);

  const chessEngine = useCallback((queenState) => {
    const queenStateRC = queenState.map((el) => idToRC(el));
    const [row, column] = queenStateRC.pop();

    const checkRC = queenStateRC.some((el) => el[0] === row || el[1] === column);
    const checkDiagonal = queenStateRC.some((el) => Math.abs(el[0] - row) === Math.abs(el[1] - column))
    const isInvalidMove = checkRC || checkDiagonal;

    setValidity(!isInvalidMove);
    if(isInvalidMove) {
      setQueenState((prevState) => prevState.filter((_, i) => i !== queenState.length-1))
    }
  }, [idToRC]);

  const handleBoxClick = useCallback((index) => {
    setClickedIndex(index);
    setQueenState((prev) => Array.from(new Set(prev).add(index)));
  }, []);

  useEffect(() => {
    queenState.length > 1 && chessEngine(queenState);
  }, [chessEngine, clickedIndex, queenState]);

  const handleSelection = useCallback((index) => {
    handleReset();
    setLength(index);
  }, [handleReset]);

  useEffect(() => {
    if (queenState.length === +length) {
      setGameOver(true);
      setTimeout(() => {
        handleReset();
        setGameOver(false);
      }, 3000);
    }
  }, [handleReset, queenState, length]);

  return (
    <div className="app">
      <Dropdown onClick={handleSelection} />
      {isGameOver && <p>..............You have solved a problem..................</p>}
      <ChessBoard queens={queenState} onClick={handleBoxClick} lengthOfBoard={length} />
      <button className="resetButton" onClick={handleReset}>Reset</button>
      {validity ? 'Go on' : "Sorry It's wrong move"}
    </div>
  );
}

export default App;
