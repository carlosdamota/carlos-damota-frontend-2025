
import { useState } from 'react'
import './App.css'
import { Step1Email } from './steps/Step1Email/Step1Email'
import { Step2code } from './steps/Step2Code/Step2code'
// ... imports anteriores ...
import { Step3Plan } from './steps/step3Plan/Step3Plan';
// import { Step4Success } from './steps/Step4Success/Step4Success';

function App() {
  const [email, setEmail] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const goToNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <main>
      {currentStep === 1 && (
        <Step1Email 
          onNext={(email) => {
            setEmail(email);
            goToNext();
          }} 
        />
      )}
      
      {currentStep === 2 && (
        <Step2code 
          email={email} 
          onNext={(userId) => {
            setUserId(userId);
            goToNext();
          }} 
          onPrevious={goToPrevious} 
        />
      )}
      
      {currentStep === 3 && userId && (
        <Step3Plan 
          userId={userId} 
          onNext={goToNext} 
          onPrevious={goToPrevious} 
        />
      )}
      
      {/* {currentStep === 4 && (
        <Step4Success onPrevious={goToPrevious} />
      )} */}
    </main>
  );
}

export default App;