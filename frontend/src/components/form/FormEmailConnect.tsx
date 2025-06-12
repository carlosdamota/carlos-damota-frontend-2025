import React from 'react';
import formConnect from './formConnect.module.css'

interface FormEmailConnectProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error: string | null;
  onSubmit: () => void;
  offersChecked: boolean;
  onToggleOffers: () => void;
  isSubmitting?: boolean;
}

export const FormEmailConnect: React.FC<FormEmailConnectProps> = ({
  value,
  onChange,
  onBlur,
  error,
  onSubmit,
  offersChecked,
  onToggleOffers,
  isSubmitting = false,
}) => {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={formConnect.form}
    >
      <div className={formConnect.emailContainer}>
        <input
          id="email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Email Address"
          className={`${formConnect.input} ${error ? formConnect.errorInput : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? 'email-error' : undefined}
          disabled={isSubmitting}
          required
        />
        {error && (
          <span id="email-error" className={formConnect.errorText}>
            {error}
          </span>
        )}
      </div>

      <div className={formConnect.checkboxContainer}>
        <input
          type="checkbox"
          id="offers"
          checked={offersChecked}
          onChange={onToggleOffers}
          disabled={isSubmitting}
          className={formConnect.checkbox}
        />
        <label htmlFor="offers" className={formConnect.checkboxLabel}>
          Send me offers, news, and fun stuff!
        </label>
      </div>

      <button
        type="submit"
        className={formConnect.submitButton}
        disabled={isSubmitting || !!error || !value.trim()}
      >
        {isSubmitting ? (
          <span className={formConnect.buttonContent}>
            <span className={formConnect.spinner}></span>
            Connecting...
          </span>
        ) : (
          'Connect'
        )}
      </button>
    </form>
  );
};