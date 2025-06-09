
import { useState } from 'react'
import './App.css'
import { Step1Email } from './steps/Step1Email/Step1Email'

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const goToNext = () => {
    setCurrentStep((prev)=>prev+1)
  }
  const goToPrevious = () => {
    setCurrentStep((prev)=>Math.max(1, prev-1))
  }

  return (
    <main>
      {currentStep === 1 && <Step1Email onNext={goToNext} />}
      {/* {currentStep === 2 && <Step2Code onNext={goToNext} onPrevious={goToPrevious} />}
      {currentStep === 3 && <Step3Success onPrevious={goToPrevious} />} */}
    </main>
  )
}

export default App
