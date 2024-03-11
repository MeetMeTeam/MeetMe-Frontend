import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons/RoomButtons";
import { useSelector } from "react-redux";
import RoomHeadBar from "./RoomHeadBar";
import User from "../HeadBar/User";
import Chat from "../ChatAll/ChatRoom";
import { useMediaQuery } from "react-responsive";

const Room = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 660px)" });
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  let roomDetail = useSelector((state) => state.room.roomDetails);
  let people = useSelector((state) => state.room.remoteStreams);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };
  useEffect(() => {}, [roomDetail]);

  return (
    <div className="absolute flex justify-center w-screen md:h-screen h-full">
      <div className="absolute top-0 z-20 w-full flex flex-row md:justify-between  md:p-6 p-2">
        <RoomHeadBar />
        <User />
      </div>
      {/* <img
        src={process.env.PUBLIC_URL + "/RoomBg.png"}
        className="absolute lg:object-cover object-cover h-screen w-screen"
      /> */}
      {roomDetail?.roomCreator && (
        <img
          src={roomDetail?.roomCreator.detail.theme.link}
          className="absolute lg:object-cover object-cover h-screen w-screen"
        />
      )}

      {roomDetail !== undefined && (
        <VideosContainer
          cameraEnabled={cameraEnabled}
          roomId={roomDetail?.roomId}
        />
      )}
      <div className="absolute right-2 bottom-6 flex flex-row justify-end items-center w-[1000px]">
        {!isTabletOrMobile && <Chat people={people} />}
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
