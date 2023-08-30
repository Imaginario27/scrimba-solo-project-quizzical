/** Imports *******/
import QuizQuestion from "./QuizQuestion"
import { useState, useEffect } from 'react'

export default function QuizQuestions (){
    /** States declarations *******/
    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([])
    const [score, setScore] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [currentGame, setCurrentGame] = useState(0)

    /** Trivial DB fetch request *******/
    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(response => response.json())
        .then(data => {
            // Gets the questions with sorted options
            // Incorrect answers and the correct one are separated. Therefore, both have to joined together.
            const questionsWithSortedOptions = data.results.map(question => ({
                ...question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5) 
            }))
            setQuestions(questionsWithSortedOptions)
        })
        .catch(error => console.error(error))
    }, [currentGame])

    /**************************
        handleAnswerSelect:
        - Handles the selection of the answers.
        - It creates an array with all the selected options. 
    **************************/
    function handleAnswerSelect(questionIndex, answerIndex) {
        setSelectedAnswers(
            prevAnswers => {
                const newAnswers = [...prevAnswers]
                newAnswers[questionIndex] = answerIndex
                return newAnswers
            }
        )
    }

    /**************************
        checkAnswers:
        - Checks the answers and compares it to the correct one.
        - If the correct answer is selected, it increases the score.
        - Since this function is runned when the "Check Answers" button is clicked, it sets the quiz to completed.
    **************************/
    function checkAnswers () {
        let newScore = 0
        console.log(selectedAnswers[0])
        console.log(questions[0].correct_answer)
        for (let i = 0; i < questions.length; i++) {
            if (selectedAnswers[i] === questions[i].correct_answer) {
                newScore++
            }
        }
        setScore(newScore)
        setQuizCompleted(true)
    }

    /**************************
        resetQuiz:
        - Resets the selected options 
        - Sets the quiz back to incomplete
    **************************/
    function resetQuiz () {
        setSelectedAnswers([])
        setQuizCompleted(false)
    }

    /**************************
        newQuiz:
        - Increases the current game counter in order to trigger a new fetch event
        - Sets the quiz status to incomplete
    **************************/
    function newQuiz () {
        setCurrentGame(prevCurrentGame => prevCurrentGame + 1)
        setQuizCompleted(false)
    }

    return (
        <div id="quiz">
            {
                questions.map((question, index) => (
                    <QuizQuestion
                        key={index}
                        question={question}
                        questionIndex={index}
                        selectedAnswer={selectedAnswers[index]}
                        onAnswerSelect={handleAnswerSelect}
                        quizCompleted={quizCompleted}

                    />
                ))
            }
            <div id="footer-container">
                {
                    !quizCompleted ? 
                        <button onClick={checkAnswers}>Check answers</button>
                    :
                        <div>
                            <p>You scored {score}/5 correct answers</p> 
                            <button onClick={resetQuiz}>Reset</button>
                            <button onClick={newQuiz}>New quiz</button>
                        </div>
                }
                
            </div>
        </div>
    )
}