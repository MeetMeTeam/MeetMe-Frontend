import React from "react";
import { styled } from "@mui/system";

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
  marginBottom: "4px"
});

const Input = styled("input")({
  flexGrow: 1,
  height: "40px",
  border: "1px solid white",
  borderRadius: "10px",
  color: "black",
  background: "white",
  margin: 0,
  fontSize: "16px",
  padding: "0 5px",
});

const InputWithLabel = (props) => {
  const { value, setValue, label, type, placeholder } = props;

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default InputWithLabel;
