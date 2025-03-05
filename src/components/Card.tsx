import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, className = '', children }) => {
  return (
    <div className={`chain-card ${className}`}>
      {(title || icon) && (
        <div className="chain-header">
          {title && <h3 className="card-title">{title}</h3>}
          {icon && <div className="chain-icon">{icon}</div>}
        </div>
      )}
      <div className="chain-content">
        {children}
      </div>
    </div>
  );
};
