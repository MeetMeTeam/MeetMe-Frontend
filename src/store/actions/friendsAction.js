import { openAlertMessage } from './alertActions'
import * as api from '../../api'
import { sendFriendInvite } from "../../realtimeCommunication/socketConnection";

export const friendsActions = {
    SET_FRIENDS: "FRIENDS.SET_FRIENDS",
    SET_PENDING_FRIENDS_INVITATIONS: "FRIENDS.SET_PENDING_FRIENDS_INVITATIONS",
    SET_ONLINE_USERS: "FRIENDS.SET_ONLINE_USERS",
    SET_FRIENDS_ALREADY : "FRIENDS.SET_FRIENDS_ALREADY",
    SET_INVITES : "FRIENDS.SET_INVITES"
  };


  export const getActions = (dispatch) => {
    return {
        sendFriendInvitation : (data , closeDialogHandler) => 
        dispatch(sendFriendInvitation(data, closeDialogHandler)),
        acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
        rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
        getFriends: (data) => dispatch(getFriends(data)),

    }
  }



  export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
    return {
      type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
      pendingFriendsInvitations,
    };
  };
  
  export const sendFriendInvitation = (data, closeDialogHandler) => {
    return async (dispatch) => {
        const response = await api.sendFriendInvitation(data);
        if(response?.error) {
            dispatch(openAlertMessage(response.exception?.response?.data.message))
        } else {
            dispatch(openAlertMessage('Invitaation has been sent!'))
            sendFriendInvite(response?.data?.data?.id);
        }
    }
  }


  export const acceptFriendInvitation = (data) => {
    return async (dispatch) => {
      const response = await api.acceptFriendInvitation(data);

      if(response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
        dispatch(openAlertMessage('Invitation has accept !'))
        dispatch(getFriends());

    }
    }
  }

  export const acceptFriendInvitationAll = (data) => {
    return async (dispatch) => {
      const response = await api.acceptFriendInvitationAll();

      if(response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
        dispatch(openAlertMessage('Invitation has accept !'))
        dispatch(getFriends());
        dispatch(setInvite([]));
    }
    }
  }

  export const rejectFriendInvitation = (data) => {
    return async (dispatch) => {
      const response = await api.rejectFriendInvitation(data);

      if(response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
        dispatch(openAlertMessage('Invitation has rejected !'))
        dispatch(getInviteList())   
    }
    }
  }

  export const rejectFriendInvitationAll = (data) => {
    return async (dispatch) => {
      const response = await api.rejectFriendInvitationAll();
      if(response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data))
    } else {
        dispatch(openAlertMessage('Invitation has rejected !'))
        dispatch(setInvite([]));
    }
    }
  }

  export const getFriends = () => {
    return async (dispatch) => {
      const response = await api.getFriends();
      const friendList = response?.data?.data;
  
      dispatch(setFriends(friendList));
      dispatch(setFriendsAlready(true));
    };
  };

 export const getInviteList = () => {
    return async (dispatch) => {
      const response = await api.getInviteList();
      const inviteList = response?.data?.data;
      if(inviteList?.length>0) {
        dispatch(openAlertMessage("มีคนแอดใหม่"))
      }
      dispatch(setInvite(inviteList));
    };
  };

  export const setInvite = (invites) => {
    
    return {
      type: friendsActions.SET_INVITES,
      invites,
    };
  };

  export const setFriends = (friends) => {
    return {
      type: friendsActions.SET_FRIENDS,
      friends,
    };
  };

  export const setOnlineUsers = (onlineUsers) => {
    return {
      type: friendsActions.SET_ONLINE_USERS,
      onlineUsers,
    };
  };
  
  
  export const setFriendsAlready = (setIsFriendAlready) => {
    return {
      type: friendsActions.SET_FRIENDS_ALREADY,
      setIsFriendAlready,
    };
  };
  