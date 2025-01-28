import React from 'react'
import Title from '../../../components/Core/Title'
import ProfileInfo from './ProfileInfo'
import logo from '../../../assets/chatlogo.png'
import NewDm from './NewDm'

function ContactsContainer() {
  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
        <div className='flex gap-5 items-center mt-3 mb-10 ml-3'>
          <img src={logo} alt='logo' className='w-10 h-10'/>
          <h1 className='text-xl'>Chat App</h1>
        </div>
        <div className='flex flex-col gap-6'>
        <div className='ml-3 cursor-pointer'>
          <div className='flex items-center justify-between pr-10'>
            <Title text='Direct Messages'/>
            <NewDm/>
          </div>
        </div>
        <div className='ml-3 cursor-pointer'>
          <div className='flex items-center justify-between pr-10'>
            <Title text='Channels'/>
          </div>
        </div>
        </div>
        <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer