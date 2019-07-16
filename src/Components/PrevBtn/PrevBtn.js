import React from 'react';
import './PrevBtn.css';

const PrevBtn = ({prevClick}) => {
    return (
    <button type="button" className="btn" id="prevBtn" onClick={prevClick}>
        <span>Prev</span>
    </button>

    );
}

export default PrevBtn;