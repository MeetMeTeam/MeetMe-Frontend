import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { logout } from "../../../shared/utils/auth";
import { useMediaQuery } from "react-responsive";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Drawer from "@mui/material/Drawer";
import * as api from "../../../api";
import Loading from "../../../shared/components/Loading";
import AvatarPreview from "../../MainPages/Inventory/AvatarPreview";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions/authActions";
import LoadingPage from "../../../shared/components/LoadingPage";
import AvatarCard from "../../../shared/components/AvatarCard";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#E5D6F5",
  p: 4,
  borderRadius: "10px",
};

const User = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const userDetail = useSelector((state) => state.auth.userDetails);
  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
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

  async function editUser() {
    if (validate()) {
      setIsloading(true);
      const response = await api.editUser(userDataDetail);

      const storedUser = JSON.parse(localStorage.getItem("user"));

      const mergedUserData = { ...storedUser, ...response?.data?.data };

      dispatch(setUserDetails(mergedUserData));

      localStorage.setItem("user", JSON.stringify(mergedUserData));
      setIsloading(false);
    }
  }

  const [userDataDetail, setUserDataDetail] = useState({
    username: "",
    displayName: "",
    bio: "",
  });

  function validate() {
    if (
      userDataDetail?.displayName === "" ||
      userDataDetail?.displayName.length < 3
    ) {
      return false;
    } else {
      return true;
    }
  }
  function init() {
    setUserDataDetail(userDetails);
  }
  useEffect(() => {
    init();
  }, [userDetail]);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div>
      {isLoading && <LoadingPage />}
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
              <AvatarCard userDataDetail={userDataDetail} />

              <div className="w-full mt-4 mb-2 ">
                <div className="text-blue-60 mb-1 font-bold text-[14px]">
                  Display Name
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
                  Bio
                </div>
                <div></div>
                <textarea
                  maxlength="120"
                  value={userDataDetail?.bio}
                  onChange={(e) => {
                    setUserDataDetail({
                      ...userDataDetail,
                      bio: e.target.value,
                    });
                  }}
                  className="p-2 text-white w-full  rounded-2xl bg-blue-80 py-2"
                />
              </div>
              {/* <div className="w-full">
                <div className="text-blue-60 mb-1 font-bold text-[14px]">
                  Social
                </div>
                <div className="flex gap-2">
                  <div
                    onClick={handleOpenModal}
                    className="bg-blue-80 font-bold cursor-pointer rounded-lg flex flex-row py-2 w-[130px] justify-center text-white gap-2"
                  >
                    <FacebookIcon />
                    <div> Facebook </div>
                  </div>
                  <div
                    onClick={handleOpenModal}
                    className="bg-blue-80 font-bold cursor-pointer rounded-lg flex flex-row py-2 w-[130px] justify-center text-white gap-2"
                  >
                    <InstagramIcon />
                    <div> Instagram </div>
                  </div>
                </div>
              </div> */}
              <div
                onClick={() => editUser()}
                className={
                  (validate()
                    ? "bg-yellow-80 hover:bg-yellow-70"
                    : "bg-gray-70 ") +
                  " mt-4 mb-4 ring text-blue-80 cursor-pointer  text-center w-full py-2 rounded-3xl font-bold"
                }
              >
                Save
              </div>
              {/* <div className="mt-3 mb-2 hover:bg-gray-70 text-blue-70 cursor-pointer bg-gray-80 text-center w-full py-2 rounded-3xl font-bold">
                <SettingsIcon /> Setting
              </div> */}
            </div>
            <div
              className="bg-red-70 hover:bg-red-60 cursor-pointer text-center w-full py-2 rounded-3xl font-bold text-white"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default User;
