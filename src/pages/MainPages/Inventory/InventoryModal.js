import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as api from "../../../api";
import { useSelector } from "react-redux";
import Loading from "../../../shared/components/Loading";
import AvatarPreview from "./AvatarPreview";
import { setAvatarFetchCount } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";
import AvatarItem from "./AvatarItem";
import ThemeItem from "./ThemeItem";
import BackgroundItem from "./backgroundItem";

const InventoryModal = () => {
  const dispatch = useDispatch();

  const { slug } = useParams();
  const history = useHistory();
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [isLoadingAvatarList, setIsloadingAvatarList] = useState(true);

  const userDetail = useSelector((state) => state.auth.userDetails);
  const [avatarUser, setAvatarUser] = useState({});
  const [avatarUserNew, setAvatarUserNew] = useState(null);
  const [avatarList, setAvatarList] = useState([]);
  const [backgroundList, setBackgroundList] = useState([]);
  const [backgroundUserNew, setBackgroundUserNew] = useState(null);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [themeList, setThemeList] = useState([]);
  const [menu, setMenu] = useState("avatar");
  const [backgroundAvatarUser, setBackgroundAvatarUser] = useState({});
  const [backgroundAvatarUserShow, setBackgroundAvatarUserShow] = useState({});
  const [isLoadingBackgroundAvatar, setIsloadingBackgroundAvatar] =
    useState(true);
  async function getInventoryAvatar() {
    const inventoryUser = await api.getInventory("avatar");
    const receivedAvatarList = inventoryUser.data.data;
    if (receivedAvatarList.length < 9) {
      const numberOfEmptyAvatars = 9 - receivedAvatarList.length;
      const updatedAvatarList = receivedAvatarList.concat(
        Array(numberOfEmptyAvatars).fill({})
      );
      setAvatarList(updatedAvatarList);
    } else {
      setAvatarList(receivedAvatarList);
    }
    setIsloadingAvatarList(false);
  }

  // useEffect(() => {
  //   setBackgroundUserNew(backgroundAvatarUserShow);
  // }, [backgroundAvatarUserShow]);
  async function getInventoryBackground() {
    const inventoryUser = await api.getInventory("bg");
    const receivedAvatarList = inventoryUser.data.data;
    if (receivedAvatarList.length < 9) {
      const numberOfEmptyAvatars = 9 - receivedAvatarList.length;
      const updatedAvatarList = receivedAvatarList.concat(
        Array(numberOfEmptyAvatars).fill({})
      );
      setBackgroundList(updatedAvatarList);
    } else {
      setBackgroundList(receivedAvatarList);
    }
    setIsloadingAvatarList(false);
  }

  async function getInventoryTheme() {
    const inventoryUser = await api.getInventory("theme");
    const receivedAvatarList = inventoryUser.data.data;
    if (receivedAvatarList.length < 9) {
      const numberOfEmptyAvatars = 9 - receivedAvatarList.length;
      const updatedAvatarList = receivedAvatarList.concat(
        Array(numberOfEmptyAvatars).fill({})
      );
      setThemeList(updatedAvatarList);
    } else {
      setThemeList(receivedAvatarList);
    }
  }

  async function getAvatar() {
    const inventoryUser = await api.getAvatar(userDetail._id);
    await setAvatarUser(inventoryUser?.data?.data);
    await setAvatarUserShow(inventoryUser?.data?.data);
    setIsloadingAvatar(false);
  }

  async function getBackgroundAvatar(id) {
    const inventoryUser = await api.getBackgroundAvatar(userDetail._id);
    if (inventoryUser) {
      console.log(inventoryUser);
      await setBackgroundAvatarUser(inventoryUser?.data?.data.preview);
      await setBackgroundAvatarUserShow(inventoryUser?.data?.data.preview);
      setIsloadingBackgroundAvatar(false);
    }
  }

  async function changeAvatarPreview(item) {
    if (item.preview && avatarUser.id !== item.id) {
      setAvatarUserNew(item);
      setAvatarUserShow(item);
    }
  }
  async function changeBackgroundPreview(item) {
    if (item.preview && backgroundAvatarUser.id !== item.id) {
      setBackgroundUserNew(item);
      setBackgroundAvatarUserShow(item);
    }
  }
  async function changeAvatar() {
    setIsloadingAvatar(true);
    if (avatarUserNew) {
      const response = await api.changeAvatar(avatarUserNew.id);
    }
    if (backgroundUserNew) {
      console.log(backgroundUserNew);
      const response2 = await api.changeBackground(backgroundUserNew.id);
    }

    dispatch(setAvatarFetchCount(1));
    setAvatarUserNew(null);
    setBackgroundUserNew(null);
    getAvatar();
  }
  function cancelChange() {
    setAvatarUserNew(null);
    setAvatarUserShow(avatarUser);
  }
  useEffect(() => {
    getInventoryAvatar();
    getInventoryBackground();
    getInventoryTheme();
    getBackgroundAvatar();
    getAvatar();
  }, []);

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newZoom = windowWidth / 550;

      if (windowWidth < 700) {
        setZoom(newZoom);
      } else {
        setZoom(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{ zoom: zoom }}
      className="select-none px-6 p-4  bg-purple-90 absolute w-[400px] md:w-[820px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg shadow-24 "
    >
      <div className="font-bold text-[26px] text-purple-10 mb-2">My Bags</div>
      <div className="flex flex-col md:flex-row h-full space-x-6">
        <div
          className={
            "flex flex-col items-center relative rounded-2xl " +
            (isLoadingAvatar ? "" : "bg-white")
          }
        >
          {isLoadingAvatar ? (
            <div className="w-[300px] h-[400px]  flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <AvatarPreview
              height={"100"}
              width={"290"}
              backgroundAvatarUser={
                backgroundAvatarUserShow?.preview || backgroundAvatarUserShow
              }
              avatarUser={avatarUserShow}
            />
          )}
          {(avatarUserNew || backgroundUserNew) && (
            <div className="absolute bottom-5 font-bold text-white flex flex-row w-full justify-center mt-4 space-x-2">
              <div
                className="bg-red-70 px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => cancelChange()}
              >
                Cancel
              </div>
              <div
                className="bg-green-70 px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => changeAvatar()}
              >
                Save
              </div>
            </div>
          )}
        </div>
        {isLoadingAvatarList ? (
          <div className="w-[400px] h-[400px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            <div className="mb-4 mt-4 flex  text-[12px] flex-wrap gap-4 rounded-xl  ring-white ">
              <div
                onClick={() => setMenu("avatar")}
                className={
                  "px-8 cursor-pointer py-4 rounded-3xl " +
                  (menu === "avatar"
                    ? "bg-purple-80   text-purple-30 font-bold"
                    : " bg-purple-80/40 text-purple-30 ")
                }
              >
                Avatar
              </div>
              <div
                onClick={() => setMenu("background")}
                className={
                  "px-8 cursor-pointer rounded-3xl py-4 " +
                  (menu === "background"
                    ? "bg-purple-80   text-purple-30 font-bold"
                    : " bg-purple-80/40 text-purple-30 ")
                }
              >
                background
              </div>
              <div
                onClick={() => setMenu("theme")}
                className={
                  "px-8 cursor-pointer rounded-3xl py-4 text-[14px] " +
                  (menu === "theme"
                    ? "bg-purple-80   text-purple-30 font-bold"
                    : " bg-purple-80/40 text-purple-30 ")
                }
              >
                Theme Room
              </div>
            </div>
            <div>
              {menu === "avatar" && (
                <AvatarItem
                  avatarList={avatarList}
                  changeAvatarPreview={changeAvatarPreview}
                />
              )}
              {menu === "theme" && <ThemeItem avatarList={themeList} />}
              {menu === "background" && (
                <BackgroundItem
                  avatarList={backgroundList}
                  changeAvatarPreview={changeBackgroundPreview}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
