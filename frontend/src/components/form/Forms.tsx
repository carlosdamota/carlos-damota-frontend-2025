import React from 'react'
import form from './form.module.css'

interface FormsProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const Forms: React.FC<FormsProps> = ({ children, onSubmit }) => {
  return (
    <form id='connect-form' className={form.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
