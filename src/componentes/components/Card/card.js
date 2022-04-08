/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './card.css';
import classnames from 'classnames';
import backpic from '../../image/backs.png';

function Card({
  // eslint-disable-next-line react/prop-types
  onClick, card, index, isInactive, isFlipped, isDisabled,
}) {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    <div
      className={classnames('card', {
        'is-flipped': isFlipped,
        'is-inactive': isInactive,
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={backpic} alt="backpic" className="img" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="frontpic" className="img" />
      </div>
    </div>
  );
}
export default Card;
