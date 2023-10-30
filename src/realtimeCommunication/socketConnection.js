import io from 'socket.io-client'
import { setPendingFriendsInvitations , setFriends ,setOnlineUsers } from '../store/actions/friendsAction'
import { UpdateChatList  } from '../store/actions/allChatAction'

import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";
import * as webRTCHandler from "./webRTCHandler";

let socket = null

export const connectWithSocketServer = (userDetails) => {
    console.log("test")
    const jwtToken = userDetails.token;
    socket = io(process.env.REACT_APP_BASE_API , {
        auth: {
            token : jwtToken,
            test: "hello"
        }
    })

    socket.on('connect', () => {
        console.log("suscess connect socket.io server")
        console.log(socket.id)
    })

    socket.on('friends-invitations' , (data)=> {
        const { pendingInvitations } = data;
        store.dispatch(setPendingFriendsInvitations(pendingInvitations))
    })

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
        console.log(data)
        console.log('create room detail from server')
      });
      
      socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId , name } = data;
    console.log("prepare for connection")
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false , name);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId , name : store.getState().auth.userDetails.username });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId ,name } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true , name);
  });

  socket.on("conn-signal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    console.log("user left room");
    webRTCHandler.handleParticipantLeftRoom(data);
  });

  socket.on('chatter', (newChat) => {
    console.log(newChat + ' this is socket . on')
    store.dispatch(UpdateChatList(newChat))
    })

}

export const sendMessage = (newChat) => {
  // socket.emit('chatter', name + ' : ' +text);    
  socket.emit('chatter',newChat);    

// socket.on('chatter', (mess) => {
// console.log(mess + ' this is socket . on')
// // setChatList([...chatList,{text:mess,id:chatList.length+1}] )
// // setText('')
// });

}


export const getDirectChatHistory = (data) => {
  console.log(data)
    socket.emit("direct-chat-history", data);
  };

  
export const sendDirectMessage = (data) => {
    console.log(data);
    socket.emit("direct-message", data);
  };
  
  export const createNewRoom = (data) => {
    socket.emit("room-create",data);
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
  