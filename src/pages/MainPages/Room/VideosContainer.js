/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import { useSelector } from "react-redux";
import * as socketConnection from "../../../realtimeCommunication/socketConnection";
import AvatarUserPreview from "./RoomButtons/AvatarUserPreview";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AvatarCard from "../../../shared/components/AvatarCard";
import GiftAnimation from "./RoomButtons/GiftAnimation";
const MainContainer = styled("div")({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
  roomId,
  cameraEnabled,
}) => {
  let otherUserActionCam = useSelector(
    (state) => state.room.otherUserActionCam
  );
  let myImage = useSelector((state) => state.auth.userDetails?.image);
  let activeRooms = useSelector((state) => state.room.activeRooms);
  let [participants, setParticipants] = useState([]);
  const userId = useSelector((state) => state.auth.userDetails?._id);

  let remoteStream = null;
  let [oldRemoteStreams, setOldRemoteStreams] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [userDetailCard, setUserDetailCard] = React.useState(null);
  let [isShowAnimation, setIsShowAnimation] = useState(false);
  const handleOpen = (userDetail) => {
    console.log(userDetail);
    setUserDetailCard(userDetail);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    for (let index = 0; index < activeRooms.length; index++) {
      if (activeRooms[index].roomId === roomId) {
        setParticipants(activeRooms[index].participants);
      }
    }
  }, [activeRooms]);

  useEffect(() => {}, [otherUserActionCam]);

  useEffect(() => {}, [participants]);

  useEffect(() => {
    updateMyCamToOther();
  }, [remoteStreams]);

  useEffect(() => {}, [localStream]);

  useEffect(() => {
    updateMyCamToOther();
  }, [cameraEnabled]);

  function updateMyCamToOther(peopleInRoom) {
    console.log("kuy");
    console.log(participants);
    const data = {
      userId: userId,
      isCameraEnabled: cameraEnabled,
      peopleInRoom: peopleInRoom ? peopleInRoom : participants,
      image: myImage,
    };
    socketConnection.camChange(data);
  }

  const renderRemoteStream = (stream) => {
    const isCameraEnabled = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.isCameraEnabled;
    const id = otherUserActionCam.find(
      (item) => item.userId === stream.id
    )?.userId;
    return (
      <div
        key={stream.remoteStream.id}
        style={{ zoom: 0.8 }}
        className="flex flex-col hover:ring-purple-60 rounded-2xl hover:ring cursor-pointer justify-center items-center relative p-10"
      >
        <GiftAnimation id={stream.id} />

        <div className="bg-white  py-10 opacity-30 rounded-2xl w-full z-[0] h-full absolute"></div>

        {isCameraEnabled || otherUserActionCam.length === 0 ? (
          <Video
            size=""
            stream={stream.remoteStream}
            id={stream.connUserSocketId}
          />
        ) : (
          <div>
            <Video
              size="1px"
              stream={stream.remoteStream}
              id={stream.connUserSocketId}
            />
            <AvatarUserPreview id={id} />
          </div>
        )}
        <div className="mt-4 w-fit font-bold drop-shadow-md bg-gray-90 px-2 py-1 rounded-md">
          {stream.name.displayName}
        </div>
      </div>
    );
  };

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newZoom = windowWidth / 3000;

      if (newZoom > 0.6) {
        setZoom(newZoom);
      } else {
        setZoom(0.8);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{ zoom: zoom }}
      className="absolute top-[15%] gap-4 w-full grid lg:grid-cols-4 grid-cols-2  sm:px-12"
    >
      <div
        style={{ zoom: 0.8 }}
        className="flex flex-col  justify-center items-center relative p-10"
      >
        <GiftAnimation id={userId} />

        <div className="bg-white py-10  opacity-30 rounded-2xl w-full h-full absolute"></div>
        {cameraEnabled ? (
          <Video size="" stream={localStream} isLocalStream />
        ) : (
          <div>
            <Video size="1px" stream={localStream} isLocalStream />
            <AvatarUserPreview id={userId} />
          </div>
        )}
        <div className="mt-4 font-bold drop-shadow-md bg-purple-60 text-white px-2 py-1 rounded-md">
          {"Me"}
        </div>
      </div>

      {remoteStreams.map((stream) => (
        <div
          onClick={() => handleOpen(stream.name)}
          key={stream.remoteStream.id}
          className="another-custom-class"
        >
          {renderRemoteStream(stream)}
        </div>
      ))}

      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          <AvatarCard scale={"150"} userDataDetail={userDetailCard} />
        </Box>
      </Modal>
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);
