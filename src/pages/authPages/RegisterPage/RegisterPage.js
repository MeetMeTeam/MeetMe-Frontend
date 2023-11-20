/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import RegisterHeader from "./RegisterHeader";

import { validateRegisterForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import SnowAnimation from "../LoginPage/SnowAnimation";

const RegisterPage = ({ register }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = {
      email: mail,
      password,
      username,
      birthday: String(year + '-' + month + '-' + day),
      image:
        "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.18169-9/10492251_463085203858201_6361870020470654759_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_ohc=LmCxicLFJtIAX8U-zNk&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfA-lDZ4VFiVOds4c4tJDGylGyStEY8RY7CXRfbWbUiK3A&oe=6570232E",
      firstname: "test",
      lastname: "test",
      //displayname
    };

    register(userDetails, history);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <div className="bg-purple-90 select-none relative w-screen h-screen flex items-center">
      <SnowAnimation />
      <img
        src={process.env.PUBLIC_URL + "/RegisterPage/water1.png"}
        class="absolute z-10 bottom-0 w-full object-contain"
      />
      <img
        src={process.env.PUBLIC_URL + "/RegisterPage/water2.png"}
        class="absolute z-0 bottom-0 w-full  object-contain"
      />
      <img
        src={process.env.PUBLIC_URL + "/RegisterPage/tree.png"}
        class="absolute z-20 bottom-20 left-5"
      />
      <img
        src={process.env.PUBLIC_URL + "/RegisterPage/nongRed.png"}
        class="absolute bottom-0 right-5 z-20"
      />
      <div className="relative w-full flex items-center justify-center">
        <div className="absolute w-3/5 h-[550px] rounded-lg backdrop-blur-md bg-white/50 z-40"></div>
        <div className="absolute w-3/5 h-[550px] z-40 p-6  flex flex-col">
          <RegisterHeader />
          <RegisterPageInputs
            mail={mail}
            setMail={setMail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            displayname={displayname}
            setDisplayname={setDisplayname}
            rePassword={setRePassword}
            day={setDay}
            month={setMonth}
            year={setYear}
          />
          <RegisterPageFooter
            handleRegister={handleRegister}
            isFormValid={isFormValid}
          />
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

export default connect(null, mapActionsToProps)(RegisterPage);
