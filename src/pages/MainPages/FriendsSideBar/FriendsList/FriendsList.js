import styles from "../../../../shared/css/scollBarFreind.module.css";
import React, { useEffect } from "react";
import FriendsListItem from "./FriendsListItem";
import { connect, useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import store from "../../../../store/store";
import {
  getFriends,
  getInviteList,
} from "../../../../store/actions/friendsAction";
import Loading from "../../../../shared/components/Loading";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AddFriends from "./AddFriends";
import InviteList from "./InviteList";

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  // console.log(onlineUsers)
  // console.log(friends)
  // friends.forEach((f) => {
  //   const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
  //   f.isOnline = isUserOnline ? true : false;
  // });

  return friends;
};

const FriendsList = ({ friends, onlineUsers }) => {
  const isFriendAlready = useSelector(
    (state) => state.friends.setIsFriendAlready
  );
  const [expanded, setExpanded] = React.useState(true);
  const [typePage, setTypePage] = React.useState("FRIENDS");

  // const [isFriendAlready, setIsFriendAlready] = React.useState(false);
  const inviteList = useSelector((state) => state.friends.invites);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(friends);
  }, [friends]);

  useEffect(() => {
    console.log(isFriendAlready);
  }, [isFriendAlready]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(!expanded);
  };

  function init() {
    store.dispatch(getFriends());
    store.dispatch(getInviteList());
  }
  return (
    <div className={styles.scrollbar + " relative"}>
      <span className="absolute top-2 z-50 left-4  flex flex-row mb-[-10px] space-x-2">
        <div
          onClick={() => setTypePage("FRIENDS")}
          className={`${
            typePage === "FRIENDS"
              ? "text-[2rem] text-white "
              : "text-[1rem] text-blue-70 mt-4 "
          }] font-bold	 select-none cursor-pointer`}
        >
          Friends
        </div>
        <div className="mt-4 text-white">|</div>
        <div
          onClick={() => setTypePage("INVITE")}
          className={`${
            typePage === "INVITE"
              ? "text-[2rem] text-white "
              : "text-[1rem] text-blue-70 mt-4 "
          }] font-bold select-none  cursor-pointer relative`}
        >
          Request
          {typePage === "FRIENDS" && inviteList.length > 0 && (
            <div className="bg-red-70 absolute top-[-2px] right-[-9px] w-[8px] h-[8px] rounded-full">
              ⠀
            </div>
          )}
        </div>
      </span>
      <Accordion
        expanded={expanded === true}
        onChange={handleChange()}
        sx={{
          backgroundColor: "#9EBCFA",
          borderRadius: "16px !important",
          boxShadow: "none !important",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-white" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="p-4"></div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {/* <div className="mt-[-5px] border border-1 w-full h-[40px] border-blue-70 rounded-2xl flex flex-row justify-starts items-center px-4 py-2 space-x-2"> 
        <SearchIcon className="text-blue-90"/>
        <div className="relative z-0 w-full  group">
      <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label className="peer-focus:font-medium absolute text-[1.25rem] font-bold text-blue-90  duration-300 transform -translate-y-1 scale-0 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-80  peer-focus:dark:text-blue-70 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 peer-focus:-translate-y-0">search</label>
      </div>
        </div> */}
            {typePage === "FRIENDS" && (
              <div className="mt-[-5px]  w-full h-[40px]  flex flex-row justify-starts items-center  space-x-2">
                <AddFriends />
              </div>
            )}
          </div>
          {typePage === "INVITE" && <InviteList />}
          {typePage === "FRIENDS" && (
            <div>
              {!isFriendAlready && (
                <div className="h-[12.5rem] mt-4 overflow-auto pr-2 flex items-center justify-center">
                  <Loading />
                </div>
              )}
              {isFriendAlready && friends?.length === 0 && (
                <div className="text-white drop-shadow-md mt-[-20px] flex-col h-[12.5rem]  overflow-auto pr-2 flex items-center justify-center">
                  <Diversity3Icon />
                  <div> "It seems like you don't have any friends yet ... </div>
                  <div className="text-[12px]">
                    Try creating or joining a room to meet new people quickly!
                  </div>
                </div>
              )}
              {isFriendAlready && friends?.length > 0 && (
                <div className="h-[12.5rem] mt-4 overflow-auto pr-2">
                  {checkOnlineUsers(friends, onlineUsers).map((f) => (
                    <FriendsListItem
                      username={f.username}
                      id={f.id}
                      key={f.id}
                      isOnline={f.isOnline}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
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
