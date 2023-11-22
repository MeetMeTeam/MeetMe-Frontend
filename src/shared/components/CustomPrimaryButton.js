import React from "react";
import Button from "@mui/material/Button";

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#985BD7",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 600,
        width: "100%",
        height: "40px",
        "&:hover": {
          bgcolor: "#4B1E7A",
        },
        borderRadius: "16px",
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomPrimaryButton;
