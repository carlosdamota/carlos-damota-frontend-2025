import { useState } from 'react';
import { BenefitsList } from '../../components/BenefitsList';
import { FormEmailConnect } from '../../components/form/FormEmailConnect';
import { isValidEmail } from '../../utils/validation';
import styles from './styles.module.css';
import { sendEmailValidationCode } from '../../api/auth';

interface Step1EmailProps {
  onNext: (email: string) => void;
}

export const Step1Email: React.FC<Step1EmailProps> = ({ onNext }) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [offersChecked, setOffersChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setEmail(value);
    // Validación en tiempo real si hay error
    if (error && value.trim() !== '' && isValidEmail(value)) {
      setError(null);
    }
  };

  const handleBlur = () => {
    if (email.trim() === '') {
      setError(null);
    } else if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
    }
  };

  const handleSubmit = async () => {
    // Validación final antes de enviar
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await sendEmailValidationCode(email);
      onNext(email);
    } catch (error: any) {
      // Manejo específico de errores de API
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.message.includes('429')) {
        errorMessage = 'Please wait before requesting a new code.';
      } else if (error.message.includes('400')) {
        errorMessage = 'Invalid email address.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <header className={styles.header}>
          <h1>Connect Your Account</h1>
          <p>...and unlock your benefits!</p>
        </header>

        <article className={styles.article}>
          <BenefitsList />
          
          <FormEmailConnect 
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            onSubmit={handleSubmit}
            offersChecked={offersChecked}
            onToggleOffers={() => setOffersChecked(!offersChecked)}
            isSubmitting={isSubmitting}
          />
        </article>
      </section>
      
      <footer className={styles.footer}>
        <p>
          By continuing, you agree to our{' '}
          <a href="#">Terms of Service</a>
          {' '}and{' '}
          <a href="#">Privacy Policy</a>.
        </p>
      </footer>
    </>
  );
};