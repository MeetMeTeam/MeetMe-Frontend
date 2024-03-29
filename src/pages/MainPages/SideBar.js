import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import MainPageButton from "./SideBar/MainPageButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./SideBar/ActiveRoomButton";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import styles from "../../shared/css/mainPage.module.css";
import Loading from "../../shared/components/Loading";
import scollBarRoom from "../../shared/css/scollBarRoom.module.css";

const SideBar = ({ activeRooms, isUserInRoom }) => {
  const [isShowLoading, setIsisShowLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsisShowLoading(false);
    }, 1500);
  }, []);

  return (
    <div className={scollBarRoom.scrollbar + " w-full"}>
      <div
        className={`bg-purple-60 h-[570px] w-full rounded-2xl px-4 pb-4 min-w-[652px] ${
          activeRooms.length === 0 ? " justify-between " : " justify-start "
        } flex flex-col  ${styles.container}`}
      >
        <div className={`text-white text-[32px] font-bold py-5 `}>Room </div>
        <div
          className={`${
            activeRooms.length === 0
              ? ""
              : " h-[450px] space-y-4 overflow-y-auto px-2  "
          }`}
        >
          {activeRooms &&
            activeRooms.map((room) => (
              <ActiveRoomButton
                roomId={room.roomId}
                creatorUsername={room.creatorUsername}
                amountOfParticipants={
                  room.participants[0].userId === "default" &&
                  room.participants.length === 1
                    ? 0
                    : room.participants[0].userId === "default"
                    ? room.participants.length - 1
                    : room.participants.length
                }
                key={room.roomId}
                isUserInRoom={isUserInRoom}
                roomName={room.roomCreator.roomName}
                type={room.roomCreator.type}
                data={room}
              />
            ))}
        </div>

        {activeRooms.length === 0 && (
          <div
            className={`w-full flex justify-center items-center h-full flex-col`}
          >
            {isShowLoading && <Loading />}
            {!isShowLoading && (
              <div className="w-full flex justify-center items-center h-full flex-col">
                <SafetyDividerIcon
                  className="text-white"
                  sx={{ fontSize: "43px" }}
                />
                <div className="text-white">
                  No room active now, create room to invite friends!
                </div>
              </div>
            )}
          </div>
        )}
        <div />
      </div>{" "}
    </div>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
