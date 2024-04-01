import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useSelector } from "react-redux";

const CameraButton = ({ localStream, cameraEnabled, setCameraEnabled }) => {
  // const [cameraEnabled, setCameraEnabled] = useState(true);
  // const isAudioOnly = useSelector(state => state.room.audioOnly);
  const isAudioOnly = useSelector(
    (state) => state.room.roomDetails?.roomCreator.type
  );

  const handleToggleCamera = () => {
    if (localStream) {
      console.log(localStream);
      if (cameraEnabled) {
        if (localStream.getVideoTracks().length > 0) {
          localStream.getVideoTracks()[0].enabled = false;
        }
      } else {
        if (localStream.getVideoTracks().length > 0) {
          localStream.getVideoTracks()[0].enabled = true;
        }
      }
      setCameraEnabled(!cameraEnabled);
    }
  };

  useEffect(() => {
    if (isAudioOnly === "VOICE") {
      handleToggleCamera();
    }
  }, [isAudioOnly]);

  return (
    <div>
      {localStream?.getVideoTracks().length !== 0 && (
        <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
          {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
      )}

      {localStream?.getVideoTracks().length === 0 && (
        <IconButton style={{ color: "white" }}>
          <VideocamOffIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CameraButton;
