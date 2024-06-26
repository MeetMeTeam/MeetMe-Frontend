import React, { useState, useEffect } from "react";
import GiftAction from "./Actions/Gift/GiftAction";
import CardTalkAction from "./Actions/CardTalk/CardTalkAtction";

const RoomAction = () => {
  return (
    <div className="bg-green-60 rounded-2xl p-4 h-[240px]">
      <div className="text-white text-[25px] font-bold"> Action </div>
      <div>
        <div className="flex flex-col gap-2">
          <GiftAction />
          <CardTalkAction />
        </div>
      </div>
    </div>
  );
};

export default RoomAction;
