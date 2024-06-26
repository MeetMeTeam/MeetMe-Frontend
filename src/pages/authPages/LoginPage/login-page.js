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
import { useMediaQuery } from "react-responsive";
import styles from "../../../shared/css/animationBounce.module.css";
import Grow from "@mui/material/Grow";
import Zoom from "@mui/material/Zoom";
import FireworkAnimation from "../../../shared/components/FireworkAnimation";
import GiftAnimetion from "../../../shared/components/GiftAnimation";
import { useLocation } from "react-router-dom";

const LoginPage = ({ login }) => {
  const history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 960px)" });

  useEffect(() => {
    // setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      email: mail,
      password,
    };

    login(userDetails, history);
  };

  const imgList = [
    {
      imgPath: "/loginPage/songkan/Union.png",
      class: "absolute z-10 w-[80%]",
      timeout: 700,
    },
    {
      imgPath: "/loginPage/songkan/ground.png",
      class: "absolute z-[20] bottom-10 w-[80%]",
      timeout: 400,
    },
    {
      imgPath: "/loginPage/songkan/elefen.png",
      class: styles.imgBounce + " absolute z-[30] right-20 bottom-28 w-[30%]",
      timeout: 800,
    },
    {
      imgPath: "/loginPage/songkan/purple.png",
      class: styles.imgBounce + " absolute z-[40] left-1/2 bottom-10 w-[20%]",
      timeout: 900,
    },
    {
      imgPath: "/loginPage/songkan/red.png",
      class: styles.imgBounce + " absolute z-[50] right-1/2 bottom-20 w-[30%]",
      timeout: 1000,
    },
    {
      imgPath: "/loginPage/songkan/text.png",
      class: " absolute z-[60] w-[60%]",
      timeout: 1000,
    },
  ];

  useEffect(() => {
    const value = localStorage.getItem("user");
    if (value) {
      history.push("/home");
    }
  }, []);

  return (
    <div className="select-none relative overflow-hidden bg-blue-80 w-screen h-screen ">
      {/* <SnowAnimation className="z-30" /> */}
      <GiftAnimetion
        width={"w-[30px]"}
        count={12}
        img={process.env.PUBLIC_URL + "/loginPage/songkan/flower.svg"}
      />
      <FireworkAnimation
        count={12}
        img={process.env.PUBLIC_URL + "/loginPage/songkan/flower.svg"}
      />
      {/* <img
        src={process.env.PUBLIC_URL + "/loginPage/bgHpy.png"}
        className="absolute z-10 bottom-0 w-full object-contain"
      /> */}

      <img
        src={process.env.PUBLIC_URL + "/loginPage/songkan/SignIn-Songkarn.png"}
        className="absolute z-10 bottom-0 w-full h-full object-cover"
      />

      <img
        src={process.env.PUBLIC_URL + "/loginPage/songkan/top.png"}
        className="absolute z-10 top-0 w-full  object-cover"
      />
      <div className="absolute w-screen h-screen flex lg:flex-row flex-col justify-center">
        <div className="lg:w-1/2 relative w-full flex justify-center items-center">
          {/* {!isTabletOrMobile && (
            <div className="z-20 w-full flex justify-center items-center">
              <img
                src={process.env.PUBLIC_URL + "/loginPage/2024text.png"}
                className={"top-0 right-10 absolute z-30 w-[55%]"}
              />
              <img
                src={process.env.PUBLIC_URL + "/loginPage/hpyMastcos.png"}
                className={
                  styles.imgBounce + " absolute z-30 mt-[100px] w-[80%]"
                }
              />
            </div>
          )} */}
          {!isTabletOrMobile &&
            imgList.map((e) => (
              <Zoom in={true} {...{ timeout: e.timeout }}>
                <img
                  src={process.env.PUBLIC_URL + e.imgPath}
                  className={e.class}
                />
              </Zoom>
            ))}
        </div>

        <div className="relative  lg:w-1/2 w-full flex items-center justify-center">
          <div className="absolute z-50 xl:w-4/5 w-4/5 h-[580px] rounded-lg bg-white opacity-70"></div>
          <div className="absolute z-50 xl:w-4/5 w-4/5 h-[580px]  p-6  flex flex-col">
            <LoginPageHeader />
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
