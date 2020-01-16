import {ADD_CHAT_USER, SEND_MESSAGE, SET_USER, ADD_CHAT_USERS} from "../types";

const initialState = {
  user: null,
  chatUsers: [],
  messages: []
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessages = [...state.messages];
      newMessages.push(action.payload);
      return {
        ...state,
        messages: newMessages
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ADD_CHAT_USER:
      const newChatUsers = [...state.chatUsers];
      newChatUsers.push(action.payload);
      return {
        ...state,
        chatUsers: newChatUsers
      };
    case ADD_CHAT_USERS:
      return {
        ...state,
        chatUsers: action.payload
      };
    default:
      return state
  }
};
