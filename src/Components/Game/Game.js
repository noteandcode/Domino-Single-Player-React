import React, {Component} from 'react';
import GameBoard from '../GameBoard/GameBoard';
import StartBtn from '../StartBtn/StartBtn';
import Hand from '../Hand/Hand';
import Bank from '../Bank/Bank';
import Statistics from '../Statistics/Statistics';
import PrevBtn from '../PrevBtn/PrevBtn';
import NextBtn from '../NextBtn/NextBtn';
import ChangeDominoBtn from '../ChangeDominoBtn/ChangeDominoBtn';
import UndoBtn from '../UndoBtn/UndoBtn';
import GameLogic from '../../Services/GameLogic.js'
import './Game.css';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            isGameOver: false,
            isGameStarted: false,
            currBank: null, //[{firstNum, secondNum}]
            currHand: [], //[{firstNum, secondNum}]
            boardContainer: [], //28x28 matrix, empty cell = '', cell with a domino = {firstNum, secondNum, dir}
            boardContainerSize: 0,
            dominoToAdd: null, //{firstNum , secondNum}
            locationsToFlip: [], //[{i, j}] 
            validIndexes: [], //[{i, j, dir}]
            statistics: {
                numOfMovesPlayed: 0,
                numOfDominosDrawn: 0,
                score: 0
            },
            prevNextStack: [],
            stackOffset: 0,
            showChangeDominoBtn: false,
            gameNum: 0,
            numOfUndo: 0,
            numOfPrevNext: 0
        };
        this.gameLogic = new GameLogic();
        this.undoMove = this.undoMove.bind(this);
        this.changeDominoBtnClick = this.changeDominoBtnClick.bind(this);
        this.handDominoClick = this.handDominoClick.bind(this);
        this.boardDominoClick = this.boardDominoClick.bind(this);
        this.drawTile = this.drawTile.bind(this);
        this.startGame = this.startGame.bind(this);
        this.prevBtnClick = this.prevBtnClick.bind(this);
        this.nextBtnClick = this.nextBtnClick.bind(this);
    }

    //----------GAME LOGIC----------
    drawTile() {
        var newData;
        var newPrevNextStack = this.gameLogic.deepClonePrevNextStack(this.state.prevNextStack);
    
        if (this.state.currBank.length === 0) {
            alert ('No more dominos to draw!');
            return;
        }
        //1. Get new data for set state
        newData = this.gameLogic.getNewDataForDrawTile(
            this.state.currBank,
            this.state.currHand,
            this.state.statistics,
            {
                boardLogicSize: this.state.boardContainerSize,
                boardPhySize: 28
            },
            this.state.validIndexes,
            this.state.locationsToFlip,
            this.state.boardContainer
        );
        //2. update values in state
        this.setState({
            currBank: newData.newBank,
            currHand: newData.newHand,
            statistics: newData.newStats,
            prevNextStack: newPrevNextStack.concat([newData.newObjForStack])
        });
    }

    secondMoveOrAbove(dominoFromHand) {
        var dominoFromHandCopy = {
            firstNum: dominoFromHand.firstNum,
            secondNum: dominoFromHand.secondNum
        }
        var newData = this.gameLogic.getDataForSecondMoveOrAbove(this.state.boardContainer, dominoFromHandCopy);

        this.setState({
            boardContainer: newData.boardContainer,
            validIndexes: newData.validIndexes,
            locationsToFlip: newData.locationsToFlip,
            dominoToAdd: dominoFromHandCopy,
            showChangeDominoBtn: true
        });
    }
    //------------------------------

    //----------EVENT HANDLERS----------
    startGame() {
        var newData;

        newData = this.gameLogic.getNewDataForStartGame();
        this.setState({
            isGameStarted: true,
            numOfUndo: 0,
            numOfPrevNext: 0,
            isGameOver: false,
            gameNum: this.state.gameNum + 1,
            currHand: newData.startBankAndHand.startHand,
            currBank: newData.startBankAndHand.bankAfterStartHandCreated,
            boardContainer: newData.startBoard,
            boardContainerSize: 0,
            statistics: newData.startStats,
            prevNextStack: [newData.startObjForStack]
        });
    }

    handDominoClick(dominoFromHand) {
        var newData;
        var prevNextStack = this.gameLogic.deepClonePrevNextStack(this.state.prevNextStack);
        const boardMid = 14;

        if (this.state.isGameOver) {
            return;
        }
        if (this.state.boardContainerSize === 0) { //First move!
            newData = this.gameLogic.getNewDataForFirstMove(
                boardMid,
                this.state.boardContainer,
                dominoFromHand,
                this.state.currHand,
                this.state.statistics,
                this.state.currBank);
            this.setState({
                boardContainer: newData.newBoardContainer,
                currHand: newData.newHand,
                statistics: newData.newStatistics,
                boardContainerSize: 1,
                prevNextStack: prevNextStack.concat([newData.newObjForStack])
            });
        }
        else {
            this.secondMoveOrAbove(dominoFromHand);
        }
    }

    boardDominoClick(iParam, jParam) {
        var newData, isClickValid;
        var prevNextStack = this.gameLogic.deepClonePrevNextStack(this.state.prevNextStack);
        //0. Exit if user clicked on board before hand OR game has ended (user viewing moves via prev next)
        if (!this.state.dominoToAdd || this.state.isGameOver) {
            return;
        }
        isClickValid = this.gameLogic.isBoardClickValid(this.state.validIndexes, iParam, jParam);
        if (isClickValid) {
            newData = this.gameLogic.getNewDataForBoardClick(
                this.state.boardContainer,
                this.state.validIndexes,
                this.state.dominoToAdd,
                iParam,
                jParam,
                this.state.currHand,
                this.state.statistics,
                this.state.boardContainerSize,
                this.state.locationsToFlip,
                this.state.currBank
            );
            this.setState({
                boardContainer: newData.newBoardContainer,
                currHand: newData.newHand,
                dominoToAdd: null,
                statistics: newData.newStatistics,
                boardContainerSize: newData.newBoardContainerSize,
                showChangeDominoBtn: false,
                prevNextStack: prevNextStack.concat([newData.newObjForStack]),
                isGameOver: newData.endGame ? true : false,
                isGameStarted: newData.endGame ? false : true
            });
        }
        else {
            alert("Illegal move - Please try again!");
        }
    }

    prevBtnClick() {
        var updatedOffset, prevNextStack;

        prevNextStack = this.gameLogic.deepClonePrevNextStack(this.state.prevNextStack);
        updatedOffset = this.gameLogic.getUpdatedStackOffset(this.state.numOfPrevNext, this.state.stackOffset);
        if (prevNextStack.length - updatedOffset < 0) {
            return;
        }
        else {
            this.setState({
                statistics: prevNextStack[prevNextStack.length - updatedOffset].currStats,
                boardContainer: prevNextStack[prevNextStack.length - updatedOffset].boardContainer,
                currHand: prevNextStack[prevNextStack.length - updatedOffset].currHand,
                currBank: prevNextStack[prevNextStack.length - updatedOffset].currBank,
                stackOffset: updatedOffset,
                numOfPrevNext: this.state.numOfPrevNext + 1
            });
        }
    }

    nextBtnClick() {
        var updatedOffset, prevNextStack;

        prevNextStack = this.gameLogic.deepClonePrevNextStack(this.state.prevNextStack);
        updatedOffset = this.state.stackOffset - 1;
        if (updatedOffset === 0) {
            return;
        }
        else {
            this.setState({
                statistics: prevNextStack[prevNextStack.length - updatedOffset].currStats,
                boardContainer: prevNextStack[prevNextStack.length - updatedOffset].boardContainer,
                currHand: prevNextStack[prevNextStack.length - updatedOffset].currHand,
                currBank: prevNextStack[prevNextStack.length - updatedOffset].currBank,
                stackOffset: updatedOffset
            });
        }
    }

    changeDominoBtnClick() {
        var newBoardContainer;

        newBoardContainer = this.gameLogic.cleanYellowDominos(this.state.boardContainer, this.state.validIndexes);
        this.setState({
            boardContainer: newBoardContainer,
            validIndexes: [],
            locationsToFlip: [],
            showChangeDominoBtn: false
        });
    }

    undoMove() {
        var newData = this.gameLogic.getNewDataForUndoMove(
            this.state.numOfUndo,
            this.state.prevNextStack)

        if (newData.newBoardContainerSize === 0) {
            this.startGame();
        }
        else {
            this.setState({
                currBank: newData.prevMove.currBank,
                currHand: newData.prevMove.currHand,
                boardContainer: newData.prevMove.boardContainer,
                statistics: newData.prevMove.currStats,
                prevNextStack: newData.newPrevNextStack,
                boardContainerSize: newData.newBoardContainerSize,
                numOfUndo: this.state.numOfUndo + 1
            });
        }
    }
    //----------------------------------

    render() {
        return (
            <div className="game">
                {this.state.boardContainer ? 
                    <div className='gameboard'>
                        <GameBoard boardContainer={this.state.boardContainer} boardDominoClick={this.boardDominoClick} />
                    </div> : null
                }

                <div className='buttons'>
                    <div className='buttons-item'>
                        {!this.state.isGameStarted ? <StartBtn startGame={this.startGame}/> : null}
                    </div>
                    <div className='buttons-item'>
                        {this.state.boardContainerSize > 0 && this.state.isGameStarted ?
                            <UndoBtn undoMove={this.undoMove} willStartNewGame={this.state.boardContainerSize === 1} />
                        : null}
                    </div>
                    <div className='buttons-item'>
                        {this.state.showChangeDominoBtn && !this.state.isGameOver ?
                            <ChangeDominoBtn changeDominoBtnClick={this.changeDominoBtnClick} />
                        : null}
                    </div>
                </div>
                {this.state.isGameStarted ? <Bank drawTile={this.drawTile} currBank={this.state.currBank} /> : null}
                <Hand currHand={this.state.currHand} handDominoClick={this.handDominoClick}/>

                {!this.state.isGameStarted && this.state.isGameOver ?
                    <div className='buttons'>
                        <div className='buttons-item'>
                            <PrevBtn prevClick={this.prevBtnClick} />
                        </div>
                        <div className='buttons-item'>
                            <NextBtn nextClick={this.nextBtnClick} />
                        </div>
                    </div> : null}

                {this.state.isGameStarted || this.state.isGameOver ?
                    <Statistics statsObj={this.state.statistics}
                        isGameStarted={this.state.isGameStarted}
                        isGameOver={this.state.isGameOver}
                        gameNum={this.state.gameNum}/>
                    : null}
            </div>
        );
    }
}