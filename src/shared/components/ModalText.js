import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
export default function ModalText(prop) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 500,
    outline: "none",
    borderRadius: "10px",
  };



  return (
    <div>
      <Modal
        open={prop.openModal}
        onClose={prop.handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={`${prop.bgColor} rounded-[24px] flex flex-col space-y-6 p-10 items-center`}>
            <div className="text-red-80 text-[20px] font-bold">
             {prop.headText}
            </div>
            <div className="text-white font-bold text-center flex flex-col">
              {prop.textDetailOne}
              <span> {prop.textDetailTwo} </span>
            </div>
            <div
              onClick={() => prop.closeModal()}
              className="cursor-pointer hover:bg-yellow-50 bg-yellow-60 font-bold text-purple-40 px-12 py-2 rounded-3xl flex justify-center items-center"
            >
              Ok
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
