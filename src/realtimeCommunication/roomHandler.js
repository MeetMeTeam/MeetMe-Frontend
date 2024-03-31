import store from "../store/store";
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedOnlyWithAudio,
  setErrorModal,
} from "../store/actions/roomActions";
import { clearChatList } from "../store/actions/allChatAction";
import { setLoadingPage } from "../store/actions/alertActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";
import { useSelector } from "react-redux";

export const createNewRoom = (name, type, detail, password) => {
  store.dispatch(setLoadingPage(true));

  const successCalbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));
    store.dispatch(clearChatList());

    //มาเขียน ชื่อห้อง , ส่งรูปตรงนี้
    socketConnection.createNewRoom(name, type, detail, password);
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
  store.dispatch(setLoadingPage(false));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
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
    store.dispatch(clearChatList());

    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    //ส่งข้อมูลให้คนอื่นเห็นในห้อง

    const userDetailsWithoutSensitiveData = {
      ...store.getState().auth.userDetails,
    };
    delete userDetailsWithoutSensitiveData.token;
    delete userDetailsWithoutSensitiveData.refreshToken;
    delete userDetailsWithoutSensitiveData.mail;
    delete userDetailsWithoutSensitiveData.coin;

    // นำ object ใหม่ไปใส่ในตัวแปรใหม่
    const modifiedUserDetails = userDetailsWithoutSensitiveData;

    socketConnection.joinRoom({
      roomId: data.roomId,
      name: modifiedUserDetails,
      pic: "testpic2",
      id: store.getState().auth.userDetails._id,
    });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
  setTimeout(() => {
    store.dispatch(setLoadingPage(false));
  }, 2000);
};

export const leaveRoom = () => {
  store.dispatch(setErrorModal(null));
  const roomId = store.getState().room?.roomDetails?.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();
  if (roomId) {
    socketConnection.leaveRoom({ roomId });
  }
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
