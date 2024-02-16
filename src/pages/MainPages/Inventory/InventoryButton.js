/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";
import InventoryModal from "./InventoryModal";

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
              <Briefcase className="text-black scale-75 ml-1 cursor-pointer" />
            )}
          </div>
        ) : (
          <div className="bg-purple-70  p-3 rounded-lg">
            <Briefcase
              onClick={handleOpen}
              className="text-white cursor-pointer"
            />
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
