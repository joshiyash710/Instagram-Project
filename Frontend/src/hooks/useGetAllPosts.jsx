import { setPosts } from "../redux/postSlice.js"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetAllPosts = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchAllPosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/allpost',{withCredentials : true})
                if(res.data.success){
                    console.log(res.data.posts);                    
                    dispatch(setPosts(res.data.posts))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPosts()
    },[])
}

export default useGetAllPosts