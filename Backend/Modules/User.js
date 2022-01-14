const Mongoose=require("mongoose");
const Schema=Mongoose.Schema;

const UserSchema=new Schema({
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    userName:{
        required:true,
        type:String
    },
    profilePic:{
        type:String,
        default:"/images/download.png"
    },
    CoverImage:{
        type:String,
        default:"/images/BgCover.jpg"
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
});

module.exports=Mongoose.model('User',UserSchema);