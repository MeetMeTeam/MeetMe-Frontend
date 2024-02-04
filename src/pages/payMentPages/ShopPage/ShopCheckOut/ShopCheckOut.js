/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import CheckOutItem from "./CheckOutItem";

const ShopCheckOut = () => {
  let packageItem = [
    { id: 1, coin: 60, price: 29, free: 0 },
    { id: 2, coin: 300, price: 149, free: 30 },
    { id: 3, coin: 980, price: 449, free: 110 },
    { id: 4, coin: 1980, price: 889, free: 260 },
    { id: 5, coin: 3280, price: 1600, free: 600 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
      {packageItem.map((item) => (
        <CheckOutItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ShopCheckOut;
