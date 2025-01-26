import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import getDataUri from '../utils/getDataUri.js'
import cloudinary from '../utils/cloudinary.js'
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are compulsory !!!',
                success: false
            })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({
                message: 'User Already exist !!!',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: 'Account created successfully !!!',
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(400).json({
                message: 'All fields are compulsory !!!',
                success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password !!!',
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Incorrect email or password !!!',
                success: false
            })
        }
        user = {
            _id: user._id,
            username : user.username,
            email : user.email,
            profilePicture : user.profilePicture,
            bio : user.bio,
            followers : user.followers,
            following : user.following,
            posts : user.posts
        }
        const token = await jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : '1d'})
        return res.cookie('token',token,{httpOnly : true , sameSite : 'strict',maxAge : 1*24*60*60*1000}).json({
            message : `Welcome back ${user.username} !!!`,
            user,
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req,res) => {
    try {
        return res.cookie("token","",{maxAge : 0}).json({
            message : 'Logged Out Successfully !!!',
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getProfile = async (req,res) => {
    try {
        const userId = req.params._id
        let user = await User.findById(userId)
        return res.status(200).json({
            user,
            success : true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const editPrfile = async (req,res) => {
    try {
        // const      
        const userId = req.id
        const {bio,gender} = req.body
        const profilePicture = req.file
        let cloudResponse;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture)
            cloudResponse = await cloudinary.uploader.upload(fileUri)
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message : "User not found !!!",
                success : false
            })
        }
        if(bio) user.bio = bio
        if(gender) user.gender = gender
        if(profilePicture) user.profilePicture = cloudResponse.secure_url
        await user.save()
        return res.status(200).json({
            message : 'Profile updated successfully !!!',
            success : true,
            user
        })
    } catch (error) {
        console.log(error);
    }
}

export const getSuggestedUsers = async (req,res) => {
    try {
        const suggestedUsers = await User.find({_id : {$ne : req.id}}).select("-password")
        if(!suggestedUsers){
            return res.status(400).json({
                message : 'Currently do not have any users !!!'
            })
        }
        return res.status(200).json({
            success : true,
            users : suggestedUsers
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const followOrUnfollow = async (req,res) => {
    try {
        const follower = req.id
        const followed = req.params.id
        if(follower === followed) {
            return res.status(400).json({
                message : "You can't follow or unfollow yourself !!!",
                success : true
            })
        }
        const followerUser = await User.findById(follower)
        const followedUser = await User.findById(followed)
        if(!followerUser || !followedUser){
            return res.status(400).json({
                message : 'User not found !!!',
                message : false
            })
        }

        const isFollowing = followerUser.following.includes(followed)
        if(isFollowing){
            //unfollow logic
            await Promise.all([
                User.updateOne({_id:follower},{$pull : {following:followed}}), 
                User.updateOne({_id:followed},{$pull : {followers : follower}})
            ])
            return res.status(200).json({
                message : 'Unfollowed successfully !!!',
                success : true
            })
        }else{
            //follow logic
            await Promise.all([
                User.updateOne({_id:follower},{$push : {following:followed}}), 
                User.updateOne({_id:followed},{$push : {followers : follower}})
            ])
            return res.status(200).json({
                message : 'Followed successfully !!!',
                success : true
            })
        }
    } catch (error) {
        console.log(error);
        
    }
}