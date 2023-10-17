import React from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitationsList from "./PendingInvitationsList/PendingInvitationsList";


const FriendsSideBar = () => {
  return (
    <div className="bg-blue-80 rounded-3xl">
      {/* <AddFriendButton /> */}
      <FriendsList />
  
      {  /*สำหรับรอ invite*/}
      {/* <PendingInvitationsList /> */}
    </div>
  );
};

export default FriendsSideBar;
