/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
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
  const [character, setCharacter] = useState("PROFILE_1");

  const handleRegister = () => {
    const userDetails = {
      email: mail,
      password,
      username,
      birthday: String(year + "-" + month + "-" + day),
      image:
        character === "PROFILE_1"
          ? "https://drive.google.com/uc?export=view&id=1egJ7dIHOoE3Ao69mNBz5Hp44frolM8Qj"
          : character === "PROFILE_2"
          ? "https://drive.google.com/uc?export=view&id=1bBhMAYzWfzMApTI5WCd2JkTFnJTB_y7Y"
          : character === "PROFILE_3"
          ? "https://drive.google.com/uc?export=view&id=1IRa9KVpgM9S7c7_fs-nH4xzmcPLfsLOt"
          : "https://drive.google.com/uc?export=view&id=1egJ7dIHOoE3Ao69mNBz5Hp44frolM8Qj",
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
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5  rounded-lg backdrop-blur-md bg-white/50 z-40"></div> */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5  z-40 p-6  flex flex-col bg-white/50 rounded-xl drop-shadow-md">
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
            rePassword={rePassword}
            setRePassword={setRePassword}
            day={day}
            month={month}
            year={year}
            setDay={setDay}
            setMonth={setMonth}
            setYear={setYear}
            character={character}
            setCharacter={setCharacter}
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
