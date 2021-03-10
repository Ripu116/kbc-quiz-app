import React, { Component } from 'react';
import classes from './Question.module.css';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

class Question extends Component {
    state = {
        finished: false,
        currentQuestion: 0,
        questions: [
            {
                question: '"I would go to war with Dhoni by my side." - who said this?',
                options: ['Virat Kohli', 'Ravi Shastri', 'Sourav Ganguly', 'Gary Kirsten'],
                correctAnswer: 3,
                chosenOption: 0
            },
            {
                question: 'Where did MS Dhoni make his Test captaincy debut?',
                options: ['Delhi', 'Mohali', 'Kanpur', 'Nagpur'],
                correctAnswer: 2,
                chosenOption: 0
            },
            {
                question: "Who is MS Dhoni's only ODI wicket?",
                options: ['Marlon Samuels', 'Travis Dowlin', 'Kevin Pietersen', 'Daren Sammy'],
                correctAnswer: 1,
                chosenOption: 0
            },
            {
                question: "Dhoni's maiden Test and ODI century both came against the same opponent. Name the team.",
                options: ['Pakistan', 'Sri Lanka', 'West Indies', 'Australia'],
                correctAnswer: 0,
                chosenOption: 0
            },
            {
                question: 'MS Dhoni made a surprise Test retirement call at the age of 33. Where did he play his final Test?',
                options: ['SCG', 'WACA', 'MCG', 'Adelaide Oval'],
                correctAnswer: 2,
                chosenOption: 0
            },
            {
                question: 'Which rank does MS Dhoni hold in the Territorial Indian army which was conferred upon him?',
                options: ['Major General', 'Captain', 'Brigadier General', 'Lieutenant Colonel'],
                correctAnswer: 3,
                chosenOption: 0
            },
            {
                question: 'MS Dhoni has captained India in 332 international games which is the most. But under whose captaincy has he played the most?',
                options: ['Rahul Dravid', 'Sourav Ganguly', 'Virat Kohli', 'Anil Kumble'],
                correctAnswer: 0,
                chosenOption: 0
            },
            {
                question: 'It took MS Dhoni 76 innings before registering his first T20I fifty. Against which team did he get it finally?',
                options: ['West Indies', 'New Zealand', 'England', 'Sri Lanka'],
                correctAnswer: 2,
                chosenOption: 0
            },
            {
                question: 'Which of these IPL records does MS Dhoni hold?',
                options: ['Most Matches', 'Most Catches', 'Most Sixes', 'Most runs in last over'],
                correctAnswer: 3,
                chosenOption: 0
            },
            {
                question: 'Identify this England batsman who was at the receiving end of this famous lightning stumping?',
                options: ['Jonathan Trott', 'James Tredwell', 'Ian Bell', 'Joe Root'],
                correctAnswer: 2,
                chosenOption: 0
            }
        ],
        score: 0
    }

    onClickHandler = (index) => {
        let questions = [...this.state.questions]
        let question = {...questions[this.state.currentQuestion]}
        question.chosenOption = index
        if(index === question.correctAnswer){
            const newScore = this.state.score + 1
            this.setState({score: newScore})
        }
        questions[this.state.currentQuestion] = question
        this.setState({questions: questions})
        if(!this.state.finished && this.state.currentQuestion !== this.state.questions.length - 1){
            const nextQuestion = this.state.currentQuestion + 1;
            this.setState({currentQuestion: nextQuestion})
        } else {
            this.setState({finished: true})
        }
    }

    refreshPage = () => {
        window.location.reload(false);
      }

    render () {
        let layout = this.state.finished 
            ? (
                <div>
                    <div>Score: <strong>{this.state.score}</strong>/{this.state.questions.length} <button onClick={this.refreshPage}>Reset</button></div>
                    <div>
                        {this.state.questions.map((question, index) => (
                            <div>
                                <div>{question.chosenOption === question.correctAnswer ? <CheckIcon style={{color: '#09bd60'}}></CheckIcon> : <CloseIcon style={{color: '#e34242'}}></CloseIcon>} {index + 1}. {question.question}</div>
                                {question.options.map((option, index) => {
                                    if(index === question.correctAnswer){
                                        return <button disabled className={classes.Correct}>{option}</button>
                                    } else {
                                        if(question.chosenOption !== question.correctAnswer && index === question.chosenOption){
                                            return <button disabled className={classes.Wrong}>{option}</button>
                                        }
                                        return <button disabled className={classes.Disabled}>{option}</button>
                                    }
                                })}
                                <p></p>
                            </div>
                        ))}
                    </div>
                </div>
            ) 
            : (
                <div>
                    <div>Question {this.state.currentQuestion + 1}/<span>{this.state.questions.length}</span></div>
                    <hr></hr>
                    <div className={classes.Question}>{this.state.questions[this.state.currentQuestion].question}</div>
                    <div className={classes.Options}>
                        {this.state.questions[this.state.currentQuestion].options.map((option, index) => (
                            <button onClick={() => this.onClickHandler(index)}><span>{index + 1})</span>{option}</button>
                        ))}
                    </div>
                </div>
            )
        return (
            <div className={classes.Layout}>
                {layout}
            </div>
        )
    }
}

export default Question;