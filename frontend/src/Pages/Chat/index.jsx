import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContactsContainer from './ContactsContainer';
import EmptyChatsContainer from './EmptyChatsContainer';
import ChatsContainer from './ChatsContainer';

function Chat() {
  const {userData}=useSelector((state)=>state.auth)
  const {selectedChatType,selectedChatData,selectedChatMessages}=useSelector((state)=>state.chat)
  const navigate=useNavigate();

  useEffect(()=>{
    if(userData && !userData.profileSetup){
        navigate('/profile');
        toast('Complete your profile', {
          icon: '👤',
        });
    }
  },[userData,navigate])

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
       <ContactsContainer/>
       {/* <EmptyChatsContainer/> */}
       {
          selectedChatType ? (<ChatsContainer/>) : (<EmptyChatsContainer/>)
       }
       
    </div>
  )
}

export default Chat