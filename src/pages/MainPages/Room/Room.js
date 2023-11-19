import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons/RoomButtons";
import { useSelector } from "react-redux";
import RoomHeadBar from "./RoomHeadBar";
import User from "../HeadBar/User";
import Chat from "../ChatAll/ChatRoom";

const fullScreenRoomStyle = {
  width: "100%",
  height: "100vh",
};

const minimizedRoomStyle = {
  bottom: "0px",
  right: "0px",
  width: "100%",
  height: "40vh",
};

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  let roomDetail = useSelector((state) => state.room.roomDetails);
  let people = useSelector((state) => state.room.remoteStreams);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };
  useEffect(() => {
    console.log("roomDetail");
    console.log(roomDetail);
  }, [roomDetail]);

  return (
    <div style={fullScreenRoomStyle} className="flex justify-center">
      <div className="absolute top-0 z-20 w-full flex flex-row justify-between  p-6">
        <RoomHeadBar />
        <User />
      </div>
      <img
        src={process.env.PUBLIC_URL + "/RoomBg.png"}
        className="w-full relative"
      />
      {roomDetail !== undefined && (
        <VideosContainer
          cameraEnabled={cameraEnabled}
          roomId={roomDetail?.roomId}
        />
      )}
      <div className="absolute right-2 bottom-6 flex flex-row justify-end items-center w-[1000px]">
        <Chat  people={people} />
      </div>
      <div className="absolute left-2  flex flex-row justify-center items-center  bottom-6 bg-purple-80 w-[200px] h-[70px]  rounded-md">
          <RoomButtons
            cameraEnabled={cameraEnabled}
            setCameraEnabled={setCameraEnabled}
          />
        </div>
    </div>
  );
};

export default Room;
