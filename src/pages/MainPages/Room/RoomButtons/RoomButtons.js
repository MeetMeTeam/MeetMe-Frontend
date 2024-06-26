import React from "react";
import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";
import { connect } from "react-redux";
import { getActions } from "../../../../store/actions/roomActions";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = (props) => {
  const { localStream, isUserJoinedWithOnlyAudio } = props;

  return (
    <div className="absolute left-2  flex flex-row justify-center items-center  bottom-6 bg-purple-80 w-[200px] h-[70px]  rounded-md">
      <div className="flex">
        <MicButton localStream={localStream} />
        {!isUserJoinedWithOnlyAudio && (
          <CameraButton
            cameraEnabled={props.cameraEnabled}
            localStream={localStream}
            setCameraEnabled={props.setCameraEnabled}
          />
        )}

        {/* <CloseRoomButton /> */}
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);
