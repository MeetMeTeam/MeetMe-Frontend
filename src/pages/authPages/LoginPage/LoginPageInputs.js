import React from "react";
import InputWithLabel from "../../../shared/components/InputWithLabel";
import RedirectInfo from "../../../shared/components/RedirectInfo";
import { useHistory } from "react-router-dom";

const LoginPageInputs = ({ mail, setMail, password, setPassword }) => {
  const history = useHistory();

  const handlePushToResetPasswordPage = () => {
    history.push("/reset-password");
  };

  return (
    <div className="flex flex-col space-y-8">
      <InputWithLabel
        data="data-email"
        value={mail}
        setValue={setMail}
        label="USERNAME or e-mail address"
        type="text"
        placeholder="Enter E-Mail Address"
      />
      <InputWithLabel
        data="data-password"
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter Password"
      />
      <RedirectInfo
        redirectText="Forgot Password?"
        // additionalStyles={{ marginTop: "32px" }}
        redirectHandler={handlePushToResetPasswordPage}
      />
    </div>
  );
};

export default LoginPageInputs;
