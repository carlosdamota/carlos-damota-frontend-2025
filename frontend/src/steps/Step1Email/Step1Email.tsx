import { useState } from 'react';
import { BenefitsList } from '../../components/BenefitsList';
import { FormEmailConnect } from '../../components/form/FormEmailConnect';
import { Forms } from '../../components/form/Forms';
import { isValidEmail } from '../../utils/validation';
import styles from './styles.module.css'
 import { sendEmailValidationCode } from '../../api/auth';

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
  if (!isValidEmail(email)) {
    setError('Please enter a valid email address.');
    return;
  }

  setIsSubmitting(true);

  try {
    await sendEmailValidationCode(email);
    onNext(email); 
  } catch (error: any) {
    setError(error.message || 'Unknown error');
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