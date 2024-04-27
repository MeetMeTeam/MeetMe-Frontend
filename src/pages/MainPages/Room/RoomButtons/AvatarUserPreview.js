import React, { useState, useEffect } from "react";
import AvatarPreview from "../../Inventory/AvatarPreview";
import * as api from "../../../../api";
import Loading from "../../../../shared/components/Loading";

export default function AvatarUserPreview({ id }) {
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [backgroundAvatarUser, setBackgroundAvatarUser] = useState({});
  const [backgroundAvatarUserShow, setBackgroundAvatarUserShow] = useState({});
  const [isLoadingBackgroundAvatar, setIsloadingBackgroundAvatar] =
    useState(true);
  async function getAvatar() {
    const response = await api.getAvatar(id);
    setAvatarUserShow(response?.data?.data);
    setIsloadingAvatar(false);
  }

  async function getBackgroundAvatar() {
    const inventoryUser = await api.getBackgroundAvatar(id);
    if (inventoryUser) {
      console.log(inventoryUser);
      await setBackgroundAvatarUser(inventoryUser?.data?.data.preview);
      await setBackgroundAvatarUserShow(inventoryUser?.data?.data.preview);
      setIsloadingBackgroundAvatar(false);
    }
  }

  useEffect(() => {
    getAvatar();
    getBackgroundAvatar();
  }, []);

  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newZoom = windowWidth;

      setZoom(newZoom);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(zoom);
  }, [zoom]);
  return (
    <div>
      {" "}
      <div
        className={
          "flex flex-col  rounded-2xl " + (isLoadingAvatar ? "" : "bg-white")
        }
      >
        {isLoadingAvatar ? (
          <div className="  flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <AvatarPreview
            height="280"
            width={zoom < 850 ? "250" : "400"}
            avatarUser={avatarUserShow}
            backgroundAvatarUser={backgroundAvatarUserShow}
          />
        )}
      </div>
    </div>
  );
}
