import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../../realtimeCommunication/socketConnection";

export default function Invite({id}) {
  const roomId = useSelector((state) => state.room.roomDetails.roomId);
  const userDetail = useSelector((state) => state.auth.userDetails);
  const [isSend, setIsset] = React.useState(false);
  const inviteFriend = () => {
    const data = {
      id ,
      roomId,
      userDetail
    }
    socketConnection.InviteFriendToJoinRoom(data)
    setIsset(true)
  }
  return (
    <div>
      <div onClick={()=>inviteFriend()}>
           {isSend &&  <div>เชิญละ</div>  } 
           {!isSend &&  <AddIcon/>  }  
 
      </div>
    </div>
  )
}
