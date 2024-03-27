import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Invite from "./Invite";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Diversity3Icon from "@mui/icons-material/Diversity3";
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
        className="bg-red-80 border-red-80 hover:bg-red-70 border text-white md:px-4 py-5 flex justify-center text-[16px] rounded-2xl font-bold"
        onClick={handleOpen}
      >
        <div className="md:text-[16px] text-[12px] select-none">
          <PersonOutlineIcon />
          Friends
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-purple-70 p-4 px-2 rounded-md max-w-[470px] flex flex-col space-y-1">
            <div className=" text-white text-[24px] font-bold mb-2 ml-3">
              Online Friends
            </div>
            <div className="w-full flex justify-end items-center space-x-1 pr-3">
              <div className="w-[10px] h-[10px] bg-green-50 rounded-full"></div>
              <span className="text-[12px] text-white">
                Online {`(${checkOnlineUsers(friends, onlineUsers).length})`}
              </span>
            </div>
            <div className="overflow-auto h-[200px] px-2">
              {checkOnlineUsers(friends, onlineUsers).length === 0 && (
                <div className="text-white h-full w-full flex justify-center items-center flex-col space-y-2">
                  <Diversity3Icon/>
                  <div> No Friends Online Now  </div>
                 
                  </div>
              )}
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
                  className="bg-purple-80 rounded-2xl px-3"
                >
                  <div className="relative">
                    <img
                      src={f.image}
                      className="w-[50px] object-cover rounded-lg"
                      alt="imageProfile"
                    />
                  </div>

                  <div className="flex flex-row items-center justify-between w-full ml-1">
                    <div className="text-white flex flex-col space-y-[-7px] font-bold ml-2">
                      <div className="text-[18px]"> {f.username} </div>
                      <div className="text-[14px]"> {f.email} </div>
                    </div>

                    {checkFriendInRoom(f.id) === true && (
                      <div className="text-white rounded-2xl p-1 px-4 bg-gray-70">
                        {" "}
                        <div className="cursor-not-allowed">In Room</div>
                      </div>
                    )}
                    {!checkFriendInRoom(f.id) && (
                      <div className="text-white rounded-2xl p-1 px-4  bg-purple-70">
                        <div>
                          <Invite id={f.id} />
                        </div>{" "}
                      </div>
                    )}
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
