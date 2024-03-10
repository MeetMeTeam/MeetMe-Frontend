import React from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../../apiPayment";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className="button-flower relative py-6 transition ease-in-out delay-100 hover:scale-110 cursor-pointer flex flex-col items-center justify-between bg-purple-70 rounded-xl"
      >
        <div className="">
          <img
            src={prop.item.img + ".png"}
            className={"h-[115px] w-[200px] object-contain"}
            alt="coin"
          />
        </div>

        {prop.item.free > 0 && (
          <div className="bg-red-80 left-[-10px] top-[-10px] flex flex-row px-2 items-center rounded-lg text-white absolute">
            <div className="text-[12px]"> Special Gift ! </div>

            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2FwebCoinLogo.png?alt=media&token=c44adc87-a3db-4cfd-a6d8-73f4b66d4189"
              }
              className={" w-[20px]"}
              alt="coin"
            />

            <div>{prop.item.free}</div>
          </div>
        )}
      </div>
      <div className="font-medium flex flex-col  w-full  justify-center items-center py-2 rounded-b-xl text-black ">
        <span className="flex items-center font-bold text-[22px] bg-white/20 rounded-2xl px-3">
          {prop.item.coin ? (
            <div>{prop.item.coin} Flower </div>
          ) : (
            <div>{prop.item.name} </div>
          )}
        </span>
        <span className="font-bold">THB {prop.item.price}.00 </span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-6 bg-blue-70 px-10 min-w-[400px] rounded-md flex flex-col justify-between items-center">
            <div className="flex justify-center flex-col items-center text-[24px]">
              <div className="text-white">{prop.textHeader} </div>
              <div>
                {" "}
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
              <span className="drop-shadow-md text-white">
                {prop.item.price} {prop.unit}
              </span>
            </div>
            <div className="flex flex-row space-x-4">
              <div
                onClick={() => prop.checkOut()}
                className="button-confirm bg-purple-80 px-4 rounded-2xl cursor-pointer"
              >
                Confirm
              </div>
              <div
                onClick={() => handleClose()}
                className="button-cancel bg-gray-80 px-4 rounded-2xl cursor-pointer"
              >
                Cancel
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemModal;
