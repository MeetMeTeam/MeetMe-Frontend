import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import * as roomHandler from "../../realtimeCommunication/roomHandler";
import { useSelector } from 'react-redux';

const CreateRoom = () => {
  const isUserInRoom = useSelector(state => state.room.isUserInRoom);

  const createNewRoomHandler = () => {
    if(!isUserInRoom){
                roomHandler.createNewRoom();
    }
  };

  return (
    <div>
        <div className='flex flex-row items-center space-x-1 font-bold
        justify-center bg-purple-70 rounded-2xl text-white cursor-pointer
        px-6 py-4
        hover:bg-purple-60
        '
        onClick={createNewRoomHandler}
        >
            <AddIcon/>
          <div> Create Room</div> 
        </div>
     
    </div>
  )
}


export default CreateRoom