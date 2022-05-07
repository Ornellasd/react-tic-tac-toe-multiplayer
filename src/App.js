import { useState, useEffect, useContext } from 'react';

import { socket, SocketContext } from './context/socket';

import './App.css';

const PlayArea = ({ updatedContent, handleDraw }) => {
  // create 3 x 3 grid
  const blocks = [];

  for(let i = 0; i < 9; i++) {
    blocks.push(
      <div id={`block_${i}`} className="block" onClick={() => handleDraw(i)}>
        {updatedContent[i]}
      </div>
    );
  }

  return (
    <div className="play-area">
      {blocks}
    </div>
  );
};

const Game = ({ content, setContent, turn, setTurn, opponentPlay, handleDraw }) => {
  const [isOver, setIsOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

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

  const calculateTie = () => {
    for(let i = 0; i <= 8; i++) {
      if(content[i] === '') {
        return;
      }
    }

    setIsTie(true);
  };

  const handleReset = () => {
    setContent(['', '', '', '', '', '', '', '', '']);
    setIsOver(false);
    setWinner(null);
    setIsTie(false);
  };

  useEffect(() => {
    calculateWinner();
    calculateTie();
  }, [content]);

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <PlayArea turn={turn} setTurn={setTurn} setContent={setContent} updatedContent={updatedContent} isOver={isOver} opponentPlay={opponentPlay} handleDraw={handleDraw} />
      {isOver && <h2 id="winner">Winner is {winner}</h2>}
      {isTie && <h2>Game is Tie</h2>}
      {(isTie || isOver) && <button onClick={() => handleReset()}>RESET BOARD</button>}
    </div>
  );

};

const App = () => {
  const [content, setContent] = useState(['', '', '', '', '', '', '', '', '']);
  const [turn, setTurn] = useState(true);
  const [opponentPlay, setOpponentPlay] = useState();

  const updatedContent = [...content];

  const handleDraw = (index) => {
    if(turn) {
      updatedContent[index] = 'X';

    } else {
      updatedContent[index] = 'O';
    }

    setContent(updatedContent);
    setTurn(!turn);
  };

  // socket.io stuff
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('hello', (msg) => {
      console.log(msg);
    });

    socket.on('play', (index) => {
      setOpponentPlay(index);
    });
  }, [socket]);

  return (
    <Game content={content} setContent={setContent} turn={turn} setTurn={setTurn} opponentPlay={opponentPlay} handleDraw={handleDraw} />
  );
};

export default App;
