import React, {useState} from 'react';
import './TicTacToePage.css'
import GameBoard from '../gameBoard/GameBoard';
import History from '../History';

const TicTacToePage = () => {

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [history, setHistory] = useState([[[null, null, null], [null, null, null], [null, null, null]]])
  const [winner, setWinner] = useState(null);



  const onGameSlotClick = (matrixPosition) => {
    if (isGameSlotAvailable(matrixPosition)) {
      saveMoveInHistory(matrixPosition);
      setCurrentPlayer(getNextPlayer());
    }   
  }

  const onHistoryItemClick = (itemIndex) => {
    const historyCopy = getHistoryDeepCopy(history);
    historyCopy.splice(itemIndex + 1);
    setWinner(getWinner(historyCopy[historyCopy.length-  1]));
    setHistory(historyCopy);
  }

  const isGameSlotAvailable = ({row, col}) => {
    const matrix = history[history.length-1];
    return matrix[row][col] === null;
  }

  const saveMoveInHistory = ({row, col}) => {
    const matrix = history[history.length-1];
    const matrixCopy = getMatrixDeepCopy(matrix);
    matrixCopy[row][col] = currentPlayer;
    const historyCopy = getHistoryDeepCopy();
    historyCopy.push(matrixCopy);
    setHistory(historyCopy); 
    //Check wining
    const roundWinner = getWinner(matrixCopy);
    if(roundWinner){
      setWinner(roundWinner);
    }
  }

  const getNextPlayer = () => {
    if(currentPlayer === 'X'){
      return 'O';
    } else if (currentPlayer === 'O'){
      return 'X';
    } else {
      throw new Error('Current player Should be X or O only')
    }
  }

  function getWinner(board) {
    // check row
    if ((board[0][0] === board[0][1]) && (board[0][0] === board[0][2])) {
        return board[0][0];
    }
    if ((board[1][0] === board[1][1]) && (board[1][0] === board[1][2])) {
        return board[1][0];
    }
    if ((board[2][0] === board[2][1]) && (board[2][0] === board[2][2])) {
        return board[2][0];
    }
    
    // check column
    if ((board[0][0] === board[1][0]) && (board[0][0] === board[2][0])) {
        return board[0][0];
    }
    if ((board[0][1] === board[1][1]) && (board[0][1] === board[2][1])) {
        return board[0][1];
    }
    if ((board[0][2] === board[1][2]) && (board[0][2] === board[2][2])) {
        return board[0][2];
    }
    
    // check diagonal
    if ((board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) {
        return board[0][0];
    }
    if ((board[0][2] === board[1][1]) && (board[2][2] === board[2][0])) {
        return board[0][2];
    }
    return null;
  }

  const getHistoryDeepCopy = () => {
    const historyCopy = [];
    for (let i = 0; i < history.length; i++ ) {
      historyCopy.push(getMatrixDeepCopy(history[i]));
    }
    return historyCopy;
  }

  const getMatrixDeepCopy = (matrix) => {
    const matrixCopy = [];
    for(let row = 0; row < matrix.length; row++){
      const rowCopy = [...matrix[row]]
      matrixCopy.push(rowCopy);
    }
    return matrixCopy;
  }


  return (
    <div className="tic-tac-toe-container">
      <div className="title">Tic Tac Toe</div>
      <GameBoard
        matrix={history[history.length - 1]}
        onGameSlotClickCallback={onGameSlotClick}
      />
      <div className="info-container">
        <History
          itemsCount={history.length}
          onHistoryItemClickCallback={onHistoryItemClick}
        />
        <div className="status">
          {winner ? `winner is: ${winner}` : `Next Player: ${currentPlayer}`}
        </div>
      </div>
    </div>
  );
}
export default TicTacToePage