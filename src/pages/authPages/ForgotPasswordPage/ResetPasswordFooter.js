import React from "react";
import CustomPrimaryButton from "../../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address";
};

const getFormValidMessage = () => {
  return "Press to send mail!";
};

const ResetPasswordFooter = (props) => {

  const history = useHistory();

  const handlePushToLoginPage = () => {
    history.push("/login");
  };
  
  return (
    <>
        <Tooltip
          title={!props.isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
        >
          <div>
          <CustomPrimaryButton
            label="Send Mail"
            additionalStyles={{ marginTop: "32px", color: "white" }}
            onClick={props.handleResetPassword}
            disabled={!props.isFormValid}
          />
          </div>
        </Tooltip>
        <RedirectInfo
          text="Have an account ? "
          redirectText="Sign in"
          additionalStyles={{ marginTop: "32px" }}
          redirectHandler={handlePushToLoginPage}
        />

    </>
  );
};

export default ResetPasswordFooter;
