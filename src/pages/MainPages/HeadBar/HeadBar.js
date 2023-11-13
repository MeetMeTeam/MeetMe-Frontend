import React from 'react'
import JoinRoomRandom from './JoinRoomRandom'
import CreateRoom from './CreateRoom'
import User from './User'


export default function HeadBar() {

  return (
    <div className='mx-[2rem] pt-[1rem] flex flex-row justify-between space-x-4'>
        <img className='w-[45px]' src={process.env.PUBLIC_URL + '/meetme_logo.svg'} />
        <div className='flex flex-row space-x-4'>
          <div className='flex md:flex-row flex-col space-x-4'>
            {/* <JoinRoomRandom/> */}
             <CreateRoom/>
          </div>
        
        <div className='md:block'>
          < User/>
        </div>
        
        </div>
    </div>
  )
}
