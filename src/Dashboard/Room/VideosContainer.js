import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";

const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
}) => {
  useEffect(() => {
   console.log(remoteStreams)
  }, [remoteStreams]);

  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      
      {remoteStreams.map((stream) => (
        <Video stream={stream.remoteStream} key={stream.remoteStream.id} id={stream.connUserSocketId} />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
