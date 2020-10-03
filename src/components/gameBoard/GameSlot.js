import React from 'react';
import './GameSlot.css'

const GameSlot = ({value, matrixIndex, onGameSlotClickCallback}) => {
  
  const style = value ? `slot ${value}` : 'slot'
  
  return (
      <div 
        className={style}
        onClick={() => {onGameSlotClickCallback(matrixIndex)}}>
        {value}
      </div>
  );
}

export default GameSlot

