import React, { useState , useEffect} from "react";
import { useSelector  } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import store from "../../../../store/store";
import { getInviteList , acceptFriendInvitation , acceptFriendInvitationAll, setInvite, rejectFriendInvitation , rejectFriendInvitationAll} from '../../../../store/actions/friendsAction'
import { validateMail } from "../../../../shared/utils/validators";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  outline: "none",
  borderRadius: "10px",
};

const InviteList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inviteList = useSelector((state) => state.friends.invites);

  useEffect(() => {
    init()
  }, [])

  function init () {
      store.dispatch(getInviteList());
  }

  function acceptFriends (id){
      store.dispatch(acceptFriendInvitation(id))
      const newInviteList = inviteList.filter((item) => item.inviteId !== id);
      store.dispatch(setInvite(newInviteList))    

  }

  function rejectFriends (id) {
    store.dispatch(rejectFriendInvitation(id))    
  }

  function acceptAll() {
    store.dispatch(acceptFriendInvitationAll())    
  }

  function rejectAll() {
    store.dispatch(rejectFriendInvitationAll())    
  }


  return (
    <div className="cursor-pointer z-50">
      <div
        className="flex flex-row items-center space-x-1 font-bold
        justify-center bg-blue-70 rounded-md text-white 
        px-2 py-2 w-full
        hover:bg-blue-60
        relative
        "
        onClick={handleOpen}
      >
        <NotificationsActiveIcon  style={{ fontSize: 18 }}/>
        {inviteList?.length > 0 &&
         <div className="absolute z-20 text-white bg-red-50 rounded-full px-[3px] text-[7px] right-0 bottom-[3px]">
         {inviteList.length}
         </div>
        }
       
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-blue-80 p-4 rounded-md flex flex-col space-y-6 h-[430px]">
            <div className="flex flex-row justify-between text-white font-bold">
              <div className="text-[20px]"> Pending Invitations </div>
              <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </div>
            <div className="h-[300px] space-y-4 overflow-auto">
              { inviteList && inviteList?.map((item)=> (
             <div className="bg-blue-70 rounded-md">
             <div className="flex flex-row justify-between items-center space-x-4 p-2 ">
                 <div className="flex flex-row space-x-4">
                    <div className="bg-blue-gray-900 rounded-full px-4 w-12 h-12 text-[12px]">
                     .
                     </div>
                     <div className="flex flex-col">
                         <div className="text-[1rem]"> {item.username} </div>
                         <div className="text-[12px]">  {item.email} </div>
                     </div>  
                 </div>
                    
                     <div className="flex flex-row space-x-2">
                         <div onClick={()=> acceptFriends(item.inviteId)} className="cursor-pointer text-[12px] bg-green-60 rounded-md text-white p-2">accept</div>
                         <div onClick={()=> rejectFriends(item.inviteId)} className="cursor-pointer text-[12px] bg-red-60 rounded-md text-white p-2">reject</div>
                     </div>
             </div>
         </div>
         ))}  
            </div>
              <div className="flex justify-end space-x-2"> 
              <div onClick={()=> acceptAll()} className="cursor-pointer">รับทั้งหมด</div>
               <div onClick={()=> rejectAll()} className="cursor-pointer">ลบทั้งหมด</div></div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default InviteList;
