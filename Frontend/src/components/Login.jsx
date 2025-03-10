import React, { useEffect, useState } from 'react';
import InstagramLogo from '../Instagram-Logo-No-Background.png'; 

import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';


const Login = () => {
  const [input,setInput] = useState({
    email : "",
    password : ""
  })
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const dispactch = useDispatch()
  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('http://localhost:8000/api/v1/user/login',input,{
        headers : {
          "Content-Type" : 'application/json'
        },
        withCredentials : true
      })
      if(res.data.success){
        dispactch(setAuthUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
        setInput({
          email : "",
          password : ""
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center w-screen h-screen justify-center'> {/* Changed items-center to items-start */}

        <form onSubmit={submitHandler} className='shadow-lg flex flex-col gap-5 p-8'>
            <div className='my-4'>
                <img src={InstagramLogo} alt="Instagram Logo" width={200} /> 

            </div>
            <div>
            <Label className = "py-1 font-bold">Email</Label>
            <Input
            type = "email"
            name = "email"
            value = {input.email}
            onChange = {changeEventHandler}
            className = 'focus-visible:ring-transparent my-2'
            />
            </div>
            <div>
            <Label className = "py-1 font-bold">Password</Label>
            <Input
            type = "password"
            name = "password"
            value = {input.password}
            onChange = {changeEventHandler}
            className = 'focus-visible:ring-transparent my-2'
            />
            </div>
            {
              loading ? (
                <Button className='bg-blue-400'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                  Please wait
                </Button>
              ) : (
                <Button type = 'submit' className='bg-blue-600 hover:bg-blue-400'>Login</Button>
              )
            }
            <span className='text-center'>Don't have an account ? <Link to='/signup' className='text-blue-600'>Signup</Link></span>
        </form>
    </div>
  )
}
export default Login
