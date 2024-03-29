import React from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { logout } from "../../../shared/utils/auth";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "react-responsive";

const User = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 685px)" });

  return (
    <div>
      <div
        className="button-profile flex flex-row  items-center space-x-1 font-bold
        justify-between bg-blue-70 rounded-2xl text-white cursor-pointer
        px-4 py-2 md:min-w-[170px]
        "
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {!isTabletOrMobile && (
          <div className="flex flex-col">
            <div className="text-[14px]">
              @{userDetails ? userDetails.username : ""}{" "}
            </div>
            <div className="font-medium text-[10px]">
              {userDetails ? userDetails.mail : ""}
            </div>
          </div>
        )}
        {/* <img className='w-[35px] h-[35px] object-cover rounded-md' src={userDetails?.image} /> */}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Typography className="button-logout cursor-pointer" onClick={logout} sx={{ p: 2 }}>
          {" "}
          Log out
        </Typography>
      </Popover>
    </div>
  );
};

export default User;
