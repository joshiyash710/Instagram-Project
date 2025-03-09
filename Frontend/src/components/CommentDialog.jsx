import React from 'react'
import { Dialog, DialogContent } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const CommentDialog = ({ open, setOpen }) => {
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <div className='flex flex-1'>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLQimBK-OEyWbnutukAqWwht7Q7nZL8NSBqw&s" alt="post_img" />
          </div>
        </div>
        <div className='w-1/2 flex flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <Avatar>
              <AvatarImage src=''>
                <AvatarFallback>CN</AvatarFallback>
              </AvatarImage>
            </Avatar>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentDialog