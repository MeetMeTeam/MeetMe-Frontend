import allChatAction from "../actions/allChatAction";

const initState = {
  chatList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case allChatAction.UPDATE_CHAT_LIST:
      const test = state.chatList.some(
        (chatItem) => chatItem.textId === action.content.textId
      );
      console.log(test);
      if (test) {
        return state;
      } else {
        return {
          ...state,
          chatList: [...state.chatList, action.content],
        };
      }
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
