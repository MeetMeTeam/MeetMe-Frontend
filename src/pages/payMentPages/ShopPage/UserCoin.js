/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import { Plus } from "lucide-react";

const UserCoin = () => {
  const [coinUser, setCoinUser] = useState(0);
  async function getCoin() {
    const coinUser = await api.getCoin();
    setCoinUser(coinUser.data.data.coin);
  }
  useEffect(() => {
    getCoin();
  }, []);
  return (
    <div className="relative flex flex-row items-center rounded-full  min-w-[70px]">
      {" "}
      <img
        src={
          "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F1.png?alt=media&token=3086c3ba-0513-4710-86d1-ebeb92389e00"
        }
        className={"mr-2 w-[20px]"}
        alt="coin"
      />
      <span className="text-black font-bold mr-8"> {coinUser} Coins</span>
      <div className="absolute right-1 rounded-full bg-white w-[20px] h-[20px] items-center flex justify-center">
        <Plus className="text-gray-40  w-[15px] " />
      </div>
    </div>
  );
};

export default UserCoin;
