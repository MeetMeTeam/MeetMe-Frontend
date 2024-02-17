import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";
import Loading from "../../../shared/components/Loading";
import { useDispatch } from "react-redux";
import { openAlertMessage } from "../../../store/actions/alertActions";
export default function ItemBuy({ buyAvatar, avatarUserShow, getAvatarShop }) {
  const [open, setOpen] = React.useState(false);
  const [isBuy, setIsbuy] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  function handleClose() {
    setOpen(false);
    setIsbuy(false);
  }
  const [textError, setTextError] = React.useState("");
  async function enterAvatar() {
    setIsLoading(true);
    const response = await buyAvatar();
    if (response.error) {
      setTextError(response.exception.response.data.message);
    } else {
      setIsbuy(true);
      dispatch(openAlertMessage("ซื้อสำเร็จ"));
    }
    setIsLoading(false);
  }

  function selectAvatar() {
    if (!avatarUserShow?.isOwner) {
      handleOpen();
    }
  }
  return (
    <div>
      <div
        onClick={selectAvatar}
        className={
          "font-bold  py-2 rounded-full w-full text-white flex justify-center " +
          (avatarUserShow?.isOwner || avatarUserShow?.isOwner === undefined
            ? "bg-purple-80 cursor-not-allowed"
            : "bg-purple-50 cursor-pointer")
        }
      >
        {avatarUserShow?.isOwner || avatarUserShow?.isOwner === undefined
          ? "ครอบครองแล้ว"
          : "ซื้อ"}
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
              <div className="bg-white/50 rounded-lg p-2">
                <img
                  src={avatarUserShow.preview}
                  className="w-[150px]"
                  alt="imagePreview"
                />
              </div>
              <div className="text-[25px] items-center text-white drop-shadow-md bg-purple-80/40 rounded-2xl px-4 py-1 font-extrabold flex">
                <img
                  src={
                    "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                  }
                  className={"mr-2 w-[25px] "}
                  alt="coin"
                />
                {avatarUserShow?.price}
              </div>
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

                  <div
                    onClick={enterAvatar}
                    className="w-full  flex justify-center rounded-full bg-yellow-60 hover:bg-yellow-40 font-bold py-2 cursor-pointer"
                  >
                    Yes
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
