import React from "react";
import JoinRoomRandom from "./JoinRoomRandom";
import CreateRoom from "./CreateRoom/CreateRoom";
import User from "./User";
import Notification from "./NotificationButton";
import { useParams, useHistory } from "react-router-dom";
import Inventory from "../Inventory/InventoryButton";
import { ShoppingBasket } from "lucide-react";
import UserCoin from "../../payMentPages/ShopPage/UserCoin";
import FriendsSideBar from "../FriendsSideBar/FriendsSideBar";
import ShopPage from "../../../pages/payMentPages/shop-page";
export default function HeadBar() {
  const history = useHistory();

  return (
    <div className="mx-[2rem] pt-[1rem] flex flex-row  md:justify-between space-x-4">
      <img
        alt="logo"
        className="w-[45px] md:block hidden"
        src={process.env.PUBLIC_URL + "/meetme_logo.svg"}
      />
      <div className="flex flex-row md:space-x-4">
        <div className="flex space-x-2 flex-wrap items-center md:space-x-4">
          <ShopPage />
          <CreateRoom />
          <FriendsSideBar />
          <Notification />
          <div className="bg-yellow-70 px-4 py-3  rounded-full">
            <UserCoin />
          </div>
          <User />
        </div>

        {/* <div className="md:block">
        
        </div> */}
      </div>
    </div>
  );
}
