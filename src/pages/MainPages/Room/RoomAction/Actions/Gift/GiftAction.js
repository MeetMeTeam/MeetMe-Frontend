import React, { useState, useEffect } from "react";
import Button from "../button";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import GiftAnimation from "../../../../../../shared/components/GiftAnimation";
import * as socketConnection from "../../../../../../realtimeCommunication/socketConnection";
import * as apiPayment from "../../../../../../apiPayment";
import * as api from "../../../../../../api";
import UserCoin from "../../../../../payMentPages/ShopPage/UserCoin";
import Loading from "../../../../../../shared/components/LoadingPage";
import { makeStyles } from "@mui/styles";

const gift = [
  {
    id: 1,
    name: "gift1",
    size: "w-[30px]",
    price: 10,
    img: "https://static.vecteezy.com/system/resources/previews/010/263/595/non_2x/christmas-gift-design-on-a-transparent-background-round-gift-box-design-with-pink-color-wrap-paper-and-golden-color-ribbon-gift-image-for-birthdays-anniversaries-weddings-or-christmas-events-free-png.png",
  },
  {
    id: 2,
    name: "gift1",
    size: "w-[50px]",
    price: 10,
    img: "https://storage.streamdps.com/iblock/13e/13e5b040286e1eb50502af4539441cce/f82b75d67c3e4553d278404babdf91e2.webp",
  },
  {
    id: 3,
    name: "gift1",
    price: 10,
    size: "w-[70px]",
    img: "https://storage.streamdps.com/iblock/364/3640905e132905eb2b0ff64a068db337/fcb80819257fb17f881eeb85b3a0b0d2.png",
  },
  {
    id: 4,
    name: "gift1",
    price: 10,
    size: "w-[80px]",
    img: "https://storage.streamdps.com/iblock/f59/f5902abbd13178017285a308606fd0dd/cf6a40558018965a8171cf5a575dd9de.png",
  },
  {
    id: 5,
    name: "gift1",
    size: "w-[110px]",
    price: 10,
    img: "https://storage.streamdps.com/iblock/21d/21de8189873fc8550b8f19501effab4f/0be54b4cf3e40c52fca6be3f71220d69.png",
  },
  {
    id: 6,
    name: "gift1",
    size: "w-[150px]",
    price: 10,
    img: "https://storage.streamdps.com/iblock/f28/f2886812bc78d33eab9d70e86b665753/b97d8bfa0bc6d960cad3bfcf5716be12.png",
  },
];
const useStyles = makeStyles({
  paper: {
    background: "#E5D6F5",
  },
});
export default function GiftAction() {
  const [open, setOpen] = React.useState(false);
  let otherPeople = useSelector((state) => state.room.remoteStreams);
  let otherGift = useSelector((state) => state.alert.otherSendGift);
  let userDetail = useSelector((state) => state.auth.userDetails);
  const chatList = useSelector((state) => state.allChat.chatList);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectGift, setSelectGift] = React.useState(null);
  const [selectUser, setSelectUser] = React.useState(null);
  const [isShowGift, setIsShowGift] = React.useState(false);
  const [isNewJoin, setIsNewJoin] = React.useState(true);
  const [coin, setCoin] = React.useState(0);
  const [giftShow, setGiftShow] = React.useState(null);
  const [giftList, setGiftList] = React.useState([]);

  const getCoin = async () => {
    const res = await api.getCoin();
    if (res.status === 200) {
      setCoin(res.data.data.coin);
    }
  };

  const getGiftList = async () => {
    const res = await apiPayment.getGiftList();
    if (res.status === 200) {
      setGiftList(res.data.data);
    }
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    if (newOpen === false) {
      clearSlect();
    }
  };

  function clearSlect() {
    setSelectGift(null);
    setSelectUser(null);
  }
  function giftSelect(index) {
    if (coin >= giftList[index].price) {
      setSelectGift(giftList[index]);
    }
  }

  function UserSelect(index) {
    setSelectUser(otherPeople[index]);
  }

  async function sendGift() {
    if (validateSendGift()) {
      setIsLoading(true);
      const res = await apiPayment.sendGift({
        userId: userDetail._id,
        receiverId: selectUser.id,
        giftId: selectGift._id,
        amount: 1,
      });
      if (res.status === 200) {
        getCoin();
        setGiftShow(selectGift);
        showGiftSnow();
        socketConnection.sendGiftToOther({
          userDetail,
          selectUser,
          selectGift,
          otherPeople,
          idText: chatList.length,
        });
        clearSlect();
      }
      setIsLoading(false);
    }
  }

  function validateSendGift() {
    return !!selectGift && !!selectUser;
  }

  function showGiftSnow() {
    setOpen(false);
    setIsShowGift(true);
    setTimeout(() => {
      setIsShowGift(false);
    }, 13000);
  }

  useEffect(() => {
    if (!isNewJoin) {
      if (otherGift) {
        setGiftShow(otherGift?.selectGift);
        showGiftSnow();
      }
    }

    setIsNewJoin(false);
  }, [otherGift]);

  useEffect(() => {
    getGiftList();
    getCoin();
  }, []);

  const classes = useStyles();

  return (
    <div>
      {isShowGift && (
        <GiftAnimation count={15} width={giftShow?.size} img={giftShow?.img} />
      )}
      <Button
        name={"Gift"}
        des={"Send gifts to others"}
        icon={<CardGiftcardIcon sx={{ fontSize: "50px" }} />}
        Click={toggleDrawer(true)}
      />

      <Drawer
        classes={{ paper: classes.paper }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ backgroundColor: "#E5D6F5", width: 700 }}
          role="presentation"
        >
          <div className="gap-4 xxl:h-screen h-full px-10 py-5 items-center flex flex-col">
            <div style={{ zoom: 0.8 }} className="flex flex-col gap-4 w-full">
              <div className="flex justify-between items-center mb-[-20px]">
                <span className="text-purple-50 text-[65px] font-bold">
                  Gift
                </span>
                <div className="flex flex-col gap-2">
                  <span className="pl-5 text-blue-20 text-[14px] font-bold">
                    My Flower
                  </span>
                  <div className="bg-yellow-70 pl-6 scale-150 mr-7 rounded-2xl h-[30px] flex items-center justify-center">
                    <UserCoin coin={coin} hidePlus={true} />
                  </div>
                </div>
              </div>
              <div className="text-purple-50 text-[20px] font-bold ">
                Select User
              </div>

              <div className="bg-purple-80 flex flex-wrap gap-2 rounded-2xl p-6">
                {otherPeople.length > 0 ? (
                  otherPeople.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => UserSelect(index)}
                      className={
                        "text-blue-50 font-bold cursor-pointer  p-2 rounded-xl px-4 bg-blue-90" +
                        (selectUser?.id === item.id
                          ? " ring-4 ring-yellow-70"
                          : "")
                      }
                    >
                      {item.name.displayName}
                    </div>
                  ))
                ) : (
                  <div className="text-white"> Waiting Other Users...</div>
                )}
              </div>

              <div className="text-purple-50 text-[20px] font-bold">
                Select Gifts
              </div>
              <div className="bg-purple-80 select-none gap-4 flex flex-wrap  overflow-y-auto rounded-2xl p-6">
                {giftList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => giftSelect(index)}
                    className={
                      "text-white py-2 hover:bg-purple-60 cursor-pointer rounded-lg flex flex-col justify-start items-center w-[calc(30.33%-16px)] mt-4 " +
                      (selectGift?._id === item._id
                        ? "bg-purple-60"
                        : "bg-purple-80")
                    }
                    style={{
                      flex: "0 0 calc(33.33% - 16px)",
                      height: "fit-content",
                    }}
                  >
                    <img
                      src={item.img}
                      className="w-[100px] h-[100px]"
                      alt={item.name}
                    />
                    <span className="font-bold mb-1">{item.name}</span>
                    <span className="flex gap-2 items-center font-bold">
                      <img
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                        }
                        className={" w-[20px]"}
                        alt="coin"
                      />
                      <span
                        className={
                          coin >= giftList[index].price
                            ? "text-white"
                            : "text-red-70"
                        }
                      >
                        {" "}
                        {item.price}{" "}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {isLoading ? (
                <Loading hideText={true} />
              ) : (
                <div>
                  {isShowGift ? (
                    <div className="text-white text-[14px] h-[50px] mt-4 p-2">
                      Please wait a moment. There's a special delivery on its
                      way with a surprise gift for someone.
                    </div>
                  ) : (
                    <div
                      onClick={() => sendGift()}
                      className={
                        " text-purple-50 flex items-center rounded-2xl h-[50px] mt-4 p-2 px-20  text-[25px] font-bold " +
                        (validateSendGift()
                          ? "cursor-pointer bg-yellow-70"
                          : " cursor-not-allowed bg-gray-70  opacity-50")
                      }
                    >
                      Send
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}
