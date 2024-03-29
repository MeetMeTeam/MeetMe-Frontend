import { authActions } from "../actions/authActions";

const initState = {
  userDetails: null,
  avatarFetchCount: 0,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    case authActions.SET_AVATAR_FETCH_COUNT:
      return {
        ...state,
        avatarFetchCount: state.avatarFetchCount + 1,
      };
    default:
      return state;
  }
};

export default reducer;
