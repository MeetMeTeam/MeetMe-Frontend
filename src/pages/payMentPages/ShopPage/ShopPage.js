/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ShopMenu from "./ShopMenu";
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
        <div className="flex justify-end items-start px-6 py-6">
          <div className="relative bg-gray-40 flex flex-row items-center rounded-full  min-w-[70px]">
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/shopPage/coin_1.png"}
              className={" w-[40px]"}
              alt="coin"
            />
            <span className="text-white font-bold mr-8"> {coinUser}</span>
            <div className="absolute right-1 rounded-full bg-white w-[20px] h-[20px] items-center flex justify-center">
              <Plus className="text-gray-40  w-[15px] " />
            </div>
          </div>
        </div>
        <ShopCheckOut />
      </div>
    </div>
  );
};

export default ShopPage;
