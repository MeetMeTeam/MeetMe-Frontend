/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Loading from "../../../../shared/components/Loading";
import ItemAvatar from "./ItemAvatar";
const AvatarShop = (props) => {
  return (
    <div className="bg-purple-80 lg:mt-0 mt-4 rounded-2xl lg:h-[620px] h-[400px] overflow-x-hidden overflow-auto lg:w-[930px] w-[450px] lg:p-10">
      {props.isLoadingAvatarShop ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-2 lg:w-[1030px] w-[500px] overflow-auto">
          {props.avatarList.map((item, index) => (
            <ItemAvatar
              key={index}
              avatarList={item}
              setAvatarUserShow={props.setAvatarUserShow}
              setIsloadingAvatarShop={props.setIsloadingAvatarShop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarShop;
