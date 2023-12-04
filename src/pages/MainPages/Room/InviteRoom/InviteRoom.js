import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import Invite from "./Invite";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  borderRadius: "10px",
};

export default function InviteRoom() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const friends = useSelector((state) => state.friends.friends);
  const onlineUsers = useSelector((state) => state.friends.onlineUsers);
  const OtherUserInRoom = useSelector((state) => state.room.otherUserActionCam);

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    const OnlineFriends = [];
    friends.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
      if (isUserOnline) {
        OnlineFriends.push(f);
      }
    });
    return OnlineFriends;
  };

  const checkFriendInRoom = (id) => {
    const found = OtherUserInRoom.find((f) => f.userId === id);
    return found ? true : false;
  };

  

  return (
    <div className="cursor-pointer z-50">
      <div
        className="bg-yellow-70 hover:bg-yellow-50 border text-white px-4 py-5 flex justify-center text-[16px] rounded-2xl font-bold"
        onClick={handleOpen}
      >
        <div className="text-[16px]">
          Invite <AddIcon />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-blue-80 p-4 rounded-md max-w-[350px] flex flex-col space-y-1">
            <div className=" text-white text-[20px] font-bold mb-4">
              {" "}
              Invite your friends
            </div>
            <div className="overflow-auto h-[200px] px-2">
              {checkOnlineUsers(friends, onlineUsers).map((f) => (
                <div
                  style={{
                    width: "100%",
                    height: "65px",
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    color: "black",
                    position: "relative",
                  }}
                  className="bg-blue-70 rounded-2xl px-4"
                >
                  <div className="relative">
                    <img
                      src={f.image}
                      className="w-[50px] object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-row items-center justify-between w-full">
                    <div className="text-white flex flex-col space-y-[-7px] font-bold ml-2">
                      <div className="text-[18px]"> {f.username} </div>
                      <div className="text-[14px]"> {f.email}  </div>
                    </div>

                    <div className="text-white rounded-lg p-1 bg-blue-60">
                  {checkFriendInRoom(f.id) === true &&  <div className="cursor-not-allowed">อยู่ในห้อง</div>}  
                  {!checkFriendInRoom(f.id) &&  <div className="cursor-pointer" ><Invite id={f.id}/></div>}    
  
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
