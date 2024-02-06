/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ShopMenu from "./ShopMenu";
import UserCoin from "./UserCoin";
import ShopCheckOut from "./ShopCheckOut/ShopCheckOut";
import * as api from "../../../api";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import AvatarPreview from "../../MainPages/Inventory/AvatarPreview";
import Loading from "../../../shared/components/Loading";
import { logout } from "../../../shared/utils/auth";
import { setUserDetails } from "../../../store/actions/authActions";
import store from "../../../store/store";

const ShopPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [coinUser, setCoinUser] = useState(0);
  const [avatarUser, setAvatarUser] = useState({});
  const [avatarUserNew, setAvatarUserNew] = useState(null);
  const [avatarList, setAvatarList] = useState([]);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const userDetail = useSelector((state) => state.auth.userDetails);

  async function getCoin() {
    const coinUser = await api.getCoin();
    setCoinUser(coinUser.data.data.coin);
  }

  async function getAvatar(id) {
    const inventoryUser = await api.getAvatar(id);
    console.log(inventoryUser);
    if (inventoryUser) {
      await setAvatarUser(inventoryUser?.data?.data);
      await setAvatarUserShow(inventoryUser?.data?.data);
      setIsloadingAvatar(false);
    }
  }

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      store.dispatch(setUserDetails(JSON.parse(userDetails)));
      getCoin();
      getAvatar(JSON.parse(userDetails)._id);
    }
  }, []);

  return (
    <div className="relative  bg-purple-90 p-10 md:space-y-0 space-y-4  min-h-screen select-none flex md:flex-row flex-col">
      <div
        onClick={() => history.push("/")}
        className="absolute top-2 left-2 bg-purple-70 text-white px-4 py-2 rounded-3xl font-medium cursor-pointer"
      >
        {"<-"}
      </div>
      <div className="md:w-2/6 px-6 flex flex-col space-y-4 ">
        <div
          className={
            "flex flex-col items-center w-full h-[80%] justify-center rounded-2xl " +
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
        </div>
        <div className="flex w-full font-bold flex-row space-x-2">
          <div className="border-2 border-yellow-70 w-1/2 flex justify-center bg-yellow-90 py-2 rounded-full">
            กระเป๋า
          </div>
          <div className="w-1/2 flex justify-center bg-yellow-70 py-2 rounded-full">
            <UserCoin />
          </div>
        </div>
        <div className="font-bold bg-purple-50 py-2 rounded-full w-full text-white flex justify-center">
          Buy
        </div>
      </div>
      <div className="md:w-5/6 flex flex-row ">
        <ShopMenu />
        <ShopCheckOut />
      </div>
    </div>
  );
};

export default ShopPage;
