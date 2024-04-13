import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../../apiPayment";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import Loading from "../../../../shared/components/Loading";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 1000,
  outline: "none",
  borderRadius: "10px",
};

const ItemModal = (prop) => {
  console.log(prop.type)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (!prop.item.isOwner) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    if (prop?.setIsSuccess) {
      prop?.setIsSuccess(false);
    }
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className="button-flower relative py-6 transition ease-in-out delay-100 hover:scale-110 cursor-pointer flex flex-col items-center justify-between bg-purple-70 rounded-xl"
      >
        {prop.item.isOwner && (
          <div className="scale-75 absolute top-14 border-white border bg-red-80 rounded-lg py-1 px-2">
            Already Exist
          </div>
        )}
        <div className="">
          <img
            src={prop.item.img + ".png"}
            className={"h-[115px] w-[200px] object-contain"}
            alt="coin"
          />
        </div>

        {prop.item.free > 0 && (
          <div className="bg-red-80 font-bold scale-125 bottom-0 flex flex-row px-2 items-center rounded-lg text-white absolute">
            <div className="text-[12px]"> Special Gift </div>

            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
              }
              className={" w-[20px] pl-1"}
              alt="coin"
            />

            <div>+{prop.item.free}</div>
          </div>
        )}
      </div>
      <div className="font-medium flex flex-col  w-full  justify-center items-center py-2 rounded-b-xl text-black ">

        {prop.item.coin ? (
          <span className="flex  text-[22px] bg-white/20 rounded-2xl px-2">

            <div className="text-[18px] flex">

              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                }
                className={" w-[30px] mr-2"}
                alt="coin"
              />

              {prop.item.coin}
              {/* {prop.item.free > 0 && <span>(free {prop.item.free})</span>} */}
            </div>
          </span>
        ) : (
          <span className="flex items-center  text-[22px] rounded-2xl px-2 font-bold">
            <div>{prop.item.name} </div></span>
        )}

        <span className="font-bold flex mt-1np">

          {prop.unit === "THB" ? (
            <div>{prop.unit}</div>
          ) : (
            <div>
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                }
                className={"mr-2 w-[25px] "}
                alt="coin"
              />
            </div>
          )}&nbsp;
          {prop.item.price}

        </span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {prop.isLoading ? (
          <Box sx={style}>
            <div className="p-6 bg-blue-70 px-10 h-[300px] flex items-center min-w-[400px] rounded-md  justify-center ">
              <Loading />
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            {prop.isSuccess ? (
              <div className="select-none px-6 p-6 gap-4 flex flex-col items-center justify-center bg-purple-60 absolute w-[420px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg ">
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
              </div>
            ) : (
              <div className="select-none px-6 p-6 gap-4 flex flex-col items-center justify-center bg-purple-60 absolute w-[600px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-background-paper rounded-lg ">
                <div className="flex justify-center flex-col items-center text-[24px]">
                  <div className="text-white font-medium text-[20px]">
                    {prop.textHeader}
                  </div>
                  <div className="text-[25px] items-center text-white drop-shadow-md bg-purple-80/40 rounded-2xl px-4 py-4 mt-4 font-extrabold flex">
                    <img
                      src={prop.item.img + ".png"}
                      className={
                        "mb-2 ] object-contain " +
                        (prop.type === "theme"
                          ? "w-full max-w-[800px]"
                          : "h-[115px] w-[200px]")
                      }
                      alt="coin"
                    />
                  </div>
                  <div className="text-[25px] items-center text-white drop-shadow-md bg-purple-80/40 rounded-2xl px-4 py-1 mt-4 font-extrabold flex">
                    <img
                      src={
                        "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
                      }
                      className={"mr-2 w-[25px] "}
                      alt="coin"
                    />
                    {prop.item.price}
                  </div>

                </div>
                <div className="text-red-500 font-bold text-[20px]">
                  {prop.errorText}
                </div>
                <div className="flex w-full space-x-4">

                  <div
                    onClick={() => handleClose()}
                    className="text-white w-full border border-purple-50 flex justify-center rounded-full py-2 cursor-pointer hover:bg-purple-40"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => prop.checkOut()}
                    className="w-full  flex justify-center rounded-full bg-yellow-60 hover:bg-yellow-40 font-bold py-2 cursor-pointer"
                  >
                    Confirm
                  </div>
                </div>
              </div>
            )}
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default ItemModal;
