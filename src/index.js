import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { SocketContext, socket } from './context/socket';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>
);
