import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
   paricipants : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
   }],
    message : [
        {
        type : String,
        required : true
    }
    ]
},{timestamps : true})

export const Conversation = mongoose.model('Conversation',conversationSchema)