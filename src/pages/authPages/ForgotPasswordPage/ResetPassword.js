/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import SnowAnimation from "../../../shared/components/SnowAnimation";
import ResetPasswordInputs from "./ResetPasswordInputs";
import { validateResetPwForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "../../../shared/css/animationBounce.module.css";
import ResetPasswordHeader from "./ResetPasswordHeader";
import ResetPasswordFooter from "./ResetPasswordFooter";
import * as api from "../../../api";

const ResetPassword = ({ sendMailToResetPassword }) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  //   const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const [isSendMail, setIsSendMail] = useState(false);

  useEffect(() => {
    setIsFormValid(validateResetPwForm({ mail }));
  }, [mail, setIsFormValid]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log(e);
    const userDetails = {
      email: mail,
    };
    sendMailToResetPassword(userDetails, history);
  };

  return (
    <div className="select-none relative bg-purple-90 w-screen h-screen ">
      <img
        src={process.env.PUBLIC_URL + "/loginPage/bgHpy.png"}
        className="absolute z-10 bottom-0 w-full object-contain"
      />
      <div className="absolute w-screen h-screen flex lg:flex-row flex-col justify-center">
        <div className="relative  w-full flex items-center justify-center">
          <div className="absolute z-50  max-w-[700px] h-[430px] p-6 bg-white rounded-lg  flex flex-col">
            <ResetPasswordHeader />

            <ResetPasswordInputs mail={mail} setMail={setMail} />

            <ResetPasswordFooter
              isFormValid={isFormValid}
              handleResetPassword={handleResetPassword}
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

export default connect(null, mapActionsToProps)(ResetPassword);
