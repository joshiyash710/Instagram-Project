import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import upload from '../middlewares/multer.js'
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPosts, getPostComments, getUserPosts, likePosts } from '../controllers/post.controller.js'
const router = express.Router()
router.route('/addpost').post(isAuthenticated,upload.single('image'),addNewPost)
router.route('/all').get(isAuthenticated,getAllPosts)
router.route('/userpost/all').get(getUserPosts)
router.route('/:id/like').get(isAuthenticated,likePosts)
router.route('/:id/dislike').post(isAuthenticated,dislikePost)
router.route('/:id/comment').get(isAuthenticated,addComment)
router.route('/:id/comment/all').post(isAuthenticated,getPostComments)
router.route('/delete/:id').delete(isAuthenticated,deletePost)
router.route('/:id/bookmark').post(isAuthenticated,bookmarkPost)

export default router