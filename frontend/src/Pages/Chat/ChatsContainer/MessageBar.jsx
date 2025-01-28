import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';

function MessageBar() {
    const[message,setMessage]=useState('');
    const emojiRef=useRef();
    const [showEmoji,setShowEmoji]=useState(false);

    function handleEmojiClick(e){
        if(emojiRef.current && !emojiRef.current.contains(e.target)){
            setShowEmoji(false);
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown',handleEmojiClick);
        return()=>{
            document.removeEventListener('mousedown',handleEmojiClick);
        }
    },[emojiRef])

    const messageHandler=(e)=>{
        setMessage(e.target.value);
    }

    const sendMessage=()=>{

    }

    const showEmojiHandler=()=>{
        setShowEmoji(!showEmoji);
    }

    const addEmoji=(e)=>{
        setMessage(message+e.emoji);
    }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-3'>
        <div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-2 pr-4'>
            <input type='text' placeholder='Type a message' className='flex-1 lg:p-5 p-2.5 bg-transparent rounded-md focus:border-none focus:outline-none' value={message} onChange={messageHandler}/>
            <div className='flex items-center gap-5 justify-center'>
            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300'>
                <GrAttachment className='md:text-2xl text-xl'/>
            </button>
            <div className='relative'>
            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={showEmojiHandler}>
                <RiEmojiStickerLine className='sm:text-2xl text-xl'/>
            </button>
            </div>
            <div className='absolute bottom-16 right-0' ref={emojiRef}>
                <EmojiPicker theme='dark' open={showEmoji} onEmojiClick={addEmoji} autoFocusSearch={false}/>
            </div>
            </div>
        </div>
        <button className='focus:border-none focus:outline-none focus:text-white transition-all duration-300 bg-[#8417ff] rounded-md flex items-center justify-center lg:p-5 p-2.5 hover:bg-[#741bda] focus:bg-[#741bda]' onClick={sendMessage}>
            <IoSend className='sm:text-2xl text-xl'/>
        </button>
    </div>
  )
}

export default MessageBar