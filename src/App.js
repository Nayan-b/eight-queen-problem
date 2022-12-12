import React, { useCallback, useState } from 'react';
import ChessBoard from './components/Chessboard';
// import chessEngine from './components/ChessEngine';

import './App.css';

const initialState = {quenPosition: [0], validity: true}

const App = () => {
  const n = 8;

  const [queenState, setQueenState] = useState(initialState.quenPosition);
  const [validity, setValidity] = useState(initialState.validity);
  // const [clickedIndex, setClickedIndex] = useState(null);

  const idToRC = useCallback((id) => {
    const row = Math.floor(id/8);
    const col = id%8;
    return [row, col];
  }, []);

  const handleReset = useCallback(() => {
    setQueenState(initialState.quenPosition);
    setValidity(initialState.validity);
    // setClickedIndex(null);)
  }, []);

  const chessEngine = useCallback(() => {
      const queenStateRC = queenState.map((el) => idToRC(el));
      console.log(queenStateRC, 'filter Id')
      for (let i = 0; i < n; i++) {
        for (let j = i+1; j< n; j++) {
          if (queenStateRC[0] === i && queenStateRC[1] === j) {
            return true;
          }
        }
      }
      // checkRow();
      // checkColumn();
      // checkDiagonal();
  }, [idToRC, queenState]);

  const handleBoxClick = useCallback((index) => {
    // setClickedIndex(index);
    // console.log('clicked', index, 'queen', queenState);
    setQueenState((prev) => Array.from(new Set(prev).add(index)));
    const validity = chessEngine();
    setValidity(validity);
  }, [chessEngine]);

  return (
    <div className="app">
      <ChessBoard queens={queenState} onClick={handleBoxClick} />
      <button className="resetButton" onClick={handleReset}>Reset</button>
      {validity ? 'Go on' : "Sorry It's wrong move"}
    </div>
  );
}

export default App;
