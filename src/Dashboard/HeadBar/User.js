import React from 'react'
import { useSelector } from 'react-redux';
import { connect } from "react-redux";

 const  User = () =>{
    const userDetails = useSelector(state => state.auth.userDetails);

  return (
    <div>
        <div className='flex flex-row  items-center space-x-1 font-bold
        justify-between bg-blue-70 rounded-2xl text-white cursor-pointer
        px-4 py-2 w-[170px]
        '
        >
            <div className='flex flex-col'>
                <div>@{userDetails ? userDetails.username : ''} </div>
                <div className='font-medium text-[10px]'>Edit Profile</div>
            </div>
            <img className='w-[40px]' src={process.env.PUBLIC_URL + '/friend-pic.png'} />
        </div>
     
    </div>
  )
}

  export default User