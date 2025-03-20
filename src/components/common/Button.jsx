import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const buttonClasses = `
    button
    button--${variant}
    button--${size}
    ${fullWidth ? 'button--full-width' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button; 