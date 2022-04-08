/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
import { Col, Container, Row } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import cardsArray from './cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/header';
import Card from './components/Card/card';
import Finish from './components/GameOver/gameover';

// FisherYates Modern Shuffle Algorithm
// Fuente: https://www.youtube.com/watch?v=tLxBwSL3lPQ&t=422s
function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
function randomizer(array) {
  const { length } = array;
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}

function GameApp() {
  const [cards, setCards] = useState(() => randomizer(cardsArray.concat(cardsArray)));
  const [openCards, setOpencards] = useState([]);
  const [matchedCards, setMatchedcards] = useState({});
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem('bestScore')) || Number.POSITIVE_INFINITY,
  );
  const timeout = useRef(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === cardsArray.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem('bestScore', highScore);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setMatchedcards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpencards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpencards([]);
    }, 500);
  };

  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpencards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpencards([index]);
    }
  };
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);

  const checkIsFlipped = (index) => openCards.includes(index);
  const checkIsInactive = (card) => Boolean(matchedCards[card.type]);
  const handleRestart = () => {
    setMatchedcards({});
    setOpencards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    setCards(randomizer(cardsArray.concat(cardsArray)));
  };

  return (
    <div>
      <Header
        moves={moves}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
      <Container>
        <Row>
          {cards.map((card, index) => (
            <Col xs={6} md={3} lg={2}>
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={shouldDisableAllCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Finish
        showModal={showModal}
        moves={moves}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
    </div>
  );
}

export default GameApp;
