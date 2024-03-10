// WelcomeScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('userName', name);
    navigate('/game');
  };

  return (
    <div className="welcome-screen">
      <h1>React Tiles</h1>
      <form onSubmit={handleSubmit}>
        <input
        className='inp'
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
        />
        <br/>
        <button className='btn' type="submit">Start Game</button>
      </form>
    </div>
  );
};

export default WelcomeScreen;
