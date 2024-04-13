/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";
import InventoryModal from "./InventoryModal";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
const InventoryButton = ({ custom, text, styleCustom, isShowIcon }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className={custom && "w-full"}>
      <div className="w-full">
        {custom ? (
          <div onClick={handleOpen} className={styleCustom}>
            {text}{" "}
            {isShowIcon && (
              <BusinessCenterIcon className="text-black scale-75 ml-1 cursor-pointer" />
            )}
          </div>
        ) : (
          <div className="bg-white/70 justify-center items-center flex flex-col gap-1 p-3 px-4 rounded-lg">
            <BusinessCenterIcon
              onClick={handleOpen}
              className="text-purple-50 cursor-pointer"
              sx={{ fontSize: 30 }}
            />
            <span className="text-[10px] my-[-5px] text-purple-50"> Bag </span>
          </div>
        )}

        <Modal
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          open={open}
          onClose={handleClose}
        >
          <InventoryModal />
        </Modal>
      </div>
    </div>
  );
};

InventoryButton.defaultProps = {
  custom: false,
  text: "Default Text",
  style: "default-style",
};

export default InventoryButton;
