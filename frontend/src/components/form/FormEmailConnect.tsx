


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
  offersChecked,
  onToggleOffers,
  isSubmitting = false,
}) => {
  return (
    <
    >
      <div className={formConnect.email_container} >
        <input
          id="email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="EmailAddress"
           className={`${formConnect.input} ${error ? formConnect.error : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? 'email-error' : undefined}
          disabled={isSubmitting}
          required
        />
        {error && (
          <span id="email-error" className={formConnect.error} >
            {error}
          </span>
        )}
      </div>

      <div className={formConnect.checkbox_container} >
        <input
          type="checkbox"
          id="offers"
          checked={offersChecked}
          onChange={onToggleOffers}
          
          
          disabled={isSubmitting}
        />
        <label htmlFor="offers" >
          Send me offers, news, and fun stuff!
        </label>
      </div>

      <button className={formConnect.button}
        type="submit" 
       
        disabled={isSubmitting || !!error || !value.trim()}
      >
        {isSubmitting ? 'Connecting...' : 'Connect'}
      </button>
    </>
  );
};
