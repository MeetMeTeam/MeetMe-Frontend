import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#B184E1",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "200",
  marginLeft: "5px",
  color: "white",
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: "80px", width: "80px" } : {}}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
