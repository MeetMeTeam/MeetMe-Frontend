/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Loading from "../../../../shared/components/Loading";
import ItemAvatar from "./ItemAvatar";
const AvatarShop = (props) => {
  return (
    <div className="bg-purple-80 flex items-center justify-center  rounded-2xl lg:h-[620px]  w-[930px] p-10">
      {props.isLoadingAvatarShop ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-4">
          {props.avatarList.map((item, index) => (
            <ItemAvatar
              key={index}
              avatarList={item}
              setAvatarUserShow={props.setAvatarUserShow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarShop;
