import React, {Component} from 'react';
import DrawBtn from '../DrawBtn/DrawBtn';
import './Bank.css';

const Bank = ({currBank, drawTile}) => {
    return (
        <React.Fragment>
            <div className="bank">
                <div className="bank-item">
                    <h2>{currBank.length} Tiles left in the bank</h2>
                </div>
            </div>
            <div className='bank'>
                <div className='bank-item'>
                    <DrawBtn drawTile={drawTile}/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Bank;