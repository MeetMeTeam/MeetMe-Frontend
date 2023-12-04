import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import  CheckIcon from '@mui/icons-material/Check';
import store from "../../../../store/store";
import {
  getInviteList,
  acceptFriendInvitation,
  acceptFriendInvitationAll,
  setInvite,
  rejectFriendInvitation,
  rejectFriendInvitationAll,
} from "../../../../store/actions/friendsAction";
import { validateMail } from "../../../../shared/utils/validators";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  outline: "none",
  borderRadius: "10px",
};

const InviteList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inviteList = useSelector((state) => state.friends.invites);

  function acceptFriends(id) {
    store.dispatch(acceptFriendInvitation(id));
    const newInviteList = inviteList.filter((item) => item.inviteId !== id);
    store.dispatch(setInvite(newInviteList));
  }

  function rejectFriends(id) {
    store.dispatch(rejectFriendInvitation(id));
  }

  function acceptAll() {
    store.dispatch(acceptFriendInvitationAll());
  }

  function rejectAll() {
    store.dispatch(rejectFriendInvitationAll());
  }

  return (
    <div className="z-50">
      {/* <div
        className="flex flex-row items-center space-x-1 font-bold
        justify-center bg-blue-70 rounded-md text-white 
        px-2 py-2 w-full
        hover:bg-blue-60
        relative
        "
        onClick={handleOpen}
      >
        <NotificationsActiveIcon  style={{ fontSize: 18 }}/>
        {inviteList?.length > 0 &&
         <div className="absolute z-20 text-white bg-red-50 rounded-full px-[3px] text-[7px] right-0 bottom-[3px]">
         {inviteList.length}
         </div>
        }
       
      </div>  */}
      <div className="bg-blue-80 p-4 pt-0 rounded-md flex flex-col space-y-6 h-[270px]">
        <div className="h-[240px] space-y-4 flex items-center justify-center overflow-auto pr-2 text-white">
          {inviteList?.length > 0 &&
            inviteList?.map((item) => (
              <div className="bg-blue-70 rounded-md">
                <div className="flex flex-row justify-between items-center space-x-4 p-2 ">
                  <div className="flex flex-row space-x-4">
                    <div className="bg-blue-gray-900 rounded-full px-4 w-12 h-12 text-[12px]">
                      .
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[1rem]"> {item.username} </div>
                      <div className="text-[12px]"> {item.email} </div>
                    </div>
                  </div>

                  <div className="flex flex-row space-x-2">
                  <CheckIcon className="cursor-pointer"  onClick={() =>  acceptFriends(item.inviteId)}/>
                 <CloseIcon  className="cursor-pointer"  onClick={() =>  rejectFriends(item.inviteId)} /> 
            
                  </div>
                </div>
              </div>
            ))}

            {
              inviteList?.length === 0 &&
              <div>
                <div className="text-white drop-shadow-md mt-[-20px] flex-col h-[12.5rem]  overflow-auto pr-2 flex items-center justify-center">
                  <div> "It seems like you don't have any Request yet ... </div>
                </div>
              </div>
            }
        </div>
        { inviteList?.length > 0 &&
          <div className="flex  space-x-2 text-white">
        <div onClick={() => rejectAll()} className="p-1 font-bold flex items-center justify-center cursor-pointer bg-red-70  rounded-xl w-full">
          Reject All
          </div>
          <div onClick={() => acceptAll()} className="p-1 font-bold flex items-center justify-center cursor-pointer bg-green-50 rounded-xl w-full">
          Accept All
          </div>
        
        </div>
        }
        
      </div>
    </div>
  );
};

export default InviteList;
