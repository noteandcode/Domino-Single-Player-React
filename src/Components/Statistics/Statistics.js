import React, {Component} from 'react';
import './Statistics.css';

class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            startTime: null,
            totalTime: 0,
            minutes: 0,
            seconds: 0,
            gameNum: 1
        }
        this.interval = null;
        this.getTimeStats = this.getTimeStats.bind(this);
    }

    componentDidMount() {
        this.setState({startTime: Date.now()}, () => {
            this.interval = setInterval(this.getTimeStats, 1000);
        })
    }

    componentDidUpdate(prevProps) {
        //Reset timer when user starts a new game
        if (this.props.gameNum > prevProps.gameNum) {
            clearInterval(this.interval);
            this.setState({startTime: Date.now(), gameNum: this.props.gameNum, totalTime: 0}, () => {
                this.interval = setInterval(this.getTimeStats, 1000);
            });
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTimeStats() {
        var newTotalTime = this.state.totalTime;
        var newMinutes, newSeconds;
        var millis = Date.now() - this.state.startTime;

        if (this.props.isGameOver) {
            clearInterval(this.interval);
            return;
        }
        else if (this.props.isGameStarted && !this.props.isGameOver)
        {
            newTotalTime++;
            newMinutes = Math.floor(millis / 60000);
            newSeconds = ((millis % 60000) / 1000).toFixed(0);
            this.setState({
                totalTime: newTotalTime,
                minutes: newMinutes,
                seconds: newSeconds,
                timeRestarted: false});
        }
    }

    render() {
        return (
            <div className="statistics">
            <h2>Statistics:</h2>
            <h3>Moves played: {this.props.statsObj.numOfMovesPlayed}</h3>
            <h3>Game duration: {this.state.minutes} minutes and {this.state.seconds} seconds</h3>
            {this.props.statsObj.numOfMovesPlayed > 0 ?
                <h3>Average time per move: {Math.floor(this.state.totalTime / this.props.statsObj.numOfMovesPlayed)} 
                seconds</h3> : null}
            <h3>Dominos drawn: {this.props.statsObj.numOfDominosDrawn} </h3>
            <h3>Score: {this.props.statsObj.score}</h3>
        </div>
        );
    }
}

export default Statistics;