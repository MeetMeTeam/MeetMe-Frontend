import React, { useEffect, useRef, useState } from "react";
import AvatarPreview from "../../pages/MainPages/Inventory/AvatarPreview";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import * as api from "../../api";

const AvatarCard = (props) => {
  const avatarFetchCount = useSelector((state) => state.auth.avatarFetchCount);

  const [isLoadingAvatar, setIsloadingAvatar] = useState(true);
  const [avatarUserShow, setAvatarUserShow] = useState({});
  async function getAvatar() {
    if (props.userDataDetail?._id) {
      const response = await api.getAvatar(props.userDataDetail?._id);
      setAvatarUserShow(response?.data?.data);
      setIsloadingAvatar(false);
    }
  }

  useEffect(() => {
    getAvatar();
  }, [avatarFetchCount]);
  useEffect(() => {
    getAvatar();
    console.log(props.userDataDetail);
  }, [props.userDataDetail]);
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
          <AvatarPreview height="300" width="420" avatarUser={avatarUserShow} />
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
        <div className="font-bold text-[12px]">about me</div>
        <div className="text-[12px] h-[50px] w-[280px] break-words line-clamp-3">
          {props.userDataDetail?.bio}
        </div>
        <div className="flex  gap-2 flex-row mt-2">
          <div className="border bg-yellow-90 border-black rounded-md px-2 flex cursor-pointer flex-row gap-1 text-[10px] items-center">
            <FacebookIcon />
            nuttawat rodsomboon
          </div>
          <div className="border bg-yellow-90 border-black rounded-md px-2 flex cursor-pointer flex-row gap-1 text-[10px] items-center">
            <InstagramIcon />
            n.ntww
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCard;
