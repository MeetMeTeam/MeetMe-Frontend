import "animate.css";
import React from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import "./index.css";
import AlertNotification from "./shared/components/AlertNotification";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { openAlertMessage } from './store/actions/alertActions'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  return (
    <div>
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
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </div>
  );
}

export default App;
