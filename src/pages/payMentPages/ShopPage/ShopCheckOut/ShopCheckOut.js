/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import CheckOutItem from "./CheckOutItem";
const ShopCheckOut = () => {
  let packageItem = [
    {
      id: 1,
      coin: 60,
      price: 29,
      free: 0,
      img: process.env.PUBLIC_URL + "/shopPage/coin_1",
    },
    {
      id: 2,
      coin: 300,
      price: 149,
      free: 30,
      img: process.env.PUBLIC_URL + "/shopPage/coin_2",
    },
    {
      id: 3,
      coin: 980,
      price: 449,
      free: 110,
      img: process.env.PUBLIC_URL + "/shopPage/coin_3",
    },
    {
      id: 4,
      coin: 1980,
      price: 889,
      free: 260,
      img: process.env.PUBLIC_URL + "/shopPage/coin_4",
    },
    {
      id: 5,
      coin: 3280,
      price: 1600,
      free: 600,
      img: process.env.PUBLIC_URL + "/shopPage/coin_5",
    },
    {
      id: 6,
      coin: 6480,
      price: 3000,
      free: 1600,
      img: process.env.PUBLIC_URL + "/shopPage/coin_6",
    },
  ];
  return (
    <div className="bg-purple-80 lg:mt-0 mt-4 rounded-2xl lg:h-[620px] h-[400px] overflow-auto lg:w-[930px] w-[450px] lg:p-10">
      <div className="flex flex-wrap gap-4">
        {packageItem.map((item) => (
          <CheckOutItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopCheckOut;
