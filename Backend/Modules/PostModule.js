const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;

const PostSchema=new Schema({
    text:{
        type:String
    },
    image:{
        type:String
    },
    creator:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{timestamps:true});

module.exports=Mongoose.model('Post',PostSchema);