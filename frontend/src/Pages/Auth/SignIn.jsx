import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast';
import { login } from '../../Services/Opeartion/Auth';
import { useDispatch } from 'react-redux';

function SignIn() {
  const[signInData, setSignInData]=useState({
    email:'',
    password:'',
  });
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()
  const navigate=useNavigate();

  const signInHandler=(e)=>{
    setSignInData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value
    }))
  }

  const sigInSubmitHandler = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const result = await login(signInData,dispatch,navigate);
    } catch (error) {
      // console.error("Error during sign-in:", error.message || error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
        <form className='flex flex-col gap-5 mt-10' onSubmit={sigInSubmitHandler}>
        <Input placeholder='Email' type='email' name='email' className='rounded-full p-6' value={signInData.email} onChange={signInHandler} required/>

        <Input placeholder='Password' type='password' name='password' className='rounded-full p-6' value={signInData.password} onChange={signInHandler} required/>

        <Button className='py-5 font-semibold text-md rounded-full mt-2' disabled={loading}>Sign In</Button>

        <Link to="/forgot-password" className='w-full flex items-center justify-center'>
            <p className="mt-1 max-w-max text-sm text-blue-500">
                Forgot Password
            </p>
        </Link>
    </form>
  )
}

export default SignIn