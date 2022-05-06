import { useState } from 'react';

import './App.css';

const Block = ({ value, turn, setTurn }) => {
  const [checked, setChecked] = useState(false);
  const [mark, setMark] = useState();
  
  const handleClick = () => {
    setChecked(true);

    if(turn) {
      setMark('X');
    } else {
      setMark('O');
    }

    setTurn(!turn);
  };

  return (
    <div id={`block_${value}`} class="block" onClick={handleClick}>
      {checked && mark}
    </div>
  )
};

const App = () => {
  const [turn, setTurn] = useState(true);
  const blocks = [];

  // create 3 x 3 grid
  for(let i = 0; i < 9; i++) {
    blocks.push(<Block value={i} turn={turn} setTurn={setTurn} />);
  }

  return (
    <div class="container">
      <h1>Tic-Tac-Toe</h1>
      <div class="play-area">
        {blocks}
      </div>
    </div>
  );
};

export default App;
