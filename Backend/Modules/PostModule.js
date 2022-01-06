const Mongoose=require('mongoose');
const Schema=Mongoose.Schema;

const PostSchema=new Schema({
    text:{
        type:String
    },
    image:{
        type:String
    }
});

module.exports=Mongoose.model('Post',PostSchema);