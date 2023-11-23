import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./SideBar/MainPageButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./SideBar/ActiveRoomButton";
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import styles from "../../shared/css/mainPage.module.css"


const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <div className={`bg-purple-60 w-full rounded-2xl px-4 h-full max-w-[822px] ${ activeRooms.length === 0 ? " justify-between ": " justify-start "} flex flex-col  ${styles.container}` }>
     <div className="text-white text-[32px] font-bold py-5">Room </div> 
      {activeRooms && activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
          roomName={room.roomCreator.roomName}
          type={room.roomCreator.type}
          data={room}
        />
        
      ))}
      {activeRooms.length === 0 && 
      <div className={ `w-full flex justify-center items-center h-full flex-col`}>
        <SafetyDividerIcon className="text-white" sx={{ fontSize: "43px" }}/>
        <div className="text-white">No room active now . Create room to invite friends !</div>
        </div>}
        <div/>
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
