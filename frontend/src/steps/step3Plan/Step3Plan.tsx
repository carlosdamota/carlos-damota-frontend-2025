import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { PlanCard } from "../../components/PlanCard/PlanCard";
import { getProducts } from "../../api/plan";
import { startTrial } from "../../api/auth";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface Plan {
  type: "monthly" | "year";
  price: string;
  currency: string;
  trial_days: number;
  billing_cycle: string;
}

interface Step3PlanProps {
  userId: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const Step3Plan: React.FC<Step3PlanProps> = ({ userId, onNext, onPrevious }) => {
  const [plans, setPlans] = useState<{ monthly: Plan; year: Plan } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "year" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setPlans({
          monthly: { ...products.monthly, type: "monthly", billing_cycle: "Billed monthly" },
          year: { ...products.year, type: "year", billing_cycle: "Billed annually" },
        });
      } catch (err) {
        setError("Failed to load plans. Please try again.");
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPlan) {
      setError("Please select a plan");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await startTrial(userId);
      onNext();
    } catch (err) {
      setError("Failed to start trial. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!plans) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p>Loading plans...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <header className={styles.header}>
          <button
            className={styles.backButton}
            onClick={onPrevious}
            aria-label='Go back'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polyline points='15 18 9 12 15 6'></polyline>
            </svg>
          </button>
          <h1 className={styles.title}>Choose your plan</h1>
        </header>

  

        <article className={styles.article}>

          <div className={styles.plansContainer}>
            <PlanCard
              plan={plans.year}
              isSelected={selectedPlan === "year"}
              onSelect={() => setSelectedPlan("year")}
              isBestValue={true}
              disabled={isSubmitting}
            />

            <PlanCard
              plan={plans.monthly}
              isSelected={selectedPlan === "monthly"}
              onSelect={() => setSelectedPlan("monthly")}
              disabled={isSubmitting}
            />
          </div>

        <p className={styles.cancelText}>Cancel anytime.</p>

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedPlan}
          >
            {isSubmitting ? (
              <span className={styles.buttonContent}>
                <span className={styles.spinner}></span>
                Starting trial...
              </span>
            ) : (
              "Start my free trial!"
            )}
          </button>
        </article>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a
            href='#'
            className={styles.footerLink}
          >
            Privacy Policy
          </a>
          <span className={styles.linkSeparator}>|</span>
          <a
            href='#'
            className={styles.footerLink}
          >
            Terms of Service
          </a>
          <span className={styles.linkSeparator}>|</span>
          <a
            href='#'
            className={styles.footerLink}
          >
            Restore
          </a>
        </div>
      </footer>
    </div>
  );
};
