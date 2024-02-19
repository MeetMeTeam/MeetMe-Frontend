import React from "react";
import JoinRoomRandom from "./JoinRoomRandom";
import CreateRoom from "./CreateRoom";
import User from "./User";
import Notification from "./NotificationButton";
import { useParams, useHistory } from "react-router-dom";
import Inventory from "../Inventory/InventoryButton";
import { ShoppingBasket } from "lucide-react";
import UserCoin from "../../payMentPages/ShopPage/UserCoin";
export default function HeadBar() {
  const history = useHistory();

  return (
    <div className="mx-[2rem] pt-[1rem] flex flex-row justify-between space-x-4">
      <img
        alt="logo"
        className="w-[45px]"
        src={process.env.PUBLIC_URL + "/meetme_logo.svg"}
      />
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row items-center space-x-4">
          {/* <JoinRoomRandom/> */}

          <Inventory />
          <div
            onClick={() => history.push("/shop")}
            className=" bg-purple-70 text-white px-4 py-3 rounded-xl font-medium cursor-pointer"
          >
            <ShoppingBasket  className="button-shop"/>
          </div>
          <CreateRoom />
          <Notification />
          <div className="bg-yellow-70 px-4 py-3  rounded-full">
            <UserCoin />
          </div>
        </div>

        <div className="md:block">
          <User />
        </div>
      </div>
    </div>
  );
}
