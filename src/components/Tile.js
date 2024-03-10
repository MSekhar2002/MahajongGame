// 
// Tile.js
import React from 'react';

const Tile = ({ tile, onClick }) => {
  const handleClick = () => {
    onClick(tile.id);
  };
  const hand = () => {
    console.log(tile.id);
  };
// console.log(tile.matched);
  return (
    <div className={`tile ${tile.flipped ? 'flipped' : ''}`} onClick={tile.matched?hand:handleClick}>
      {tile.flipped ? <span role="img" aria-label="Emoji">{tile.emoji}</span> : null}
    </div>
  );
};

export default Tile;
