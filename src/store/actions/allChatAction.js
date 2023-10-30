const allChatAction = {
    UPDATE_CHAT_LIST: "ALERT.UPDATE_CHAT_LIST",
    CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
  };
  
  export const getActions = (dispatch) => {
    return {
      UpdateChatList: (content) => dispatch(UpdateChatList(content)),
    };
  };
  
  export const UpdateChatList = (content) => {
    return {
      type: allChatAction.UPDATE_CHAT_LIST,
      content
    };
  };
  
  
  export default allChatAction;
  