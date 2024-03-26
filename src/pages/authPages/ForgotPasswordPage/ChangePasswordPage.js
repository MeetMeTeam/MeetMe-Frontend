import React, { useState, useEffect } from "react";
import ResetPasswordHeader from "./ResetPasswordHeader";
import InputWithLabel from "../../../shared/components/InputWithLabel";
import CustomPrimaryButton from "../../../shared/components/CustomPrimaryButton";
import { useParams, useHistory } from "react-router-dom";
import { getActions } from "../../../store/actions/authActions";
import { connect } from "react-redux";

const ChangePasswordPage = ({ changePassword }) => {
  const history = useHistory();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isMatch, setIsMatch] = useState(false);
  useEffect(() => {
    if (password !== "" && rePassword !== "" && password === rePassword) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }, [password, rePassword]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log(e);
    const userDetails = {
      password: password,
      token: params.token,
    };
    changePassword(userDetails, history);
  };
  return (
    <>
      <div className="relative  w-screen h-screen flex items-center justify-center">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/web-image%2FSlide%2016_9%20-%2015.png?alt=media&token=8e6c25a9-ead0-446d-bb43-6594be75ee6f"
          }
          className="absolute z-10 bottom-0 w-full object-contain"
        />
        <div className="absolute z-50 xl:w-[617px] w-[617px] h-[530px] rounded-lg bg-white "></div>
        <div className="absolute z-50 xl:w-[617px] w-[617px] h-[530px]  p-6  flex flex-col">
          <ResetPasswordHeader />
          <div className="flex flex-col space-y-8">
            <InputWithLabel
              value={password}
              setValue={setPassword}
              label="New password"
              type="password"
              placeholder="enter new password"
            />
            <InputWithLabel
              value={rePassword}
              setValue={setRePassword}
              label="New re-password"
              type="password"
              placeholder="enter new password again"
            />
          </div>
          <CustomPrimaryButton
            label="Confirm change"
            additionalStyles={{ marginTop: "32px", color: "white" }}
            disabled={!isMatch}
            onClick={handleChangePassword}
          />
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(ChangePasswordPage);
