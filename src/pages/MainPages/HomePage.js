import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import { logout } from "../../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { connectWithSocketServer } from "../../realtimeCommunication/socketConnection";
import Room from "./Room/Room";
import Chat from "./ChatAll/ChatAll";
import HeadBar from "./HeadBar/HeadBar";
import BannerAdvert from "./BannerAdvert/BannerAdvert";
import styles from "../../shared/css/mainPage.module.css";
import SnowAnimation from "../../shared/components/SnowAnimation";
import AvatarPreview from "../MainPages/Inventory/AvatarPreview";
import { useSelector } from "react-redux";
import * as api from "../../api";
import Loading from "../../shared/components/Loading";
import { useMediaQuery } from "react-responsive";

const HomePage = ({ setUserDetails, isUserInRoom }) => {
  const userDetail = useSelector((state) => state.auth.userDetails);
  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);
  const notebook = useMediaQuery({ query: "(max-width: 1400px)" });

  async function getAvatar() {
    if (userDetail) {
      const response = await api.getAvatar(userDetail?._id);
      setAvatarUserShow(response?.data?.data);
      setIsloadingAvatar(false);
    }
  }

  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  useEffect(() => {
    getAvatar();
  }, [userDetail]);

  useEffect(() => {
    getAvatar();
  }, [avatarFetchCount]);

  useEffect(() => {
    console.log(notebook);
  }, [notebook]);
  return (
    <div className="min-h-screen min-w-[1200px]  flex flex-col">
      {/* {!isUserInRoom && <SnowAnimation className="z-10" />}  */}
      {!isUserInRoom && <HeadBar className="z-20" />}
      {!isUserInRoom && (
        <div className={"items-center flex " + styles.containerLobby}>
          <div
            className={
              "flex flex-row  w-full justify-center z-20 xxl:scale-125 xxxxl:scale-150 scale-100"
            }
          >
            <div className=" mr-6 max-w-[400px] p-[32px] md:pr-0 flex flex-col  space-y-4 h-full">
              {/* <FriendsSideBar />
            <div>
              <Chat />
            </div> */}
              <div
                className={
                  "flex flex-col  rounded-2xl " +
                  (isLoadingAvatar ? "" : "bg-white")
                }
              >
                {isLoadingAvatar ? (
                  <div className="  flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <AvatarPreview
                    height="500"
                    width="400"
                    avatarUser={avatarUserShow}
                  />
                )}
              </div>
            </div>
            <div className="p-[32px] max-w-[822px] flex flex-col h-full space-y-4">
              <BannerAdvert className="h-1/3" />
              <div className={`flex flex-row md:space-x-6`}>
                {/* <div className={`
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
           </div> */}
                <Chat />
                <SideBar /> {/* //ไว้โชว์ห้อง */}
              </div>
            </div>
          </div>
        </div>
      )}
      {isUserInRoom && <Room className="z-20" />}
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

export default connect(mapStoreStateToProps, mapActionsToProps)(HomePage);
