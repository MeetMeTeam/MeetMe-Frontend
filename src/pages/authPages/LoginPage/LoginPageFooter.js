import React from "react";
import CustomPrimaryButton from "../../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Enter correct e-mail address and password should contains between 6 and 12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const history = useHistory();

  const handlePushToRegisterPage = () => {
    history.push("/register");
  };

  return (
    <>
     <RedirectInfo
        text="Do not have an account ? "
        redirectText="Create an account"
        additionalStyles={{ marginTop: "32px" }}
        redirectHandler={handlePushToRegisterPage}
      />
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            data="button-create"
            label="Sign In ->"
            additionalStyles={{ marginTop: "5px" ,color: "white"}}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
     
    </>
  );
};

export default LoginPageFooter;
