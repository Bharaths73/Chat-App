// import React, { useEffect, useState } from 'react'
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip";
//   import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
//   } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { FaPlus } from "react-icons/fa";
// import Lottie from 'react-lottie'
// // import { animationOptions } from '../../../utils'
// import { useDispatch, useSelector } from 'react-redux';
// import { getContacts } from '../../../Services/Opeartion/Contacts';
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import avatar from '../../../assets/avatar.jpg'
// import { setSelectedChatData, setSelectedChatMessages, setSelectedChatType } from '../../../Slices/ChatSlice';


// function CreateChannel() {
//     const[openNewContactModal, setOpenNewContactModal]=useState(false);
//     const [searchedContacts, setSearchedContacts] = useState([])
//     const [loading, setLoading] = useState(false)
//     const {token}=useSelector((state)=>state.auth)
//     const {selectedChatType,selectedChatData,selectedChatMessages}=useSelector((state)=>state.chat)
//     const dispatch=useDispatch()

//     const handleClick=()=>{
//         setOpenNewContactModal(true)
//     }

//     const modalHandler=()=>{
//         if(searchedContacts.length>0){
//            setSearchedContacts([])
//         }
//         setOpenNewContactModal(!openNewContactModal)
//     }

//     const searchContacts=async(e)=>{
//       const search=e.target.value;
//       setLoading(true)
//       try {
//         if(search.length>0){
//           const result=await getContacts(search,token);
//           if(result){
//             setSearchedContacts(result)
//           }
//         }
//         else{
//           setSearchedContacts([])
//         }
//       } catch (error) {
          
//       }
//       finally{
//         setLoading(false)
//       }
//     }

//     const selectNewContact=(contact)=>{
//        setOpenNewContactModal(false)
//        dispatch(setSelectedChatType("contact"))
//        dispatch(setSelectedChatData(contact))
//        setSearchedContacts([])
//     }

//   //   useEffect(() => {
//   //     console.log("Updated chat type: ", selectedChatType);
//   //     console.log("Updated chat data: ", selectedChatData);
//   // }, [selectedChatType, selectedChatData]); 

//   return (
//     <>
//       <TooltipProvider>
//                   <Tooltip>
//                       <TooltipTrigger>
//                           <FaPlus className='text-neutral-400 text-opacity-90 text-lg cursor-pointer transition-all duration-300' onClick={handleClick}/>
//                       </TooltipTrigger>
//                       <TooltipContent>
//                       <p>Select new contact</p>
//                       </TooltipContent>
//                   </Tooltip>
//       </TooltipProvider>

//     <Dialog open={openNewContactModal} onOpenChange={modalHandler} className=''>
//         <DialogContent className='bg-[#181920] border-none text-white w-auto h-auto flex flex-col'>
//             <DialogHeader>
//             <DialogTitle>Please select a contact</DialogTitle>
//             {/* <DialogDescription>
//                 Please select contact
//             </DialogDescription> */}
//             </DialogHeader>
//             <div className=''>
//                 <Input placeholder='Search Contacts' className='rounded-lg p-4 bg-[#2c2e3b] border-none' onChange={searchContacts}/>
//             </div>
//             <ScrollArea className="max-h-[300px] sm:w-[350px] w-[300px] rounded-md  p-0">
//                <div className="flex flex-col gap-1">
                  
//                </div>
//             </ScrollArea>

           
//         </DialogContent>
//     </Dialog>

//     </>
//   )
// }

// export default CreateChannel