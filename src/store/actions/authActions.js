import * as api from "../../api";
import { openAlertMessage  , setLoadingPage } from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails, history) =>
      dispatch(register(userDetails, history)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
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
      console.log(response);

    if (response?.exception?.response?.status===401) {
        dispatch(
          openAlertMessage(
            response?.exception?.response?.data?.message ||
              "มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้งภายหลัง"
          )
        );
        dispatch(setLoadingPage(false));
      
      }else
        {
        const { userDetails } = response?.data;

        dispatch(setUserDetails(userDetails));
        localStorage.setItem("user", JSON.stringify(userDetails));
        history.push("/dashboard");
        dispatch(setLoadingPage(false));
      }
    }
     catch (exception) {
      console.log(exception);
      dispatch(setLoadingPage(false));
    
    }
  };
};

const register = (userDetails, history) => {

  return async (dispatch) => {
    dispatch(setLoadingPage(true));
    try {
      const response = await api.register(userDetails);
      if (response.error) {
        dispatch(setLoadingPage(false));
        dispatch(openAlertMessage(response?.exception?.response?.data.message));
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