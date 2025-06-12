
import { useState } from 'react'
import './App.css'
import { Step1Email } from './steps/Step1Email/Step1Email'
import { Step2code } from './steps/Step2Code/Step2code'

function App() {
  const [email, setEmail] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(1)

  const goToNext = () => {
    setCurrentStep((prev)=>prev+1)
  }
  const goToPrevious = () => {
    setCurrentStep((prev)=>Math.max(1, prev-1))
  }

  return (
    <main>
      {currentStep === 1 && <Step1Email onNext={(email) => {
  setEmail(email)
  goToNext()
}} />}
      {currentStep === 2 && <Step2code email={email} onNext={goToNext} onPrevious={goToPrevious} />}
      {/* {currentStep === 3 && <Step3Success onPrevious={goToPrevious} />} */}
    </main>
  )
}

export default App
