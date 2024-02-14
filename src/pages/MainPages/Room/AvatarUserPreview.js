import React, { useState, useEffect } from "react";
import AvatarPreview from "../Inventory/AvatarPreview";
import * as api from "../../../api";
import Loading from "../../../shared/components/Loading";

export default function AvatarUserPreview({ id }) {
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});

  async function getAvatar() {
    const response = await api.getAvatar(id);
    setAvatarUserShow(response?.data?.data);
    setIsloadingAvatar(false);
  }

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <div>
      {" "}
      <div
        className={
          "flex flex-col  rounded-2xl " + (isLoadingAvatar ? "" : "bg-white")
        }
      >
        {isLoadingAvatar ? (
          <div className="w-[300px] h-[400px]  flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <AvatarPreview avatarUser={avatarUserShow} />
        )}
      </div>
    </div>
  );
}
