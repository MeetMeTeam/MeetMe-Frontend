import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";

export default function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const notiList = useSelector((state) => state.alert.Notification);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="relative cursor-pointer border-purple-60 border-2 rounded-2xl text-purple-60 h-fit py-3 px-3.5"
      >
        <NotificationsNoneIcon />
        {notiList?.length > 0 && (
          <div className="w-[15px] h-[15px] rounded-full absolute top-[-7px] right-1 bg-purple-60" />
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="mt-14"
      >
        <div className="bg-purple-80 w-[300px] p-3 text-white">
          <div className="font-bold mb-2"> Notifications</div>
          {notiList.map((f) => (
            <div className="flex justify-between flex-row items-center space-x-2">
              <div className="flex flex-row space-x-2 items-center">
                <img
                  src={f.userDetail.image}
                  className="rounded-full w-[30px]"
                  alt="profile pic"
                />
                <div className="text-[10px]">
                  <span className="font-bold">{f.userDetail.username} </span>{" "}
                  invited room to join their room
                </div>
              </div>

              <div
                onClick={() => roomHandler.joinRoom( f.room )}
                className="cursor-pointer font-bold text-[12px] text-purple-60 bg-purple-90 py-2 px-3 rounded-2xl"
              >
                Join
              </div>
            </div>
          ))}
          {notiList.length === 0 && (
            <div className="w-full flex justify-center text-[12px]">
              ยังไม่มีแจ้งเตือน{" "}
            </div>
          )}

          <div></div>
        </div>
      </Popover>
    </div>
  );
}
