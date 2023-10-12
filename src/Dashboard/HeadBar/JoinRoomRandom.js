import React from 'react'
import MonitorIcon from '@mui/icons-material/Monitor';
export default function JoinRoomRandom() {
  return (
    <div>
        <div className='flex flex-row items-center space-x-1 font-bold
        justify-center bg-white rounded-2xl text-purple-70 
        px-6 py-4
        opacity-40
        cursor-not-allowed
        '
        >
            <MonitorIcon/>
          <div> Join Room </div> 
        </div>
     
    </div>
  )
}
