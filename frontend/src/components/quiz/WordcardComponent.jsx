import React, { useState } from "react";
import "./WordcardComponent.css";
function WordcardComponent({ word, meaning }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = () => {
    setIsFlipped((prev) => !prev);
  };
  return (
    <div
      id="card"
      onClick={handleClick}
      style={{
        transform: `perspective(800px) rotateX(${isFlipped ? 180 : 0}deg)`,
      }}
    >
      <div id="front">{word}</div>
      <div id="back">{meaning}</div>
    </div>
  );
}

export default WordcardComponent;
