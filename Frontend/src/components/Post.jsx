import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'



const Post = () => {
    return (
        <div className='my-8 w-full max-w-sm mx-auto'>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="" alt="post image" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1>username</h1>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <MoreHorizontal className='cursor-pointer' />
                    </DialogTrigger>
                    <DialogContent className="flex flex-col items-center text-sm text-center">
                        <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                        <Button variant="ghost" className="cursor-pointer w-fit">Add to favourites</Button>
                        <Button variant="ghost" className="cursor-pointer w-fit ">Cancel</Button>
                    </DialogContent>
                </Dialog>
            </div>
            <img
                className='rounded-sm my-2 w-full aspect-square object-cover'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQimBK-OEyWbnutukAqWwht7Q7nZL8NSBqw&s" alt="" />
                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center gap-3'>
                        <FaRegHeart size={'22px'}className='cursor-pointer' />
                        <MessageCircle className='cursor-pointer hover:text-gray-600' />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <Bookmark className='cursor-pointer hover:text-gray-600'/>
                </div>
                <span className='font-medium block mb-2'>1k likes</span>
                <p>
                    <span className='font-medium mr-2'>username</span>
                    caption
                </p>
                <span>View all 10 comments</span>
                <CommentDialog/>
                <div>
                    <input type="text"
                    placeholder='Add a comment...'
                    className='outline-none text-sm w-full'
                    />
                    <span className='text-[#3BADF8]'>Post</span>
                </div>
            </div>
    )
}

export default Post