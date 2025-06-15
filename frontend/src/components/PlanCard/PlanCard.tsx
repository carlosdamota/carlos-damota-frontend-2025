import React from "react";
import styles from "./cards.module.css";

interface PlanCardProps {
  plan: {
    type: "monthly" | "year";
    price: string;
    currency: string;
    billing_cycle: string;
    trial_days: number;
    savings_text?: string; // Texto de ahorro si aplica
  };
  isSelected: boolean;
  onSelect: () => void;
  isBestValue?: boolean;
  disabled?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
  isBestValue = false,
  disabled = false,
}) => {
  const showSavings = plan.type === "year" && isSelected && plan.savings_text;
  return (
    <div
      className={styles.card}
      onClick={!disabled ? onSelect : undefined}
      aria-disabled={disabled}
      aria-label={`${plan.type} plan for ${plan.price} ${plan.currency} per ${plan.type === "monthly" ? "month" : "year"}`}
    >
      {showSavings && <div className={styles.savingsTag}>{plan.savings_text}</div>}
      {/* Columna izquierda: radio y tipo de plan en row */}
      <div className={`${styles.cardLeft} ${isBestValue ? styles.bestValue : ""}`}>
        <div >
          <div className={`${styles.radio} ${isSelected ? styles.selected : ""}`}>
            {isSelected && (
              <span
              
              />
              
            )}
            
          </div>
           
          
        </div>
        <div className={styles.planType}>
       {isBestValue && (
          <span>
            BEST VALUE
          </span>
        )}
          <p >
            {plan.type === "year" ? "Annual" : "Monthly"}
          </p>

        </div>
      </div>
      {/* Columna derecha: precio, ciclo, franja negra */}
      <div className={styles.cardRight}>
        <div className={styles.planPrice}>
          ${plan.price}{" "}
          <span className={styles.perUnit}>/{plan.type === "monthly" ? "month" : "year"}</span>
        </div>
        <div className={styles.billingCycle}>{plan.billing_cycle}</div>
        <div className={styles.fringe}>
          {plan.trial_days > 0
            ? `Try ${plan.trial_days} days free`
            : isSelected && plan.type === "year" && plan.savings_text
              ? plan.savings_text
              : ""}
        </div>
      </div>
    </div>
  );
};
