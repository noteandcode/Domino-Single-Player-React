import React from 'react';
import './DrawBtn.css';

const DrawBtn = ({drawTile}) => {
    return (
        <button type="button" className="btn" id="drawBtn" onClick={drawTile}>
            <span>Draw tile</span>
        </button>
    );
}

export default DrawBtn;