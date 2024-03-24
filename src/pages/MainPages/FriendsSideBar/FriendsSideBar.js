import * as React from "react";
import FriendsList from "./FriendsList/FriendsList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PeopleIcon from "@mui/icons-material/People";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 500,
  borderRadius: "15px",
};

const FriendsSideBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div
        className="bg-purple-70 py-3 cursor-pointer hover:bg-purple-60 font-bold rounded-2xl px-4 text-white"
        onClick={handleOpen}
      >
        <PeopleIcon /> friend
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-blue-80 rounded-3xl">
            <FriendsList />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FriendsSideBar;
