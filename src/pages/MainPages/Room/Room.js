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
import RoomAction from "./RoomAction/RoomAction";
import FireWorkAnimation from "../../../shared/components/FireworkAnimation";
import Card from "./RoomAction/Actions/CardTalk/Card";
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
  const divStyle = {
    backgroundImage: `url("${roomDetail?.roomCreator.detail.theme.link}")`,
    backgroundSize: "cover",
  };

  const [zoom, setZoom] = useState(1);
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    const newZoom = windowWidth / 2500;

    if (newZoom > 0.6) {
      setZoom(newZoom);
    } else {
      setZoom(0.8);
    }
  };
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={divStyle}
      className="absolute flex justify-center w-screen  overflow-y-hidden overflow-x-auto md:h-screen h-full"
    >
      {/* <FireWorkAnimation /> */}

      <div className="absolute top-0 z-20 w-full flex flex-row md:justify-between  md:p-6 p-2">
        <RoomHeadBar />
        <User />
      </div>
      {/* <img
        src={process.env.PUBLIC_URL + "/RoomBg.png"}
        className="absolute lg:object-cover object-cover h-screen w-screen"
      /> */}
      {/* {roomDetail?.roomCreator && (
        <img
          src={roomDetail?.roomCreator.detail.theme.link}
          className="absolute lg:object-cover object-cover w-full"
          alt="background"
        />
      )} */}
      {roomDetail !== undefined && (
        <VideosContainer
          cameraEnabled={cameraEnabled}
          roomId={roomDetail?.roomId}
        />
      )}
      <div
        style={{ zoom: zoom }}
        className="absolute right-2 bottom-6 flex flex-row gap-4 justify-end items-center w-[1000px]"
      >
        <RoomAction />
        {!isTabletOrMobile && <Chat people={people} />}
      </div>
      <RoomButtons
        cameraEnabled={cameraEnabled}
        setCameraEnabled={setCameraEnabled}
      />
    </div>
  );
};

export default Room;
