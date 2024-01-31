import React from "react";
import JoinRoomRandom from "./JoinRoomRandom";
import CreateRoom from "./CreateRoom";
import User from "./User";
import Notification from "./NotificationButton";
import { useParams, useHistory } from "react-router-dom";

export default function HeadBar() {
  const history = useHistory();

  return (
    <div className="mx-[2rem] pt-[1rem] flex flex-row justify-between space-x-4">
      <img
        alt="logo"
        className="w-[45px]"
        src={process.env.PUBLIC_URL + "/meetme_logo.svg"}
      />
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row items-center space-x-4">
          {/* <JoinRoomRandom/> */}
          <div
            onClick={() => history.push("/shop")}
            className="bg-purple-70 text-white px-4 py-2 rounded-3xl font-medium cursor-pointer"
          >
            shop
          </div>
          <CreateRoom />
          <Notification />
        </div>

        <div className="md:block">
          <User />
        </div>
      </div>
    </div>
  );
}
