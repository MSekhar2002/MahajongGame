// SuccessScreen.js
import React from 'react';
import { useNavigate  } from 'react-router-dom';

const SuccessScreen = () => {
  const navigate = useNavigate();
  const score = localStorage.getItem('score')
  const time = localStorage.getItem('time')
  const userName = localStorage.getItem('userName');
  // const { score, time } = navigate().state;
  const handlePlayAgain = () => {
    navigate('/game');
  };

  return (
    <div className="success-screen">
      <h1>Congratulations! {userName}</h1>
      <p>Your score: {score}</p>
      <p>Time taken: {time} seconds</p>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default SuccessScreen;
