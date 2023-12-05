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

function App() {
  const dispatch = useDispatch();
  const isShowLoadingPage = useSelector((state) => state.alert.isLoadingPage);

  useEffect(() => {
  console.log("clearChatList")
  dispatch(clearChatList())
  }, [])
  return (
    <div className="relative">
     {isShowLoadingPage &&  <LoadingPage/>} 
       {/* <div>
        <button onClick={()=>  dispatch(openAlertMessage("Hello world")  )}>Notify !</button>
      </div> */}
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
