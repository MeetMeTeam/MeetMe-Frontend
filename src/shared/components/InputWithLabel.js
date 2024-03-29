import React from "react";
import { styled } from "@mui/system";
import {
  validateMail,
  validateUsername,
  validateDisplayName,
  validatePassword,
} from "../../shared/utils/validators";

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
});

const Label = styled("p")({
  color: "#666666",
  textTransform: "uppercase",
  fontWeight: "600",
  fontSize: "14px",
  marginBottom: "4px",
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "2px solid #ccc",
  borderRadius: "10px",
  color: "black",
  background: "white",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
  outline: "none",
  // Add :focus pseudo-class to change border color when focused
  ":focus": {
    borderColor: "#065ed1",
  },
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder, width, password, data } =
    props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <div className="flex space-x-2">
        <Label>{label} </Label>
        {label === "E-mail address" &&
          !validateMail(value) &&
          value.length > 0 && (
            <div className="validate-mail text-[12px] text-red-40">Invalid email</div>
          )}

        {label === "Username" &&
          !validateUsername(value) &&
          value.length > 0 && (
            <div className="validate-username text-[12px] text-red-40">Username must be 2-15 character.</div>
          )}
        {label === "Displayname" &&
          !validateDisplayName(value) &&
          value.length > 0 && (
            <div className="validate-displayname text-[12px] text-red-40">Displayname must be 2-15 character.</div>
          )}
        {label === "Password" &&
          !validatePassword(value) &&
          value.length > 0 && (
            <div className="validate-password text-[12px] text-red-40">Please enter more than 6.</div>
          )}
            {password && value ? (password !== value ?  <div className="validate-repassword text-[12px] text-red-40">Password does not match.</div> : "") : ""}
      </div>
      <Input
        style={{
          width: width,
          borderColor:
            password && value ? (password !== value ? "#FF9999" : "") : "",
        }}
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
        className={data}
      />
    </Wrapper>
  );
};

export default InputWithLabel;
