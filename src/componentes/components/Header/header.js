/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './header.css';
import { Container } from 'react-bootstrap';
import { FaRedo } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
function Header({ moves, bestScore, handleRestart }) {
  return (
    <div>
      <h1>Lab 08: React - Memoria Pokémon</h1>
      <Container>
        <div className="sub-header">
          <div className="moves">
            <span className="bold">Movimientos: </span>
            {moves}
          </div>
          <div className="reshuffle">
            <button onClick={handleRestart}><FaRedo /></button>
          </div>
          {localStorage.getItem('bestScore') && (
            <div className="high-score">
              <span>Mejor Puntaje: </span>
              {bestScore}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Header;
