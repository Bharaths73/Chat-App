import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from "react-icons/gr";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../context/SocketContext';
import { sendFile } from '../../../Services/Opeartion/Messages';
import toast from 'react-hot-toast';

function MessageBar() {
    const[message,setMessage]=useState('');
    const emojiRef=useRef();
    const fileInputRef=useRef();
    const [showEmoji,setShowEmoji]=useState(false);
    const {selectedChatData,selectedChatType}=useSelector((state)=>state.chat);
    const {token}=useSelector((state)=>state.auth);
    const {userData}=useSelector((state)=>state.auth);
    const socket=useSocket()
    const dispatch=useDispatch()

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
        if (!socket) {
            // console.error("Socket is not connected. Cannot send message.");
            toast.error("Cannot connect to server")
            return;
          }
        if(selectedChatType==='contact'){
            socket.emit('sendMessage',{
                sender:userData._id,
                content:message,
                recipient:selectedChatData._id,
                messageType:'text',
                fileUrl:undefined
            })
        }
        setMessage('');
    }

    const showEmojiHandler=()=>{
        setShowEmoji(!showEmoji);
    }

    const addEmoji=(e)=>{
        setMessage(message+e.emoji);
    }

    const handleAttachmentClick=()=>{
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleAttachmentChange=async(e)=>{
        try {
            const file=e.target.files[0];
            
            if(file){
                const formData=new FormData();
                formData.append("file",file)
                const result=await sendFile(formData,token,dispatch)
                if(result && selectedChatType=='contact'){
                    socket.emit('sendMessage',{
                        sender:userData._id,
                        content:undefined,
                        recipient:selectedChatData._id,
                        messageType:'file',
                        fileUrl:result
                    })
                }
            }
            
        } catch (error) {
            // console.log("error is ",error);
            toast.error("Failed to send message")
        }
    }

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-10 gap-3'>
        <div className='flex-1 flex bg-[#2a2b33] rounded-full items-center gap-2 pr-4'>
            <input type='text' placeholder='Type a message' className='flex-1 lg:p-5 p-2.5 bg-transparent rounded-md focus:border-none focus:outline-none' value={message} onChange={messageHandler}/>
            <div className='flex items-center md:gap-8 gap-5 justify-center'>
            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300' onClick={handleAttachmentClick}>
                <GrAttachment className='md:text-2xl text-xl'/>
            </button>
            <input type='file' className='hidden' ref={fileInputRef} onChange={handleAttachmentChange}/>
            <div className='relative'>
            <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300 mr-1 mt-1' onClick={showEmojiHandler}>
                <MdOutlineEmojiEmotions className='sm:text-2xl text-xl'/>
            </button>
            
            </div>
            <div className='absolute bottom-16 right-0' ref={emojiRef}>
                <EmojiPicker theme='dark' open={showEmoji} onEmojiClick={addEmoji} autoFocusSearch={false}/>
            </div>
            </div>
        </div>
        <button className='focus:border-none focus:outline-none focus:text-white transition-all duration-300 bg-[#8417ff] rounded-full flex items-center justify-center lg:p-5 p-3 hover:bg-[#741bda] focus:bg-[#741bda] ' onClick={sendMessage}>
            <IoSend className='text-2xl'/>
        </button>
    </div>
  )
}

export default MessageBar