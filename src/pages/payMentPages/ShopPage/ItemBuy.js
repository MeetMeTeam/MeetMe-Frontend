import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";
import Loading from "../../../shared/components/Loading";
import { useDispatch } from "react-redux";
import { openAlertMessage } from "../../../store/actions/alertActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export default function ItemBuy({
  buyAvatar,
  getAvatarShop,
  avatarUserShow,
  backgroundAvatarUser,
  buyBackgroundAvatar,
}) {
  const [open, setOpen] = React.useState(false);
  const [isBuy, setIsbuy] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectAvatarBuy, setSelectAvatarBuy] = React.useState(null);
  const [selectBackground, setSelectBackground] = React.useState(null);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    setSelectAvatarBuy(avatarUserShow);
    setSelectBackground(backgroundAvatarUser);
  }, [open]);
  function handleClose() {
    setOpen(false);
    setIsbuy(false);
  }
  const [textError, setTextError] = React.useState("");
  async function enterAvatar() {
    setIsLoading(true);
    const response = await buyAvatar();
    const response2 = await buyBackgroundAvatar();
    let check = false;
    if (response.error) {
      setTextError(response.exception.response.data.message);
    } else {
      setIsbuy(true);
      dispatch(openAlertMessage("The product has been purchased."));
      check = true;
    }

    if (response2.error) {
      setTextError(response2.exception.response.data.message);
    } else {
      setIsbuy(true);
      if (!check) {
        dispatch(openAlertMessage("The product has been purchased."));
      }
    }

    setIsLoading(false);
  }

  function selectAvatar() {
    setTextError("");
    handleOpen();
  }

  function calPrice() {
    return (
      (selectAvatarBuy?.price ? selectAvatarBuy?.price : 0) +
      (selectBackground?.price ? selectBackground?.price : 0)
    );
  }

  function checkIsOwner() {
    let text = "";
    if (selectAvatarBuy?.isOwner) {
      text = "Avatar Already Exist";
      return text;
    }
    if (selectBackground?.isOwner) {
      text = "background Already Exist";
      return text;
    }
    if (selectAvatarBuy?.isOwner === undefined && selectAvatarBuy !== null) {
      text = "Avatar Already Exist";
      return text;
    }

    if (selectBackground?.isOwner === undefined && selectBackground !== null) {
      text = "background Already Exist";
      return text;
    }
    return "";
  }

  return (
    <div>
      <div
        onClick={selectAvatar}
        className={
          "font-bold  py-2 rounded-full w-full text-white flex justify-center " +
          (false
            ? "bg-purple-80 cursor-not-allowed"
            : "bg-purple-50 cursor-pointer")
        }
      >
        {false ? "Already Exist" : "Buy"}
      </div>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="select-none px-6 p-6 gap-4 flex flex-col items-center justify-center bg-purple-60 absolute w-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg ">
          {isBuy ? (
            <div>
              <div className="text-[20px] font-bold text-white mb-4">
                Thank for buy{" "}
              </div>
              <div
                onClick={handleClose}
                className="text-white w-full border bg-yellow-50 flex justify-center rounded-full py-2 cursor-pointer "
              >
                Ok
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-white font-medium text-[20px]">
                Do you want to buy this?
              </div>
              <div className="flex gap-2">
                <div
                  onClick={() =>
                    selectAvatarBuy
                      ? setSelectAvatarBuy(null)
                      : setSelectAvatarBuy(avatarUserShow)
                  }
                  className="bg-white/50 relative flex items-center rounded-lg p-2"
                >
                  <img
                    src={avatarUserShow.preview}
                    className="w-[150px]"
                    alt="imagePreview"
                  />

                  <div className="absolute top-2 right-2">
                    {avatarUserShow === selectAvatarBuy ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                </div>
                <div
                  onClick={() =>
                    selectBackground
                      ? setSelectBackground(null)
                      : setSelectBackground(backgroundAvatarUser)
                  }
                  className="bg-white/50 relative flex items-center rounded-lg p-2"
                >
                  <img
                    src={backgroundAvatarUser.preview || backgroundAvatarUser}
                    className="w-[150px]"
                    alt="imagePreview"
                  />
                  <div className="absolute top-2 right-2">
                    {backgroundAvatarUser === selectBackground ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </div>
                </div>
              </div>

              <div className="text-[25px] items-center text-white drop-shadow-md bg-purple-80/40 rounded-2xl px-4 py-1 font-extrabold flex">
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                  }
                  className={"mr-2 w-[25px] "}
                  alt="coin"
                />
                {calPrice()}
              </div>

              <div className="text-red-300 font-bold"> {checkIsOwner()} </div>
              <div className="text-red-500"> {textError} </div>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="flex w-full space-x-4">
                  <div
                    onClick={handleClose}
                    className="text-white w-full border border-purple-50 flex justify-center rounded-full py-2 cursor-pointer hover:bg-purple-40"
                  >
                    Cancel
                  </div>

                  {checkIsOwner() === "" && calPrice() !== 0 ? (
                    <div
                      onClick={enterAvatar}
                      className="w-full flex justify-center rounded-full bg-yellow-60 hover:bg-yellow-40 font-bold py-2 cursor-pointer"
                    >
                      Yes
                    </div>
                  ) : (
                    <div className="w-full flex justify-center rounded-full opacity-50 bg-yellow-80 font-bold py-2 cursor-not-allowed">
                      Yes
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
