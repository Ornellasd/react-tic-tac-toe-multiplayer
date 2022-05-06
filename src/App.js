import { useState } from 'react';

import './App.css';

const Block = ({ value, turn, setTurn, setContent, updatedContent }) => {
  const [checked, setChecked] = useState(false);
  
  const handleDraw = (index) => {
    setChecked(true);

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

const App = () => {
  const [turn, setTurn] = useState(true);
  const [content, setContent] = useState(['', '', '', '', '', '', '', '', '']);

  const updatedContent = [...content];

  // create 3 x 3 grid
  const blocks = [];

  for(let i = 0; i < 9; i++) {
    blocks.push(<Block value={i} turn={turn} setTurn={setTurn} setContent={setContent} updatedContent={updatedContent} />);
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="play-area">
        {blocks}
      </div>
    </div>
  );
};

export default App;
