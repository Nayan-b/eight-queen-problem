import React, { useMemo } from 'react';
import Queen from '../Queen';

import styles from './styles.module.css';

const ChessBoard = (props) => {
  const squareLength = useMemo(() => 40, []);
  const boardStyle = {
    width: `${props.lengthOfBoard * squareLength}px`,
    height: `${props.lengthOfBoard * squareLength}px`,
    margin: '20px auto',
    display: 'grid',
    gridTemplate: `repeat(${props.lengthOfBoard}, 1fr) / repeat(${props.lengthOfBoard}, 1fr)`
  };

  const squareStyle = {
    border: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${squareLength}px`,
    height: `${squareLength}px`,
  };

  return (
    <div style={boardStyle}>
      {Array(props.lengthOfBoard ** 2).fill(0).map((_, index) => (
        <div key={index} style={{...squareStyle, backgroundColor: (index + (props.lengthOfBoard % 2 === 0 ? Math.floor(index / props.lengthOfBoard) : 0)) % 2 === 0 ? '#fff' : '#000' }} onClick={() => props.onClick(index)} className={styles.squareStyle}>
          {props.queens?.map(queen => (
            queen === index ? <Queen key={queen} /> : null
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
