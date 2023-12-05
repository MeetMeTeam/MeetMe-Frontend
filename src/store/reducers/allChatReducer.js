import allChatAction from "../actions/allChatAction";

const initState = {
  chatList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case allChatAction.UPDATE_CHAT_LIST:
      return {
        ...state,
        chatList: [...state.chatList, action.content],   
       };
       case allChatAction.CLEAR_CHAT_LIST:
      return {
        ...state,
        chatList: [],   
       };
    default:
      return state;
  }
};

export default reducer;
