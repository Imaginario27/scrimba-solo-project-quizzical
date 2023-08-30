/* eslint react/prop-types: 0 */

/** Imports *******/
import he from 'he' // A library which encodes and decodes special characters.

/**************************
    QuizQuestion:
    - For each quiz question, it maps through the options and displays them as radio inputfields inside a label (to style it as a button)
    - If the quiz is completed, options are locked in order to avoid changing the chosen options. 
    - If the current answer is correct, the label gets a correct class, else it receives the wrong class.
    - The input receives the option as value because it needs to compare with question.correct_answer, which is a string.
**************************/
export default function QuizQuestion(props) {  
    return (
        <div className="quiz-question">
            <h3>{he.decode(props.question.question)}</h3>
            <form>
            {
                props.question.options.map((option, index) => (
                    <label 
                        key={index}  
                        className={
                            !props.quizCompleted ? 'option' 
                            :props.quizCompleted && props.selectedAnswer === option ? 
                            (option === props.question.correct_answer ? 'option correct locked' : 'option wrong locked') 
                            : 'option locked'
                        }
                    >
                        <input
                            type="radio"
                            name={`question-${props.questionIndex}`}
                            value={option}
                            checked={props.selectedAnswer === option}
                            onChange={() => props.onAnswerSelect(props.questionIndex, option)}
                        />
                        {he.decode(option)}
                    </label>
                ))
            }
            </form>
        </div>
    )
}