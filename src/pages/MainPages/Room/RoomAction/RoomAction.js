import React, { useState, useEffect } from "react";
import GiftAction from "./Actions/Gift/GiftAction";
const RoomAction = () => {
  return (
    <div className="bg-green-60 rounded-2xl p-4 h-[230px]">
      <div className="text-white text-[25px] font-bold"> Action </div>
      <div>
        <div>
          <GiftAction />
        </div>
      </div>
    </div>
  );
};

export default RoomAction;
