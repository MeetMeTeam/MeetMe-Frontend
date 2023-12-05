const allChatAction = {
    UPDATE_CHAT_LIST: "ALERT.UPDATE_CHAT_LIST",
    CLEAR_CHAT_LIST : "ALERT.CLEAR_CHAT_LIST"
  };
  
  export const getActions = (dispatch) => {
    return {
      UpdateChatList: (content) => dispatch(UpdateChatList(content)),
      clearChatList: (content) => dispatch(clearChatList(content)),

    };
  };
  
  export const UpdateChatList = (content) => {
    return {
      type: allChatAction.UPDATE_CHAT_LIST,
      content
    };
  };
  
  export const clearChatList = (content) => {
    return {
      type: allChatAction.CLEAR_CHAT_LIST,
      content
    };
  };
  export default allChatAction;
  