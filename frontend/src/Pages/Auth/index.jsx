import React from 'react'
import login from '../../assets/login2.png'
import victory from '../../assets/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Auth() {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div className='pb-10 bg-white border-2 border-white text-opacity-20 shadow-2xl w-[90vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
        <div className=' flex flex-col gap-10 items-center justify-center'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center'>
              <h1 className='text-3xl font-bold md:text-5xl'>Welcome</h1>
              <img src={victory} alt='' className='h-[100px]'/>
            </div>
            <p className='md:font-medium text-sm text-center text-black text-opacity-50'>Fill in the details to get started with the chat app</p>
          </div>
          <div className='flex items-center justify-center w-full'>
          <Tabs defaultValue="signin" className="w-full md:w-3/4 md:p-0 p-5">
              <TabsList className='bg-transparent rounded-none w-full'>
                <TabsTrigger value="signin" className='data-[state-active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>SignIn</TabsTrigger>
                <TabsTrigger value="signup" className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'>SignUp</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignIn/>
              </TabsContent>
              <TabsContent value="signup">
                <SignUp/>
              </TabsContent>
            </Tabs>

          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={login} alt='' className='h-[100%]'/>
        </div>
      </div>
    </div>
  )
}
