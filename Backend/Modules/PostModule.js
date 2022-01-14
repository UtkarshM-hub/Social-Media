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
    },
    likes:{
        type:Number,
        default:0,
    },
    likedBy:[
        {
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    ]
},{timestamps:true});

module.exports=Mongoose.model('Post',PostSchema);