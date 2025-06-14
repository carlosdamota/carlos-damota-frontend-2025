import { useState } from "react";
import { BenefitsList } from "../../components/BenefitsList";
import { FormEmailConnect } from "../../components/form/FormEmailConnect";
import { isValidEmail } from "../../utils/validation";
import styles from "./styles.module.css";
import { sendEmailValidationCode } from "../../api/auth";

interface Step1EmailProps {
  onNext: (email: string) => void;
}

export const Step1Email: React.FC<Step1EmailProps> = ({ onNext }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [offersChecked, setOffersChecked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setEmail(value);
    // Validación en tiempo real si hay error
    if (error && value.trim() !== "" && isValidEmail(value)) {
      setError(null);
    }
  };

  const handleBlur = () => {
    if (email.trim() === "") {
      setError(null);
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await sendEmailValidationCode(email);
      onNext(email);
    } catch (error) {
      // Manejo específico de errores de API
      let errorMessage = "An error occurred. Please try again.";
      if (error instanceof Error && error.message.includes("429")) {
        errorMessage = "Please wait before requesting a new code.";
      } else if (error instanceof Error && error.message.includes("400")) {
        errorMessage = "Invalid email address.";
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.leftCol}>
          <header className={`${styles.header} ${styles.headerMobile}`}>
            {" "}
            {/* Solo visible en mobile */}
            <h1>Connect Your Account</h1>
            <p>...and unlock your benefits!</p>
          </header>
          <BenefitsList />
          <footer className={styles.footer}>
            <p>
              By continuing, you agree to our <a href='#'>Terms of Service</a> and{" "}
              <a href='#'>Privacy Policy</a>.
            </p>
          </footer>
        </div>
        <div className={styles.rightCol}>
          <header className={`${styles.header} ${styles.headerDesktop}`}>
            {" "}
            {/* Solo visible en desktop/tablet */}
            <h1>Connect Your Account</h1>
            <p>...and unlock your benefits!</p>
          </header>
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
        </div>
      </section>
      <footer className={styles.footerMobile}>
        <p>
          By continuing, you agree to our <a href='#'>Terms of Service</a> and{" "}
          <a href='#'>Privacy Policy</a>.
        </p>
      </footer>
    </>
  );
};
