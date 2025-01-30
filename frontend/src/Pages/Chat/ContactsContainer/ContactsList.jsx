import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedChatData, setSelectedChatMessages, setSelectedChatType } from '../../../Slices/ChatSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from '../../../assets/avatar.jpg'

function ContactsList({contacts,isChannel=false}) {
    const {selectedChatType,selectedChatData,selectedChatMessages,directMessagesContacts}=useSelector((state)=>state.chat)
    const dispatch=useDispatch()
    console.log("DirectMessage is ",directMessagesContacts);
    

    const handleClick=(contact)=>{
        if(isChannel){
            dispatch(setSelectedChatType('channel'))
        }
        else{
            dispatch(setSelectedChatType('contact'))
        }
        dispatch(setSelectedChatData(contact));
        if(selectedChatData && selectedChatData._id!==contact._id){
            dispatch(setSelectedChatMessages([]))
        }
    }
  return (
    <div className="mt-5">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className={`pl-8 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex flex-col gap-5 justify-center items-start text-neutral-300">
            {!isChannel && (
              <div className="flex gap-2 items-center justify-center">
                {/* <div className="w-10 h-10 relative"> */}
                <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                  <AvatarImage
                    src={contact?.image || avatar}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                    required
                  />
                  {/* // <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
                {/* </div> */}
                <div className="flex items-center text-white text-sm font-medium ">
                  {isChannel && (
                    <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full"></div>
                  )}
                  {isChannel ? (
                    <span>{contact.name}</span>
                  ) : contact?.firstName && contact?.lastName ? (
                    `${contact?.firstName} ${contact?.lastName}`
                  ) : (
                    "User"
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactsList