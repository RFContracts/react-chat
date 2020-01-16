import React from "react";
import {useSelector} from "react-redux";
import "./MessageList.css";

export const MessageList = () => {
  const messages = useSelector(state => state.chat.messages);

  return (
    <div className="message-list">
      <ul>
        {
          messages.map((m, index) => {
            return (
              <li key={index}>
                <span className='message-list__name'>
                  {m.owner_name}:
                </span> {m.text}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};
