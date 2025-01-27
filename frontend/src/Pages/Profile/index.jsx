import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import avatar from '../../assets/avatar.jpg'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateUserData,updateProfileImage ,deleteProfileImage} from '../../Services/Opeartion/Auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const {userData,token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState();
  const[hovered, setHovered]=useState();
  const [updatedData, setUpdatedData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
  });
  const navigate=useNavigate();
   const [updateFile,setUpdateFile]=useState(null);
   const fileRef=useRef(null);
  
  const dispatch=useDispatch()

  const validate=(data)=>{
    if(!data.firstName){
        toast.error("First Name is required");
        return false;
    }
    if(!data.lastName){
        toast.error("Last Name is required");
        return false;
    }
    return true
  }

  const updateProfile=async(e)=>{
    e.preventDefault()
    const validationResult=validate(updatedData);
    if(!validationResult) return;
    setLoading(true)
    try {
        const data=await updateUserData(updatedData,dispatch,token,navigate);
    } catch (error) {
        
    }finally{
        setLoading(false)
    }
  }

  const handleFile=()=>{
    fileRef.current.click();
  }

  const uploadProfile=async(formData)=>{
    setLoading(true)
     try {
        const result=await updateProfileImage(formData,dispatch,token);
     } catch (error) {
        
     }
     finally{
         setLoading(false)
     }
  }

  const handleImageChange=async(e)=>{
    const file=e.target.files[0];
    if(file){
        const formData=new FormData();
        formData.append('profileImage',file);
        uploadProfile(formData)
        const reader=new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setUpdateFile(reader.result)
        }
    }

  }

  const handleDeleteChange=async(e)=>{
    setLoading(true)
      try {
        const result=await deleteProfileImage(dispatch,token,userData.image_id)
      } catch (error) {
        
      }
      finally{
        setLoading(false)
      }
  }

  const changeHandler=(e)=>{
      setUpdatedData((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }

  useEffect(()=>{
    setUpdateFile(userData?.image || avatar)
  },[userData?.image])

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
        <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
            {/* <div>
                <IoArrowBack className='text-4xl lg:text-6xl text-white/50 cursor-pointer'/>
            </div> */}

            <div className='grid md:grid-cols-2 grid-cols-1 place-items-center gap-10 md:gap-0 '>
                <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center' onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
                <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
                  <AvatarImage src={updateFile} alt='profile' className='object-cover w-full h-full bg-black' required/> 
                        {/* // <AvatarFallback>CN</AvatarFallback> */}
                </Avatar>
                {
                    hovered && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/50 ring-1 rounded-full' onClick={userData?.image ? handleDeleteChange : handleFile}>
                        {
                            userData?.image ? (<FaTrash className='text-white text-3xl cursor-pointer' />) : (
                                <FaPlus className='text-white text-3xl cursor-pointer'/>
                            )
                        }
                    </div>
                    )
                }
                <input type='file' ref={fileRef} className='hidden' onChange={handleImageChange} name='profileImage' accept='.png,.jpg,.webp'/>

                </div>
                <div className='flex w-full md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
                    <div className='w-full'>
                        <Input placeholder='First Name' type='text' name='firstName' className='rounded-lg bg-[#2c2e3b] border-none p-6' value={updatedData.firstName || ''} onChange={changeHandler} required/>
                    </div>

                    <div className='w-full'>
                        <Input placeholder='Last Name' type='text' name='lastName' className='rounded-lg bg-[#2c2e3b] border-none p-6' value={updatedData.lastName || ''} onChange={changeHandler} required/>
                    </div>

                    <div className='w-full'>
                        <Input placeholder='Email' type='email' name='email' className='rounded-lg bg-[#2c2e3b] border-none p-6' value={userData?.email} disabled/>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <Button className='h-12 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300' disabled={loading} onClick={updateProfile}>Save Changes</Button>
            </div>
        </div>
    </div>
  )
}

export default Profile