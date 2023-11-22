/* eslint-disable jsx-a11y/alt-text */
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
  let myImage = useSelector((state) => state.auth.userDetails?.image)
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
  console.log( otherUserActionCam);

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
      image : myImage
    };
    socketConnection.camChange(data);
  }

  const renderRemoteStream = (stream) => {
    const isCameraEnabled = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.isCameraEnabled;
    const image =  otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.image;

    return (
      <div key={stream.remoteStream.id} className="flex flex-col items-center justify-center">
        {isCameraEnabled || otherUserActionCam.length === 0 ? (
          <Video size="300px" stream={stream.remoteStream} id={stream.connUserSocketId} />
        ) :
        <div>
           <Video size="1px" stream={stream.remoteStream} id={stream.connUserSocketId} />
            <img src={image}  className="rounded-full object-cover"
      style={{ width: '200px', height: '200px' }}/>
        </div> 
      } 
        {participants.map((item) => (
          <div key={item.socketId} >
            {item.socketId === stream.connUserSocketId && <div className="mt-4 w-fit font-bold drop-shadow-md bg-gray-90 px-2 py-1 rounded-md">{stream.name}</div>}
          </div>
        ))}
      </div>
    );
  };

  const RemoteStreams = () => {
    return remoteStreams.map(renderRemoteStream);
  };

  return (
    <div className="absolute top-1/4 w-full grid grid-cols-4 px-12">
      <div  className="w-[300px] flex flex-col justify-center items-center">
       
        {cameraEnabled ? (
          <Video size="300px" stream={localStream} isLocalStream />
        ) : (
          <div>
            <Video  size="1px" stream={localStream} isLocalStream />
            <img src={myImage}  className="rounded-full object-cover"
            style={{ width: '200px', height: '200px' }} />
          </div>
        )}
        <div className="mt-4 font-bold drop-shadow-md bg-gray-90 px-2 py-1 rounded-md"> Me </div>
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
