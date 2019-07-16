import React, {Component} from 'react';
import './Hand.css';
import DominoTile from '../DominoTile/DominoTile';

const Hand = ({currHand, handDominoClick}) => {
    return (
        <div className ="hand">
            {currHand.map((domino, i) =>
                <div className='hand-item' key={i}>
                    <DominoTile firstNum={domino.firstNum} secondNum={domino.secondNum}
                    dominoClick={handDominoClick} dir='col' flipped={false}/>
                </div>)}
        </div>
    );
}

export default Hand;