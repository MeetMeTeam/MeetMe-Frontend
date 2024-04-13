import React from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../../apiPayment";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import ItemModal from "../components/ItemModal";
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
      <ItemModal
        item={prop.item}
        textHeader={"You will topup flower."}
        checkOut={checkOut}
        unit={"THB"}
      />
    </div>
  );
};

export default CheckOutItem;
