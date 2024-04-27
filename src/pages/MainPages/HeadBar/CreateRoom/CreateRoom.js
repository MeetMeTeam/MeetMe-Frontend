import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideocamIcon from "@mui/icons-material/Videocam";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as roomHandler from "../../../../realtimeCommunication/roomHandler";
import { setModalErrorSocket } from "../../../../store/actions/alertActions";
import store from "../../../../store/store";
import ThemeSelect from "./ThemeSelect";
import CategoriesSelect from "./CategoriesSelect";
import * as api from "../../../../api";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  outline: "none",
  borderRadius: "10px",
};

const initialThemeList = [
  {
    index: 0,
    name: "Halloween",
    link: "https://static.vecteezy.com/system/resources/previews/003/230/647/original/cute-halloween-background-with-spooky-elements-free-vector.jpg",
  },
  {
    index: 1,
    name: "Lobby",
    link: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/db935b0d-dc38-4b33-b784-38d334eb12af/deaddwc-3b08b1e2-b734-4062-b0ce-90bd0c581321.jpg/v1/fill/w_1024,h_576,q_75,strp/cinema_lobby___visual_novel_bg_by_gin_1994_deaddwc-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTc2IiwicGF0aCI6IlwvZlwvZGI5MzViMGQtZGMzOC00YjMzLWI3ODQtMzhkMzM0ZWIxMmFmXC9kZWFkZHdjLTNiMDhiMWUyLWI3MzQtNDA2Mi1iMGNlLTkwYmQwYzU4MTMyMS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.dpcjynKZtGxtOrCs-cMJAt1dtf_nN_lcZTSg3Mhd7Uc",
  },
  {
    index: 2,
    name: "Bar",
    link: "https://cdnb.artstation.com/p/assets/images/images/035/693/525/large/daryna-vladimirova-.jpg?1615642496",
  },
];

const CreateRoom = () => {
  const isShowModalErrorSocket = useSelector(
    (state) => state.alert.isSocketErrorModal
  );
  const isUserInRoom = useSelector((state) => state.room.isUserInRoom);
  const [open, setOpen] = useState(false);
  const [roomType, setRoomType] = useState("VOICE");
  const [theme, setTheme] = useState({
    index: 0,
    name: "Halloween",
    link: "https://static.vecteezy.com/system/resources/previews/003/230/647/original/cute-halloween-background-with-spooky-elements-free-vector.jpg",
  });

  const [selectCategories, setSelectCategories] = useState([]);
  const [themeList, setThemeList] = useState(initialThemeList);
  const [errorText, setErrorText] = useState("");
  const userDetail = useSelector((state) => state.auth.userDetails);

  async function getInventoryTheme() {
    const inventoryUser = await api.getInventory("theme");
    const receivedAvatarList = inventoryUser.data.data;
    const updatedThemeList = [...themeList]; // คัดลอก themeList เดิมเพื่อไม่ทับค่าเดิม

    for (let index = 0; index < receivedAvatarList.length; index++) {
      const theme = receivedAvatarList[index];
      updatedThemeList.push({
        index: updatedThemeList.length,
        name: theme.name,
        link: theme.img,
      });
    }
    setThemeList(updatedThemeList);
  }
  const createNewRoomHandler = () => {
    const detail = {
      theme: theme,
      cate: selectCategories,
      userNameCreate: userDetail.displayName,
    };
    const password = "test";
    if (!isUserInRoom && roomName !== "") {
      roomHandler.createNewRoom(roomName, roomType, detail, password);
    } else {
      setErrorText("Room name doesn't empty");
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
    if (isShowModalErrorSocket) {
      handleClose();
      store.dispatch(setModalErrorSocket(null));
      setTimeout(() => {
        store.dispatch(setModalErrorSocket(true));
      }, 500);
    }
  }, [open]);

  useEffect(() => {
    setErrorText("");
    if (roomName.length >= 50) {
      setErrorText("Room name must be in 50 characters");
    }
  }, [roomName]);
  useEffect(() => {
    getInventoryTheme();
  }, []);
  return (
    <div>
      <div
        className="flex  flex-row items-center space-x-1 font-bold
        justify-center bg-purple-70 rounded-2xl text-white cursor-pointer
        px-6 py-3
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
              <div> Create Room </div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </div>
            <ThemeSelect
              theme={theme}
              setTheme={setTheme}
              themeList={themeList}
            />

            <div className="flex flex-row items-center space-x-4">
              <div className="relative">
                <div className="text-red-60 w-[500px] text-[14px] absolute bottom-[-20px]">
                  {errorText}
                </div>

                <div className="text-purple-40 text-[12px]">Room Name</div>
                <input
                  maxLength={"50"}
                  className="w-full rounded-md bg-purple-50 px-4 py-3 text-white outline-none text-xs"
                  type="text"
                  value={roomName}
                  onChange={handleInputChange}
                  placeholder="Enter Your Room Name."
                />
              </div>
              <div>
                <div className="text-purple-40 text-[12px]">Talk Type</div>
                <div className="flex flex-row space-x-1">
                  <div className="bg-purple-50 rounded-md p-2 relative cursor-pointer">
                    <VideocamIcon
                      onClick={() => handleRoomType("VIDEO")}
                      className="text-white"
                    />
                    {roomType === "VIDEO" && (
                      <CheckIcon
                        className="absolute bottom-0 right-[-5px] text-white"
                        style={{ fontSize: 25, fontWeight: "bold" }}
                      />
                    )}
                  </div>
                  <div
                    onClick={() => handleRoomType("VOICE")}
                    className="cursor-pointer bg-purple-50 rounded-md p-2 relative"
                  >
                    <KeyboardVoiceIcon className="text-white" />
                    {roomType === "VOICE" && (
                      <CheckIcon
                        className="absolute bottom-0 right-[-5px] text-white"
                        style={{ fontSize: 25, fontWeight: "bold" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-purple-40 text-[12px]">Category Room</div>
              <CategoriesSelect
                selectCategories={selectCategories}
                setSelectCategories={setSelectCategories}
              />
            </div>

            <div className="flex flex-row justify-between w-full space-x-4">
              <div
                onClick={handleClose}
                className="cursor-pointer w-full bg-purple-50 hover:bg-purple-40 border-2 border-yellow-50 rounded-2xl text-white px-4 py-2 text-center font-bold"
              >
                Cancel
              </div>
              <div
                onClick={createNewRoomHandler}
                className="cursor-pointer w-full bg-yellow-60 hover:bg-yellow-40 text-purple-40 rounded-2xl px-4 py-2 flex justify-center items-center font-bold"
              >
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
