import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../realtimeCommunication/socketConnection";

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
  roomId,
  cameraEnabled,
}) => {
  let otherUserActionCam = useSelector(
    (state) => state.room.otherUserActionCam
  );
  let activeRooms = useSelector((state) => state.room.activeRooms);
  let [participants, setParticipants] = useState([]);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  let remoteStream = null;
  let [oldRemoteStreams, setOldRemoteStreams] = useState([]);

  useEffect(() => {
    for (let index = 0; index < activeRooms.length; index++) {
      if (activeRooms[index].roomId === roomId) {
        console.log("match");
        setParticipants(activeRooms[index].participants);
      }
    }
  }, [activeRooms]);
  console.log(typeof otherUserActionCam);

  useEffect(() => {
    console.log(otherUserActionCam);
    console.log(typeof otherUserActionCam);
  }, [otherUserActionCam]);

  useEffect(() => {
    console.log(participants);
  }, [participants]);

  useEffect(() => {
    updateMyCamToOther()
  }, [remoteStreams]);

  useEffect(() => {
    console.log(localStream);
  }, [localStream]);

  useEffect(() => {
    updateMyCamToOther();
  }, [cameraEnabled]);

  function updateMyCamToOther(peopleInRoom) {
    console.log("ส่งปิดกล้องไปหาคนอื่น")
    const data = {
      userId: userId,
      isCameraEnabled: cameraEnabled,
      peopleInRoom: peopleInRoom ? peopleInRoom : participants,
    };
    socketConnection.camChange(data);
  }

  const renderRemoteStream = (stream) => {
    const isCameraEnabled = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.isCameraEnabled;

    return (
      <div key={stream.remoteStream.id}>
        {isCameraEnabled || otherUserActionCam.length === 0 ? (
          <Video stream={stream.remoteStream} id={stream.connUserSocketId} />
        ) : null}
        {participants.map((item) => (
          <div key={item.socketId}>
            {item.socketId === stream.connUserSocketId && stream.name}
          </div>
        ))}
      </div>
    );
  };

  const RemoteStreams = () => {
    return remoteStreams.map(renderRemoteStream);
  };

  return (
    <div className="absolute top-1/3 w-full grid grid-cols-4 px-12">
      <div>
        {cameraEnabled ? (
          <Video stream={localStream} isLocalStream />
        ) : (
          <div>my pic</div>
        )}
        <div> Me</div>
      </div>

      <RemoteStreams />
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
