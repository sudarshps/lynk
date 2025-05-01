import mongoose from "mongoose";


const articleSchema = new mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    image:{type:String},
    tags:{type:[String]},
    category:{type:[String],require:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'UserModel'}],
    dislikes:[{type:mongoose.Schema.Types.ObjectId,ref:'UserModel'}],
    blocks:[{type:mongoose.Schema.Types.ObjectId,ref:'UserModel'}],
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'UserModel'}
}, {timestamps:true})


const ArticleModel = mongoose.model('ArticleModel',articleSchema)

export default ArticleModel