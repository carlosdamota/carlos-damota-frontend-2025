import { useState } from 'react';
import { BenefitsList } from '../../components/BenefitsList';

import styles from './styles.module.css'
import { CodeInput } from '../../components/form/CodeInput';

interface Step2CodeProps {
  onNext: () => void;
  onPrevious: () => void;
  email: string;
}

export const Step2code: React.FC<Step2CodeProps> = ({ onNext, onPrevious, email }) => {
  
  const [error, setError] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleCodeSubmit = async (code: string) => {
  setIsSubmitting(true);
  setError(null);
  
  try {
    const res = await fetch('http://localhost:8080/api/validate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
      return;
    }

    console.log('User validated:', data.user_id);
    onNext(); // avanza al paso 3
  } catch (error) {
    setError('Network error');
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <>
    <section className={styles.section} >
      <button className={styles.button} onClick={onPrevious}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg> Modify Email</button>
      <header className={styles.header} >
        <h1 >Get Verified</h1>
        <p >Enter the one-time code we sent to: {email}</p>
        <p>{email}</p>
      </header>

      <article className={styles.article}>
        <BenefitsList />
        
        
          <CodeInput onSubmit={handleCodeSubmit} onChange={() => error && setError(null)} />
          {error && <p className={styles.error}>{error}</p>}
      </article>

      
    </section>
    <footer className={styles.footer}>
        <p >
          By continuing, you agree to our{' '}
          <a href="#" >Terms of Service</a>
          {' '}and{' '}
          <a href="#" >Privacy Policy</a>.
        </p>
      </footer>
    </>
  );
};