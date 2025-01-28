import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input,setInput] = useState({
        username : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name] : e.target.value})
    }
    const signupHandler = async (e) => {
        e.preventDefault()
        console.log(input);
        
        try {
            setLoading(true)
           const res = await axios.post('http://localhost:8000/api/v1/user/register',input,{
            headers : {
                'Content-Type' : 'application/json',
            },
            withCredentials : true
           })
          
           if(res.data.success) {
            navigate('/login')
            toast.success(res.data.message)
            setInput({
                username : "",
                email : "",
                password : ""
            })
           }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            setInput({
                username : "",
                email : "",
                password : ""
            })
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className='flex items-center w-screen h-screen justify-center'>
            <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8'>
                <div className='my-4'>
                        <h1 className='text-center font-bold text-xl'>Logo</h1>
                        <p className='text-center text-sm'>Signup to see the photos and videos from your friend</p>
                </div>
                <div>
                    <Label className="py-2 font-bold">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        value = {input.username}
                        onChange = {changeEventHandler}
                        placeholder="Enter your username"
                        className="focus-visible:ring-transparent"
                    />
                </div>
                <div>
                    <Label className="py-2 font-bold">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value = {input.email}
                        onChange = {changeEventHandler}
                        placeholder="Enter your email"
                        className="focus-visible:ring-transparent"
                    />
                </div>
                <div>
                    <Label className="py-2 font-bold">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value = {input.password}
                        onChange = {changeEventHandler}
                        placeholder="Enter your password"
                        className="focus-visible:ring-transparent"
                    />
                </div>
                {
                    loading ? (
                        <Button>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please Wait
                        </Button>
                    ) : (
                        <Button variant="outline" type="submit" >Signup</Button>
                    )
                }
                <span>Already have an account ? <Link className='text-blue-600' to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup