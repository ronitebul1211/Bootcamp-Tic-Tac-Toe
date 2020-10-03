import React from 'react';
import './GameBoard.css'
import GameSlot from './GameSlot';

const GameBoard = ({matrix, onGameSlotClickCallback}) => {

  const renderRows = () => {
    const renderedRows = [];
    for(let row = 0; row < matrix.length; row++){
      const renderedRow = (
        <div key={row} className="game-row">
          {
            matrix[row].map((value, col) => {
              return (
                <GameSlot 
                  key={col} 
                  value={value}
                  matrixIndex={{row, col}}
                  onGameSlotClickCallback={onGameSlotClickCallback}
                />
              )
            })
          }
        </div>
      );
      renderedRows.push(renderedRow);
    }
    return renderedRows;
  }

  return (
    <div className="game-board">
      {renderRows()}
    </div>
  );
}
export default GameBoard;
