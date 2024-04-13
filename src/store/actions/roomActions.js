export const roomActions = {
  OPEN_ROOM: "ROOM.OPEN_ROOM",
  SET_ROOM_DETAILS: "ROOM.SET_ROOM_DETAILS",
  SET_ACTIVE_ROOMS: "ROOM.SET_ACTIVE_ROOMS",
  SET_LOCAL_STREAM: "ROOM.SET_LOCAL_STREAM",
  SET_REMOTE_STREAMS: "ROOM.SET_REMOTE_STREAMS",
  SET_AUDIO_ONLY: "ROOM.SET_AUDIO_ONLY",
  SET_SCREEN_SHARE_STREAM: "ROOM.SET_SCREEN_SHARE_STREAM",
  SET_IS_USER_JOINED_WITH_ONLY_AUDIO: "ROOM.SET_IS_USER_JOINED_WITH_ONLY_AUDIO",
  SET_OTHER_USER_ACTION_CAM: "ROOM.SET_OTHER_USER_ACTION_CAM",
  REMOVE_OTHER_USER_ACTION_CAM: "ROOM.REMOVE_OTHER_USER_ACTION_CAM",
  SET_MODAL_ERROR_SHOW: "ROOM.SET_MODAL_ERROR_SHOW",
  SET_REMOVE_ALL_ACTION: "ROOM.SET_REMOVE_ALL_ACTION",
};

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomActions.OPEN_ROOM,
    isUserRoomCreator,
    isUserInRoom,
  };
};

export const getActions = (dispatch) => {
  return {
    setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
    setScreenSharingStream: (stream) => {
      dispatch(setScreenSharingStream(stream));
    },
    setOtherActionCam: (content) => dispatch(setOtherActionCam(content)),
    removeOtherActionCam: (content) => dispatch(removeOtherActionCam(content)),
    setErrorModal: (content) => dispatch(setErrorModal(content)),
    removeAllOtherActionCam: (content) =>
      dispatch(removeAllOtherActionCam(content)),
  };
};

export const removeAllOtherActionCam = (content) => {
  return {
    type: roomActions.SET_REMOVE_ALL_ACTION,
    content,
  };
};

export const removeOtherActionCam = (content) => {
  return {
    type: roomActions.REMOVE_OTHER_USER_ACTION_CAM,
    content,
  };
};

export const setErrorModal = (content) => {
  return {
    type: roomActions.SET_MODAL_ERROR_SHOW,
    content,
  };
};

export const setOtherActionCam = (content) => {
  return {
    type: roomActions.SET_OTHER_USER_ACTION_CAM,
    content,
  };
};

export const setRoomDetails = (roomDetails) => {
  return {
    type: roomActions.SET_ROOM_DETAILS,
    roomDetails,
  };
};

export const setActiveRooms = (activeRooms) => {
  return {
    type: roomActions.SET_ACTIVE_ROOMS,
    activeRooms,
  };
};

export const setLocalStream = (localStream) => {
  return {
    type: roomActions.SET_LOCAL_STREAM,
    localStream,
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: roomActions.SET_AUDIO_ONLY,
    audioOnly,
  };
};

export const setRemoteStreams = (remoteStreams) => {
  return {
    type: roomActions.SET_REMOTE_STREAMS,
    remoteStreams,
  };
};

export const setScreenSharingStream = (stream) => {
  return {
    type: roomActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};

export const setIsUserJoinedOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
    isUserJoinedWithOnlyAudio: onlyWithAudio,
  };
};
