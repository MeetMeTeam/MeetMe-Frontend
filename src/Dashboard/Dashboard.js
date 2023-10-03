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
    <div>
      <HeadBar/>
       <Wrapper className="grid grid-cols-3 p-[32px] gap-4">
     
      <div className="flex flex-col space-y-4">
        <FriendsSideBar />
        <div>
          <Chat/>
        </div>
      </div>
      
      <div className="col-span-2 flex flex-col space-y-4">
      <BannerAdvert/>
      <div className="flex flex-row space-x-4 w-full">
        <div className="
        bg-[#FF80A5] w-full rounded-2xl
        text-white
        h-[570px]  
        ">
          <div className="text-[34px] font-bold px-4 py-6">
          Top 3 Rank
          </div>
          <div className="flex justify-center items-center h-full pb-[150px]">
            comming soon
          </div>
           
           </div>
        <SideBar />
      </div>
      

      </div>
      {/* <Messenger /> */}
      {/* <AppBar /> */}
      {isUserInRoom && <Room />}
    </Wrapper>
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
