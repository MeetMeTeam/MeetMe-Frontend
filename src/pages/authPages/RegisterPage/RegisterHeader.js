import React from 'react'

export default function RegisterHeader() {
  return (
    <div className="flex flex-col space-y-6 mb-8">
    <div className="flex flex-row space-x-2 items-center">
        <img
        src={process.env.PUBLIC_URL + "meetme_logo.svg"}
        class="w-[50px]"
      />
      <div className="text-[30px] font-bold">
        MeetMe
      </div>   
    </div>
    <div className="text-[64px] font-extrabold">
    Sign Up
    </div>

    </div>
  )
}
