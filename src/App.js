import './App.css';

const Grid = () => {
  return (
    <div class="play-area">
      <div id="block_0" class="block">X</div>
      <div id="block_1" class="block">O</div>
      <div id="block_2" class="block"></div>
      <div id="block_3" class="block"></div>
      <div id="block_4" class="block"></div>
      <div id="block_5" class="block"></div>
      <div id="block_6" class="block"></div>
      <div id="block_7" class="block"></div>
      <div id="block_8" class="block"></div>
    </div>
  );
};

const App = () => {
  return (
    <div class="container">
      <h1>Tic-Tac-Toe</h1>
      <Grid />
    </div>
  )
}

export default App;
