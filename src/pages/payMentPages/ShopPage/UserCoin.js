/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import { Plus } from "lucide-react";
import { useParams, useHistory } from "react-router-dom";

const UserCoin = (props) => {
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
    <div className="relative flex flex-row items-center rounded-full   min-w-[70px]">
      {" "}
      <img
        src={
          "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
        }
        className={"mr-2 w-[20px]"}
        alt="coin"
      />
      <span className="text-black font-bold text-[10px] mr-8">
        {" "}
        {props.coin ? props.coin : coinUser}
      </span>
      {props.hidePlus ? (
        <div></div>
      ) : (
        <div className="absolute right-1 rounded-full bg-white w-[20px] h-[20px] items-center flex justify-center">
          <Plus
            onClick={() => history.push("/shop")}
            className="text-gray-40  w-[15px] cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default UserCoin;
