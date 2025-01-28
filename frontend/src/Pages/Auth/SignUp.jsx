import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signUp } from '../../Services/Opeartion/Auth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const[signUpData, setSignUpData]=useState({
      email:'',
      password:'',
      confirmPassword:''
    });
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
    const signUpHandler=(e)=>{
      setSignUpData((prevData)=>({
          ...prevData,
          [e.target.name]:e.target.value
      }))
    }
  
    const sigUpSubmitHandler=async(e)=>{
       e.preventDefault(); 
       if(signUpData.password!==signUpData.confirmPassword){
           toast.error("Password and Confirm Password is not Match");
           return;
       }
          setLoading(true);
          try {
            const result = await signUp(signUpData,dispatch,navigate);
            if (result) {
              console.log("SignUp successful:", result);
            }
          } catch (error) {
            console.error("Error during sign-up:", error.message || error);
          } finally {
            setLoading(false);
          }
    }
  
    return (
      <form className='flex flex-col gap-5 mt-10' onSubmit={sigUpSubmitHandler}>
          <Input placeholder='Email' type='email' name='email' className='rounded-full p-6' value={signUpData.email} onChange={signUpHandler} required/>
  
          <Input placeholder='Password' type='password' name='password' className='rounded-full p-6' value={signUpData.password} onChange={signUpHandler} required/>

          <Input placeholder='Confirm Password' type='password' name='confirmPassword' className='rounded-full p-6' value={signUpData.confirmPassword} onChange={signUpHandler} required/>
  
          <Button className='py-5 font-semibold text-md rounded-full mt-2' disabled={loading}>Sign Up</Button>
      </form>
    )
}

export default SignUp