import React, { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen }) => {
    const [text,setText] = useState('')
    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if(inputText.trim()){
            setText(inputText)
        }else{
            setText('')
        }
    }
    const sendMessageHandler = async () => {
        alert(text)
    }
    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img src="https://www.hdwallpapers.in/download/kratos_in_god_of_war_4k-HD.jpg"
                            alt="post_img"
                            className='w-full h-full object-cover rounded-l-lg'
                        />
                    </div>
                    <div className='w-1/2 flex flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex gap-3 items-center'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src="" />
                                        <AvatarFallback className="text-white">CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link className='font-semibold text-xs text-white'>username</Link>
                                </div>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='text-white cursor-pointer'/>
                                </DialogTrigger>
                                <DialogContent className='flex flex-col items-center text-sm text-center'>
                                    <div className='text-[#ED4956] w-full cursor-pointer font-bold'>Unfollow</div>
                                    <div className=' w-full cursor-pointer text-white'>Add to favourites</div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4 text-white'>
                            comments will come
                        </div>
                        <div className='p-4'>
                            <div className='flex items-center gap-2'>
                                <input onChange={changeEventHandler} value={text} type="text" placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded'/>
                                <Button disabled={!text.trim()} onClick = {sendMessageHandler} variant='outline'className='text-white'>Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog