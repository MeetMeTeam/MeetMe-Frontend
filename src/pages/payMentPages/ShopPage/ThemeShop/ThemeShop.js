/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Loading from "../../../../shared/components/Loading";
import ThemeItem from "./ThemeItem";

const ThemeShop = (props) => {
  return (
    <div className="bg-purple-80 lg:mt-0 mt-4 rounded-2xl lg:h-[620px] h-[400px] overflow-auto lg:w-[930px] w-[450px] lg:p-10">
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
