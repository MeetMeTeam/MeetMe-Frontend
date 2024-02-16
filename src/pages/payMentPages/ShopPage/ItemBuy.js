import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";

export default function ItemBuy({ buyAvatar, avatarUserShow, getAvatarShop }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [textError, setTextError] = React.useState("");
  console.log(avatarUserShow);
  async function enterAvatar() {
    const response = await buyAvatar();
    if (response.error) {
      setTextError(response.exception.response.data.message);
    }
  }
  return (
    <div>
      <div
        onClick={handleOpen}
        className={
          "font-bold  py-2 rounded-full w-full text-white flex justify-center " +
          (avatarUserShow?.isOwner || avatarUserShow?.isOwner === undefined
            ? "bg-purple-70 cursor-not-allowed"
            : "bg-purple-50 cursor-pointer")
        }
      >
        Buy
      </div>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className="select-none px-6 p-6 gap-4 flex flex-col items-center justify-center bg-purple-60 absolute w-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg ">
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
                "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F1.png?alt=media&token=3086c3ba-0513-4710-86d1-ebeb92389e00"
              }
              className={" w-[25px] h-[25px] mr-2"}
              alt="coin"
            />{" "}
            {avatarUserShow?.price}
          </div>
          {textError}
          <div className="flex w-full space-x-4">
            <div
              onClick={handleClose}
              className="text-white w-full border border-purple-50 flex justify-center rounded-full py-2 cursor-pointer hover:bg-purple-40"
            >
              Cancel
            </div>{" "}
            <div
              onClick={enterAvatar}
              className="w-full  flex justify-center rounded-full bg-yellow-60 hover:bg-yellow-40 font-bold py-2 cursor-pointer"
            >
              Yes
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
