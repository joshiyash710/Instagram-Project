import { Heart, Home, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import InstagramLogo from '../Instagram-Logo-No-Background.png'; 
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
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

        ),
        text: "Profile"
    }
]
const LeftSidebar = () => {
    return (
        <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
            <div className='flex flex-col'>
                 <img src={InstagramLogo} alt="Instagram Logo" width={200} /> 
                {
                    sidebarItems.map((item,index) => {
                        return (
                            <div key={index} className='flex items-center gap-4 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default LeftSidebar