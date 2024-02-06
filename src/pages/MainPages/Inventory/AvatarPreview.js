import React, { useState, useEffect } from "react";
import * as api from "../../../api";
import { useSelector } from "react-redux";

const AvatarPreview = (prop) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % prop.avatarUser.assets.length
      );
    }, 200);

    return () => clearInterval(intervalId);
  }, [prop.avatarUser.assets]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[300px] h-[300px] flex flex-col justify-center items-center">
        <img
          src={prop.avatarUser.assets[currentImageIndex]}
          className="w-[245px] h-[280px] object-contain scale-75"
          alt="avatar"
        />
      </div>

      <div>{prop.avatarUser.name} </div>
    </div>
  );
};

export default AvatarPreview;

// assets
// :
// (4) ['https://firebasestorage.googleapis.com/v0/b/meetme…=media&token=22e88970-e96e-4cff-8a45-7e7b118257f1', 'https://firebasestorage.googleapis.com/v0/b/meetme…=media&token=5f1669f4-9cd8-4587-9ea7-2f71d90d6607', 'https://firebasestorage.googleapis.com/v0/b/meetme…=media&token=cb2e0e7a-5b84-4863-8c23-cc4098b4f488', 'https://firebasestorage.googleapis.com/v0/b/meetme…=media&token=a45b54d8-cbb0-440f-b38a-5c3ccbd8e1ca']
// name
// :
// "Green Circle"
// preview
// :
// "https://firebasestorage.googleapis.com/v0/b/meetme-
