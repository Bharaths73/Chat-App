import React from 'react'
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { closeChat } from '../../../Slices/ChatSlice';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from '../../../assets/avatar.jpg'

function ChatHeader() {
  const dispatch=useDispatch();
  const {selectedChatData,selectedChatType}=useSelector(state=>state.chat);
  
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-center">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-10 h-10 relative">
              <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                <AvatarImage
                  src={selectedChatData?.image || avatar}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                  required
                />
                {/* // <AvatarFallback>CN</AvatarFallback> */}
              </Avatar>
            </div>
            <div className="flex items-center text-white text-md ml-2">
              {selectedChatType==='contact' &&selectedChatData?.firstName && selectedChatData?.lastName
                ? `${selectedChatData?.firstName} ${selectedChatData?.lastName}`
                : "User"}
            </div>
          </div>

        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white transition-all duration-300"
            onClick={() => dispatch(closeChat())}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader