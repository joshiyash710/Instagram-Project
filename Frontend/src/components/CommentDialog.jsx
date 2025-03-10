import React, { useState } from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'

const CommentDialog = ({ open, setOpen }) => {
  const [text,setText] = useState("")
  const changeEventHandler = (e) => {
    const inputText = e.target.value
    if(inputText.trim()){
      setText(inputText)
    }
    else{
      setText("")
    }
  }
  const sendMessageHandler = async () => {

  }
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 flex flex-col'>
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img src="https://i.redd.it/could-young-kratos-have-potentially-easily-beaten-thor-v0-ztiio7o52n4d1.jpg?width=1170&format=pjpg&auto=webp&s=45007b13e2994b8256c17eba4616283be0f92712" alt="post_img" className='w-full h-full object-cover rounded-l-lg' />
          </div>
          <div className='w-1/2 flex flex-col justify-between'>
            <div className='flex items-center justify-between p-4'>
              <div className='flex gap-3'>
                <Link>
                  <Avatar>
                    <AvatarImage src='' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className='font-semibold text-xs'>username</Link>
                  {/* <span className='text-gray-600 text-sm'>Bio here...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center text-sm text-center'>
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>
                    Unfollow
                  </div>
                  <div>
                    Add to favourites
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              comments will be here....
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input type="text" value={text} onChange={changeEventHandler} placeholder='Add a comment...' className='w-full outline-none border border-gray-300 p-2 rounded' />
                <Button disabled={!text.trim()} onClick={sendMessageHandler} variant='outline'>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog