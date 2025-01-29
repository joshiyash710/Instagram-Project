import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { readFileAsDataUrl } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import axios from 'axios'


const CreatePost = ({ open, setOpen }) => {
    const dispatch = useDispatch()
    const imageRef = useRef()
    const [file, setFile] = useState('')
    const [caption, setCaption] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setFile(file)
            const dataUrl = await readFileAsDataUrl(file)
            setImagePreview(dataUrl)
            console.log(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData = new FormData()
        formData.append('caption', caption)
        if (imagePreview) formData.append('image', file)
        try {
            // Handle post creation logic here
            setLoading(true)
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost',formData,{
                headers : {
                    'Content-Type' : 'mutlipart/form-data'
                },
                withCredentials : true
            })
            if(res.data.success){
                toast.success(res.data.message)
                setOpen(false)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogTitle className='text-white font-semibold text-center'>Create New Post</DialogTitle>
                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage src='' alt='img' />
                        <AvatarFallback className='bg-white'>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs text-white'>Username</h1>
                        <span className='text-gray-400'>Bio here...</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className='focus-visible:ring-transparent border-none' placeholder='Write a caption...' />
                {
                    imagePreview && (
                        <div className='w-full h-64 flex items-center justify-center'>
                            <img src={imagePreview} alt="preview_image" className='object-cover h-full w-full rounded-md' />
                        </div>
                    )
                }
                <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
                <Button onClick={() => imageRef.current.click()} className='w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] text-white'>Select from computer</Button>
                {
                    imagePreview && (
                        loading ? (
                            <Button className='bg-[#258bcf] text-white'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin text-white ' />
                                Please Wait
                            </Button>
                        ) :
                            (
                                <Button onClick={createPostHandler} type='submit' className='w-full text-white bg-[#0095F6] hover:bg-[#258bcf]'>Post</Button>
                            )
                    )
                }
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost
