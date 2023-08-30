/* eslint react/prop-types: 0 */

export default function StartScreen(props) {
    return (
        <div id="start-screen">
            <h1>Quizzical</h1>
            <p>The random trivial question game</p>
            <button onClick={props.handleStartQuiz}>Start quiz</button>
        </div>
    )
}