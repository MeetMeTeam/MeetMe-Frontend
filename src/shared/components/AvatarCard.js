import React, { useEffect, useRef, useState } from "react";
import AvatarPreview from "../../pages/MainPages/Inventory/AvatarPreview";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import * as api from "../../api";
import * as apiPayment from "../../apiPayment";

const AvatarCard = (props) => {
  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);

  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  const [giftList, setGiftList] = useState([]);
  const [backgroundAvatarUser, setBackgroundAvatarUser] = useState({});
  const [backgroundAvatarUserShow, setBackgroundAvatarUserShow] = useState({});
  async function getBackgroundAvatar(id) {
    if (props.userDataDetail?._id) {
      const inventoryUser = await api.getBackgroundAvatar(
        props.userDataDetail?._id
      );
      if (inventoryUser) {
        console.log(inventoryUser);
        await setBackgroundAvatarUser(inventoryUser?.data?.data.preview);
        await setBackgroundAvatarUserShow(inventoryUser?.data?.data.preview);
      }
    }
  }

  async function getAvatar() {
    if (props.userDataDetail?._id) {
      const response = await api.getAvatar(props.userDataDetail?._id);
      setAvatarUserShow(response?.data?.data);
      setIsloadingAvatar(false);
    }
  }

  async function getGift() {
    const response = await apiPayment.getUserGift(props.userDataDetail?._id);
    if (response.status === 200) {
      setGiftList(response?.data?.data);
    }
  }

  useEffect(() => {
    getAvatar();
    getBackgroundAvatar();
  }, [avatarFetchCount]);
  useEffect(() => {
    getAvatar();
    getBackgroundAvatar();
  }, [props.userDataDetail]);

  useEffect(() => {
    getGift();
  }, []);
  return (
    <div
      className={
        "bg-blue-80 w-[350px] h-[435px] flex justify-center relative rounded-2xl " +
        (props.scale ? ` scale-${props.scale}` : "")
      }
    >
      <div
        className={
          "flex flex-col  absolute top-[-25px] scale-75 rounded-2xl " +
          (isLoadingAvatar ? "" : "bg-white")
        }
      >
        {isLoadingAvatar ? (
          <div className="absolute top-40 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <AvatarPreview
            width="420"
            avatarUser={avatarUserShow}
            backgroundAvatarUser={
              backgroundAvatarUserShow?.preview || backgroundAvatarUserShow
            }
          />
        )}
      </div>
      <div className="absolute text-blue-20 flex flex-col px-4 py-2 top-[250px] bg-blue-90 w-[310px] rounded-xl h-[170px]  ring-white ring">
        <div className="text-[18px] mt-[-5px] font-bold">
          {props.userDataDetail?.displayName}
        </div>
        <div className="text-[12px] mt-[-2px] ">
          {" "}
          {props.userDataDetail?.username}
        </div>
        <hr className="my-1"></hr>
        <div className="font-bold text-[12px]">About Me</div>
        <div className="text-[12px] h-[50px] w-[280px] break-words line-clamp-3">
          {props.userDataDetail?.bio}
        </div>

        <div className="font-bold text-[12px]">Gifts</div>

        <div className="flex  gap-2 flex-row mt-2">
          {giftList.map((item) => {
            return (
              <div className="border bg-yellow-90 border-black rounded-md px-2 flex flex-row gap-1 text-[10px] items-center">
                <img src={item.img} width={"15px"} alt="gift" />
                {item.amount}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
