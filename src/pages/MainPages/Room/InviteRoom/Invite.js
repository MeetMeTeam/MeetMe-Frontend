import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../../realtimeCommunication/socketConnection";
import SendIcon from '@mui/icons-material/Send';

export default function Invite({id}) {
  const room = useSelector((state) => state.room.roomDetails);
  const userDetail = useSelector((state) => state.auth.userDetails);
  const [isSend, setIsset] = React.useState(false);
  const inviteFriend = () => {
    const data = {
      id ,
      room,
      userDetail
    }
    socketConnection.InviteFriendToJoinRoom(data)
    setIsset(true)
  }
  return (
    <div className="select-none">
      <div onClick={()=>inviteFriend()}>
           {isSend &&  <div className="cursor-not-allowed text-purple-90">Sent</div>  } 
           {!isSend &&  <div className="cursor-pointer flex items-center justify-center text-white  space-x-1"> <SendIcon sx={{fontSize:12}}/><div>Invite </div></div>  }  
 
      </div>
    </div>
  )
}
