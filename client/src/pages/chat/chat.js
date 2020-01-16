import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Sidebar} from "../../components/sidebar/Sidebar";
import {MessageList} from "../../components/message-list/MessageList";
import AddMessage from "../../components/add-message/AddMessage";
import {Header} from "../../components/header/Header";
import './chat.css';
import withSocket from "../../components/hoc/withSocket";

const Chat = ({socket, history}) => {
  const user = useSelector(state => state.chat.user);

  const [error, setError] = useState(false);

  if (!user) {
    history.push('/');
  }

  socket.addError(() => {
    setError(true);
  });

  socket.setReconnect(() => {
    login(user.name);
    setError(false)
  });

  const login = (userName) => {
    const user = {
      type: 'Login',
      data: {
        name: userName || "Guest"
      }
    };
    socket.send(JSON.stringify(user));
  };

  const errorMessage = error ? <div className="chat-error">Соединение с сервером потеряно</div> : null;

  return (
    <>
      <Header history={history}/>
      <div className="container">
        <div className="main-chat">
          <Sidebar/>
          <div className="chat">
            <MessageList/>
            <AddMessage/>
          </div>
        </div>
      </div>
      {errorMessage}
    </>
  )
};

export default withSocket()(Chat)
