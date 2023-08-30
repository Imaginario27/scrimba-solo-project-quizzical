/** IMPORTS *******/
import {useState} from 'react'
import StartScreen from './assets/components/StartScreen'
import BgImageTopRight from './assets/images/blob-top-right.png'
import BgImageBottomLeft from './assets/images/blob-bottom-left.png'
import QuizQuestions from './assets/components/QuizQuestionsScreen'

function App() {

  // Defines the initial screen
  const [screen, setScreen] = useState("StartScreen")
  
  function handleStartQuiz(){
    setScreen("QuizQuestions")
  }

  return (
    <main>
        
        <div id="main-container">
          {
            screen === "StartScreen" && <StartScreen handleStartQuiz={handleStartQuiz} />
          }
          {
            screen === "QuizQuestions" && <QuizQuestions />
          }
        </div>
        <img className="bg-image-top-right" src={BgImageTopRight} />
        <img className="bg-image-bottom-left" src={BgImageBottomLeft} />
    </main>
  )
}

export default App