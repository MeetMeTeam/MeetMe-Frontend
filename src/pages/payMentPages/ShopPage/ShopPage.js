/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ShopMenu from "./ShopMenu";
import UserCoin from "./UserCoin";
import ShopCheckOut from "./ShopCheckOut/ShopCheckOut";
import * as api from "../../../api";
import { Plus } from "lucide-react";

const ShopPage = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [coinUser, setCoinUser] = useState(0);
  async function getCoin() {
    const coinUser = await api.getCoin();
    setCoinUser(coinUser.data.data.coin);
  }
  useEffect(() => {
    getCoin();
  }, []);
  return (
    <div className=" bg-blue-90 min-h-screen select-none flex">
      <div className="w-1/6">
        <ShopMenu />
      </div>
      <div className="w-5/6">
        <div className="flex justify-end items-start px-10 py-10">
          <UserCoin />
        </div>
        <ShopCheckOut />
      </div>
    </div>
  );
};

export default ShopPage;
