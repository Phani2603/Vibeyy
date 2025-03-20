import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`select-container ${className}`} ref={selectRef}>
      {label && <label className="select-label">{label}</label>}
      <div 
        className={`select ${isOpen ? 'select--open' : ''} ${error ? 'select--error' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="select__value">{displayValue}</span>
        <span className="select__arrow">▼</span>
      </div>
      {error && <span className="select__error">{error}</span>}
      {isOpen && (
        <div className="select__options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select__option ${value === option.value ? 'select__option--selected' : ''}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select; 