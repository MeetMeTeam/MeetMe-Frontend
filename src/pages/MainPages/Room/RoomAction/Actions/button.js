import React, { useState, useEffect } from "react";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { propTypeChildren } from "@material-tailwind/react/types/components/timeline";

const Button = (props) => {
  return (
    <div onClick={props.Click}>
      <div className="text-white gap-2 bg-green-70 rounded-2xl min-w-[320px] items-center flex py-4 px-6 cursor-pointer">
        {props.icon}
        <div className="flex flex-col">
          <span className="text-[20px] mb-[-5px] font-bold">{props.name}</span>
          <span className="text-[14px]">{props.des}</span>
        </div>
      </div>
    </div>
  );
};

export default Button;
