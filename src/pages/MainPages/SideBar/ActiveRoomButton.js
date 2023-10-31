import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "../../../shared/components/Avatar";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VideocamIcon from '@mui/icons-material/Videocam';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const ActiveRoomButton = ({
  creatorUsername,
  roomId,
  amountOfParticipants,
  isUserInRoom,
  roomName,
  type,
  data
}) => {
  const handleJoinActiveRoom = () => {
    if (amountOfParticipants < 8) {
      roomHandler.joinRoom(data);
    }
  };

  const activeRoomButtonDisabled = amountOfParticipants > 7;
  const roomTitle = `Cretor: ${creatorUsername}. Connected: ${amountOfParticipants}`;

  return (
    // <Tooltip title={roomTitle}>
      <div>
        <div
         className="bg-purple-90 p-4 w-full rounded-2xl flex flex-col space-y-4"
          disabled={activeRoomButtonDisabled || isUserInRoom}
        
        >
          <div className="flex flex-row space-x-2"> 
          <div className="flex flex-row bg-green-70 rounded-xl text-white py-1 px-3 text-[12px] space-x-1 font-bold">
            <PersonOutlineIcon  style={{ fontSize: 16 }}/>
            <div>{amountOfParticipants}</div>
          </div>
          <div className="bg-blue-40 rounded-xl pl-2 pr-3 items-center flex justify-center">
              { type==="VOICE" && <div className="text-[12px] font-bold  text-white"><KeyboardVoiceIcon style={{ fontSize: 15 }}/> voice talk </div> }  
          { type==="VIDEO" &&  <VideocamIcon className=" text-white" style={{ fontSize: 15 }}/>}  
          </div>
        

          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center space-x-2">
                      <img className='w-[40px]' src={process.env.PUBLIC_URL + '/friend-pic.png'} />
                      <div className="text-purple-60 font-bold">
                        <div>  {roomName}</div>
                        <div className="text-[12px]"> Author : {creatorUsername}</div>
                        </div>
            </div>

          <div className="bg-purple-60 px-4 py-1 rounded-3xl
           text-white flex items-center justify-center
           font-bold cursor-pointer
           hover:bg-purple-50
           "
           onClick={handleJoinActiveRoom}
           >
            Join
          </div>
          </div>
        </div>
      </div>
    // </Tooltip>
  );
};

export default ActiveRoomButton;
