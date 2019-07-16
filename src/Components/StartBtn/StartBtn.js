import React from 'react';
import './StartBtn.css';

const StartBtn = ({startGame}) => {
    return (
    <button type="button" className="btn" id="StartBtn" onClick={startGame}>
        <span>Start Game</span>
    </button>
    );
}

export default StartBtn;