import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Chat() {
  const {userData}=useSelector((state)=>state.auth)
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
    <div>
       chat
    </div>
  )
}

export default Chat