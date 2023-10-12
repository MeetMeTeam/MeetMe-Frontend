import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import Room from "./Room/Room";
import Chat from "./ChatAll/ChatAll";
import HeadBar from "./HeadBar/HeadBar";
import BannerAdvert from "./BannerAdvert/BannerAdvert";
import styles from "../shared/css/mainPage.module.css"

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
    <div className="min-h-screen flex flex-col">
      <HeadBar/>
       <div className="flex flex-row w-full justify-between gap-4">
     
      <div className="w-1/3 p-[32px] flex flex-col  space-y-4 h-full">
        <FriendsSideBar />
        <div>
          <Chat />
        </div>
      </div> 
      <div className="p-[32px] w-2/3 flex flex-col h-full space-y-4">
      <BannerAdvert className="h-1/3"/>
      <div className={`flex flex-row space-x-6`}>
        <div className={`
        bg-[#FF80A5] w-full rounded-2xl
        text-white
        h-full
        flex flex-col justify-between
        ${styles.container}
        `}>
          <div className="text-[34px] h-full font-bold px-4 pt-6">
          Top 3 Rank
          </div>
          <div className="flex justify-center items-center h-full ">
            coming soon
          </div>
           <div>
            
           </div>
           </div>
        <SideBar />   {/* //ไว้โชว์ห้อง */}
        </div>
      </div>
      {/* <Messenger /> */}
      {/* <AppBar /> */}
      {isUserInRoom && <Room />}
    </div>
    </div>
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
