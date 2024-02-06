/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import Modal from "@mui/material/Modal";
import InventoryModal from "./InventoryModal";

const InventoryButton = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      {" "}
      <div className="bg-purple-70  p-3 rounded-lg">
        <Briefcase onClick={handleOpen} className="text-white cursor-pointer" />
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

export default InventoryButton;
