import styles from "../../../shared/css/scollBarFreind.module.css"
import React, { useEffect } from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { connect } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const MainContainer = styled("div")({
  width: "100%",
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
    f.isOnline = isUserOnline ? true : false;
  });

  return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {

  useEffect(() => {

console.log("friend coming")
    }
  , [friends]);

  return (
      <div className={styles.scrollbar}>
      <Accordion sx={{ backgroundColor: '#9EBCFA' , borderRadius: '16px !important' , boxShadow: 'none !important' }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className='text-white'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="text-[1.5rem] font-bold	text-white select-none">
      Friends
      </div>
      
        </AccordionSummary>
        <AccordionDetails>
        <div>
        <div className="mt-[-5px] border border-1 w-full h-[2.6rem] border-blue-70 rounded-2xl flex flex-row justify-starts items-center px-4 py-2 space-x-2"> 
        <SearchIcon className="text-blue-90"/>
        <div className="relative z-0 w-full  group">
      <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label className="peer-focus:font-medium absolute text-[20px] font-bold text-blue-90  duration-300 transform -translate-y-1 scale-0 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-80  peer-focus:dark:text-blue-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 peer-focus:-translate-y-0">search</label>
      </div>
        </div>
      </div>
      <div className="h-[230px] mt-4 overflow-auto pr-2 ">
        {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem 
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
      </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
    
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
