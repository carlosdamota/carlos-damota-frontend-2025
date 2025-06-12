import React from 'react';
import styles from './cards.module.css';

interface PlanCardProps {
  plan: {
    type: 'monthly' | 'year';
    price: string;
    currency: string;
    billing_cycle: string;
    trial_days: number;
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
  disabled = false
}) => {
  return (
    <div 
      className={`${styles.card} ${isSelected ? styles.selected : ''} ${disabled ? styles.disabled : ''}`}
      onClick={!disabled ? onSelect : undefined}
      aria-disabled={disabled}
      aria-label={`${plan.type} plan for ${plan.price} ${plan.currency} per ${plan.type === 'monthly' ? 'month' : 'year'}`}
    >
      {isBestValue && <div className={styles.bestValueTag}>BEST VALUE</div>}
      
      <div className={styles.cardContent}>
        <h3 className={styles.planName}>
          {plan.type === 'year' ? 'Annual' : 'Monthly'}
        </h3>
        
        <div className={styles.planPrice}>
          ${plan.price} <span className={styles.perUnit}>/{plan.type === 'monthly' ? 'month' : 'year'}</span>
        </div>
        
        <p className={styles.billingCycle}>
          {plan.billing_cycle}
        </p>
        
        {isSelected && (
          <div className={styles.checkmark} aria-hidden="true">
            ✓
          </div>
        )}
      </div>
    </div>
  );
};