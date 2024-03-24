const alertActions = {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
  UPDATE_NOTIFICATION: "ALERT.UPDATE_NOTIFICATION",
  REMOVE_NOTIFICATION: "ALERT.REMOVE_NOTIFICATION",
  SET_LOADING_PAGE: "ALERT.SET_LOADING_PAGE",
  SET_MODAL_SOCKET_ERROR: "ALERT.SET_MODAL_SOCKET_ERROR",
  SET_GIFT_NOTIFICATION: "ALERT.SET_GIFT_NOTIFICATION",
};

export const getActions = (dispatch) => {
  return {
    openAlertMessage: (content) => dispatch(openAlertMessage(content)),
    closeAlertMessage: () => dispatch(closeAlertMessage()),
    setLoadingPage: (content) => dispatch(setLoadingPage(content)),
    setModalErrorSocket: (content) => dispatch(setModalErrorSocket(content)),
    setGiftNotification: (content) => dispatch(setGiftNotification(content)),
  };
};

export const setGiftNotification = (content) => {
  return {
    type: alertActions.SET_GIFT_NOTIFICATION,
    content,
  };
};
export const setModalErrorSocket = (content) => {
  return {
    type: alertActions.SET_MODAL_SOCKET_ERROR,
    content,
  };
};

export const setLoadingPage = (content) => {
  return {
    type: alertActions.SET_LOADING_PAGE,
    content,
  };
};

export const setNotification = (content) => {
  return {
    type: alertActions.UPDATE_NOTIFICATION,
    content,
  };
};
export const removeNotification = (content) => {
  return {
    type: alertActions.REMOVE_NOTIFICATION,
    content,
  };
};

export const openAlertMessage = (content) => {
  return {
    type: alertActions.OPEN_ALERT_MESSAGE,
    content,
  };
};

export const closeAlertMessage = () => {
  return {
    type: alertActions.CLOSE_ALERT_MESSAGE,
  };
};

export default alertActions;
