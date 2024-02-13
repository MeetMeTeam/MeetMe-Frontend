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
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F1.png?alt=media&token=3086c3ba-0513-4710-86d1-ebeb92389e00",
    },
    {
      id: 2,
      coin: 300,
      price: 149,
      free: 30,
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F2.png?alt=media&token=7666b6f5-204e-446d-b3ec-46d6bb859f39",
    },
    {
      id: 3,
      coin: 980,
      price: 449,
      free: 110,
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F3.png?alt=media&token=66989ad7-e230-41c5-b9f7-831fc242f164",
    },
    {
      id: 4,
      coin: 1980,
      price: 889,
      free: 260,
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F4.png?alt=media&token=dcb030cf-9084-4706-bcb9-c923fd66c04c",
    },
    {
      id: 5,
      coin: 3280,
      price: 1600,
      free: 600,
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F5.png?alt=media&token=a47c4919-eb0a-43ca-b64b-e982d95f64cf",
    },
    {
      id: 5,
      coin: 6480,
      price: 3000,
      free: 1600,
      img: "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F6.png?alt=media&token=2048afe1-b69d-4400-afe6-b19620168fd2",
    },
  ];
  return (
    <div className="bg-purple-80  rounded-2xl lg:h-[620px]  w-[930px] p-10">
      <div className="flex flex-wrap gap-4">
        {packageItem.map((item) => (
          <CheckOutItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopCheckOut;
