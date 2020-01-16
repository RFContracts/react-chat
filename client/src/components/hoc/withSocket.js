import React from 'react';
import {SocketConsumer} from "../socket-context/socket-context";

const withSocket = () => (Wrapped) => {
  return props => {
    return (
      <SocketConsumer>
        {
          (socket) => {
            return(
              <Wrapped {...props}  socket={socket} />
            )
          }
        }
      </SocketConsumer>
    )
  }
};

export default withSocket;
