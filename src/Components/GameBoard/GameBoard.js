import React, {Component} from 'react';
import DominoTile from '../DominoTile/DominoTile';
import './GameBoard.css';

const GameBoard = ({boardContainer, boardDominoClick}) => {
    return (
        <table>
            <tbody>
            {boardContainer.map((rowArr, i) => { 
                    return (
                        <tr key={i}>
                            {rowArr.map((domino, j) => {
                                return (
                                    <td key ={`${i}-${j}`} className={`td-domino-${domino.dir}`}>
                                        {domino !== '' ? <div className='domino-tile'><DominoTile firstNum={domino.firstNum} secondNum={domino.secondNum} dominoClick={boardDominoClick} dir={domino.dir} flipped={domino.flipped} x={i} y={j} /></div> : <div className="empty-cell"></div>}
                                    </td>
                                );

                            })}
                    </tr>
                    );    
                })}
            </tbody>
        </table>
    );
}

export default GameBoard;