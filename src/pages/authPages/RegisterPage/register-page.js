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
import Lottie from "react-lottie";
import animationData from "../../../lotties/email.json";
import animationData2 from "../../../lotties/mailLoading.json";
import ModalText from "../../../shared/components/ModalText";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData2,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
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
  const [otp, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShowVerifyEmail, setIsShowVerifyEmail] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  function handleCloseModal() {
    setOpenModal(false);
  }
  const [refCode, setRefCode] = useState("");

  const handleRegister = async () => {
    const userDetails = {
      email: mail,
      password,
      username,
      otp,
      refCode,
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
        ? defaultAvatar.find((avatar) => avatar.Type === "C_1").ID
        : character === "PROFILE_2"
        ? defaultAvatar.find((avatar) => avatar.Type === "C_2").ID
        : character === "PROFILE_3"
        ? defaultAvatar.find((avatar) => avatar.Type === "C_3").ID
        : "65bf731fdef1b706cebf3572"
    );
  };

  async function verifyEmail() {
    setIsShowVerifyEmail(true);
    setIsLoading(true);
    const response = await api.verifyEmail(mail);
    if (response.error) {
      setErrorText(response?.exception?.response?.data.message);
      setIsLoading(false);
      setIsShowVerifyEmail(false);
      setOpenModal(true);
    } else {
      setRefCode(response.data.data.refCode);
      setIsLoading(false);
    }
  }
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
  }, [
    mail,
    displayname,
    username,
    password,
    setIsFormValid,
    rePassword,
    day,
    month,
    year,
  ]);

  return (
    <div className="bg-yellow-90 select-none relative w-screen h-screen flex items-center">
      <ModalText
        headText={errorText}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        bgColor={"bg-purple-40"}
      />
      {!isTabletOrMobile && (
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/web-image%2FSlide%2016_9%20-%2015.png?alt=media&token=8e6c25a9-ead0-446d-bb43-6594be75ee6f"
          }
          className="absolute top-0 w-screen h-screen object-cover"
        />
      )}

      <div className=" relative w-full flex items-center justify-center">
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5  rounded-lg backdrop-blur-md bg-white/50 z-40"></div> */}
        {isShowVerifyEmail ? (
          <div className="bg-white/80 h-[600px] flex justify-center items-center text-center p-6  max-w-[700px] w-full rounded-2xl ">
            {isLoading ? (
              <div>
                {" "}
                <Lottie options={defaultOptions2} height={400} width={400} />
              </div>
            ) : (
              <div>
                <Lottie options={defaultOptions} height={200} width={200} />
                <div className="font-bold text-[20px]">JUST ONE MORE STEP,</div>
                <div className="font-bold text-[20px]">
                  LET'S VERIFY YOUR EMAIL
                </div>
                <div className="text-gray-600 mt-4 text-[14px] w-[520px]">
                  We already send a code to{" "}
                  <span className="text-black font-bold "> {mail} </span>
                  please check your inbox and insert the code in form below to
                  verify your email.
                </div>
                <div>
                  <input
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    className="border border-black/30 rounded-2xl mt-10 py-4 w-full text-[20px] text-center"
                  />
                </div>
                <div
                  onClick={handleRegister}
                  className="mt-6 cursor-pointer hover:bg-blue-60 bg-blue-70 text-white rounded-2xl py-4 text-[20px] font-bold"
                >
                  Verify email
                </div>
              </div>
            )}
          </div>
        ) : (
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
              handleRegister={verifyEmail}
              isFormValid={isFormValid}
            />
          </div>
        )}
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
