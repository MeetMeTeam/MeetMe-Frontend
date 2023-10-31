import React, { useState ,useEffect } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons/RoomButtons";
import { useSelector } from 'react-redux';
import RoomHeadBar from "./RoomHeadBar";
import User from "../HeadBar/User"
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

    let roomDetail = useSelector(state => state.room.roomDetails);

    const roomResizeHandler = () => {
      setIsRoomMinimized(!isRoomMinimized);
    };
    useEffect(() => {
      console.log("roomDetail")
    console.log(roomDetail)
    }, [roomDetail]);
  
    
  return (
    <div
    style={ fullScreenRoomStyle}
    className="flex justify-center"
  >
    <div className="absolute top-0 z-20 w-full flex flex-row justify-between  p-6"> 
    <RoomHeadBar />
    <User />
    </div>
    <img src={process.env.PUBLIC_URL + '/RoomBg.png'} className="w-full relative" />
    { roomDetail !== undefined && 
    <VideosContainer cameraEnabled={cameraEnabled} roomId={roomDetail?.roomId}  /> }
    <div className="absolute  bottom-6 bg-red-80 w-[300px] h-[70px] flex justify-center items-center rounded-md">
    <RoomButtons cameraEnabled={cameraEnabled} setCameraEnabled={setCameraEnabled}  />
    </div>
    
  </div>
  )
}

export default Room