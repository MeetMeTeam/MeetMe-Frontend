import "animate.css";
import React, { useState, useEffect } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";

import "./App.css";
import SuccessPaymentPage from "./pages/payMentPages/success-page";
import ShopPage from "./pages/payMentPages/shop-page";
import MainPages from "./pages/MainPages/HomePage";
import LoginPage from "./pages/authPages/LoginPage/login-page";
import RegisterPage from "./pages/authPages/RegisterPage/register-page";
import ResetPasswordPage from "./pages/authPages/ForgotPasswordPage/ResetPassword";
import ChangePasswordPage from "./pages/authPages/ForgotPasswordPage/ChangePasswordPage";
import SentMailResetPassword from "./pages/authPages/ForgotPasswordPage/SentMailResetPassword";
import AdminPage from "./pages/adminPages/admin-page";
import "./index.css";
import AlertNotification from "./shared/components/AlertNotification";
import { clearChatList } from "./store/actions/allChatAction";

import { useDispatch } from "react-redux";
import LoadingPage from "./shared/components/LoadingPage";
import { useSelector } from "react-redux";
import ModalText from "./shared/components/ModalText";
import CancelPaymentPage from "./pages/payMentPages/payment-cancel";
import { useParams, useHistory } from "react-router-dom";
import { checkUserInRoom } from "./realtimeCommunication/socketConnection";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isShowModalErrorSocket = useSelector(
    (state) => state.alert.isSocketErrorModal
  );

  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  const activeRoom = useSelector((state) => state.room?.activeRooms);

  const isShowLoadingPage = useSelector((state) => state.alert.isLoadingPage);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  useEffect(() => {
    dispatch(clearChatList());
  }, []);
  useEffect(() => {
    if (isShowModalErrorSocket) {
      handleOpenModal();
    } else {
      handleCloseModal();
    }
  }, [isShowModalErrorSocket]);

  // useEffect(() => {
  //   const userDetails = localStorage.getItem("user");

  //   setTimeout(() => {
  //     if (userDetails) {
  //       checkUserInRoom({ isUserInRoom, userId });
  //     }
  //   }, 500);
  // }, [isUserInRoom]);

  // useEffect(() => {
  //   if (activeRoom.length > 0) {
  //     for (let index = 0; index < activeRoom.length; index++) {
  //       for (
  //         let index2 = 0;
  //         index2 < activeRoom[index].participants.length;
  //         index2++
  //       ) {
  //         if (activeRoom[index].participants[index2].userId === userId) {
  //           checkUserInRoom({ isUserInRoom, userId });
  //         }
  //       }
  //     }
  //   }
  // }, [activeRoom]);

  return (
    <div className="relative">
      {isShowLoadingPage && <LoadingPage />}
      <ModalText
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        closeModal={handleCloseModal}
        headText={"There is a duplicate entry between the two browsers."}
        textDetailOne={"Please use only one browser."}
        textDetailTwo={``}
        bgColor="bg-purple-50"
      />
      <Router>
        <Switch>
          <Route exact path="/reset-password">
            <ResetPasswordPage />
          </Route>
          <Route exact path="/sent-mail">
            <SentMailResetPassword />
          </Route>
          <Route exact path="/reset-password/:token">
            <ChangePasswordPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/home">
            <MainPages />
          </Route>
          <Route exact path="/payment-success/:slug">
            <SuccessPaymentPage />
          </Route>
          <Route exact path="/payment-cancel/:slug">
            <CancelPaymentPage />
          </Route>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          {/* <Route exact path="/shop">
            <ShopPage />
          </Route> */}
          <Route path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </div>
  );
}

export default App;
