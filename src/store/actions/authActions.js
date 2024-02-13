import * as api from "../../api";
import { openAlertMessage, setLoadingPage } from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};
const errorServerText =
  "There is an error on the server. Please try again later.";
export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails, history, id) =>
      dispatch(register(userDetails, history, id)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    changePassword: (userDetails, history) =>
      dispatch(changePassword(userDetails, history)),
    sendMailToResetPassword: (userDetails, history) =>
      dispatch(sendMailToResetPassword(userDetails, history)),
  };
};

export const setUserDetails = (userDetails) => {
  console.log(userDetails);
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, history) => {
  return async (dispatch) => {
    dispatch(setLoadingPage(true));

    try {
      const response = await api.login(userDetails);
      if (response.error) {
        dispatch(
          openAlertMessage(
            response?.exception?.response?.data?.message || errorServerText
          )
        );
        dispatch(setLoadingPage(false));
      } else {
        const { userDetails } = response?.data;
        dispatch(setUserDetails(userDetails));
        localStorage.setItem("user", JSON.stringify(userDetails));
        history.push("/dashboard");
        dispatch(setLoadingPage(false));
      }
    } catch (exception) {
      console.log(exception);
      dispatch(setLoadingPage(false));
    }
  };
};

const register = (userDetails, history, id) => {
  console.log(id);
  return async (dispatch) => {
    dispatch(setLoadingPage(true));
    try {
      userDetails.characterId = id;
      console.log(userDetails);
      const response = await api.register(userDetails);
      if (response.error) {
        dispatch(setLoadingPage(false));
        dispatch(
          openAlertMessage(
            response?.exception?.response?.data.message || errorServerText
          )
        );
      } else {
        const userDetail = response?.data.data;
        const data = {
          email: userDetail.email,
          password: userDetails.password,
        };
        dispatch(login(data, history));
      }
    } catch (exception) {
      throw exception;
    }
  };
};

const sendMailToResetPassword = (userDetails, history) => {
  return async (dispatch) => {
    dispatch(setLoadingPage(true));

    try {
      const response = await api.sendMailToResetPw(userDetails);
      if (response.error) {
        dispatch(
          openAlertMessage(
            response?.exception?.response?.data.message || errorServerText
          )
        );
        dispatch(setLoadingPage(false));
      } else {
        const userDetail = response?.data;
        history.push("/sent-mail");
        dispatch(setLoadingPage(false));
      }
    } catch (exception) {
      console.log(exception);
      dispatch(setLoadingPage(false));
    }
  };
};

const changePassword = (userDetails, history) => {
  return async (dispatch) => {
    dispatch(setLoadingPage(true));

    try {
      const response = await api.changePassword(userDetails);
      if (response.error) {
        dispatch(setLoadingPage(false));
        if (
          response?.exception?.response?.data.message ===
          "Invalid Token: Token is expired"
        ) {
          dispatch(openAlertMessage("Please send mail request again."));
        }
        dispatch(
          openAlertMessage(
            response?.exception?.response?.data.message || errorServerText
          )
        );
      } else {
        const userDetail = response?.data;
        dispatch(setLoadingPage(false));
        history.push("/login");
      }
    } catch (exception) {
      dispatch(setLoadingPage(false));
    }
  };
};
