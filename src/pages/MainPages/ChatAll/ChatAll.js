import React, { createContext, useState, useRef, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import { sendMessage } from '../../../realtimeCommunication/socketConnection'
import styles from "./scollBarChat.module.css"

export default function ChatAll() {
  
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(!expanded);
    };
    const userDetail = useSelector((state) => state.auth.userDetails);
    const chatList =  useSelector((state) => state.allChat.chatList);
    const color = ['purple','yellow','red','blue','green','black','orange']
    const [inputValue, setInputValue] = useState('');
    const randomIndex = Math.floor(Math.random() * inputValue.length);

    const sendText = () =>  {
        console.log(chatList.length+1)
        const newChat = {
          textId: chatList.length+1 ,
          id:userDetail._id,
          name:userDetail.username,
          text: inputValue,
          color:color[randomIndex]
        };
        
        // setChatList(chatList.concat(newChat));
        sendMessage(newChat)
    };

    

  return (
    <div   className={styles.scrollbar}>
      <Accordion expanded={expanded === true}  onChange={handleChange()} sx={{ backgroundColor: '#FF9999' , borderRadius: '16px !important' , boxShadow: 'none !important' }} >
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
     <div className='py-4 px-2 text-[14px] font-bold w-full h-[200px]  bg-red-90 rounded-2xl mt-[-20px] '>
      <div className='overflow-auto h-[170px]'>
          {chatList.map((item) => (
       <div className="flex flex-row" key={item.textId}>
        <div className={`text-${item.color}-500 mr-2`}>{item.name + ':'} </div>
         <div className='text-white'>{item.text}</div>
         </div>
      ))}
      </div>
   
     </div>
     <div className="w-full h-[2.6rem] bg-red-90 rounded-2xl flex flex-row justify-starts items-center px-4 py-2 space-x-2"> 
        <div className="relative z-0 w-full flex flex-row items-center  group">
      <input 
      onChange={e => setInputValue(e.target.value)}
      onKeyDown={(e) => {
      if (e.key === 'Enter') {
        sendText();
      }
    }} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  />
      <label className="peer-focus:font-medium absolute text-[20px] font-bold text-red-80  duration-300 transform -translate-y-1 scale-0 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-80   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 peer-focus:-translate-y-0">Your Message</label>
      <SendIcon onClick={()=>sendText()} className='text-white cursor-pointer'/>
      </div>
        </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
    
  )
}
