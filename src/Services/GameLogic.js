export default class GameLogic {
    deepCloneHandOrBank(arrayToClone) {
        var clonedDomino, clonedArray = [];

        for (let i = 0; i < arrayToClone.length; i++) {
            clonedDomino = {
                firstNum: arrayToClone[i].firstNum,
                secondNum: arrayToClone[i].secondNum
            }
            clonedArray.push(clonedDomino);
        }
        return clonedArray;
    }

    deepCloneBoard(boardToClone) {
        var clonedDomino, clonedBoard = new Array (boardToClone.length);

        for (let i = 0; i < boardToClone.length; i++) {
            clonedBoard[i] = new Array(boardToClone.length);
        }

        for (let i = 0; i < boardToClone.length; i++) {
            for (let j = 0; j < boardToClone.length; j++) {
                if (boardToClone[i][j] === '') {
                    clonedDomino = '';
                }
                else {
                    clonedDomino = {
                        firstNum: boardToClone[i][j].firstNum,
                        secondNum: boardToClone[i][j].secondNum,
                        dir: boardToClone[i][j].dir,
                        flipped: boardToClone[i][j].flipped
                    }
                }
                clonedBoard[i][j] = clonedDomino;
            }
        }
        return clonedBoard;
    }

    deepCloneFlipLocationsArray(indexesArrayToClone) {
        var clonedObject, clonedArray = [];
        for (let k = 0; k < indexesArrayToClone.length; k++) {
            clonedObject = {
                i: indexesArrayToClone[k].i,
                j: indexesArrayToClone[k].j
            }
            clonedArray.push(clonedObject);
        }
        return clonedArray;
    }

    deepCloneValidIndexesArray(indexesArrayToClone) {
        var clonedObject, clonedArray = [];
        for (let k = 0; k < indexesArrayToClone.length; k++) {
            clonedObject = {
                i: indexesArrayToClone[k].i,
                j: indexesArrayToClone[k].j,
                dir: indexesArrayToClone[k].dir
            }
            clonedArray.push(clonedObject);

        }
        return clonedArray;
    }

    deepClonePrevNextStack(prevNextStack) {
        var newPrevNextStack = [], stackObj, stats;

        for (let i = 0; i < prevNextStack.length; i++) {
            stats = {...prevNextStack[i].currStats}
            stackObj = {
                boardContainer: this.deepCloneBoard(prevNextStack[i].boardContainer),
                currBank: this.deepCloneHandOrBank(prevNextStack[i].currBank),
                currHand: this.deepCloneHandOrBank(prevNextStack[i].currHand),
                currStats: stats
            }
            newPrevNextStack.push(stackObj);
        }

        return newPrevNextStack;
    }

    createStartBank() {   
        var startBank = [], dominoTile;
        //1. create tiles of (0,x) form:
        for (let i = 0; i <= 6; i++) {
            dominoTile = {firstNum: 0, secondNum: i}
            startBank.push(dominoTile);
        }
        //2. create tiles of (1,x) form without (1,0):
        for (let i = 1; i <= 6; i++) {
            dominoTile = {firstNum: 1, secondNum: i}
            startBank.push(dominoTile);
        }
        //3. create tiles of (2,x) form without (2,0) and (2,1)
        for (let i = 2; i <= 6; i++) {
            dominoTile = {firstNum: 2, secondNum: i}
            startBank.push(dominoTile);
        }
        //4. create tiles of (3,x) form without (3,0) and (3,1) and (3,2)
        for (let i = 3; i <= 6; i++) {
            dominoTile = {firstNum: 3, secondNum: i}
            startBank.push(dominoTile);
        }
        //5. create tiles of (4,x) form wihtout (4,0) and (4,1) and (4,2) and (4,3)
        for (let i = 4; i <= 6; i++) {
            dominoTile = {firstNum: 4, secondNum: i}
            startBank.push(dominoTile);
        }
        //6. create remaining tiles: (5,5) , (5,6) , (6,6)
        dominoTile = {firstNum: 5, secondNum: 5}
        startBank.push(dominoTile);
        dominoTile = {firstNum: 5, secondNum: 6}
        startBank.push(dominoTile);
        dominoTile = {firstNum: 6, secondNum: 6}
        startBank.push(dominoTile);
        startBank = this.shuffleBank(startBank);
        return startBank;
    }

    shuffleBank(bank) {
        var currentIndex = bank.length, temporaryValue, randomIndex;
      
        //While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          //Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          //And swap it with the current element.
          temporaryValue = bank[currentIndex];
          bank[currentIndex] = bank[randomIndex];
          bank[randomIndex] = temporaryValue;
        }
        return bank;
    }

    removeDominoFromHand(dominoToRemove, currHand) {
        //Removes a given domino from the current hand, returns hand after removal
        var i = 0, currDomino, newHand;
        newHand = this.deepCloneHandOrBank(currHand);
        //1. Search hand for the domino to remove
        currDomino = newHand[0];
        while (i < newHand.length && currDomino.firstNum !== dominoToRemove.firstNum ||
            currDomino.secondNum !== dominoToRemove.secondNum) {
            i++;
            currDomino = newHand[i];
        }
        //2. Remove domino from hand and return updated hand
        newHand.splice(i, 1);
        return newHand;
    }

    createStartBoard() {
        const boardSize = 28;
        var startBoard = new Array(boardSize);

        for (let i = 0; i < boardSize; i++) {
            startBoard[i] = new Array(boardSize);
        }
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                startBoard[i][j] = '';
            }
        }
        return startBoard;
    }

    createStartStats() {
        var startStats = {
            numOfDominosDrawn : 0,
            score : 0,
            numOfMovesPlayed : 0
        }
        return startStats;
    }

    createStartHand(bank) {
        var startHand = [], bankAfterStartHandCreated = this.deepCloneHandOrBank(bank);
        const startHandLen = 6;

        for (let i = 0; i < startHandLen; i++) {
            startHand.push(bankAfterStartHandCreated[bankAfterStartHandCreated.length - 1]);
            bankAfterStartHandCreated.pop();
        }
        return {startHand, bankAfterStartHandCreated}
    }

    getNewDataForDrawTile(bank, hand, stats, {boardLogicSize, boardPhySize}, validIndexes, locationsToFlip, currBoard) {
        var dominoToAddToHand, newObjForStack;
        var newData = {
            newBank: this.deepCloneHandOrBank(bank),
            newHand: this.deepCloneHandOrBank(hand),
            newStats: {...stats},
            newObjForStack: null
        };
        //1. Draw a domino from the bank
        dominoToAddToHand = {
            firstNum: newData.newBank[newData.newBank.length - 1].firstNum,
            secondNum: newData.newBank[newData.newBank.length - 1].secondNum
        }
        newData.newBank.pop();
        newData.newHand.push(dominoToAddToHand);
        //2. Update stats
        newData.newStats.numOfDominosDrawn++;
        newData.newStats.numOfMovesPlayed++;
        newData.newStats = this.calcScore(newData.newStats, newData.newHand);
        if (newData.newBank.length === 0) {
            this.checkIfPlayerLost(boardLogicSize, boardPhySize, newData.newHand, validIndexes, locationsToFlip, currBoard);
        }
        newObjForStack = this.getObjForPrevNextStack(currBoard, newData.newBank, newData.newHand, newData.newStats);
        newData.newObjForStack = newObjForStack;
        return newData;
    }

    calcScore(currStats, currHand) {
        var newStats = {...currStats};
        newStats.score = 0;
        if (currHand !== []) {
            for (var i = 0; i < currHand.length; i++) {
                newStats.score += currHand[i].firstNum;
                newStats.score += currHand[i].secondNum;
            }
        }
        return newStats;
    }

    checkIfPlayerLost(boardLogicSize, boardPhySize, currHand, validIndexes, locationsToFlip, currBoard) {
        if (boardLogicSize === 0) {
            return false;
        }
        for (let i = 0; i < currHand.length; i++) {
            for (let j = 0; j < boardPhySize; j++) {
                for (let k = 0; k < boardPhySize; k++) {
                    if (this.checkPlace(j, k, currHand[i], false, true, validIndexes, locationsToFlip, currBoard)) {
                        return false; //There are valid moves left
                    }
                }
            }
        }
        return true;
    }

    getDataForSecondMoveOrAbove(currBoard, dominoFromHand) {
        var dirToAdd, returnObj;
        var isDouble = false;
        var newBoardContainer = this.deepCloneBoard(currBoard);
        var dominoFromHandCopy = {
            firstNum: dominoFromHand.firstNum,
            secondNum: dominoFromHand.secondNum
        }
        var currValidAndFlipIndexes = {
            currValidIndexes: [],
            currLocationsToFlip: []
        }

        for (let i = 0; i < newBoardContainer.length; i++) {
            for (let j = 0; j < newBoardContainer.length; j++) {
                if (newBoardContainer[i][j] !== ''
                && newBoardContainer[i][j].firstNum !== 7) {  
                    if (newBoardContainer[i][j].firstNum === newBoardContainer[i][j].secondNum) {
                        isDouble = true;
                    }
                    currValidAndFlipIndexes = this.checkPlace(
                        i,
                        j,
                        dominoFromHandCopy,
                        isDouble,
                        false,
                        currValidAndFlipIndexes.currValidIndexes,
                        currValidAndFlipIndexes.currLocationsToFlip,
                        newBoardContainer
                    );
                    isDouble = false;
               } 
           }
        }

        for (let k = 0; k < currValidAndFlipIndexes.currValidIndexes.length; k++) {
            dirToAdd = currValidAndFlipIndexes.currValidIndexes[k].dir;
            newBoardContainer[currValidAndFlipIndexes.currValidIndexes[k].i][currValidAndFlipIndexes.currValidIndexes[k].j] = {
                firstNum: 7,
                secondNum: 8,
                dir: dirToAdd,
                flipped: false}
        }

        returnObj = {
            validIndexes: currValidAndFlipIndexes.currValidIndexes,
            locationsToFlip: currValidAndFlipIndexes.currLocationsToFlip,
            boardContainer: newBoardContainer
        }
        return returnObj;
    }

    checkPlace(i, j, dominoFromHand, isDouble, isCheckingLoss, validIndexes, locationsToFlip, currBoard) {
        var newBoardContainer = this.deepCloneBoard(currBoard);
        var newValidIndexes = this.deepCloneValidIndexesArray(validIndexes);
        var newLocationsToFlip = this.deepCloneFlipLocationsArray(locationsToFlip);
        var dirToAdd, returnObj;
        var dominoFromHandCopy = {
            firstNum: dominoFromHand.firstNum,
            secondNum: dominoFromHand.secondNum
        }

        if (newBoardContainer[i][j].firstNum === newBoardContainer[i][j].secondNum) {
            isDouble = true;
        }
        
        if (newBoardContainer[i][j].dir === "col" && !newBoardContainer[i][j].flipped && !isDouble) {
            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
                
                if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                    newLocationsToFlip.push({i: i - 1, j: j});
                }
            }

            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});             
                if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                    newLocationsToFlip.push({i: i + 1, j: j});
                }
            }
        }
        
        else if (newBoardContainer[i][j].dir === 'row' && !newBoardContainer[i][j].flipped && !isDouble) {

            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j + 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j + 1,
                    dir: dirToAdd});   
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd}); 
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd});           
                if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                    newLocationsToFlip.push({i: i, j: j - 1});
                }
            }

            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j + 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j + 1,
                    dir: dirToAdd});
                if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                    newLocationsToFlip.push({i: i, j: j + 1});
                }
            }
        }
        
        else if (newBoardContainer[i][j].flipped
        && newBoardContainer[i][j].dir === 'row'
        && !isDouble) {
            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.firstNum
                && newBoardContainer[i][j - 1] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                    newValidIndexes.push({
                        i: i,
                        j: j - 1,
                        dir: dirToAdd});

                    if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                        newLocationsToFlip.push({i: i, j: j - 1});
                    }
                }
    
                if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
                && newBoardContainer[i][j + 1] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                    newValidIndexes.push({
                        i: i,
                        j: j + 1,
                        dir: dirToAdd});

                    if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                        newLocationsToFlip.push({i: i, j: j + 1});
                    }
                }
    
                if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
                && newBoardContainer[i][j + 1] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                    newValidIndexes.push({
                        i: i,
                        j: j + 1,
                        dir: dirToAdd});
                }
    
                if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.secondNum
                && newBoardContainer[i][j - 1] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'col' : dirToAdd = 'row';
                    newValidIndexes.push({
                        i: i,
                        j: j - 1,
                        dir: dirToAdd});
                }
        }
        
        else if (newBoardContainer[i][j].flipped
        && newBoardContainer[i][j].dir === 'col'
        &&!isDouble) {

            if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.firstNum
                && newBoardContainer[i - 1][j] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                    newValidIndexes.push({
                        i: i - 1,
                        j: j,
                        dir: dirToAdd});

                    if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                        newLocationsToFlip.push({i: i - 1, j: j});
                    }
                }
    
                if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
                && newBoardContainer[i + 1][j] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                    newValidIndexes.push({
                        i: i + 1,
                        j: j,
                        dir: dirToAdd});
               
                    if (dominoFromHandCopy.firstNum !== dominoFromHandCopy.secondNum) {
                        newLocationsToFlip.push({i: i + 1, j: j});
                    }
                }
    
                if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
                && newBoardContainer[i + 1][j] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                    newValidIndexes.push({
                        i: i + 1,
                        j: j,
                        dir: dirToAdd});
                }
    
                if (newBoardContainer[i][j].secondNum === dominoFromHandCopy.secondNum
                && newBoardContainer[i - 1][j] === '') {
                    if (isCheckingLoss) {
                        return true;
                    }
                    dominoFromHandCopy.firstNum === dominoFromHandCopy.secondNum ? dirToAdd = 'row' : dirToAdd = 'col';
                    newValidIndexes.push({
                        i: i - 1,
                        j: j,
                        dir: dirToAdd});
                }
        }
        
        else if (newBoardContainer[i][j].dir === 'col' && isDouble) {

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j + 1] === '') { 
                if (isCheckingLoss) {
                    return true;
                }   
            dirToAdd = 'row';
            newValidIndexes.push({
                i: i,
                j: j + 1,
                dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd});             
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j + 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j + 1,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i, j: j + 1});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i, j: j - 1});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i - 1, j: j});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i + 1, j: j});
            } 
        }
        
        else if (newBoardContainer[i][j].dir === 'row' && isDouble) {

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j + 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j + 1,
                    dir: dirToAdd});
            }

            if(newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd});
            }

            if(newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i][j + 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j + 1,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i, j: j + 1});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i][j - 1] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'row';
                newValidIndexes.push({
                    i: i,
                    j: j - 1,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i, j: j - 1});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.firstNum
            && newBoardContainer[i - 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i - 1,
                    j: j,
                    dir: dirToAdd});
                newLocationsToFlip.push({i: i - 1, j: j});
            }

            if (newBoardContainer[i][j].firstNum === dominoFromHandCopy.secondNum
            && newBoardContainer[i + 1][j] === '') {
                if (isCheckingLoss) {
                    return true;
                }
                dirToAdd = 'col';
                newValidIndexes.push({
                    i: i + 1,
                    j: j,
                    dir: dirToAdd});                
                newLocationsToFlip.push({i: i + 1, j: j});
            }
        }

        returnObj = {
            currValidIndexes: newValidIndexes,
            currLocationsToFlip: newLocationsToFlip
        }

        return returnObj;
    }

    isNewDominoFlipped(locationsToFlip, iParam, jParam) {
        for(let k = 0; k < locationsToFlip.length; k++) {
            if (locationsToFlip[k].i === iParam && locationsToFlip[k].j === jParam) {
                return true;
            }
        }
        return false;
    }

    isBoardClickValid(validIndexes, iParam, jParam) {
        for (let k = 0; k < validIndexes.length; k++) {
            if (validIndexes[k].i === iParam && validIndexes[k].j === jParam) {
                return true;
            }
        }
        return false;
    }

    getUpdatedStackOffset(numOfPrevNext, stackOffset) {
        var updatedOffset;

        if (numOfPrevNext === 0) {
            updatedOffset = stackOffset + 2;
        }
        else {
            updatedOffset = stackOffset + 1;
        }
        return updatedOffset;
    }

    cleanYellowDominos(boardContainer, validIndexes) {
        var newBoardContainer = this.deepCloneBoard(boardContainer);
        for (let k = 0; k < validIndexes.length; k++) {
            if (newBoardContainer[validIndexes[k].i][validIndexes[k].j].firstNum === 7) {
                newBoardContainer[validIndexes[k].i][validIndexes[k].j] = '';
            }
        }
        return newBoardContainer;
    }

    getNewDataForUndoMove(numOfUndo, prevNextStack) {
        var newData = {
            prevMove: null,
            newBoardContainerSize: 0,
            newPrevNextStack: this.deepClonePrevNextStack(prevNextStack)
        }

        if (numOfUndo === 0) {
            newData.newPrevNextStack.pop();
            newData.prevMove = newData.newPrevNextStack.pop();
        }
        else {
            newData.prevMove = newData.newPrevNextStack.pop();
        }
        for (let i = 0; i < newData.prevMove.boardContainer.length; i++) {
            for (let j = 0; j < newData.prevMove.boardContainer.length; j++) {
                if (newData.prevMove.boardContainer[i][j] !== '') {
                    newData.newBoardContainerSize++;
                }
            }
        }
        return newData;
    }

    getObjForPrevNextStack(board, bank, hand, stats) {
        var retObj;

        retObj = {
            boardContainer: this.deepCloneBoard(board),
            currBank: this.deepCloneHandOrBank(bank),
            currHand: this.deepCloneHandOrBank(hand),
            currStats: {...stats}
        }
        return retObj;
    }

    getNewDataForStartGame() {
        var newData;

        newData = {
            startStats: this.createStartStats(),
            startBoard: this.createStartBoard(),
            startBankAndHand: this.createStartHand(this.createStartBank()),
            startObjForStack: null
        }
        newData.startObjForStack = this.getObjForPrevNextStack(
            newData.startBoard,
            newData.startBankAndHand.bankAfterStartHandCreated,
            newData.startBankAndHand.startHand,
            newData.startStats
        )
        return newData;
    }

    getNewDataForFirstMove(boardMid, currBoard, dominoFromHand, currHand, currStats, currBank) {
        var newData = {
            newBoardContainer: this.deepCloneBoard(currBoard),
            newHand: this.deepCloneHandOrBank(currHand),
            newStatistics: {...currStats},
            newObjForStack: null
        }
        
        newData.newBoardContainer[boardMid][boardMid] = {
            firstNum: dominoFromHand.firstNum,
            secondNum: dominoFromHand.secondNum,
            dir: 'row',
            flipped: false
        };
        newData.newHand = this.removeDominoFromHand(dominoFromHand, newData.newHand);
        newData.newStatistics.numOfMovesPlayed = 1;
        newData.newStatistics = this.calcScore(newData.newStatistics, newData.newHand);
        newData.newObjForStack = this.getObjForPrevNextStack(
            newData.newBoardContainer,
            currBank,
            newData.newHand,
            newData.newStatistics);
        return newData;
    }

    getNewDataForBoardClick(board, validIndexes, dominoToAdd, iParam, jParam, currHand, currStats, boardSize, locationsToFlip, bank) {
        var newData = {
            newBoardContainer: this.deepCloneBoard(board),
            newHand: this.deepCloneHandOrBank(currHand),
            newStatistics: {...currStats},
            newBoardContainerSize: boardSize + 1,
            newObjForStack: null,
            endGame: false,
        };
        var newDomino = {
            firstNum: dominoToAdd.firstNum,
            secondNum: dominoToAdd.secondNum,
            dir: newData.newBoardContainer[iParam][jParam].dir,
            flipped: this.isNewDominoFlipped(locationsToFlip, iParam, jParam)
        };
        newData.newBoardContainer[iParam][jParam] = newDomino;
        newData.newBoardContainer = this.cleanYellowDominos(newData.newBoardContainer, validIndexes);
        newData.newHand = this.removeDominoFromHand(newDomino, newData.newHand);
        newData.newStatistics.numOfMovesPlayed++;
        newData.newStatistics = this.calcScore(newData.newStatistics, newData.newHand);
        newData.newObjForStack = this.getObjForPrevNextStack(
            newData.newBoardContainer,
            bank,
            newData.newHand,
            newData.newStatistics);
        if (newData.newHand.length === 0) {
            newData.endGame = true;
            alert ('Congratulations, you won!');
        }
        else if (bank.length === 0) {
            newData.endGame = this.checkIfPlayerLost(newData.newBoardContainerSize, 28, newData.newHand);
            alert('Oh no, you lost!');
        }
        return newData;
    }
}