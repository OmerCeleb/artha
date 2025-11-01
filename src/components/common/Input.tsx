// src/components/common/Input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  fullWidth = true,
  className = '',
  type,
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-dark-200 focus:border-primary-500 focus:ring-primary-100';

  return (
    <div className={widthClass}>
      {label && (
        <label className="block text-sm font-medium text-dark-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`${widthClass} ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 rounded-xl border-2 ${errorClass} transition-all duration-200 outline-none bg-white text-dark-900 placeholder:text-dark-400 ${
            type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
