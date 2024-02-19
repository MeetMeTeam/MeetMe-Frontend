import React, { useState, useEffect } from 'react';
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/alertActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { openAlertMessage } from '../../store/actions/alertActions'
import { useDispatch } from 'react-redux';

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  const notify = () => toast(`🦄 ${alertMessageContent}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;
  const dispatch = useDispatch();

  useEffect(() => {
    if(alertMessageContent){
          notify()
          dispatch(closeAlertMessage()  )
    }
  },[showAlertMessage]);
  return (
 
    <ToastContainer className="popup"/>

  );
};

const mapStoreStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(AlertNotification);
