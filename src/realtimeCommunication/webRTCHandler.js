import store from "../store/store";
import {
  setLocalStream,
  setRemoteStreams,
  removeOtherActionCam,
} from "../store/actions/roomActions";
// import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";
import Peer from "simple-peer";

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      navigator.mediaDevices
        .getUserMedia(onlyAudioConstraints)
        .then((stream) => {
          store.dispatch(setLocalStream(stream));
          callbackFunc();
        });
    });
};

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
    console.log("turnIceServers");
  } else {
    console.warn("Using only STUN server");
    return {
      // iceServers: [
      //   {
      //     urls: "stun:stun.l.google.com:19302",
      //   },
      // ],
      iceServers: [
        {
          urls: "turn:a.relay.metered.ca:80",
          username: "de3ef18462dd38e33a457d5b",
          credential: "NK+chh3TNgM8LyrM",
        },
        {
          urls: "turn:a.relay.metered.ca:80?transport=tcp",
          username: "de3ef18462dd38e33a457d5b",
          credential: "NK+chh3TNgM8LyrM",
        },
        {
          urls: "turn:a.relay.metered.ca:443",
          username: "de3ef18462dd38e33a457d5b",
          credential: "NK+chh3TNgM8LyrM",
        },
        {
          urls: "turn:a.relay.metered.ca:443?transport=tcp",
          username: "de3ef18462dd38e33a457d5b",
          credential: "NK+chh3TNgM8LyrM",
        },
      ],
    };
  }
};

let peers = {};

export const prepareNewPeerConnection = (
  connUserSocketId,
  isInitiator,
  name,
  pic,
  id
) => {
  const localStream = store.getState().room.localStream;

  if (isInitiator) {
    console.log("preparing new peer connection as initiator");
  } else {
    console.log("preparing new peer connection as not initiator");
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (remoteStream) => {
    //TODO
    // add new remote stream to our server store
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream, connUserSocketId, name, pic, id);
  });
};

export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

const addNewRemoteStream = (remoteStream, connUserSocketId, name, pic, id) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [
    ...remoteStreams,
    { remoteStream, connUserSocketId, name, pic, id },
  ];

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      //  peers[connUserSocketId] = [];

      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );
  store.dispatch(removeOtherActionCam(connUserSocketId));
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};
