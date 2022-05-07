import { useState, useEffect, useContext } from 'react';

import { SocketContext } from './context/socket';

import './App.css';

const PlayArea = ({ content, handleDraw, myTurn }) => {
  console.log(myTurn, 'from play area');
  // create 3 x 3 grid
  const blocks = [];

  for(let i = 0; i < 9; i++) {
    blocks.push(
      <div id={`block_${i}`} className="block" onClick={() =>  myTurn && handleDraw(i, false)}>
        {content[i]}
      </div>
    );
  }

  return (
    <div className="play-area">
      {blocks}
    </div>
  );
};

const Game = ({ content, setContent, myTurn, handleDraw }) => {
  const [isOver, setIsOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

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
      <PlayArea myTurn={myTurn} content={content} setContent={setContent} isOver={isOver} handleDraw={handleDraw} />
      {isOver && <h2 id="winner">Winner is {winner}</h2>}
      {isTie && <h2>Game is Tie</h2>}
      {(isTie || isOver) && <button onClick={() => handleReset()}>RESET BOARD</button>}
    </div>
  );

};

const App = () => {
  const [content, setContent] = useState(['', '', '', '', '', '', '', '', '']);
  const [turn, setTurn] = useState(true);
  // const [opponentTurn] = useState(false);
  const updatedContent = [...content];

  const [myTurn, setMyTurn] = useState(true);

  const [play, setPlay] = useState(1);

  // console.log(myTurn);
  console.log(play, 'from root');


  const updateByIndex = (newValue, index) => {
    setContent(values => values.map((value, i) => i === index ? newValue: value));
  };

  const handleDraw = (index, drawFromOther) => {
    if(!drawFromOther) {
      socket.emit('play', index);
      setMyTurn(!myTurn);
    }

    console.log(play, 'from handle draw before setPlay');

    if(play % 2 !== 0) {
      // updatedContent[index] = 'X';
      updateByIndex('X', index);
    } else {     
      updateByIndex('O', index);
    }

    // setTurn(!turn);
    // setContent(updatedContent);

    setPlay(play + 1);
    console.log(play, 'from handle draw after setPlay');


    // setContent(updatedContent);
    // console.log(updatedContent);
    // setTurn(!turn);

    // // setMyTurn(!myTurn);
  };

  // socket.io stuff
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('hello', (msg) => {
      console.log(msg);
    });

    socket.on('play', (index) => {
      handleDraw(index, true);
      setMyTurn(true);
      setPlay(play + 1);
    });
  }, [socket]);

  return (
    <Game content={content} setContent={setContent} turn={turn} handleDraw={handleDraw} myTurn={myTurn} />
  );
};

export default App;
