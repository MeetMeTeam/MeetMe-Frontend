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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { makeStyles } from "@mui/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
};
const useStyles = makeStyles({
  paper: {
    background: "#FCF7CF",
  },
});
const mockCard = [
  {
    textTh: "เขียนคำถาม หรือ สุ่มคำถาม",
    textEng: "Ask or Random question",
  },
  {
    textTh: "เล่นเกม",
    textEng: "Play game",
  },
  {
    textTh: "อ่านหนังสือ",
    textEng: "Read book",
  },
  {
    textTh: "สั่งซื้อสินค้า",
    textEng: "Buy product",
  },
];

const cate = [
  {
    name: "เขียนคำถาม หรือ สุ่มคำถาม",
  },
  {
    name: "เล่นเกม",
  },
];

export default function CardTalkAction() {
  const [open, setOpen] = React.useState(false);
  let otherPeople = useSelector((state) => state.room.remoteStreams);
  let userDetail = useSelector((state) => state.auth.userDetails);

  let otherCardTalk = useSelector((state) => state.alert.cardTalkList);

  const [isShowDropdown, setIsShowDropdown] = React.useState(false);
  const [selectCate, setSelectCate] = React.useState("");
  const [lang, setLang] = React.useState("th");

  const [questionList, setQuestionList] = React.useState([]);
  const [cateList, setCateList] = React.useState([]);

  const [cardDetail, setCardDetail] = useState({
    text: "Ask Question or Random Question",
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
    if (
      cardDetail.text !== "Ask Question or Random Question" &&
      cardDetail.text !== ""
    ) {
      setSelectCard(cardDetail);
      socketConnection.sendCardTalk({ cardDetail, otherPeople });

      setOpen(false);
      setCardDetail({
        ...cardDetail,
        text: "Ask Question or Random Question",
      });
      handleOpen();
    }
  }

  function randomCard() {
    let questionListFilter = [];
    if (selectCate !== "") {
      questionListFilter = questionList.filter(
        (card) => card.category === selectCate
      );
    } else {
      questionListFilter = questionList;
    }

    let availableCards = questionListFilter.filter((card) => {
      return card.thai !== cardDetail.text && card.eng !== cardDetail.text;
    });

    if (availableCards.length > 0) {
      let randomIndex = Math.floor(Math.random() * availableCards.length);
      let randomCard = availableCards[randomIndex];
      setCardDetail({
        ...cardDetail,
        text: lang === "th" ? randomCard.thai : randomCard.eng,
      });
    } else {
    }
  }

  async function fetchQuestions() {
    const res = await api.getQuestions();
    if (res.status === 200) {
      setQuestionList(res.data.data);
    }
  }

  async function fetchCate() {
    const res = await api.getCateCard();
    if (res.status === 200) {
      setCateList(res.data.data);
    }
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

  useEffect(() => {
    fetchCate();
    fetchQuestions();
  }, []);

  const classes = useStyles();
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newZoom = windowWidth;
      if (newZoom < 700) {
        setZoom(newZoom - 70);
      } else {
        setZoom(500);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Button
        name={"Card Talk"}
        des={"random topics to start conversation"}
        icon={<StyleIcon sx={{ fontSize: "50px" }} />}
        Click={toggleDrawer(true)}
      />

      <Drawer
        classes={{ paper: classes.paper }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: zoom, backgroundColor: "#FCF7CF" }}
          role="presentation"
        >
          <div className=" w-full h-full xxxl:h-screen  px-10 py-5 justify-center items-center flex flex-col">
            <div className="w-full flex justify-center  mb-6 font-bold text-[40px]  text-purple-30">
              <StyleIcon sx={{ fontSize: "50px" }} /> Card Talk
            </div>
            <div className="relative">
              <img
                src={process.env.PUBLIC_URL + "red_card.png"}
                className="absolute left-[-90px] bottom-16 w-[100px] z-[110]"
                alt="red"
              />
              <img
                src={process.env.PUBLIC_URL + "green_card.png"}
                className="absolute right-[-85px] bottom-0 w-[120px] z-[110]"
                alt="green"
              />
              <img
                src={process.env.PUBLIC_URL + "ball.png"}
                className="absolute right-[-70px] top-20 w-[40px]  z-[110]"
                alt="green"
              />
              <img
                src={process.env.PUBLIC_URL + "ball.png"}
                className="absolute left-[-40px] top-0 w-[20px]  z-[110]"
                alt="green"
              />
              <div
                style={{ zoom: 0.7 }}
                className={
                  "bg-white relative z-[100] w-[300px] flex justify-center flex-col items-center h-[400px] rounded-2xl border border-purple-60 text-black"
                }
              >
                <p className="mt-6 text-[24px] font-bold">Question</p>
                <p className="text-[#403D44] font-bold">
                  {cardDetail.cardSender}
                </p>
                <div
                  className="h-full w-[300px] break-words flex items-center justify-center text-center px-4 mt-[-40px]"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    wordWrap: "anywhere",
                  }}
                >
                  {cardDetail.text}
                </div>
              </div>
              <div
                style={{ zoom: 0.7 }}
                className={
                  "bg-purple-90 absolute top-[-10px] right-[-15px]  z-[90] w-[300px] flex justify-center flex-col items-center h-[400px] rounded-2xl text-black"
                }
              ></div>
              <div
                style={{ zoom: 0.7 }}
                className={
                  "bg-purple-80 absolute top-[-20px] right-[-30px]  z-[80] w-[300px] flex justify-center flex-col items-center h-[400px] rounded-2xl text-black"
                }
              ></div>
            </div>

            <div className="mt-6 flex gap-4 text-[12px] select-none font-bold">
              <div className="bg-purple-60 ring cursor-pointer  ring-purple-50 rounded-full   flex items-center  px-0.5   text-white">
                <div
                  onClick={() => setLang("th")}
                  className={
                    " h-full  rounded-full px-3  flex items-center " +
                    (lang === "th" ? "bg-purple-40" : "bg-purple-60")
                  }
                >
                  TH
                </div>
                <div
                  onClick={() => setLang("en")}
                  className={
                    " h-full  rounded-full px-3  flex items-center " +
                    (lang === "en" ? "bg-purple-40" : "bg-purple-60")
                  }
                >
                  EN
                </div>
              </div>
              <div
                onClick={() => setIsShowDropdown(!isShowDropdown)}
                className="relative bg-purple-60 ring cursor-pointer min-w-[100px] hover:bg-purple-40 ring-purple-50 rounded-full flex justify-center items-center pl-4 pr-2 py-2 text-white"
              >
                {selectCate ? selectCate : "Category"} <KeyboardArrowDownIcon />
                {isShowDropdown && (
                  <div className="absolute z-[100000] w-full max-h-[120px]  overflow-y-auto py-2 bg-purple-60 rounded-2xl top-[50px] left-0">
                    <div
                      onClick={() => setSelectCate("")}
                      className="py-1 px-3 hover:bg-purple-50"
                    >
                      All
                    </div>
                    {cateList.map((item, index) => (
                      <div
                        onClick={() => setSelectCate(item.name)}
                        className="py-1 px-3 hover:bg-purple-50"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                onClick={randomCard}
                className="bg-purple-60 select-none ring cursor-pointer hover:bg-purple-40 ring-purple-50 rounded-full px-4  py-2 text-white"
              >
                <RestartAltIcon /> Random Question
              </div>
            </div>

            <div className="w-full mt-4 relative">
              <div className="w-full font-bold text-[20px]  text-black ">
                Question
              </div>
              <textarea
                maxLength={"200"}
                value={cardDetail?.text}
                onChange={(e) => {
                  setCardDetail({
                    ...cardDetail,
                    text: e.target.value,
                  });
                }}
                className="p-2 text-black w-full outline-none rounded-xl bg-purple-90 mt-2 py-2"
              />
              <div className="absolute right-3 text-[14px]">
                {cardDetail.text === "Ask Question or Random Question"
                  ? 0
                  : cardDetail.text.length}{" "}
                / 200{" "}
              </div>
            </div>
            <div className="w-full relative">
              <div className="w-full my-2 font-bold text-[20px]  text-black">
                Sender
              </div>
              <input
                maxLength={"25"}
                value={cardDetail?.cardSender}
                onChange={(e) => {
                  setCardDetail({
                    ...cardDetail,
                    cardSender: e.target.value,
                  });
                }}
                className="p-2 text-black w-full py-3 mb-2 outline-none rounded-xl bg-purple-90"
              />
              <div className="absolute right-3 text-[14px]">
                {cardDetail.cardSender.length} / 25{" "}
              </div>
            </div>
            {(cardDetail.text === "" ||
              cardDetail.text === "Ask Question or Random Question") && (
              <div className="mt-5 text-[12px]">
                please Ask Question or Random Question
              </div>
            )}
            <div
              onClick={openCardTalk}
              className={
                (cardDetail.text !== "" &&
                cardDetail.text !== "Ask Question or Random Question"
                  ? "bg-purple-60 cursor-pointer"
                  : "bg-gray-60 cursor-not-allowed") +
                "   font-bold  mt-4  text-white  px-16 py-3 rounded-xl"
              }
            >
              Send
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
