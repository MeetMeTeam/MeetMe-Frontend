import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ChairIcon from "@mui/icons-material/Chair";
import { useSelector } from "react-redux";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import InviteRoom from "./InviteRoom/InviteRoom";
import { useMediaQuery } from "react-responsive";
import { clearChatList } from "../../../store/actions/allChatAction";
import { removeAllOtherActionCam } from "../../../store/actions/roomActions";

import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

export default function RoomHeadBar() {
  const history = useHistory();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 760px)" });
  const roomDetail = useSelector((state) => state.room.roomDetails);
  const activeRoom = useSelector((state) => state.room.activeRooms);
  const other = useSelector((state) => state.room.otherUserActionCam);
  const userId = useSelector((state) => state.auth?.userDetails?._id);

  const [countPerson, setCountPerson] = useState(0);
  const dispatch = useDispatch();

  const handleLeaveRoom = () => {
    history.push("/");
    roomHandler.leaveRoom();
    dispatch(clearChatList());
    dispatch(removeAllOtherActionCam([]));
  };
  const handleCount = () => {
    activeRoom.map((item) => {
      if (item?.roomId === roomDetail?.roomId) {
        setCountPerson(
          item.participants[0].userId === "default" &&
            item.participants.length === 1
            ? 0
            : item.participants[0].userId === "default"
            ? item.participants.length - 1
            : item.participants.length
        );
        // setCountPerson(item.participants.length);
      }
    });
  };
  // useEffect(() => {
  //   return () => {
  //     console.log("cleaned up");
  //     handleLeaveRoom();
  //     dispatch(removeAllOtherActionCam([]));
  //   };
  // }, []);
  useEffect(() => {
    handleCount();
  }, [activeRoom]);

  useEffect(() => {
    console.log(other);
    // for (let index = 0; index < other.length; index++) {
    //   console.log(other[index].userId);
    //   if (other[index].userId === userId) {
    //     console.log("ซ้ำ");
    //     handleLeaveRoom();
    //     dispatch(removeAllOtherActionCam([]));
    //   }
    // }
  }, [other]);

  return (
    <div className="w-full flex flex-wrap h-[30px]  justify-start space-x-4">
      <div
        onClick={() => handleLeaveRoom()}
        className="md:text-[16px] text-[10px] cursor-pointer flex  items-center justify-center bg-purple-80 hover:bg-purple-70 text-purple-60 py-3 md:px-4 px-1 md:pr-5 rounded-2xl font-bold"
      >
        <ArrowBackIosNewIcon /> Lobby
      </div>
      <div className="bg-green-50 text-white md:px-7 px-3 py-2 flex justify-center items-center md:text-[20px] text-[10px] rounded-2xl font-bold">
        <PersonOutlineIcon sx={{ fontSize: isTabletOrMobile ? 12 : 20 }} />
        <div> {roomDetail ? countPerson : "0"} </div>
      </div>
      {/* { !isTabletOrMobile && <div className="bg-[#FF80A5] text-white px-7 py-2 flex justify-center items-center text-[16px] rounded-2xl font-bold">
        <ContentCopyIcon className="mr-2" />
        <div>
          {" "}
          Room ID : {roomDetail ? roomDetail.roomId.slice(0, 8) : "0"}{" "}
        </div>
      </div>  }    */}
      <div className="bg-white border border-purple-60 text-purple-60 px-4 py-2 flex justify-center items-center md:text-[16px] text-[12px] rounded-2xl font-bold">
        <div className="md:mr-6">
          {roomDetail ? roomDetail.roomCreator.roomName : "room name"}{" "}
        </div>
        {!isTabletOrMobile && <ChairIcon />}
      </div>
      {/* <InviteRoom /> */}
    </div>
  );
}
