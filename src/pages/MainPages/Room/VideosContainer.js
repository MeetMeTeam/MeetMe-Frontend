/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../realtimeCommunication/socketConnection";
import AvatarUserPreview from "./AvatarUserPreview";
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
  let myImage = useSelector((state) => state.auth.userDetails?.image);
  let activeRooms = useSelector((state) => state.room.activeRooms);
  let [participants, setParticipants] = useState([]);
  const userId = useSelector((state) => state.auth.userDetails?._id);
  let remoteStream = null;
  let [oldRemoteStreams, setOldRemoteStreams] = useState([]);

  useEffect(() => {
    for (let index = 0; index < activeRooms.length; index++) {
      if (activeRooms[index].roomId === roomId) {
        setParticipants(activeRooms[index].participants);
      }
    }
  }, [activeRooms]);

  useEffect(() => {}, [otherUserActionCam]);

  useEffect(() => {}, [participants]);

  useEffect(() => {
    updateMyCamToOther();
  }, [remoteStreams]);

  useEffect(() => {}, [localStream]);

  useEffect(() => {
    updateMyCamToOther();
  }, [cameraEnabled]);

  function updateMyCamToOther(peopleInRoom) {
    const data = {
      userId: userId,
      isCameraEnabled: cameraEnabled,
      peopleInRoom: peopleInRoom ? peopleInRoom : participants,
      image: myImage,
    };
    socketConnection.camChange(data);
  }

  const renderRemoteStream = (stream) => {
    const isCameraEnabled = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.isCameraEnabled;
    const image = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.image;
    const id = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.userId;
    return (
      <div
        key={stream.remoteStream.id}
        className="flex flex-col justify-center items-center relative p-10"
      >
        <div className="bg-white py-10 opacity-30 rounded-2xl w-full z-[0] h-full absolute">
          {" "}
        </div>

        {isCameraEnabled || otherUserActionCam.length === 0 ? (
          <Video
            size="300px"
            stream={stream.remoteStream}
            id={stream.connUserSocketId}
          />
        ) : (
          <div>
            <Video
              size="1px"
              stream={stream.remoteStream}
              id={stream.connUserSocketId}
            />
            {/* <img
              src={image}
              className="rounded-full object-cover drop-shadow-xl border-4 border-white"
              style={{ width: "150px", height: "150px" }}
            /> */}
            <AvatarUserPreview id={id} />
          </div>
        )}
        {participants.map((item) => (
          <div key={item.socketId}>
            {item.socketId === stream.connUserSocketId && (
              <div className="mt-4 w-fit font-bold drop-shadow-md bg-gray-90 px-2 py-1 rounded-md">
                {stream.name}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const RemoteStreams = () => {
    return remoteStreams.map(renderRemoteStream);
  };

  return (
    <div className="absolute top-1/4 gap-4 w-full grid grid-cols-4  sm:px-12">
      <div className="flex flex-col justify-center items-center relative p-10">
        <div className="bg-white py-10 opacity-30 rounded-2xl w-full h-full absolute">
          {" "}
        </div>
        {cameraEnabled ? (
          <Video size="300px" stream={localStream} isLocalStream />
        ) : (
          <div>
            <Video size="1px" stream={localStream} isLocalStream />
            {/* <img
              src={myImage}
              className="rounded-full object-cover drop-shadow-xl border-4 border-white"
              style={{ width: "150px", height: "150px" }}
            /> */}
            <AvatarUserPreview id={userId} />
          </div>
        )}
        <div className="mt-4 font-bold drop-shadow-md bg-purple-60 text-white px-2 py-1 rounded-md">
          {"Me"}
        </div>
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
