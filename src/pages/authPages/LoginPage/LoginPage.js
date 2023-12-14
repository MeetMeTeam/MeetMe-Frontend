/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import SnowAnimation from "../../../shared/components/SnowAnimation";
import { validateLoginForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import styles from "../../../shared/css/animationBounce.module.css";

const LoginPage = ({ login }) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' })

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e)
    const userDetails = {
      email: mail,
      password,
    };

    login(userDetails, history);
  };

  return (
    <div className="select-none relative bg-purple-90 w-screen h-screen ">
      <SnowAnimation className="z-30" />

      <img
        src={process.env.PUBLIC_URL + "/loginPage/water1.png"}
        className="absolute z-10 bottom-0 w-full object-contain"
      />
      <img
        src={process.env.PUBLIC_URL + "/loginPage/water2.png"}
        className="absolute z-0 bottom-0 w-full  object-contain"
      />

      <div className="absolute w-screen h-screen flex lg:flex-row flex-col justify-center">
        <div className="lg:w-1/2 w-full flex justify-center items-center relative">
          {!isTabletOrMobile &&
          <div className="z-20 max-w-[700px] relative w-full flex justify-center">
              <img
            src={process.env.PUBLIC_URL + "/loginPage/nongYellow.png"}
            className={styles.imgBounce + " absolute z-30 w-[200px] left-10 bottom-5"}

          />
             <img
            src={process.env.PUBLIC_URL + "/loginPage/tree.png"}
            className="w-2/4 lg:block ml-20 z-20"
          />
                <img
            src={process.env.PUBLIC_URL + "/loginPage/nongRed.png"}
            className={styles.imgBounce + " absolute z-30 w-[200px] right-10 top-5"}
          />
          </div>
         
          }
        </div>

        <div className="relative  lg:w-1/2 w-full flex items-center justify-center">
          <div className="absolute z-50 xl:w-4/5 w-4/5 h-[530px] rounded-lg bg-white opacity-50">
          
          </div>
          <div className="absolute z-50 xl:w-4/5 w-4/5 h-[530px]  p-6  flex flex-col">
            <LoginPageHeader/>
            <LoginPageInputs
              mail={mail}
              setMail={setMail}
              password={password}
              setPassword={setPassword}
            />
            <LoginPageFooter
              isFormValid={isFormValid}
              handleLogin={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
