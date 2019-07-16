import React from 'react';
import './NextBtn.css';

const NextBtn = ({nextClick}) => {
    return (
        <button type="button" className="btn" id="nextBtn" onClick={nextClick}>
            <span>Next</span>
        </button>

    );
}

export default NextBtn;