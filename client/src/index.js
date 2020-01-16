import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";

import {SocketProvider} from "./components/socket-context/socket-context";
import store from './store'
import App from './App';
import socket from './socket'
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider value={socket}>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </Provider>,
  document.getElementById('root')
);
