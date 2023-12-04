import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
  getInviteList,
} from "../store/actions/friendsAction";
import { UpdateChatList } from "../store/actions/allChatAction";
import { setOtherActionCam , setErrorModal } from "../store/actions/roomActions";
import { setNotification } from "../store/actions/alertActions";

import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
  const jwtToken = userDetails.token;
  socket = io(process.env.REACT_APP_BASE_API_SOCKET, {
    secure: true,
    rejectUnauthorized: false,
    path: "/socket.io/",
    transport: ["websocket"],
    auth: {
      token: jwtToken,
      userId: userDetails._id,
    },
  
  });
  console.log(socket);
  socket.on("error", (error) => {
    console.log("error");
    console.log("socket พัง socket พัง socket พัง socket พัง");
  });

  socket.on("connect", () => {
    console.log("suscess connect socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data);
    console.log(data);
    console.log("create room detail from server");
  });

  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId, name, pic, id } = data;
    console.log("prepare for connection");
    webRTCHandler.prepareNewPeerConnection(
      connUserSocketId,
      false,
      name,
      pic,
      id
    );
    //ส่งข้อมูลให้คนอื่นเห็นในห้อง
    socket.emit("conn-init", {
      connUserSocketId: connUserSocketId,
      name: store.getState().auth.userDetails.username,
      pic: "testpic",
      id: store.getState().auth.userDetails._id,
    });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId, name, pic, id } = data;
    //ส่งข้อมูลให้คนอื่นเห็นในห้อง
    webRTCHandler.prepareNewPeerConnection(
      connUserSocketId,
      true,
      name,
      pic,
      id
    );
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    console.log("user left room");
    webRTCHandler.handleParticipantLeftRoom(data);
  });

  socket.on("chatter", (newChat) => {
    console.log(newChat + " this is socket . on");
    store.dispatch(UpdateChatList(newChat));
  });

  socket.on("other-cam-change", (data) => {
    console.log(data);
    store.dispatch(setOtherActionCam(data));
  });

  socket.on("sendFriendInvite", (data) => {
    store.dispatch(getInviteList());
  });

  socket.on("invite-room", (data) => {
   console.log(data)
   store.dispatch(setNotification(data));
  });
  socket.on("notify-join", (data) => {
    console.log(data)
    store.dispatch( setErrorModal(null));
    store.dispatch( setErrorModal(data));  
   });
};

export const sendMessage = (newChat, people) => {
  const data = {
    message: newChat,
    people: people,
  };
  socket.emit("chatter", data);
};

export const sendFriendInvite = (data) => {
  console.log(data);
  socket.emit("sendFriendInvite", data);
};

export const getDirectChatHistory = (data) => {
  console.log(data);
  socket.emit("direct-chat-history", data);
};

export const sendDirectMessage = (data) => {
  console.log(data);
  socket.emit("direct-message", data);
};

export const createNewRoom = (name, type) => {
  const data = { name: name, type: type };
  socket.emit("room-create", data);
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};

export const camChange = (data) => {
  socket.emit("cam-change", data);
};

export const InviteFriendToJoinRoom = (data) => {
  socket.emit("invite-room", data);
  console.log(data);
};

export const checkNotifyJoin = (data) => {
  socket.emit("notify-join", data);
};

