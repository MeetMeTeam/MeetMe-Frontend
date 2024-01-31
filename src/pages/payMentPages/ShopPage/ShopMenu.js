/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

const ShopMenu = () => {
  return (
    <div className="w-full flex flex-col space-y-4 items-start bg-black/40 h-screen p-10 mx-6">
      <div className="text-[34px] ml-2 font-bold text-yellow-200">ร้านค้า</div>
      <div className="flex flex-row cursor-pointer">
        {" "}
        <img
          src={process.env.PUBLIC_URL + "/shopPage/coin_1.png"}
          className={" w-[40px]"}
          alt="coin"
        />
        <div className={" text-[20px] text-white font-medium "}>
          {" "}
          รับเหรียญ{" "}
        </div>
      </div>
      <div className="flex flex-row items-center pl-2 cursor-pointer">
        {" "}
        <img
          src={process.env.PUBLIC_URL + "/loginPage/nongRed.png"}
          className={" w-[20px] h-[20px] mr-3"}
          alt="coin"
        />
        <div className={" text-[20px] text-gray-500 font-medium "}>
          {" "}
          ร้านค้าตัวละคร{" "}
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;
