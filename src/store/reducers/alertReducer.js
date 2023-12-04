import alertActions from "../actions/alertActions";

const initState = {
  showAlertMessage: false,
  alertMessageContent: null,
  Notification:[]
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case alertActions.REMOVE_NOTIFICATION:
      let newNotification = [];
      newNotification = [...state.Notification];
      const index = newNotification.findIndex((item) => item.roomId === action.roomId);
      newNotification.splice(index, 1);
      return { ...state, Notification: newNotification };
    case alertActions.UPDATE_NOTIFICATION:
      return {
        ...state,
        Notification: [...state.Notification, action.content],   
       };
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content === "Not Found" ? "มีบางอย่างผิดพลาดเกี่ยวกับเซิฟเวอร์" :action.content ,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
