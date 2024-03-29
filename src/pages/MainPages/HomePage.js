import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar";
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
import CreateIcon from "@mui/icons-material/Create";
import Inventory from "../MainPages/Inventory/InventoryButton";
import store from "../../store/store";
import { clearCardTalk } from "../../store/actions/alertActions";

const HomePage = ({ setUserDetails, isUserInRoom }) => {
  const userDetail = useSelector((state) => state.auth.userDetails);

  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);
  const notebook = useMediaQuery({ query: "(max-width: 1400px)" });

  async function getAvatar() {
    if (userDetail?._id) {
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

  useEffect(() => {}, [notebook]);

  useEffect(() => {
    store.dispatch(clearCardTalk());
  }, [isUserInRoom]);
  return (
    <div className="min-h-screen xl:overflow-x-hidden min-w-[1200px]  flex flex-col">
      {/* {!isUserInRoom && <SnowAnimation className="z-10" />}  */}
      {!isUserInRoom && <HeadBar className="z-20" />}
      {!isUserInRoom && (
        <div className={"items-center flex " + styles.containerLobby}>
          <div
            className={
              "flex flex-row  w-full justify-center z-20 xxl:scale-x-110 xxxxl:scale-125 scale-100"
            }
          >
            {/*  */}
            <div className=" pt-[16px] mr-[32px] md:pr-0 flex flex-col  space-y-4 h-full">
              {/* <div>
              <Chat />
            </div> */}
              <div
                className={
                  "flex flex-col  rounded-2xl " +
                  (isLoadingAvatar ? "" : "bg-white")
                }
              >
                {isLoadingAvatar ? (
                  <div className="flex bg-white h-[400px] rounded-xl items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <div className="relative">
                    <AvatarPreview
                      height="450"
                      width="400"
                      avatarUser={avatarUserShow}
                    />
                    <div className="absolute top-5 right-10">
                      <Inventory />
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-between items-center bg-white py-1 rounded-2xl text-purple-60 font-bold px-4 text-[20px]">
                <span>{userDetail?.displayName && userDetail.displayName}</span>
                {/* <CreateIcon className="cursor-pointer" /> */}
              </div>
              <div className="relative w-[400px] bg-white py-2 rounded-2xl text-purple-60 h-[50px] font-bold px-4 text-[12px]">
                <div className="z-10 relative line-clamp-2">
                  {userDetail?.bio && userDetail.bio}
                </div>
                <div
                  className="w-0 z-0 h-0 absolute top-[-12px] left-5
  border-l-[15px] border-l-transparent
  border-b-[25px] border-b-white
  border-r-[15px] border-r-transparent"
                ></div>
              </div>
            </div>
            <div className="pt-[16px] flex flex-col h-full space-y-4">
              {/* <BannerAdvert className="h-1/3" /> */}
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
