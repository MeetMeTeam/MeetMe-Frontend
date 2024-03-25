import alertActions from "../actions/alertActions";

const initState = {
  showAlertMessage: false,
  alertMessageContent: null,
  Notification: [],
  isLoadingPage: false,
  isSocketErrorModal: false,
  otherSendGift: null,
  cardTalkList: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case alertActions.SET_CARD_TALK_LIST:
      return {
        ...state,
        cardTalkList: [...state.cardTalkList, action.content],
      };
    case alertActions.SET_GIFT_NOTIFICATION:
      return {
        ...state,
        otherSendGift: action.content,
      };
    case alertActions.SET_MODAL_SOCKET_ERROR:
      return {
        ...state,
        isSocketErrorModal: action.content,
      };
    case alertActions.SET_LOADING_PAGE:
      return {
        ...state,
        isLoadingPage: action.content,
      };
    case alertActions.REMOVE_NOTIFICATION:
      let newNotificationRemove = [];
      newNotificationRemove = [...state.Notification];
      const index = newNotificationRemove.findIndex(
        (item) => item.roomId === action.roomId
      );
      newNotificationRemove.splice(index, 1);
      return { ...state, Notification: newNotificationRemove };
    case alertActions.UPDATE_NOTIFICATION:
      let newNotification = [];
      newNotification = [...state.Notification];
      const indexNoti = newNotification.findIndex(
        (item) =>
          item.userDetail.username === action.content.userDetail.username
      );
      console.log(indexNoti);
      if (indexNoti !== -1) {
        return {
          ...state,
          Notification: state.Notification,
        };
      } else {
        return {
          ...state,
          Notification: [...state.Notification, action.content],
        };
      }

    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent:
          action.content === "Not Found"
            ? "มีบางอย่างผิดพลาดเกี่ยวกับเซิฟเวอร์"
            : action.content,
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
