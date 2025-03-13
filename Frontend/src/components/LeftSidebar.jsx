import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import InstagramLogo from '../Instagram-Logo-No-Background.png'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice.js';
import store from '@/redux/store';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';

const LeftSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(store => store.auth)
    const [open,setOpen] = useState(false)
    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials : true})
            if(res.data.success){
                dispatch(setAuthUser(null))
                dispatch(setSelectedPost(null))
                dispatch(setPosts([]))
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const createPostHandler = () => {
        setOpen(true)
    }
    const sideBarHandler = (option) => {
        if(option === "Logout"){
            logoutHandler()
        }
        else if(option === 'Create'){
            createPostHandler()
        }
    }
    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notificaitons" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
    
            ),
            text: "Profile"
        },
        {icon : <LogOut/> , text : "Logout"}
    ]
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                 <img src={InstagramLogo} alt="Instagram Logo" width={200} /> 
                 <div>
                 {
                    sidebarItems.map((item,index) => {
                        return (
                            <div onClick = {() => sideBarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3' >
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }
                 </div>
            </div>
            <CreatePost open={open} setOpen={setOpen}/>
        </div>
    )
}

export default LeftSidebar