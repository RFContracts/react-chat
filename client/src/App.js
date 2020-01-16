import React from 'react';
import {Route} from 'react-router-dom';
import Login from "./pages/login/login";
import Chat from "./pages/chat/chat";

function App() {
  return (
    <div className="main">
      <Route
        path='/'
        exact
        render={(props) => (<Login {...props} />)}
      />
      <Route
        path='/chat'
        render={(props) => (<Chat {...props} />)}
      />
    </div>
  );
}

export default App;
