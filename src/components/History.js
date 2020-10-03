import React from 'react';
import './History.css'

const History = ({itemsCount, onHistoryItemClickCallback}) => {

  const renderHistoryBtn = () => {

    const renderedList = [];

    for (let i = 0; i < itemsCount - 1; i++){
      renderedList.push(
            <button 
              key={i}
              className="btn"
              onClick={() => {onHistoryItemClickCallback(i)}}>
              {i === 0 ? 'Back to START' : `Back to Move #${i}`}
            </button>
      );
    }
    return renderedList;
  }

  return (
    <div className="history-container">
      {renderHistoryBtn()}
    </div>
  );
}

export default History;