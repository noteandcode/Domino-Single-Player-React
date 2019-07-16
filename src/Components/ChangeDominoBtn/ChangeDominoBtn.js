import React from 'react';
import './ChangeDominoBtn.css';

const ChangeDominoBtn = ({changeDominoBtnClick}) => {
    return (
        <button type="button" className="btn" id="drawBtn" onClick={changeDominoBtnClick}>
            <span>Change Domino</span>
        </button>
    );
}

export default ChangeDominoBtn;