import AddIcon from "@mui/icons-material/Add";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from "@mui/icons-material/Close";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamIcon from '@mui/icons-material/Videocam';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState , useEffect  } from "react";
import { useSelector } from "react-redux";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";
import {  setModalErrorSocket } from "../../../store/actions/alertActions";
import store from "../../../store/store";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: "none",
  borderRadius: "10px"
};

const CreateRoom = () => {
  const isShowModalErrorSocket = useSelector((state) => state.alert.isSocketErrorModal);
  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
  const [open, setOpen] = useState(false);
  const [roomType, setRoomType] = useState("VOICE");

  const createNewRoomHandler = () => {
    if (!isUserInRoom && roomName!=="") {
      roomHandler.createNewRoom(roomName , roomType);
    }
  };
  const handleRoomType = (type) => setRoomType(type);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, setRoomName] = useState("");
  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  useEffect(() => {
    if(isShowModalErrorSocket){
      handleClose()
      store.dispatch(setModalErrorSocket(null));
      setTimeout(() => {
      store.dispatch(setModalErrorSocket(true));
    }, 500);

    }
  }, [open])
  return (
    <div>
      <div
        className="flex  flex-row items-center space-x-1 font-bold
        justify-center bg-purple-70 rounded-2xl text-white cursor-pointer
        px-6 py-3.5
        hover:bg-purple-60
        sm:max-w-[1150px]
        max-w-[100px]
        "
        onClick={handleOpen}
      >
        <AddIcon />
        <div className="sm:text-[16px] text-[10px]"> Create Room</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-purple-60 p-4  rounded-md flex flex-col space-y-6">
            <div className="flex flex-row justify-between text-white font-bold">
              <div> Create room </div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </div>
            <div className="flex flex-row items-center space-x-4">
               <div>
              <div className="text-purple-40 text-[12px]">room name</div>
              <input
                className="w-full rounded-md bg-purple-50 px-4 py-2 text-white outline-none"
                type="text"
                value={roomName}
                onChange={handleInputChange}
                placeholder="ป้อนชื่อห้อง"
              />
            </div>

            <div>
              <div className="text-purple-40 text-[12px]">talk type</div>
              <div className="flex flex-row space-x-1">
                 <div className="bg-purple-50 rounded-md p-2 relative cursor-pointer"> 
                  <VideocamIcon onClick={()=>handleRoomType("VIDEO")} className="text-white"/ >
                 { roomType==="VIDEO" &&  <CheckIcon className="absolute bottom-0 right-[-5px] text-white" style={{ fontSize: 25 ,  fontWeight: "bold", }}/>}  
                     </div> 
                 <div onClick={()=>handleRoomType("VOICE")} className="cursor-pointer bg-purple-50 rounded-md p-2 relative"> 
                  <KeyboardVoiceIcon className="text-white"/>
               { roomType==="VOICE" &&  <CheckIcon className="absolute bottom-0 right-[-5px] text-white" style={{ fontSize: 25 ,  fontWeight: "bold", }}/>}  
                   </div>  
              </div>
         
            </div>
            </div>
           

            <div className="flex flex-row justify-between w-full space-x-4">
            <div onClick={handleClose}  className="cursor-pointer w-full bg-purple-50 hover:bg-purple-40 border-2 border-yellow-50 rounded-2xl text-white px-4 py-2 text-center font-bold">
                Cancel
              </div>
              <div onClick={createNewRoomHandler} className="cursor-pointer w-full bg-yellow-60 hover:bg-yellow-40 text-purple-40 rounded-2xl px-4 py-2 flex justify-center items-center font-bold">
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
