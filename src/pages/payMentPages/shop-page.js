/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ShopMenu from "./ShopPage/ShopMenu";
import UserCoin from "./ShopPage/UserCoin";
import ShopCheckOut from "./ShopPage/ShopCheckOut/ShopCheckOut";
import * as api from "../../api";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import AvatarPreview from "../MainPages/Inventory/AvatarPreview";
import Loading from "../../shared/components/Loading";
import { logout } from "../../shared/utils/auth";
import { setUserDetails } from "../../store/actions/authActions";
import store from "../../store/store";
import AvatarShop from "./ShopPage/AvatarShop/AvatarShop";
import BackgroundAvatarShop from "./ShopPage/BackgroundAvatarShop/BackgroundAvatarShop";
import Inventory from "../MainPages//Inventory/InventoryButton";
import ItemBuy from "./ShopPage/ItemBuy";
import ThemeShop from "./ShopPage/ThemeShop/ThemeShop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ShoppingBasket } from "lucide-react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setCoinFetchCount } from "../../store/actions/authActions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ShopPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [coinUser, setCoinUser] = useState(0);
  const [avatarUser, setAvatarUser] = useState({});
  const [backgroundAvatarUser, setBackgroundAvatarUser] = useState({});
  const dispatch = useDispatch();

  const [avatarUserNew, setAvatarUserNew] = useState(null);
  const [avatarList, setAvatarList] = useState([]);
  const [backgroundAvatarList, setBackgroundAvatarList] = useState([]);

  const [themeList, setThemeList] = useState([]);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [backgroundAvatarUserShow, setBackgroundAvatarUserShow] = useState({});
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [isLoadingBackgroundAvatar, setIsloadingBackgroundAvatar] =
    useState(true);

  const [isLoadingAvatarShop, setIsloadingAvatarShop] = useState(true);
  const [isLoadingBackgroundAvatarShop, setIsloadingBackgroundAvatarShop] =
    useState(true);

  const [isLoadingThemeShop, setIsloadingThemeShop] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userDetail = useSelector((state) => state.auth.userDetails);
  const menuList = [
    { name: "Flower", menu: "ADD_COIN" },
    { name: "Avatar", menu: "AVATAR" },
    { name: "Background", menu: "BACKGROUND" },
    { name: "Theme Room", menu: "THEME" },
  ];
  const [menuNow, setMenuNow] = useState("ADD_COIN");

  async function getCoin() {
    const coinUser = await api.getCoin();
    setCoinUser(coinUser.data.data.coin);
    dispatch(setCoinFetchCount(1));
  }

  async function getAvatar(id) {
    const inventoryUser = await api.getAvatar(id);
    if (inventoryUser) {
      await setAvatarUser(inventoryUser?.data?.data);
      await setAvatarUserShow(inventoryUser?.data?.data);
      setIsloadingAvatar(false);
    }
  }
  async function getBackgroundAvatar(id) {
    const inventoryUser = await api.getBackgroundAvatar(id);
    if (inventoryUser) {
      console.log(inventoryUser);
      await setBackgroundAvatarUser(inventoryUser?.data?.data.preview);
      await setBackgroundAvatarUserShow(inventoryUser?.data?.data.preview);
      setIsloadingBackgroundAvatar(false);
    }
  }
  async function getAvatarShop() {
    setIsloadingAvatarShop(true);
    const AvatarShop = await api.getAvatarShop();

    if (AvatarShop) {
      await setAvatarList(AvatarShop?.data?.data);
      setIsloadingAvatarShop(false);
    }
  }

  async function getBackgroundAvatarShop() {
    setIsloadingBackgroundAvatarShop(true);
    const AvatarShop = await api.getBackgroundAvatarShop();

    if (AvatarShop) {
      await setBackgroundAvatarList(AvatarShop?.data?.data);
      setIsloadingBackgroundAvatarShop(false);
    }
  }

  async function getThemeShop() {
    const ThemeShop = await api.getThemeShop();
    if (ThemeShop) {
      await setThemeList(ThemeShop?.data?.data);
      setIsloadingThemeShop(false);
    }
  }

  async function buyAvatar() {
    if (avatarUserShow) {
      const data = {
        item_id: avatarUserShow.id,
        item_type: "avatar",
      };
      const response = await api.buyAvatar(data);

      if (response.status === 200) {
        getAvatarShop();
        getCoin();

        return response;
      } else {
        return response;
      }
    }
  }

  async function buyBackgroundAvatar() {
    if (backgroundAvatarUserShow) {
      const data = {
        item_id: backgroundAvatarUserShow.id,
        item_type: "bg",
      };
      const response = await api.buyAvatar(data);

      if (response.status === 200) {
        getBackgroundAvatarShop();
        getCoin();

        return response;
      } else {
        return response;
      }
    }
  }

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      store.dispatch(setUserDetails(JSON.parse(userDetails)));
      getCoin();
      getAvatarShop();
      getAvatar(JSON.parse(userDetails)._id);
      getBackgroundAvatar(JSON.parse(userDetails)._id);
      getThemeShop();
      getBackgroundAvatarShop(JSON.parse(userDetails)._id);
    }
  }, []);

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newZoom = windowWidth / 1900;
      if (newZoom < 0.6) {
        setZoom(0.8);
      } else {
        setZoom(newZoom);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(zoom);
  }, [zoom]);

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className=" bg-[#8379FD] text-white flex gap-2 px-4 py-3 rounded-xl font-medium cursor-pointer"
      >
        <ShoppingBasket className="button-shop" /> Shop
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ zoom: zoom }}
            className="relative justify-center   bg-purple-90 p-10 md:space-y-0 space-y-4 items-center  select-none flex md:flex-row flex-col"
          >
            <div
              onClick={handleClose}
              className="bg-white rounded-full p-2 w-[40px] h-[40px] flex justify-center items-center cursor-pointer"
            >
              <CloseIcon />
            </div>
            <div className="px-6 flex flex-col justify-center space-y-4 w-[300px]">
              <div
                className={
                  "flex flex-col items-center w-fullg justify-center rounded-2xl " +
                  (isLoadingAvatar ? "" : "")
                }
              >
                {isLoadingAvatar ? (
                  <div className="w-[300px] h-[500px] bg-white rounded-lg flex items-center justify-center">
                    <Loading />
                  </div>
                ) : (
                  <AvatarPreview
                    height="500"
                    avatarUser={avatarUserShow}
                    backgroundAvatarUser={
                      backgroundAvatarUserShow?.preview ||
                      backgroundAvatarUserShow
                    }
                  />
                )}
              </div>
              <div className="flex w-full font-bold flex-row space-x-2">
                <div className="border-2 border-yellow-70 w-1/2 flex justify-center bg-yellow-90 py-2 rounded-full cursor-pointer hover:bg-yellow-50">
                  <Inventory
                    custom={true}
                    text={"My Bags"}
                    isShowIcon={true}
                    styleCustom={
                      "flex justify-center items-center w-full text-[14px]"
                    }
                  />
                </div>
                <div className="w-1/2 flex justify-center bg-yellow-70 py-2 rounded-full">
                  {isLoadingAvatarShop && isLoadingThemeShop ? (
                    <Loading />
                  ) : (
                    <UserCoin coin={coinUser} />
                  )}
                </div>
              </div>

              <ItemBuy
                getAvatarShop={getAvatarShop}
                avatarUserShow={avatarUserShow}
                buyAvatar={buyAvatar}
                buyBackgroundAvatar={buyBackgroundAvatar}
                backgroundAvatarUser={backgroundAvatarUserShow}
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="flex lg:flex-row flex-col">
                <ShopMenu
                  menuList={menuList}
                  menuNow={menuNow}
                  setMenuNow={setMenuNow}
                />
                {menuNow === "ADD_COIN" && <ShopCheckOut />}

                {menuNow === "AVATAR" && (
                  <AvatarShop
                    isLoadingAvatarShop={isLoadingAvatarShop}
                    setIsloadingAvatarShop={setIsloadingAvatarShop}
                    avatarList={avatarList}
                    setAvatarUserShow={setAvatarUserShow}
                  />
                )}
                {menuNow === "BACKGROUND" && (
                  <BackgroundAvatarShop
                    isLoadingAvatarShop={isLoadingBackgroundAvatarShop}
                    setIsloadingAvatarShop={setIsloadingBackgroundAvatarShop}
                    avatarList={backgroundAvatarList}
                    setAvatarUserShow={setBackgroundAvatarUserShow}
                  />
                )}
                {menuNow === "THEME" && (
                  <ThemeShop
                    themeList={themeList}
                    isLoadingThemeShop={isLoadingThemeShop}
                    getThemeShop={getThemeShop}
                    setIsloadingThemeShop={setIsloadingThemeShop}
                    getCoin={getCoin}
                  />
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ShopPage;
