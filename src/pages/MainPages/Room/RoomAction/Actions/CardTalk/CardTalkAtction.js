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
import StyleIcon from "@mui/icons-material/Style";
import Modal from "@mui/material/Modal";
import Card from "./Card";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};

export default function CardTalkAction() {
  const [open, setOpen] = React.useState(false);
  let otherPeople = useSelector((state) => state.room.remoteStreams);
  let otherGift = useSelector((state) => state.alert.otherSendGift);
  let userDetail = useSelector((state) => state.auth.userDetails);
  const chatList = useSelector((state) => state.allChat.chatList);

  let otherCardTalk = useSelector((state) => state.alert.cardTalkList);

  const [isLoading, setIsLoading] = React.useState(false);

  const [selectGift, setSelectGift] = React.useState(null);
  const [selectUser, setSelectUser] = React.useState(null);
  const [isShowGift, setIsShowGift] = React.useState(false);
  const [isNewJoin, setIsNewJoin] = React.useState(true);
  const [coin, setCoin] = React.useState(0);
  const [giftShow, setGiftShow] = React.useState(null);
  const [giftList, setGiftList] = React.useState([]);
  const [cardDetail, setCardDetail] = useState({
    text: "ใส่คำถามตรงนี้",
    cardSender: userDetail.displayName ? userDetail.displayName : "Anonymous",
  });
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [openModal, setOpenModal] = React.useState(false);
  const [selectCard, setSelectCard] = React.useState({});

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function openCardTalk() {
    setSelectCard(cardDetail);
    socketConnection.sendCardTalk({ cardDetail, otherPeople });

    setOpen(false);
    handleOpen();
  }

  useEffect(() => {
    if (otherCardTalk.length > 0) {
      setSelectCard(otherCardTalk[otherCardTalk.length - 1].cardDetail);
      handleClose();

      setTimeout(() => {
        handleOpen();
      }, 1000);
    }
  }, [otherCardTalk?.length]);
  return (
    <div>
      <Button
        name={"Card Talk"}
        des={"random topics to start conversation"}
        icon={<StyleIcon sx={{ fontSize: "50px" }} />}
        Click={toggleDrawer(true)}
      />

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 500, backgroundColor: "#FFB850" }}
          role="presentation"
        >
          <div className=" w-full h-screen px-10 py-5 items-center flex flex-col">
            <div className="w-full mb-4 font-bold text-[40px]  text-[#E85D49]">
              Card Talk
            </div>
            {/* <div className="w-full mb-2  font-bold text-[20px]  text-[#E85D49]">
              คำถามทั้งหมด
            </div>
            <div className="p-2 text-black h-[150px] mb-2 w-full outline-none rounded-2xl bg-yellow-80 py-2">
              ss
            </div>
            <div className="w-full font-bold text-[20px]  text-[#E85D49]">
              สร้างคำถามใหม่
            </div> */}

            <div
              style={{ zoom: 0.8 }}
              class={
                "bg-white w-[300px] flex justify-center flex-col items-center h-[400px] rounded-2xl border-[10px] border-[#55C2BC] text-black"
              }
            >
              <p class="mt-6 text-[20px]">คำถามทั่วไป</p>
              <p className="text-[#403D44] font-bold">
                {cardDetail.cardSender}
              </p>
              <div
                className="h-full w-[300px] break-words flex items-center justify-center text-center px-4 mt-[-40px]"
                style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {cardDetail.text}
              </div>
            </div>
            <div className="w-full">
              <div className="w-full font-bold text-[20px]  text-[#E85D49]">
                คำถาม
              </div>
              <textarea
                value={cardDetail?.bio}
                onChange={(e) => {
                  setCardDetail({
                    ...cardDetail,
                    text: e.target.value,
                  });
                }}
                className="p-2 text-black w-full outline-none rounded-xl bg-yellow-80 py-2"
              />
            </div>
            <div className="w-full">
              <div className="w-full my-2 font-bold text-[20px]  text-[#E85D49]">
                ผู้ส่ง
              </div>
              <input
                value={cardDetail?.cardSender}
                onChange={(e) => {
                  setCardDetail({
                    ...cardDetail,
                    cardSender: e.target.value,
                  });
                }}
                className="p-2 text-black w-full py-3 mb-2 outline-none rounded-xl bg-yellow-80"
              />
            </div>
            <div
              onClick={openCardTalk}
              className="bg-[#E85D49] mt-2 hover:bg-red-60 text-white cursor-pointer px-6 py-3 rounded-xl"
            >
              ส่งคำถามให้กับทุกคน
            </div>
          </div>
        </Box>
      </Drawer>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <Card
              cardSender={selectCard.cardSender}
              cardText={selectCard.text}
              widthCustom={" w-[290px] h-[450px]"}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
