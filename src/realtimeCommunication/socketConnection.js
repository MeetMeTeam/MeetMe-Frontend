import io from 'socket.io-client'
import { setPendingFriendsInvitations , setFriends ,setOnlineUsers } from '../store/actions/friendsAction'
import store from "../store/store";

let socket = null

export const connectWithSocketServer = (userDetails) => {
    console.log("test")
    const jwtToken = userDetails.token;
    socket = io('http://localhost:5002' , {
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

}

