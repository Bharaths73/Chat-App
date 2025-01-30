import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { getMessages } from '../../../Services/Opeartion/Messages';
import { MdFolderZip } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
import axios from 'axios';
import { IoCloseSharp } from 'react-icons/io5';

function MessageContainer() {
  const {selectedChatMessages,selectedChatType,selectedChatData}=useSelector((state)=>state.chat)
  const {token}=useSelector((state)=>state.auth)
  const scrollRef=useRef();
  const dispatch=useDispatch()
  const [loading,setLoading]=useState(false)
  const [showImage, setShowImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(()=>{
     if(scrollRef.current){
        scrollRef.current.scrollIntoView({behavior:'smooth'})
     }
  },[selectedChatMessages])

  const checkIfImage=(filePath)=>{
     const imageRegex=/\.(jpg|jpeg|png|gif|tiff|tif|webp|svg|ico|heic|heif)$/i;
     return imageRegex.test(filePath)
  }

  const downloadFile = async (fileUrl, fileName) => {
    try {
      // Fetch the file from Cloudinary URL
      const response = await axios.get(fileUrl,{responseType:"blob"});
      console.log("Cloudinary response is ",response);
      
  
      // Check if the file was fetched successfully
      if (!response.status===200) {
        throw new Error('Failed to fetch the file.');
      }
  
      // Get the file blob from the response
      const fileBlob = response.data;
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(fileBlob);
      link.download = "Temp_File"; // Set the file name for download
      link.click(); // Trigger the download
      link.remove()
      window.URL.revokeObjectURL(fileBlob)
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading the file:', error.message);
    }
  };
  

  const renderMessages=()=>{
     let lastDate=null;
     return selectedChatMessages?.length>0 && 
     selectedChatMessages?.map((message,index)=>{
      const messageDate=moment(message.timeStamp).format('YYYY-MM-DD');
      const showDate=messageDate!==lastDate
      lastDate=messageDate
      console.log("message seleceted data ",selectedChatData)
      console.log("message data ",message)
       return ( <div key={index}>
        {
           showDate && <div className='text-center text-gray-500'>
            {
               moment(message.timeStamp).format('LL')
            }
           </div>
        }
        {
           selectedChatType==='contact' && renderDmMessages(message)
        }
       </div>
       )
     })
  }

  const renderDmMessages=(message)=>{
      return <div className={`${message.sender===selectedChatData._id? "text-left" : "text-right"}`}>
         {
           message.messageType === 'text' && (
            <div className={`${message?.sender!==selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-white/20"} border inline-block px-4 py-2 rounded my-1 max-w-[50%] break-words`}>
            {
              message?.content
            }
          </div>
           )
         }
         {
           message.messageType==='file' && <div className={`${message?.sender!==selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-white/20"} border inline-block px-4 py-2 rounded my-1 max-w-[50%] break-words`}>
             {
               checkIfImage(message.fileUrl) ? <div className='cursor-pointer' onClick={()=>{setShowImage(true);
                setImageUrl(message.fileUrl)}
               }>
                <img src={message.fileUrl} height={300} width={300}/>
               </div> : <div className='flex items-center justify-center gap-4'>
                <span className='text-white/80 text-3xl bg-black/20 rounded-full p-3'>
                    <MdFolderZip/>
                </span>
                <span>{'fileName'}</span>
                <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' onClick={()=>downloadFile(message.fileUrl)}>
                  <IoMdDownload className=''/>
                </span>
               </div>
             }
           </div>
         }
         <div className='text-xs text-green-600'>
          {
            moment(message.timeStamp).format("LT")
          }
         </div>
      </div>
  }

  const getAllMessages=async()=>{
    setLoading(true)
    try {
       const result=await getMessages(token,dispatch,selectedChatData._id);
    } catch (error) {
        
    } finally{
       setLoading(false)
    }
  }

  useEffect(()=>{
    if(selectedChatData?._id && selectedChatType==='contact'){
        getAllMessages()
    }
  },[selectedChatData,selectedChatType,dispatch])

  return (
    <div className='flex-1 overflow-y-auto scrollbar-none p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:md-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef}>
         {
           showImage && <div className='fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop:blur-lg flex-col'>
            <div>
              <img src={imageUrl} className='h-[80vh] w-full bg-cover'/>
            </div>
            <div className='flex gap-5 fixed top-0 mt-5'>
              <button className='text-white/80 text-3xl bg-black/20 rounded-full p-3' onClick={()=>downloadFile(imageUrl)}>
                 <IoMdDownload/>
              </button>
              <button className='text-white/80 text-3xl bg-black/20 rounded-full p-3' onClick={()=>{
                setShowImage(false);
                setImageUrl(null);
              }}>
                 <IoCloseSharp/>
              </button>
            </div>
           </div>
         }
      </div>
    </div>
  )
}

export default MessageContainer