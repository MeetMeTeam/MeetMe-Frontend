import io from 'socket.io-client'
import { setPendingFriendsInvitations , setFriends ,setOnlineUsers } from '../store/actions/friendsAction'
import store from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";

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


}

export const getDirectChatHistory = (data) => {
  console.log(data)
    socket.emit("direct-chat-history", data);
  };

  
export const sendDirectMessage = (data) => {
    console.log(data);
    socket.emit("direct-message", data);
  };
  
  export const createNewRoom = () => {
    socket.emit("room-create");
  };
  