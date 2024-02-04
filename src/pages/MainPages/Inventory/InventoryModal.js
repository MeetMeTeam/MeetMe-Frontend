import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as api from "../../../api";
import { useSelector } from "react-redux";
import Loading from "../../../shared/components/Loading";
import AvatarPreview from "./AvatarPreview";
const InventoryModal = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [isLoadingAvatarList, setIsloadingAvatarList] = useState(true);
  const userDetail = useSelector((state) => state.auth.userDetails);
  const [avatarUser, setAvatarUser] = useState({});
  const [avatarUserNew, setAvatarUserNew] = useState(null);
  const [avatarList, setAvatarList] = useState([]);
  const [avatarUserShow, setAvatarUserShow] = useState({});

  async function getInventory() {
    const inventoryUser = await api.getInventory();
    const receivedAvatarList = inventoryUser.data.data;
    if (receivedAvatarList.length < 9) {
      const numberOfEmptyAvatars = 9 - receivedAvatarList.length;
      const updatedAvatarList = receivedAvatarList.concat(
        Array(numberOfEmptyAvatars).fill({})
      );
      setAvatarList(updatedAvatarList);
    } else {
      setAvatarList(receivedAvatarList);
    }
    setIsloadingAvatarList(false);
  }
  async function getAvatar() {
    const inventoryUser = await api.getAvatar(userDetail._id);
    await setAvatarUser(inventoryUser.data.data);
    await setAvatarUserShow(inventoryUser.data.data);
    setIsloadingAvatar(false);
  }

  async function changeAvatarPreview(item) {
    setAvatarUserNew(item);
    setAvatarUserShow(item);
  }

  async function changeAvatar() {
    setIsloadingAvatar(true);
    const response = await api.changeAvatar(avatarUserNew.id);
    console.log(response);
    setAvatarUserNew(null);
    getAvatar();
  }
  function cancelChange() {
    setAvatarUserNew(null);
    setAvatarUserShow(avatarUser);
  }
  useEffect(() => {
    getInventory();
    getAvatar();
  }, []);

  return (
    <div className="select-none flex flex-row p-4 space-x-4 bg-white absolute h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] bg-background-paper rounded-lg shadow-24 ">
      <div className="flex flex-col">
        {isLoadingAvatar ? (
          <div className="w-[400px] h-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <AvatarPreview avatarUser={avatarUserShow} />
        )}
        {avatarUserNew && (
          <div className="flex flex-row w-full justify-center mt-4 space-x-4">
            <div
              className="bg-green-80 px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => changeAvatar()}
            >
              เปลี่ยน
            </div>
            <div
              className="bg-red-80 px-4 py-2 rounded-lg cursor-pointer"
              onClick={() => cancelChange()}
            >
              ยกเลิก
            </div>
          </div>
        )}
      </div>

      {isLoadingAvatarList ? (
        <div className="w-[400px] flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {avatarList.map((item, index) => (
            <div
              key={index}
              onClick={() => changeAvatarPreview(item)}
              className="p-4 w-[150px] border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100"
            >
              {item.preview ? (
                <img
                  src={item.preview}
                  className="w-[100px] h-[70px] object-contain"
                  alt="block"
                />
              ) : (
                <span className="w-[100px] h-[70px]">empty</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryModal;
