import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { logout } from "../../../shared/utils/auth";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import * as api from "../../../api";
import Loading from "../../../shared/components/Loading";
import AvatarPreview from "../../MainPages/Inventory/AvatarPreview";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SettingsIcon from "@mui/icons-material/Settings";
const User = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const userDetail = useSelector((state) => state.auth.userDetails);
  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const open = Boolean(anchorEl);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 685px)" });
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  async function getAvatar() {
    if (userDetail) {
      const response = await api.getAvatar(userDetail?._id);
      setAvatarUserShow(response?.data?.data);
      setIsloadingAvatar(false);
    }
  }

  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [userDataDetail, setUserDataDetail] = useState({
    username: "",
    displayName: "",
  });
  function init() {
    setUserDataDetail(userDetails);
  }
  useEffect(() => {
    getAvatar();
    init();
  }, [userDetail]);

  useEffect(() => {
    getAvatar();
  }, [avatarFetchCount]);

  return (
    <div>
      <div
        className="button-profile flex flex-row  items-center space-x-1 font-bold
        justify-between bg-blue-70 rounded-2xl text-white cursor-pointer
        px-4 py-2 md:min-w-[170px]
        "
        onClick={toggleDrawer(true)}
      >
        {!isTabletOrMobile && (
          <div className="flex flex-col">
            <div className="text-[14px]">
              {userDetails ? userDetails.displayName : ""}
            </div>
            <div className="font-medium text-[10px]">
              @{userDetails ? userDetails.username : ""}{" "}
            </div>
          </div>
        )}
        <KeyboardArrowDownIcon />
      </div>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 500 }} role="presentation">
          <div className="bg-purple-90 items-center xxl:h-screen h-full px-10 py-5 flex flex-col justify-between">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="bg-blue-80 w-[350px] h-[435px] flex justify-center relative rounded-2xl">
                <div
                  className={
                    "flex flex-col  absolute top-[-25px] scale-75 rounded-2xl " +
                    (isLoadingAvatar ? "" : "bg-white")
                  }
                >
                  {isLoadingAvatar ? (
                    <div className="  flex items-center justify-center">
                      <Loading />
                    </div>
                  ) : (
                    <AvatarPreview
                      height="300"
                      width="420"
                      avatarUser={avatarUserShow}
                    />
                  )}
                </div>
                <div className="absolute text-blue-20 flex flex-col px-4 py-2 top-[250px] bg-blue-90 w-[310px] rounded-xl h-[170px]  ring-white ring">
                  <div className="text-[18px] mt-[-5px] font-bold">
                    {userDataDetail?.displayName}
                  </div>
                  <div className="text-[12px] mt-[-2px] ">
                    {" "}
                    {userDataDetail?.username}
                  </div>
                  <hr className="my-1"></hr>
                  <div className="font-bold text-[12px]">about me</div>
                  <div className="text-[12px]  line-clamp-3">
                    แฟรนไชส์ อุด้งเอนทรานซ์พลานุภาพไกด์แคป คอร์สมลภาวะ
                    นาฏยศาลามาร์กคีตราชัน วานิลา
                    กุนซือมวลชนคอลัมน์เซ็กซี่ช็อปเปอร์ สปอต โอ้ยสะกอมวิป
                    วาริชศาสตร์ โซนี่บ๊วยวิวหมิงซ้อ ﻿กรรมาชน เทวาแมนชั่นจอหงวน
                    โปรเจ็กเตอร์เมจิกคาราโอเกะ อุเทนเช็งเม้งฟรังก์
                    แพทเทิร์นเคลมซิ้มแตงกวา เซ็กซี่ไคลแมกซ์สเตริโอสเตชันอุเทน
                  </div>
                  <div className="flex  gap-2 flex-row mt-2">
                    <div className="border bg-yellow-90 border-black rounded-md px-2 flex cursor-pointer flex-row gap-1 text-[10px] items-center">
                      <FacebookIcon />
                      nuttawat rodsomboon
                    </div>
                    <div className="border bg-yellow-90 border-black rounded-md px-2 flex cursor-pointer flex-row gap-1 text-[10px] items-center">
                      <InstagramIcon />
                      n.ntww
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 mb-2 ">
                <div className="text-blue-60 mb-1 font-bold text-[14px]">
                  Display name
                </div>
                <input
                  value={userDataDetail?.displayName}
                  type="text"
                  maxlength="16"
                  onChange={(e) => {
                    setUserDataDetail({
                      ...userDataDetail,
                      displayName: e.target.value,
                    });
                  }}
                  className="text-white px-2 w-full rounded-2xl bg-blue-80 py-2"
                />
              </div>
              <div className="w-full">
                <div className="text-blue-60 mb-1 font-bold text-[14px]">
                  About me
                </div>

                <textarea className="p-2 text-white w-full h-[90px] rounded-2xl bg-blue-80 py-2" />
              </div>
              <div className="w-full">
                <div className="text-blue-60 mb-1 font-bold text-[14px]">
                  Social
                </div>
                <div className="flex gap-2">
                  <div className="bg-blue-80 font-bold cursor-pointer rounded-lg flex flex-row py-2 w-[130px] justify-center text-white gap-2">
                    <FacebookIcon />
                    <div> Facebook </div>
                  </div>
                  <div className="bg-blue-80 font-bold cursor-pointer rounded-lg flex flex-row py-2 w-[130px] justify-center text-white gap-2">
                    <InstagramIcon />
                    <div> Instagram </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 ring text-blue-80 cursor-pointer bg-yellow-80 hover:bg-yellow-70 text-center w-full py-2 rounded-3xl font-bold">
                Save
              </div>
              <div className="mt-3 mb-2 hover:bg-gray-70 text-blue-70 cursor-pointer bg-gray-80 text-center w-full py-2 rounded-3xl font-bold">
                <SettingsIcon /> Setting
              </div>
            </div>

            <div
              className="bg-red-70 hover:bg-red-60 cursor-pointer text-center w-full py-2 rounded-3xl font-bold text-white"
              onClick={logout}
            >
              Log out
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default User;
