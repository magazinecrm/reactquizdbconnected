import React from "react";

const Result = ({counter,score, playAgain}) => (
  <div className="score-board">
    <div className="score"> {counter} You scored {score} / 5 correct answers!</div>
    <button className="playBtn" onClick={playAgain}>
      Play again!
    </button>
  </div>
);

export default Result;

