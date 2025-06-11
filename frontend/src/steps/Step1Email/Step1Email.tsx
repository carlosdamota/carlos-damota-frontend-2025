import { useState } from 'react';
import { BenefitsList } from '../../components/BenefitsList';
import { FormEmailConnect } from '../../components/form/FormEmailConnect';
import { Forms } from '../../components/form/Forms';
import { isValidEmail } from '../../utils/validation';
import styles from './styles.module.css'

interface Step1EmailProps {
  onNext: (email: string) => void;
}

export const Step1Email: React.FC<Step1EmailProps> = ({ onNext }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [offersChecked, setOffersChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);



  const handleBlur = () => {
    if ( !isValidEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError(null);
    }
  };

  const handleSubmit = async () => {
    // Validación final
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Llamada a la API de GameHouse
      const response = await fetch(`/api/send-email-validation-code?email=${encodeURIComponent(email)}`);
      
      if (response.ok) {
        onNext(email); // Avanza al siguiente paso
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <section className={styles.section} >
      <header className={styles.header} >
        <h1 >Connect Your Account</h1>
        <p >...and unlock your benefits!</p>
      </header>

      <article className={styles.article}>
        <BenefitsList />
        
        <Forms onSubmit={handleSubmit}>
          <FormEmailConnect 
            value={email}
            onChange={setEmail}
            onBlur={handleBlur}
            error={error}
            onSubmit={handleSubmit}
            offersChecked={offersChecked}
            onToggleOffers={() => setOffersChecked(!offersChecked)}
            isSubmitting={isSubmitting}
          />
        </Forms>
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