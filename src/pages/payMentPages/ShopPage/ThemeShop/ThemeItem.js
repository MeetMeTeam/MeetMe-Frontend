import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../../../api";
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

const ThemeItem = (prop) => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  async function checkOut(id) {
    setIsLoading(true);
    const response = await api.buyAvatar({
      item_id: prop.item.id,
      item_type: "theme",
    });
    if (response.status === 200) {
      setIsLoading(false);
      setIsSuccess(true);
      prop.getThemeShop();
    } else {
      setIsLoading(false);
      setErrorText(response.exception.response.data.message);
    }
  }

  return (
    <div>
      <ItemModal
        item={prop.item}
        textHeader={`You will buy "${prop.item.name}" theme.`}
        checkOut={checkOut}
        unit={"Flower"}
        type={"theme"}
        isLoading={isLoading}
        isSuccess={isSuccess}
        errorText={errorText}
        setIsSuccess={setIsSuccess}
      />
    </div>
  );
};

export default ThemeItem;
