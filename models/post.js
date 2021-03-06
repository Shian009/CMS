const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    likes:[{type:ObjectId,ref:"user"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"user"}
    }],
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
},{timestamps:true})

mongoose.model("post",postSchema)
