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
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [themeList, setThemeList] = useState([]);
  const [menu, setMenu] = useState("avatar");

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

  async function changeAvatarPreview(item) {
    if (item.preview && avatarUser.id !== item.id) {
      setAvatarUserNew(item);
      setAvatarUserShow(item);
    }
  }

  async function changeAvatar() {
    setIsloadingAvatar(true);
    const response = await api.changeAvatar(avatarUserNew.id);
    dispatch(setAvatarFetchCount(1));
    setAvatarUserNew(null);
    getAvatar();
  }
  function cancelChange() {
    setAvatarUserNew(null);
    setAvatarUserShow(avatarUser);
  }
  useEffect(() => {
    getInventoryAvatar();
    getInventoryTheme();
    getAvatar();
  }, []);

  return (
    <div className="select-none px-6 p-4  bg-purple-90 absolute w-[820px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg shadow-24 ">
      <div className="font-bold text-[26px] text-purple-10 mb-2">My Bags</div>
      <div className="flex flex-row h-full space-x-6">
        <div
          className={
            "flex flex-col relative rounded-2xl " +
            (isLoadingAvatar ? "" : "bg-white")
          }
        >
          {isLoadingAvatar ? (
            <div className="w-[300px] h-[400px]  flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <AvatarPreview avatarUser={avatarUserShow} />
          )}
          {avatarUserNew && (
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
            <div className="mb-4 flex gap-4 rounded-xl  ring-white ">
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
                onClick={() => setMenu("theme")}
                className={
                  "px-8 cursor-pointer rounded-3xl py-4 " +
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
