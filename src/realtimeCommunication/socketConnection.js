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
  setGiftNotification,
  setCardTalkList,
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

  // function checkError() {
  //   retries++;
  //   if (!socket.connected && retries % 3 === 0) {
  //   }
  // }
  // setInterval(checkError, 1000);

  socket.on("error", (error) => {
    console.log("error");
    console.log("socket พัง socket พัง socket พัง socket พัง");
  });

  socket.on("connect", () => {
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
  });

  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on("remove-from-room", (data) => {
    if (data.userId === store.getState().auth.userDetails._id) {
      console.log(socket.id);
      console.log(data.socketId);
      if (data.socketId !== socket.id) {
        // window.location.reload();
        console.log("โดนเตะ");

        roomHandler.leaveRoom();
        store.dispatch(setModalErrorSocket(true));
      }
    }
  });

  socket.on("conn-prepare", (data) => {
    console.log("มีคนขอเชื่อมต่อ");
    const { connUserSocketId, name, pic, id } = data;
    webRTCHandler.prepareNewPeerConnection(
      connUserSocketId,
      false,
      name,
      pic,
      id
    );
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

    socket.emit("conn-init", {
      connUserSocketId: connUserSocketId,
      name: modifiedUserDetails,
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
    console.log(foundObject);

    if (newChat.isGift) {
      store.dispatch(UpdateChatList(newChat));
    }

    if (isUserInRoom) {
      if (foundObject) {
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
    console.log(data);
    console.log("มีคนปิดกล้องโว้ยยยยยยยยยยยยยย");
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

  socket.on("other-send-gift", (data) => {
    store.dispatch(setGiftNotification(data));
  });

  socket.on("other-send-card-talk", (data) => {
    store.dispatch(setCardTalkList(data));
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

export const createNewRoom = (name, type, detail, password) => {
  const data = { name: name, type: type, detail: detail, password: password };
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

export const sendGiftToOther = (data) => {
  socket.emit("send-gift-to-other", data);
};

export const sendCardTalk = (data) => {
  socket.emit("send-card-talk", data);
};

export const checkUserInRoom = (data) => {
  socket.emit("check-user-in-room", data);
};
