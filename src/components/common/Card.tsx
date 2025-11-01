// src/components/common/Card.tsx

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  onClick,
  hover = false
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const hoverClass = hover ? 'hover:shadow-lg cursor-pointer transform hover:scale-[1.02]' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`bg-white rounded-2xl shadow-md transition-all duration-200 ${paddingClasses[padding]} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
