import React from 'react';
import spinner from './spinner.module.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'white' | 'blue';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'primary'
}) => {
  const sizeClasses = {
    small: spinner.small,
    medium: spinner.medium,
    large: spinner.large
  };

  const colorClasses = {
    primary: spinner.primary,
    white: spinner.white,
    blue: spinner.blue
  };

  return (
    <div 
      className={`${spinner.spinner} ${sizeClasses[size]} ${colorClasses[color]}`}
      role="status"
      aria-label="Loading"
    >
      <div className={spinner.spinnerInner}></div>
    </div>
  );
};