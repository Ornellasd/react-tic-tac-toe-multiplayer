import { useState } from 'react';

import './App.css';

const Block = ({ value, turn, setTurn, setContent, updatedContent, calculateWinner }) => {  
  const handleDraw = (index) => {
    calculateWinner();

    if(turn) {
      updatedContent[index] = 'X';

    } else {
      updatedContent[index] = 'O';
    }

    setContent(updatedContent);
    setTurn(!turn);
  };

  return (
    <div id={`block_${value}`} className="block" onClick={() => handleDraw(value)}>
      {updatedContent[value]}
    </div>
  )
};

const PlayArea = ({ turn, setTurn, setContent, updatedContent, calculateWinner }) => {
  // create 3 x 3 grid
  const blocks = [];

  for(let i = 0; i < 9; i++) {
    blocks.push(<Block value={i} turn={turn} setTurn={setTurn} setContent={setContent} updatedContent={updatedContent} calculateWinner={calculateWinner} />);
  }

  return (
    <div className="play-area">
      {blocks}
    </div>
  );
};

const App = () => {
  const [content, setContent] = useState(['', '', '', '', '', '', '', '', '']);
  const [turn, setTurn] = useState(true);
  const [isOver, setIsOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  console.log(winner, 'is there a winner?');

  const updatedContent = [...content];

  const calculateWinner = () => {
    const WIN_CONDITIONS = [
      // rows
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      // cols
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // diagonals
      [0, 4, 8], [2, 4, 6]
    ];

    for(let i = 0; i < WIN_CONDITIONS.length; i++) {
      let firstIndex = WIN_CONDITIONS[i][0];
      let secondIndex = WIN_CONDITIONS[i][1];
      let thirdIndex = WIN_CONDITIONS[i][2];

      if(content[firstIndex] == content[secondIndex] && content[firstIndex] == content[thirdIndex] && content[firstIndex] !== '') {
        setIsOver(true);
        setWinner(content[firstIndex]);
      }
    }
  };

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <PlayArea turn={turn} setTurn={setTurn} setContent={setContent} updatedContent={updatedContent} calculateWinner={calculateWinner} />
      {isOver && <h2 id="winner">Winner is {winner}</h2>}
      {isTie && <h2>Game is Tie</h2>}
    </div>
  );
};

export default App;
