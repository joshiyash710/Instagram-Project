import sharp from 'sharp'
import {Post} from '../models/post.model.js'
import cloudinary from '../utils/cloudinary.js'
import { User } from '../models/user.model.js'
import { Comment} from '../models/comment.model.js'
export const addNewPost = async (req,res) => {
    try {
        const {caption} = req.body
        const image = req.file
        const authorId = req.id
        if(!image){
            return res.status(400).json({
                message : "Image is required !!!",
                success : false
            })
        }
        const optimizedImageBuffer = await sharp(image.buffer).resize({width : 800,height : 800,fit : 'inside'}).toFormat('jpeg',{quality:80}).toBuffer()
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri)
        const post = await Post.create({
            caption,
            image : cloudResponse.secure_url,
            author : authorId
        })
        const user = await User.findById(authorId)
        if(user){
            user.posts.push(post._id)
            await user.save()
        }
        await post.populate({
            path : 'author',
            select : '-password'
        })
        return res.status(201).json({
            message : 'Post added successfully !!!',
            post,
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt : -1}) // latest posts will be on top
        .populate({
            path : 'author',
            select : 'username  profilePicture'
        })
        .populate({
            path : 'comments',
            sort : {createdAt : -1},
            populate : {
                path : 'author',
                select : 'username  profilePicture'
            }
        })
        return res.status(200).json({
            posts,
            success : true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUserPosts = async (req,res) => {
    try {
        const authorId = req.id
        const posts = await Post.find({author : authorId}).sort({createdAt : -1})
        .populate({
            path : 'author',
            select : 'username,  profilePicture'
        })
        .populate({
            path : 'comments',
            select : 'username,  profilePicture'
        })
        return res.status(200).json({
            posts,
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePosts = async (req,res) => {
    try {
        const likingUser = req.id
        const postId = req.params.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                message : 'Post not found !!!',
                success : false
            })
        }
        // like logic
        await Post.updateOne({$addToSet : {likes : likingUser}}) // add the liking user's id only once as you can like the post only one time
        await post.save()

        //implement socket io for real time notification
        return res.status(200).json({
            message : 'Post liked !!!',
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async (req,res) => {
   try {
     const likingUser = req.id
     const postId = req.params.id
     const post = await Post.findById(postId)
     if(!post) {
         return res.status(404).json({
             message : "Post not found !!!",
             success : false
         })
     }
     await post.updateOne({$pull : {likes : likingUser}})
     await post.save()
 
     return res.status(200).json({
         message : 'Post disliked',
         success : true
     })
   } catch (error) {
    console.log(error);
   }
}

export const addComment = async (req,res) => {
    try {
        const postId = req.params.id
        const authorId = req.id
        const {text} = req.body
        const post = await Post.findById(postId)
        if(!text){
            return res.status(400).json({
                message : 'Empty comment is not allowed !!!',
                success : false
            })
        }
        const comment = await Comment.create({
            text,
            author : authorId,
            post : postId
        })
        await comment.populate({
            path : 'author',
            select : 'username  profilePicture'
        })
        post.comments.push(comment._id)
        await post.save()

        return res.status(201).json({
            message : 'Comment Added',
            comment,
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getPostComments = async (req,res) => {
    try {
        const postId = req.params.id
        const comments = await Comment.find({post : postId}).populate({
            path : 'author',
            select : 'username  profilePicture'
        })
        if(!comments){
            return res.status(404).json({
                message : 'No comments for this post !!!',
                success :false
            })
        }
        return res.status(200).json({
            message : true,
            comments
        })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id
        const authorId = req.id
        const post = await Post.findById(postId)
        if(!post){
            return res.status(404).json({
                message : "Post not found !!!",
                success :false
            })
        }
        if(post.author.toString() !== authorId){
            return res.status(403).json({
                message : 'Unauthorized user for deleting this post !!!',
                success : false
            })
        }
        await Post.findByIdAndDelete(postId)

        //removing postId from user's posts 
        let user = await User.findById(authorId)
        user.posts = user.posts.filter(id => id.toString() !== postId)
        await user.save()

        await Comment.deleteMany({post : postId})

        return res.status(200).json({
            success : true,
            message : 'Post deleted successfully !!!'
        })
    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req,res) => {
    try {
        const postId = req.params.id
        const authorId = req.id
        const post = await Post.findById(postId)
        const author = await User.findById(authorId)
        if(!post){
            return res.status(404).json({
                message : 'Post not found !!!',
                success : false
            })
        }
        if(author.bookmarks.includes(post._id)){
            await author.updateOne({$pull:{bookmarks : post._id}})
            await author.save()
            return res.status(200).json({
                type : 'unsaved',
                message : 'Post unbookmarked successfully !!!',
                success : true
            })
        }
        else{
            await author.updateOne({$addToSet:{bookmarks : post._id}})
            await author.save()
            return res.status(200).json({
                type : 'saved',
                message : 'Post bookmarked successfully !!!',
                success : true
            })
        }
    } catch (error) {
        console.log(error);
    }
}