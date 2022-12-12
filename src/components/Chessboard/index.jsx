import React from 'react';
import Queen from '../Queen';

import styles from './styles.module.css';

const ChessBoard = (props) => {
    console.log('props', props);
    return (
      <div className={styles.boardStyle}>
        {Array(64).fill(0).map((_, index) => (
          <div key={index} style={{ backgroundColor: (index + Math.floor(index / 8)) % 2 === 0 ? '#fff' : '#000' }} className={styles.squareStyle} onClick={() => props.onClick(index)}>
            {props.queens.map(queen => (
              queen === index ? <Queen key={queen} /> : null
            ))}
          </div>
        ))}
      </div>
    );
}

export default ChessBoard;
