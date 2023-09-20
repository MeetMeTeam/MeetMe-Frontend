import store from "../store/store";
import {
    setOpenRoom,
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setRemoteStreams,
    setScreenSharingStream,
    setIsUserJoinedOnlyWithAudio,
  } from "../store/actions/roomActions";
  import * as socketConnection from "./socketConnection";


  export const createNewRoom = () => {
    // const successCalbackFunc = () => {
      store.dispatch(setOpenRoom(true, true));
  
    //   const audioOnly = store.getState().room.audioOnly;
    //   store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
      socketConnection.createNewRoom();
    // };
  
    // const audioOnly = store.getState().room.audioOnly;
    // webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
  };

  export const newRoomCreated = (data) => {
    const { roomDetails } = data;
    store.dispatch(setRoomDetails(roomDetails));
  };
  
  export const updateActiveRooms = (data) => {
    const { activeRooms } = data;
    console.log(activeRooms)
    console.log("new active room come from store")
    const friends = store.getState().friends.friends;
    const rooms = [];
  
    // const userId = store.getState().auth.userDetails?._id;
  
    activeRooms.forEach((room) => {
      // const isRoomCreatedByMe = room.roomCreator.userId === userId;
  
      // if (isRoomCreatedByMe) {
      //   rooms.push({ ...room, creatorUsername: "Me" });
      // } else {
        friends.forEach((f) => {
          if (f.id === room.roomCreator.userId) {
            rooms.push({ ...room, creatorUsername: f.username });
          }
        });
      // }
    });
  
    store.dispatch(setActiveRooms(rooms));
  };