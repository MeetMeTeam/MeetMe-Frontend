import React, { useState, useEffect } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const ThemeSelect = (props) => {
  function right() {
    const length = props.themeList.length;
    console.log(length);
    console.log(props.theme.index);
    if (length - 1 !== props.theme.index) {
      props.setTheme(props.themeList[props.theme.index + 1]);
    } else {
      props.setTheme(props.themeList[0]);
    }
  }

  function left() {
    const length = props.themeList.length;
    if (props.theme.index !== 0) {
      props.setTheme(props.themeList[props.theme.index - 1]);
    } else {
      props.setTheme(props.themeList[length - 1]);
    }
  }

  return (
    <div>
      <div className="text-purple-40 text-[12px]">Theme room</div>
      <div className="relative w-[400px] h-[250px]">
        <img
          src={props.theme.link}
          className="rounded-2xl w-full h-full object-cover opacity-80"
          alt="bg"
        />
        <KeyboardArrowLeftIcon
          onClick={() => left()}
          sx={{ fontSize: "43px" }}
          className="absolute left-0 top-1/2 text-white cursor-pointer transform -translate-y-1/2"
        />
        <ChevronRightIcon
          onClick={() => right()}
          sx={{ fontSize: "43px" }}
          className="absolute right-0 top-1/2 text-white cursor-pointer  transform -translate-y-1/2"
        />
        <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[24px]">
          {props.theme.name}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelect;
