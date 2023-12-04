import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Popover from "@mui/material/Popover";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../realtimeCommunication/socketConnection";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import styles from "../../../shared/css/scollBarFreind.module.css";

import store from "../../../store/store";
import {
  removeNotification
} from "../../../store/actions/alertActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  outline: "none",
  borderRadius: "10px",
};



export default function Notification() {
  const [userDetail, setUserDetail] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notiList = useSelector((state) => state.alert.Notification);
  const [roomDetail, setRoomDetail] = React.useState(null);
  const checkErrorJoinRoom = useSelector(
    (state) => state.room.isModalCantJoinShow
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeModalError =()=> {
    removeInvite(roomDetail)
    handleCloseModal()
  }
  const removeInvite = (data) => {
    store.dispatch(removeNotification(data));
  };
  const checkRoom = (data , username) => {
    socketConnection.checkNotifyJoin(data.roomId);
    setRoomDetail(data);
    setUserDetail(username)
  };
  const joinRoom = (data) => {
    roomHandler.joinRoom(data);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (checkErrorJoinRoom) {
      joinRoom(roomDetail);
    } else if(checkErrorJoinRoom===false){
      handleOpenModal();
    }
  }, [checkErrorJoinRoom]);

  return (
    <div className={"relative"}>
      <div
        onClick={handleClick}
        className="relative cursor-pointer border-purple-60 border-2 rounded-2xl text-purple-60 h-fit py-3 px-3.5"
      >
        <NotificationsNoneIcon />
        {notiList?.length > 0 && (
          <div className="w-[15px] h-[15px] rounded-full absolute top-[-7px] right-1 bg-purple-60" />
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="mt-16"
      >
        <div className="bg-purple-80 w-[330px]  p-3 text-white">
          <div className="font-bold mb-2 "> Notifications</div>
          <div className="flex flex-col space-y-2">
              {notiList.map((f) => (
            <div className="flex justify-between flex-row items-center space-x-2 bg-purple-70 rounded-[8px] p-2">
              <div className="flex flex-row space-x-2 items-center">
                <img
                  src={f.userDetail.image}
                  className="rounded-full w-[30px]"
                  alt="profile pic"
                />
                <div className="text-[10px]">
                  <span className="font-bold">{f.userDetail.username} </span>{" "}
                  invited room to join their room
                </div>
              </div>
              <div className="flex space-x-1.5">
                 <div
                onClick={() => removeInvite(f.room)}
                className="cursor-pointer font-bold text-[12px] text-white bg-red-70 py-2 px-2.5 rounded-full"
              >
                <ClearIcon sx={{fontSize:16}}/>
              </div>
              <div
                onClick={() => checkRoom(f.room , f.userDetail.username)}
                className="cursor-pointer font-bold text-[12px] text-white bg-green-70 py-2 px-2.5 rounded-full"
              >
                <CheckIcon sx={{fontSize:16}}/>
              </div>
              </div>
             
            </div>
          ))}
          </div>
        
          {notiList.length === 0 && (
            <div className="w-full flex justify-center text-[12px]">
              ยังไม่มีแจ้งเตือน{" "}
            </div>
          )}

          <div></div>
        </div>
      </Popover>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-purple-50 rounded-[24px] flex flex-col space-y-6 p-10 items-center">
            <div className="text-red-80 text-[20px] font-bold">
              Failed to join
            </div>
            <div className="text-white font-bold text-center flex flex-col">
              This room doesn’t exist , 
              <span>[{userDetail}] is offline or this
              room was deleted </span>
            </div>
            <div onClick={()=> closeModalError()} className="cursor-pointer hover:bg-yellow-50 bg-yellow-60 font-bold text-purple-40 px-12 py-2 rounded-3xl flex justify-center items-center">Ok</div>
          </div>
       
        </Box>
      </Modal>
    </div>
  );
}
