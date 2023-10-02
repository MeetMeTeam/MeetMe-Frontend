import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";
import Chat from "./ChatAll/ChatAll";

const Wrapper = styled("div")({
  width: "100%",
  height: "100%",
});

const Dashboard = ({ setUserDetails , isUserInRoom}) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails))
    }
  }, []);

  return (
    <Wrapper className="grid grid-cols-3 p-[32px] gap-4">
      {/* <SideBar /> */}
      <div className="flex flex-col space-y-4">
        <FriendsSideBar />
        <div>
          <Chat/>
        </div>
      </div>
      
      <div className="col-span-2">
        x
      </div>
      {/* <Messenger /> */}
      {/* <AppBar /> */}
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
