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
import Inventory from "../MainPages//Inventory/InventoryButton";
import ItemBuy from "./ShopPage/ItemBuy";
const ShopPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [coinUser, setCoinUser] = useState(0);
  const [avatarUser, setAvatarUser] = useState({});
  const [avatarUserNew, setAvatarUserNew] = useState(null);
  const [avatarList, setAvatarList] = useState([]);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [isLoadingAvatarShop, setIsloadingAvatarShop] = useState(true);

  const userDetail = useSelector((state) => state.auth.userDetails);
  const menuList = [
    { name: "ตัวละคร", menu: "AVATAR" },
    { name: "รับ Flower", menu: "ADD_COIN" },
  ];
  const [menuNow, setMenuNow] = useState("AVATAR");

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

  async function getAvatarShop() {
    setIsloadingAvatarShop(true);
    const AvatarShop = await api.getAvatarShop();
    console.log(AvatarShop?.data?.data);
    if (AvatarShop) {
      await setAvatarList(AvatarShop?.data?.data);
      setIsloadingAvatarShop(false);
    }
  }

  async function buyAvatar() {
    console.log(avatarUserShow);
    const data = {
      item_id: avatarUserShow.id,
      item_type: "avatar",
    };
    const response = await api.buyAvatar(data);

    if (response.status === 200) {
      getAvatarShop();
      return response;
    } else {
      return response;
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
    }
  }, []);

  return (
    <div className="scale-95  relative justify-center w-screen  bg-purple-90 p-10 md:space-y-0 space-y-4  min-h-screen select-none flex md:flex-row flex-col">
      <div
        onClick={() => history.push("/")}
        className="absolute top-4 left-4 bg-purple-70 text-white px-4 py-2 rounded-3xl font-medium cursor-pointer"
      >
        {"<-"}
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
            <AvatarPreview height="500" avatarUser={avatarUserShow} />
          )}
        </div>
        <div className="flex w-full font-bold flex-row space-x-2">
          <div className="border-2 border-yellow-70 w-1/2 flex justify-center bg-yellow-90 py-2 rounded-full cursor-pointer hover:bg-yellow-50">
            <Inventory
              custom={true}
              text={"กระเป๋า"}
              isShowIcon={true}
              styleCustom={
                "flex justify-center items-center w-full text-[14px]"
              }
            />
          </div>
          <div className="w-1/2 flex justify-center bg-yellow-70 py-2 rounded-full">
            {isLoadingAvatarShop ? <Loading /> : <UserCoin />}
          </div>
        </div>

        <ItemBuy
          getAvatarShop={getAvatarShop}
          avatarUserShow={avatarUserShow}
          buyAvatar={buyAvatar}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row">
          <ShopMenu
            menuList={menuList}
            menuNow={menuNow}
            setMenuNow={setMenuNow}
          />
          {menuNow === "ADD_COIN" && <ShopCheckOut />}

          {menuNow === "AVATAR" && (
            <AvatarShop
              isLoadingAvatarShop={isLoadingAvatarShop}
              avatarList={avatarList}
              setAvatarUserShow={setAvatarUserShow}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
