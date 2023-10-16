import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from "../../realtimeCommunication/roomHandler";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  borderRadius: "10px",
};

const CreateRoom = () => {
  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);

  const createNewRoomHandler = () => {
    if (!isUserInRoom) {
      roomHandler.createNewRoom(roomName);
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, setRoomName] = useState("");
  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };
  return (
    <div>
      <div
        className="flex flex-row items-center space-x-1 font-bold
        justify-center bg-purple-70 rounded-2xl text-white cursor-pointer
        px-6 py-4
        hover:bg-purple-60
        "
        onClick={handleOpen}
      >
        <AddIcon />
        <div> Create Room</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-purple-60 p-4 rounded-md flex flex-col space-y-8">
            <div className="flex flex-row justify-between text-white font-bold">
              <div> Create room </div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </div>
            <div>
              <input
                className="w-full rounded-md bg-purple-50 px-4 py-2 text-white outline-none"
                type="text"
                value={roomName}
                onChange={handleInputChange}
                placeholder="ป้อนชื่อห้อง"
              />
            </div>

            <div className="flex flex-row justify-between w-full space-x-4">
            <div onClick={handleClose}  className="cursor-pointer w-full bg-purple-50 hover:bg-purple-40 border-2 border-yellow-50 rounded-2xl text-white px-4 py-2 text-center font-bold">
                Cancel
              </div>
              <div onClick={createNewRoomHandler} className="cursor-pointer w-full bg-yellow-60 hover:bg-yellow-40 text-purple-40 rounded-2xl px-4 py-2 text-center font-bold">
                Done
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateRoom;
