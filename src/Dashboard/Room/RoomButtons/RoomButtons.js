import React from "react";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CameraButton from "./CameraButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";

import MicButton from "./MicButton"
const MainContainer = styled("div")({
    height: "15%",
    width: "100%",
    backgroundColor: "#B184E1",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
const ResizeRoomButton = () => {
  return (
    <MainContainer>
    <ScreenShareButton/>
    <MicButton />
    <CameraButton />
    <CloseRoomButton />
    </MainContainer>
  );
};

export default ResizeRoomButton;
