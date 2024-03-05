import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
  getInviteList,
} from "../store/actions/friendsAction";
import { UpdateChatList } from "../store/actions/allChatAction";
import { setOtherActionCam, setErrorModal } from "../store/actions/roomActions";
import {
  setNotification,
  setModalErrorSocket,
} from "../store/actions/alertActions";

import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";
import { useSelector } from "react-redux";

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

  let retries = 0;

  function checkError() {
    retries++;
    if (!socket.connected && retries % 3 === 0) {
      store.dispatch(setModalErrorSocket(true));
    }
  }
  setInterval(checkError, 1000);

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
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    roomHandler.newRoomCreated(data);
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
    webRTCHandler.handleParticipantLeftRoom(data);
  });

  socket.on("chatter", (newChat) => {
    console.log(newChat);
    const isUserInRoom = store.getState().room.isUserInRoom;
    const myUserId = store.getState().auth.userDetails._id;
    const otherPeopleList = store.getState().room.otherUserActionCam;
    const foundObject = otherPeopleList.find(
      (person) => person.userId === newChat.id
    );

    if (isUserInRoom) {
      console.log(foundObject);
      if (foundObject) {
        console.log("asdasd");
        store.dispatch(UpdateChatList(newChat));
      }

      if (myUserId === newChat.id) {
        store.dispatch(UpdateChatList(newChat));
      }
    } else {
      store.dispatch(UpdateChatList(newChat));
    }
  });

  socket.on("other-cam-change", (data) => {
    store.dispatch(setOtherActionCam(data));
  });

  socket.on("sendFriendInvite", (data) => {
    store.dispatch(getInviteList());
  });

  socket.on("invite-room", (data) => {
    store.dispatch(setNotification(data));
  });
  socket.on("notify-join", (data) => {
    store.dispatch(setErrorModal(null));
    store.dispatch(setErrorModal(!data));
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
  socket.emit("sendFriendInvite", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const sendDirectMessage = (data) => {
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
};

export const checkNotifyJoin = (data) => {
  socket.emit("notify-join", data);
};
