import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  height: "50%",
  width: "50%",
  backgroundColor: "black",
  borderRadius: "8px",
});

const VideoEl = styled("video")({
  height: "100%",
});

const Video = ({ stream, isLocalStream , id , size }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div>
      <VideoEl className={` rounded-md w-[${size}] `} ref={videoRef} autoPlay muted={isLocalStream ? true : false}  style={{ transform: "scaleX(-1)" }}/>
    </div>
  );
};

export default Video;
