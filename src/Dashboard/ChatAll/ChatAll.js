import React, { createContext, useState, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage } from '../../realtimeCommunication/socketConnection'
export default function ChatAll() {
    const [chatList, setChatList] = useState([
        {id:'1',name:'Winner',text:'บางมดฝนตกยัง???' , color:'red'},
        {id:'2',name:'User1272',text:'ใกล้แล้วจ้า' , color:'yellow'},
        {id:'3',name:'Nut',text:'มีใครอยากลองเปิดห้อง Admission Kmutt ไหมครับ' ,color:'blue'},
        {id:'4',name:'You',text:'ขอ Join ด้วยยยย' , color:'green'}
    ]);

  return (
    <div>
      <Accordion sx={{ backgroundColor: '#FF9999' , borderRadius: '16px !important' , boxShadow: 'none !important' }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className='text-white' />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="text-[1.5rem] font-bold	text-white select-none">
      Chats
      </div>
      
        </AccordionSummary>
        <AccordionDetails className='flex flex-col space-y-4'>
     <div className='py-4 px-2 text-[14px] font-bold w-full h-[200px] bg-red-90 rounded-2xl mt-[-20px]'>
     {chatList.map((item) => (
       <div className="flex flex-row" key={item.id}>
        <div className={`text-${item.color}-500 mr-2`}>{item.name + ':'} </div>
         <div className='text-white'>{item.text}</div>
         </div>
      ))}
     </div>
     <div className=" w-full h-[2.6rem] bg-red-90 rounded-2xl flex flex-row justify-starts items-center px-4 py-2 space-x-2"> 
        <div className="relative z-0 w-full flex flex-row items-center  group">
      <input onKeyDown={(e) => {
      if (e.key === 'Enter') {
        sendMessage("text");
      }
    }} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  />
      <label className="peer-focus:font-medium absolute text-[20px] font-bold text-red-80  duration-300 transform -translate-y-1 scale-0 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-80   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 peer-focus:-translate-y-0">Your Message</label>
      <SendIcon className='text-white cursor-pointer'/>
      </div>
        </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
    
  )
}
