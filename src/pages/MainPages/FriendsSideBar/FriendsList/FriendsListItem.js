import React from "react";
import Button from "@mui/material/Button";
import Avatar from "../../../../shared/components/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions } from "../../../../store/actions/chatActions";
import { connect } from "react-redux";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
const FriendsListItem = ({ id, username, isOnline , setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };

  return (
    <div
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "65px",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
      className="bg-blue-70 rounded-2xl px-4"
    >
      <div className="relative">
           <img src={process.env.PUBLIC_URL + '/friend-pic.png'} />
      {isOnline && <OnlineIndicator />}
      </div>
   
      <div className="flex flex-row items-center justify-between w-full">
         <div
       className="text-white flex flex-col space-y-[-7px] font-bold ml-2"
      >
      <div className="text-[18px]"> {username} </div>  
      <div className="text-[14px]">หาคนเล่นเกม DM </div>
      </div>
     
     {/* <div className="flex space-x-1">
      <MailOutlineIcon className="text-white cursor-pointer hover:bg-blue-60 rounded-md" style={{ fontSize: 33 }}/>
      <PhoneInTalkIcon className="text-white cursor-not-allowed hover:bg-blue-60 rounded-md" style={{ fontSize: 33 }}/>
     </div> */}
      </div>
      
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendsListItem);
