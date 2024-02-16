/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import RegisterPageInputs from "./components/RegisterPageInputs";
import RegisterPageFooter from "./components/RegisterPageFooter";
import RegisterHeader from "./components/RegisterHeader";
import { validateRegisterForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import SnowAnimation from "../../../shared/components/SnowAnimation";
import { useMediaQuery } from "react-responsive";
import * as api from "../../../api";

const RegisterPage = ({ register }) => {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

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
  const [defaultAvatar, setDefaultAvatar] = useState([]);
  const handleRegister = async () => {
    const userDetails = {
      email: mail,
      password,
      username,
      birthday: String(year + "-" + month + "-" + day),
      image:
        character === "PROFILE_1"
          ? "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/PROFILE_1.png?alt=media&token=ed206403-d2b6-474f-b6cf-31fefb27bc0f"
          : character === "PROFILE_2"
          ? "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/PROFILE_2.png?alt=media&token=3a22f0f3-e033-4d25-ae67-ff1d93c6d625"
          : character === "PROFILE_3"
          ? "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/PROFILE_3.png?alt=media&token=c0866559-bf5e-4544-948a-3cdb65ce2ffb"
          : "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/PROFILE_3.png?alt=media&token=c0866559-bf5e-4544-948a-3cdb65ce2ffb",
      displayName: displayname,
    };

    register(
      userDetails,
      history,
      character === "PROFILE_1"
        ? defaultAvatar[0].ID
        : character === "PROFILE_2"
        ? defaultAvatar[1].ID
        : character === "PROFILE_3"
        ? defaultAvatar[2].ID
        : "65bf731fdef1b706cebf3572"
    );
  };
  async function getAvatarDefault() {
    const response = await api.getAvatarDefault("C");
    if (response.error) {
      console.log(response?.exception?.response?.data.message);
    } else {
      setDefaultAvatar(response.data.data);
    }
  }

  useEffect(() => {
    getAvatarDefault();
  }, []);
  useEffect(() => {
    if (
      mail &&
      username &&
      displayname &&
      password &&
      rePassword &&
      day &&
      month &&
      year
    ) {
      setIsFormValid(
        validateRegisterForm({
          mail,
          username,
          password,
        }) &&
          displayname &&
          rePassword === password
      );
    } else {
      setIsFormValid(false);
    }
  }, [mail, displayname, username, password, setIsFormValid, rePassword]);

  return (
    <div className="bg-yellow-90 select-none relative w-screen h-screen flex items-center">
      {!isTabletOrMobile && (
        <div>
          <img
            src={process.env.PUBLIC_URL + "/registerPage/bg-register-china.png"}
            className="absolute z-10 bottom-0 w-full object-contain"
          />
        </div>
      )}

      <div className=" relative w-full flex items-center justify-center">
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5  rounded-lg backdrop-blur-md bg-white/50 z-40"></div> */}
        <div className="scale-75 absolute top-1/2 left-1/2 transform -translate-x-1/2 md:mt-0 mt-56 -translate-y-1/2 md:w-3/5 w-4/5  z-40 p-6  flex flex-col bg-white/90 rounded-xl drop-shadow-md">
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
