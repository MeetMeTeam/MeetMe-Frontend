/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import AuthBox from "../../../shared/components/AuthBox";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import LoginPageInputs from "./LoginPageInputs";
import SnowAnimation from "./SnowAnimation";
import { validateLoginForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
const LoginPage = ({ login }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' })

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      email: mail,
      password,
    };

    login(userDetails, history);
  };

  return (
    <div className="select-none relative bg-purple-90 w-screen h-screen ">
      <SnowAnimation />

      <img
        src={process.env.PUBLIC_URL + "/loginPage/water1.png"}
        class="absolute z-10 bottom-0 w-full object-contain"
      />
      <img
        src={process.env.PUBLIC_URL + "/loginPage/water2.png"}
        class="absolute z-0 bottom-0 w-full  object-contain"
      />

      <div className="absolute w-screen h-screen z-30 flex lg:flex-row flex-col justify-center">
        <div className="lg:w-1/2 w-full flex justify-center items-center">
          {!isTabletOrMobile &&
          <img
            src={process.env.PUBLIC_URL + "/loginPage/tree.png"}
            className="w-3/4 lg:block"
          />
          }
        </div>

        <div className="relative lg:w-1/2 w-full flex items-center justify-center">
          <div className="absolute xl:w-3/5 w-4/5 h-[530px] rounded-lg bg-white opacity-50">
          
          </div>
          <div className="absolute xl:w-3/5 w-4/5 h-[530px] z-40 p-6  flex flex-col">
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
