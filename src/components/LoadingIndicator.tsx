import React from 'react';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'medium',
  color = 'var(--primary)'
}) => {
  const sizeValue = size === 'small' ? '16px' : size === 'medium' ? '24px' : '36px';
  
  return (
    <div 
      className="loading-spinner"
      style={{
        width: sizeValue,
        height: sizeValue,
        border: `2px solid rgba(255,255,255,0.1)`,
        borderRadius: '50%',
        borderTopColor: color,
        animation: 'spin 1s linear infinite'
      }}
    />
  );
};
