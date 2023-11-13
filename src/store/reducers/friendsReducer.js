import { friendsActions } from "../actions/friendsAction";

const initState = {
  invites:[],
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
  setIsFriendAlready: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case friendsActions.SET_PENDING_FRIENDS_INVITATIONS:
      return {
        ...state,
        pendingFriendsInvitations: action.pendingFriendsInvitations,
      };
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case friendsActions.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    case friendsActions.SET_FRIENDS_ALREADY:
      return {
        ...state,
        setIsFriendAlready: action.setIsFriendAlready,
      };
      case friendsActions.SET_INVITES:
        return {
          ...state,
          invites: action.invites,
        };
    default:
      return state;
  }
};

export default reducer;
