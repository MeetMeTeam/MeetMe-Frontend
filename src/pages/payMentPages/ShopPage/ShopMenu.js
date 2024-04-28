/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const ShopMenu = (props) => {
  return (
    <div className="flex flex-col space-y-4 mt-4">
      {props.menuList.map((item, index) => (
        <div
          key={index}
          onClick={() => props.setMenuNow(item.menu)}
          className={
            "lg:rounded-l-full rounded-lg px-4 font-medium py-2 truncate cursor-pointer " +
            (item.menu === props.menuNow
              ? "text-purple-40 bg-purple-80"
              : "text-purple-90 bg-purple-70")
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default ShopMenu;
