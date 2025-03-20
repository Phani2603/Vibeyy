import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  image,
  imageAlt = '',
  imageHeight = '200px'
}) => {
  const cardClasses = `
    card
    card--${variant}
    ${hover ? 'card--hover' : ''}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} onClick={onClick}>
      {image && (
        <div className="card__image-container" style={{ height: imageHeight }}>
          <img src={image} alt={imageAlt} className="card__image" />
        </div>
      )}
      <div className="card__content">
        {children}
      </div>
    </div>
  );
};

export default Card; 