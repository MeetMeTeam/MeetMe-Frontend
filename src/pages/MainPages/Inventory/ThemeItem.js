import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 4,
};

export default function ThemeItem(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (img) => {
    if (img) {
      setModalImageShow(img);
      setOpen(true);
    }
  };
  const handleClose = () => setOpen(false);

  const [modalImageShow, setModalImageShow] = useState("");

  return (
    <div className="grid grid-cols-3 gap-4">
      {props.avatarList.map((item, index) => (
        <div
          key={index}
          onClick={() => handleOpen(item.img)}
          className="flex flex-col items-center"
        >
          <div
            className={
              "p-4 w-[150px] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-purple-70 " +
              (item.name ? "bg-purple-80" : "bg-purple-80/30")
            }
          >
            {item.img ? (
              <img
                src={item.img}
                className="w-[100px] h-[70px] object-contain"
                alt="block"
              />
            ) : (
              <span className="w-[100px] h-[70px]"></span>
            )}
            <div
              className={
                "font-bold truncate " +
                (item.name ? "text-purple-10" : "text-purple-90")
              }
            >
              {item.name || "."}
            </div>
          </div>
        </div>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={modalImageShow} alt="asd" />
        </Box>
      </Modal>
    </div>
  );
}
