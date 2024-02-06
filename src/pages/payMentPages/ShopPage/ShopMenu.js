/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const ShopMenu = () => {
  const history = useHistory();

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="bg-purple-70 rounded-l-full px-4 text-white font-medium py-2 truncate">
        รับ flower
      </div>
      <div className="bg-purple-70 rounded-l-full px-4 text-white font-medium py-2 truncate">
        ตัวละคร
      </div>
    </div>
  );
};

export default ShopMenu;
