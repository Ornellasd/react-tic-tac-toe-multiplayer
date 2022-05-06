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

const Grid = ({ turn, setTurn }) => {
  return (
    <div class="play-area">
      <Block value={0} turn={turn} setTurn={setTurn} />
      <Block value={1} turn={turn} setTurn={setTurn} />
      <Block value={2} turn={turn} setTurn={setTurn} />
      <Block value={3} turn={turn} setTurn={setTurn} />
      <Block value={4} turn={turn} setTurn={setTurn} />
      <Block value={5} turn={turn} setTurn={setTurn} />
      <Block value={6} turn={turn} setTurn={setTurn} />
      <Block value={7} turn={turn} setTurn={setTurn} />
      <Block value={8} turn={turn} setTurn={setTurn} />
    </div>
  );
};

const App = () => {
  const [turn, setTurn] = useState(false);

  return (
    <div class="container">
      <h1>Tic-Tac-Toe</h1>
      <Grid turn={turn} setTurn={setTurn} />
    </div>
  );
};

export default App;
