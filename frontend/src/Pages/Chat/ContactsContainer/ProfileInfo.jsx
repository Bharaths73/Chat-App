import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../../assets/avatar.jpg'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";
import { setLoading } from '../../../Slices/AuthSlice';
import { logout } from '../../../Services/Opeartion/Auth';

function ProfileInfo() {
    const {userData}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const [loading , setLoading]=useState(false);
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();

    const logoutHandler=async(e)=>{
        setLoading(true)
        try {
            const result=await logout(token , dispatch , navigate)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]'>
        <div className="flex gap-3 items-center justify-center">
            <div className='w-10 h-10 relative'>
            <Avatar className='h-12 w-12  rounded-full overflow-hidden'>
                <AvatarImage src={userData?.image || avatar} alt='profile' className='object-cover w-full h-full bg-black' required/> 
                                    {/* // <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
            </div>
            <div className='flex items-center text-white text-lg font-medium ml-2'>
                {userData?.firstName && userData?.lastName ? `${userData?.firstName} ${userData?.lastName}` : 'User'} 
            </div>
        </div>
        <div className='flex gap-5'>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaEdit className='text-purple-500 text-3xl font-medium cursor-pointer' onClick={()=>navigate('/profile')}/>
                </TooltipTrigger>
                <TooltipContent>
                <p>Edit Profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <IoLogOut className='text-red-600 text-3xl font-bold cursor-pointer' onClick={logoutHandler}/>
                </TooltipTrigger>
                <TooltipContent>
                <p>Logout</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}

export default ProfileInfo