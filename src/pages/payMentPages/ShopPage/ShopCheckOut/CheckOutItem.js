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
  maxWidth: 500,
  outline: "none",
  borderRadius: "10px",
};

const CheckOutItem = (prop) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function checkOut() {
    const data = {
      user: {
        userId: userDetails._id,
      },
      product: {
        name: "ซื้อเหรียญเว็บ MeetMe",
        price: prop.item.price,
        quantity: 1,
      },
    };
    const url = await api.checkOut(data);
    window.location.href = url.data.url;
  }

  return (
    <div>
      <div
        onClick={() => handleOpen()}
        className="relative py-6 transition ease-in-out delay-100 hover:scale-110 cursor-pointer flex flex-col items-center justify-between bg-purple-70 rounded-xl"
      >
        <div className="">
          {" "}
          <img
            src={prop.item.img + ".png"}
            className={"h-[115px] w-[200px] object-contain"}
            alt="coin"
          />{" "}
        </div>

        {prop.item.free > 0 && (
          <div className="bg-red-80 left-[-10px] top-[-10px] flex flex-row px-2 items-center rounded-lg text-white absolute">
            <div className="text-[12px]"> ของขวัญพิเศษ </div>

            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/meetme-1815f.appspot.com/o/coin%2F1.png?alt=media&token=3086c3ba-0513-4710-86d1-ebeb92389e00"
              }
              className={" w-[20px]"}
              alt="coin"
            />

            <div>{prop.item.free}</div>
          </div>
        )}
      </div>
      <div className="font-medium flex flex-col  w-full  justify-center items-center py-2 rounded-b-xl text-black ">
        <span className="font-bold text-[22px]"> {prop.item.coin} Flower </span>
        <span className="font-bold">THB {prop.item.price}.00 </span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-6 bg-blue-70 px-10 w-[400px] h-[200px] rounded-md flex flex-col justify-between items-center">
            <div className="flex justify-center flex-col items-center text-[24px]">
              <div className="text-white">คุณกำลังจะซื้อ coin </div>
              <span className="drop-shadow-md text-white">
                THB {prop.item.price}.00{" "}
              </span>
            </div>
            <div className="flex flex-row space-x-4">
              <div
                onClick={() => checkOut()}
                className="bg-purple-80 px-4 rounded-2xl cursor-pointer"
              >
                จ่ายเงิน
              </div>
              <div
                onClick={() => handleClose()}
                className="bg-gray-80 px-4 rounded-2xl cursor-pointer"
              >
                ยกเลิก
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckOutItem;
