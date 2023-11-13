import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../../shared/components/AuthBox";
import RegisterPageInputs from "./RegisterPageInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";

const RegisterPage = ({ register }) => {
  const history = useHistory();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = {
      email : mail,
      password,
      username,
      birthday : "2023-8-12",
      image : "https://scontent.fbkk20-1.fna.fbcdn.net/v/t1.18169-9/10492251_463085203858201_6361870020470654759_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_ohc=LmCxicLFJtIAX8U-zNk&_nc_ht=scontent.fbkk20-1.fna&oh=00_AfA-lDZ4VFiVOds4c4tJDGylGyStEY8RY7CXRfbWbUiK3A&oe=6570232E",
      firstname : "test",
      lastname : "test"
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
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
