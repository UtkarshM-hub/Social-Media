const Post=require('../Modules/PostModule');

exports.createPost=async(req,res,next)=>{
    const { Text }=req.body;
    const image=req.file;
    if(!image){
        res.status(404).send("Image Not Found")
    }
    try{
        const newPost=await new Post({text:Text,image:image.path});
        newPost.save();
        res.status(200).send("success");
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}