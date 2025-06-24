import React, { useEffect } from 'react'
import Title from '../../../components/Core/Title'
import ProfileInfo from './ProfileInfo'
import logo from '../../../assets/chatlogo.png'
import NewDm from './NewDm'
import { getContactsDm } from '../../../Services/Opeartion/Contacts'
import { useDispatch, useSelector } from 'react-redux'
import ContactsList from './ContactsList'
// import CreateChannel from './CreateChannel'

function ContactsContainer() {
  const {selectedChatType,selectedChatData,selectedChatMessages,directMessagesContacts}=useSelector((state)=>state.chat)
  const dispatch=useDispatch()
  const {token}=useSelector((state)=>state.auth)

  const getContacts=async()=>{
     try {
        const result=await getContactsDm(token,dispatch);
        // if(result){
        //   console.log("result is ",result);
        // }
     } catch (error) {
      
     } 
  }

  useEffect(()=>{
     getContacts()
  },[])

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
        <div className='flex gap-5 items-center mt-3 mb-10 ml-3'>
          <img src={logo} alt='logo' className='w-10 h-10'/>
          <h1 className='text-xl'>Chat App</h1>
        </div>
        <div className='flex flex-col gap-6'>
        <div className='cursor-pointer'>
          <div className='flex items-center justify-between pr-10 ml-3'>
            <Title text='Direct Messages'/>
            <NewDm/>
          </div>
          <div className='max-h-[38vh] overflow-y-auto scrollbar-none'>
            <ContactsList contacts={directMessagesContacts}/>
          </div>
        </div>
        <div className=' cursor-pointer'>
          <div className='flex items-center justify-between pr-10 ml-3'>
            <Title text='Channels'/>
            {/* <CreateChannel/> */}
          </div>
        </div>
        </div>
        <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer