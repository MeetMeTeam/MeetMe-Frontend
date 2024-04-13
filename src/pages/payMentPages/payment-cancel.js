/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const CancelPaymentPage = () => {
  const { slug } = useParams();
  const history = useHistory();

  return (
    <div className="flex-col bg-blue-90 space-y-3 select-none relative w-screen justify-center h-screen flex items-center">
      <div className="text-[34px] "> Your order has been canceled !</div>
      <div>Order ID: {slug}</div>
      <img
        src={process.env.PUBLIC_URL + "/loginPage/nongRed.png"}
        className={" absolute z-30 w-[200px] right-10 top-5"}
      />
      <img
        src={process.env.PUBLIC_URL + "/loginPage/nongYellow.png"}
        className={" absolute z-30 w-[200px] left-10 bottom-5"}
      />
      <div
        onClick={() => history.push("/shop")}
        className="bg-purple-70 text-white px-4 py-2 rounded-3xl font-medium cursor-pointer"
      >
        Go Back to Enjoying
      </div>
    </div>
  );
};

export default CancelPaymentPage;
