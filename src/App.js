import "animate.css";
import React, { useState , useEffect  } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import MainPages from "./pages/MainPages/HomePage";
import LoginPage from "./pages/authPages/LoginPage/LoginPage";
import RegisterPage from "./pages/authPages/RegisterPage/RegisterPage";
import "./index.css";
import AlertNotification from "./shared/components/AlertNotification";
import { clearChatList } from './store/actions/allChatAction'
import { useDispatch } from 'react-redux';
import LoadingPage from './shared/components/LoadingPage'
import { useSelector } from "react-redux";
import ModalText from "./shared/components/ModalText";

function App() {
  const dispatch = useDispatch();
  const isShowModalErrorSocket = useSelector((state) => state.alert.isSocketErrorModal);
  const isShowLoadingPage = useSelector((state) => state.alert.isLoadingPage);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  useEffect(() => {
  console.log("clearChatList")
  dispatch(clearChatList())
  }, [])
  useEffect(() => {
  console.log(isShowModalErrorSocket)
    if(isShowModalErrorSocket){
      handleOpenModal()
    }else{
      handleCloseModal()
    }
    }, [isShowModalErrorSocket])
  return (
    <div className="relative">
     {isShowLoadingPage &&  <LoadingPage/>} 
     <ModalText
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        closeModal={handleCloseModal}
        headText={"Failed connect to Server"}
        textDetailOne={"socket server have problem, Sorry"}
        textDetailTwo={`please try to connect again later.`}
        bgColor="bg-purple-50"
      />
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/home">
            <MainPages />
          </Route>
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
