// GameBoard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tile from './Tile';

const GameBoard = () => {
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [matchedTiles, setMatchedTiles] = useState([]);
  const [flippedTiles, setFlippedTiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate('/');
    } else {
      initializeGameBoard();
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const initializeGameBoard = () => {
    // Generate tiles here (for simplicity, let's assume 8 pairs)

    const newTiles = [
      { id: 1, emoji: '😂', matched: false, flipped: false },
      { id: 2, emoji: '😁', matched: false, flipped: false },
      { id: 3, emoji: '😌', matched: false, flipped: false },
      { id: 4, emoji: '✨', matched: false, flipped: false },
      { id: 5, emoji: '🙂', matched: false, flipped: false },
      { id: 6, emoji: '😊', matched: false, flipped: false },
      { id: 7, emoji: '🤣', matched: false, flipped: false },
      { id: 8, emoji: '❤️', matched: false, flipped: false },
      { id: 9, emoji: '😂', matched: false, flipped: false },
      { id: 10, emoji: '😁', matched: false, flipped: false },
      { id: 11, emoji: '😌', matched: false, flipped: false },
      { id: 12, emoji: '✨', matched: false, flipped: false },
      { id: 13, emoji: '🙂', matched: false, flipped: false },
      { id: 14, emoji: '😊', matched: false, flipped: false },
      { id: 15, emoji: '🤣', matched: false, flipped: false },
      { id: 16, emoji: '❤️', matched: false, flipped: false },
      { id: 17, emoji: '👍', matched: false, flipped: false },
      { id: 18, emoji: '👏', matched: false, flipped: false },
      { id: 19, emoji: '😎', matched: false, flipped: false },
      { id: 20, emoji: '🙌', matched: false, flipped: false },
      { id: 21, emoji: '🥳', matched: false, flipped: false },
      { id: 22, emoji: '🎉', matched: false, flipped: false },
      { id: 23, emoji: '😍', matched: false, flipped: false },
      { id: 24, emoji: '🤩', matched: false, flipped: false },
      { id: 25, emoji: '🤗', matched: false, flipped: false },
      { id: 26, emoji: '🤔', matched: false, flipped: false },
      { id: 27, emoji: '😅', matched: false, flipped: false },
      { id: 28, emoji: '😆', matched: false, flipped: false },
      { id: 29, emoji: '😋', matched: false, flipped: false },
      { id: 30, emoji: '😜', matched: false, flipped: false },
      { id: 31, emoji: '😝', matched: false, flipped: false },
      { id: 32, emoji: '😛', matched: false, flipped: false },
    ];

    // Shuffle tiles
    shuffleTiles(newTiles);

    setTiles(newTiles);
  };

  const shuffleTiles = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleTileClick = id => {
    const updatedTiles = tiles.map(tile => {
      if (tile.id === id) {
        return { ...tile, flipped: !tile.flipped }; // Toggle flipped state
      }
      return tile;
    });
    setTiles(updatedTiles);

    const clickedTile = tiles.find(tile => tile.id === id);
    if (!clickedTile.flipped && flippedTiles.length < 2) {
      const newFlippedTiles = [...flippedTiles, clickedTile];
      console.log(newFlippedTiles);
      setFlippedTiles(newFlippedTiles);

      const allMatched = matchedTiles.length + newFlippedTiles.length === tiles.length;

      if (newFlippedTiles.length === 2) {
        if (checkForMatch(newFlippedTiles)) {
          console.log(matchedTiles);
          console.log(newFlippedTiles);
          const updatedMatchedTiles = newFlippedTiles.map(tile => ({ ...tile, matched: true, flipped: true }));
          setMatchedTiles([...matchedTiles, ...updatedMatchedTiles]);

          const updatedTiles = tiles.map(tile => {
            if (newFlippedTiles.find(flippedTile => flippedTile.id === tile.id)) {
              return { ...tile, matched: true, flipped: true };
            }
            return tile;
          });
          setTiles(updatedTiles);
          console.log(updatedMatchedTiles);
          console.log(tiles);
          setScore(prevScore => prevScore + 1);
          if (allMatched) {
            localStorage.setItem('score', score + 1);
            localStorage.setItem('time', time);
            navigate('/success');
          }
        } else {
          setTimeout(() => {
            const updatedTiles = tiles.map(tile => {
              if (newFlippedTiles.find(flippedTile => flippedTile.id === tile.id)) {
                return { ...tile, flipped: false };
              }
              return tile;
            });

            setTiles(updatedTiles);
          }, 600);
        }
        setFlippedTiles([]);
      }
    }
  };
  console.log(tiles);

  const checkForMatch = flippedTiles => {
    return flippedTiles.length === 2 && flippedTiles[0].emoji === flippedTiles[1].emoji;
  };
  const userName = localStorage.getItem('userName');
  return (
    <div className="game-board">
      <h1>Mahajong Game</h1>
      <div className='con'>
      <div className="score">Score: {score}</div>
      <div className="score">Welcome {userName} 👋👋</div>
      <div className="time">Time: {time}</div>
      </div>
      <div className="tiles">
        {tiles.map(tile => (
          <Tile
            key={tile.id}
            tile={tile}
            onClick={handleTileClick}
            disabled={matchedTiles.includes(tile)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
