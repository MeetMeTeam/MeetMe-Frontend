import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
export default function ChatAll() {
  return (
    <div>
      <Accordion sx={{ backgroundColor: '#FF9999' , borderRadius: '16px !important' , boxShadow: 'none !important' }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className='text-white' />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="text-[2.5rem] font-bold	text-white select-none">
      Chats
      </div>
      
        </AccordionSummary>
        <AccordionDetails className='flex flex-col space-y-4'>
     <div className='w-full h-[200px] bg-red-90 rounded-2xl mt-[-20px]'>

     </div>
     <div className=" w-full h-[2.6rem] bg-red-90 rounded-2xl flex flex-row justify-starts items-center px-4 py-2 space-x-2"> 
        <div className="relative z-0 w-full flex flex-row items-center  group">
      <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label className="peer-focus:font-medium absolute text-[20px] font-bold text-red-80  duration-300 transform -translate-y-1 scale-0 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-80   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-0 peer-focus:-translate-y-0">Your Message</label>
      <SendIcon className='text-white'/>
      </div>
        </div>
        </AccordionDetails>
      </Accordion>
     
    </div>
    
  )
}
