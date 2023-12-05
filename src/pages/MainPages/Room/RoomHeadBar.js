import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChairIcon from "@mui/icons-material/Chair";
import { useSelector } from "react-redux";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import InviteRoom from "./InviteRoom/InviteRoom";
export default function RoomHeadBar() {
  const roomDetail = useSelector((state) => state.room.roomDetails);
  const activeRoom = useSelector((state) => state.room.activeRooms);
  const [countPerson, setCountPerson] = useState(0);

  const handleLeaveRoom = () => {
    roomHandler.leaveRoom();
  };
  const handleCount = () => {
    activeRoom.map((item) => {
      if (item?.roomId === roomDetail?.roomId) {
        setCountPerson(item.participants.length);
      }
    });
  };

  useEffect(() => {
    handleCount();
  }, [activeRoom]);

  return (
    <div className="w-full flex justify-start space-x-4">
      <div
        onClick={handleLeaveRoom}
        className="cursor-pointer flex  items-center justify-center bg-purple-80 hover:bg-purple-70 text-purple-60 py-3 px-4 pr-5 rounded-2xl font-bold"
      >
        <ArrowBackIosNewIcon /> Lobby
      </div>
      <div className="bg-green-50 text-white px-7 py-2 flex justify-center items-center text-[20px] rounded-2xl font-bold">
        <PersonOutlineIcon />
        <div> {roomDetail ? countPerson : "0"} </div>
      </div>
      <div className="bg-[#FF80A5] text-white px-7 py-2 flex justify-center items-center text-[16px] rounded-2xl font-bold">
        <ContentCopyIcon className="mr-2" />
        <div>
          {" "}
          Room ID : {roomDetail ? roomDetail.roomId.slice(0, 8) : "0"}{" "}
        </div>
      </div>
      <div className="bg-white border border-purple-60 text-purple-60 px-4 py-2 flex justify-center items-center text-[16px] rounded-2xl font-bold">
        <div className="mr-6">
          {roomDetail ? roomDetail.roomCreator.roomName : "room name"}{" "}
        </div>
        <ChairIcon />
      </div>
      <InviteRoom/>
    </div>
  );
}
