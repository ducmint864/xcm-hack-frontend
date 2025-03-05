import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  isLoading = false,
  children,
  className = '',
  ...props
}) => {
  const variantClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary' 
      ? 'btn-secondary' 
      : 'btn-outline';

  return (
    <button 
      className={`btn ${variantClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className="loading-indicator mr-2"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};
