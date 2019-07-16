import React from 'react';
import './UndoBtn.css';

const UndoBtn = ({undoMove, willStartNewGame}) => {
    return (
    <button type="button" className="btn" id="UndoBtn" onClick={undoMove}>
        {willStartNewGame ? <span>Undo (Start over)</span> : <span>Undo</span>}
    </button>
    );
}

export default UndoBtn;