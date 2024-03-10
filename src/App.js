// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import GameBoard from './components/GameBoard';
import SuccessScreen from './components/SuccessScreen';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/"  element={<WelcomeScreen/>} />
          <Route path="/game" element={<GameBoard/>} />
          <Route path="/success" element={<SuccessScreen/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
