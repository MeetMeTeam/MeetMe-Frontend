import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./SideBar/MainPageButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./SideBar/ActiveRoomButton";



const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <div className="bg-purple-60 w-full rounded-2xl px-4">
     <div className="text-white text-[32px] font-bold py-5">Room </div> 
      {activeRooms.map((room) => (
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
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
