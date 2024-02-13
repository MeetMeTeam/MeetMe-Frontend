/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";

const Item = (props) => {
  return (
    <div>
      <div
        onClick={() => props.setAvatarUserShow(props.avatarList)}
        className={
          "relative py-6 transition ease-in-out delay-100 hover:scale-110 cursor-pointer flex flex-col items-center justify-between bg-purple-70 rounded-xl " +
          (props.avatarList?.isOwner ? "opacity-50" : "")
        }
      >
        <div className="">
          {" "}
          <img
            src={props.avatarList.preview}
            className={"h-[115px] w-[200px] object-contain"}
            alt="coin"
          />{" "}
        </div>
      </div>
      <div className="font-medium flex flex-col  w-full  justify-center items-center py-2 rounded-b-xl text-black ">
        <span className="font-bold text-[22px]"> {props.avatarList.name} </span>
        <span className="font-bold flex">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F1.png?alt=media&token=3086c3ba-0513-4710-86d1-ebeb92389e00"
            }
            className={"mr-2 w-[20px]"}
            alt="coin"
          />
          <div> {props.avatarList.price}</div>
        </span>
      </div>
    </div>
  );
};

export default Item;
