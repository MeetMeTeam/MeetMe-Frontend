/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Loading from "../../../../shared/components/Loading";
import ThemeItem from "./ThemeItem";

const ThemeShop = (props) => {
  return (
    <div className="bg-purple-80 flex   rounded-2xl lg:h-[620px]  w-[930px] p-10">
      {props.isLoadingAvatarShop ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-4">
          {props.themeList.map((item, index) => (
            <ThemeItem
              ley={index}
              item={item}
              getThemeShop={props.getThemeShop}
              isLoadingThemeShop={props.isLoadingThemeShop}
              setIsloadingThemeShop={props.setIsloadingThemeShop}
              getCoin={props.getCoin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeShop;
