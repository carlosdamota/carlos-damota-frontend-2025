import React, { useState, useEffect } from "react";
import { BenefitsList } from "../../components/BenefitsList";
import styles from "./styles.module.css";
import { CodeInput } from "../../components/form/CodeInput";

// Services
import { sendEmailValidationCode, validateEmailCode } from "../../api/auth"; // adjust the path according to your structure

interface Step2CodeProps {
  onNext: (userId: number) => void;
  onPrevious: () => void;
  email: string;
}

export const Step2code: React.FC<Step2CodeProps> = ({ onNext, onPrevious, email }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60); // 5 minutes in seconds
  const [canResend, setCanResend] = useState<boolean>(false);

  // Countdown for code expiration
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleResendCode = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await sendEmailValidationCode(email); // Using the service

      setTimeLeft(5 * 60);
      setCanResend(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to resend code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCodeSubmit = async (code: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const userId = await validateEmailCode(email, code);
      onNext(userId);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className={styles.section}>
        <button className={styles.buttons} onClick={onPrevious}> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>Modify Email</button>
        <div className={styles.leftCol}>
          <header className={`${styles.header} ${styles.headerMobile}`}>
            {" "}
            {/* Solo visible en mobile */}
            <h1>Get Verified</h1>
            <p>Enter the one-time code we sent to:</p>
            <p className={styles.emailText}>{email}</p>
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
            <h1>Get Verified</h1>
            <p>Enter the one-time code we sent to:</p>
            <p className={styles.emailText}>{email}</p>
          </header>
          <CodeInput
            onSubmit={handleCodeSubmit}
            isSubmitting={isSubmitting}
            error={error ?? undefined}
            resetError={() => setError(null)}
            timeLeft={timeLeft}
            canResend={canResend}
            onResend={handleResendCode}
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
