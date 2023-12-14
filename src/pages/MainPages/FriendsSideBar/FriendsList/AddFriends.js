import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import store from "../../../../store/store";
import { sendFriendInvitation } from '../../../../store/actions/friendsAction'
import { validateMail } from "../../../../shared/utils/validators";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  borderRadius: "10px",
};

const AddFriends = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  function addFriend () {
    if(validateMail(email)){
      store.dispatch(sendFriendInvitation(email));
      setEmail("");

    }
  }
  return (
    <div className="cursor-pointer z-50">
      <div
        className="flex flex-row items-center space-x-1 font-bold
        justify-center bg-blue-70 rounded-md text-white 
        px-2 py-2 w-full
        hover:bg-blue-60
        "
        onClick={handleOpen}
      >
        <GroupAddIcon  style={{ fontSize: 18 }}/>
        <div className="text-[12px] font-light">add</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-blue-80 p-4 rounded-md max-w-[350px] flex flex-col space-y-1">
            <div className="flex flex-row justify-between text-white font-bold">
              <div> Add friend </div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </div>
            <div className="flex flex-row justify-between w-full items-center space-x-4">
              <div>
                <div className="text-blue-40 text-[12px] ml-0.5 mb-1">
                  email
                </div>
                <input
                  className="w-full rounded-md bg-blue-50 px-4 py-2 text-white outline-none"
                  type="text"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="ป้อนอีเมล์"
                />
              </div>
              <div onClick={()=> addFriend()} className={`w-[15%] text-white rounded-md  px-9 py-2 mt-5 flex items-center justify-center ${validateMail(email) ? ' cursor-pointer bg-yellow-50' : ' bg-yellow-80 cursor-not-allowed'}`}
     
              >
                Add
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddFriends;
