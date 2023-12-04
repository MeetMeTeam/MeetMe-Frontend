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
import * as webRTCHandler from "./webRTCHandler";
import { useSelector } from "react-redux";

export const createNewRoom = (name, type) => {
  const successCalbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));

    //มาเขียน ชื่อห้อง , ส่งรูปตรงนี้
    socketConnection.createNewRoom(name, type);
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  console.log("new active room come from store");
  const friends = store.getState().friends.friends;
  const rooms = [];

  const userId = store.getState().auth.userDetails?._id;
  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      rooms.push({ ...room, creatorUsername: "room" });
    }
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (data) => {
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails(data));
    store.dispatch(setOpenRoom(false, true));

    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    //ส่งข้อมูลให้คนอื่นเห็นในห้อง
    socketConnection.joinRoom({
      roomId: data.roomId,
      name: store.getState().auth.userDetails.username,
      pic: "testpic",
      id: store.getState().auth.userDetails._id,
    });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
