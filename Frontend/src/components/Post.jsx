import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'



const Post = () => {
    const [text,setText] = useState("")
    const [open,setOpen] = useState(false)
    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if(inputText.trim()){
            setText(inputText)
        }
        else{
            setText("")
        }
    }
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
                src="https://i.redd.it/could-young-kratos-have-potentially-easily-beaten-thor-v0-ztiio7o52n4d1.jpg?width=1170&format=pjpg&auto=webp&s=45007b13e2994b8256c17eba4616283be0f92712" alt="" />
                <div className='flex items-center justify-between my-2'>
                    <div className='flex items-center gap-3'>
                        <FaRegHeart size={'22px'}className='cursor-pointer' />
                        <MessageCircle onClick={()=>setOpen(true)} className='cursor-pointer hover:text-gray-600' />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <Bookmark className='cursor-pointer hover:text-gray-600'/>
                </div>
                <span className='font-medium block mb-2'>1k likes</span>
                <p>
                    <span className='font-medium mr-2'>username</span>
                    caption
                </p>
                <span onClick={() => setOpen(true)} className='cursor-pointer text-gray-400'>View all 10 comments</span>
                <CommentDialog open={open} setOpen={setOpen}/>
                <div className='flex items-center justify-between'>
                    <input type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='outline-none text-sm w-full'
                    />
                    {
                        text &&  <span className='text-[#3BADF8] cursor-pointer'>Send</span>
                    }
                   
                </div>
            </div>
    )
}

export default Post