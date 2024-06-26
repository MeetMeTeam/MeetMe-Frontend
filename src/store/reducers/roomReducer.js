import { roomActions } from "../actions/roomActions";

const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
  otherUserActionCam: [],
  isModalCantJoinShow: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.SET_REMOVE_ALL_ACTION:
      console.log(action.content);

      return {
        ...state,
        otherUserActionCam: action.content,
      };
    case roomActions.SET_MODAL_ERROR_SHOW:
      return {
        ...state,
        isModalCantJoinShow: action.content,
      };
    case roomActions.REMOVE_OTHER_USER_ACTION_CAM:
      let newOtherUserAction = [];
      newOtherUserAction = [...state.otherUserActionCam];
      const index = newOtherUserAction.findIndex(
        (item) => item.id === action.content
      );
      newOtherUserAction.splice(index, 1);
      return { ...state, otherUserActionCam: newOtherUserAction };
    case roomActions.SET_OTHER_USER_ACTION_CAM:
      let newOtherUserActionCam = [];
      newOtherUserActionCam = [...state.otherUserActionCam];
      const foundIndex = newOtherUserActionCam.findIndex(
        (otherUserActionCam) =>
          otherUserActionCam.userId === action.content.userId
      );
      if (foundIndex > -1) {
        // แทนที่ object ที่มี id เดียวกัน
        newOtherUserActionCam[foundIndex] = action.content;
      } else {
        // เพิ่ม object ใหม่
        newOtherUserActionCam.push(action.content);
      }
      return { ...state, otherUserActionCam: newOtherUserActionCam };
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOMS:
      const sortedActiveRooms = action.activeRooms.slice().sort((a, b) => {
        const participantsA =
          a.roomCreator.userId === "default"
            ? a.participants.length - 1
            : a.participants.length;
        const participantsB =
          b.roomCreator.userId === "default"
            ? b.participants.length - 1
            : b.participants.length;
        return participantsB - participantsA;
      });

      return {
        ...state,
        activeRooms: sortedActiveRooms,
      };
    case roomActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case roomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case roomActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        screenSharingStream: action.screenSharingStream,
        isScreenSharingActive: action.isScreenSharingActive,
      };
    case roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO:
      return {
        ...state,
        isUserJoinedWithOnlyAudio: action.isUserJoinedWithOnlyAudio,
      };
    default:
      return state;
  }
};

export default reducer;
