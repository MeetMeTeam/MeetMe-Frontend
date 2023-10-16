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

  const divs = [];

  for (let i = 0; i < 3; i++) {
    divs.push(<div key={i}>
       <Video
      stream={localStream}
      isLocalStream
    /></div>);
  }

  return (
    <div className="absolute top-1/3 w-full grid grid-cols-4 px-12">
      <Video
        stream={localStream}
        isLocalStream
      />
      
      {
      remoteStreams.map((stream) => (
        <Video stream={stream.remoteStream} key={stream.remoteStream.id} id={stream.connUserSocketId} />
      ))
      // divs
      }
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
