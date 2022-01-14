const Post=require('../Modules/PostModule');
const fs=require('fs');
const path=require('path');
const User=require('../Modules/User');

exports.createPost=async(req,res,next)=>{
    const { Text }=req.body;
    const image=req.file;
    if(!image){
        res.status(404).send("Image Not Found")
    }
    try{
        const newPost=await new Post({text:Text,image:image.path,creator:req.userId});
        newPost.save();
        const user=await User.findById(req.userId);
        user.posts.push(newPost);
        user.save();
        res.status(200).send({_id:user._id,name:user.userName});
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getPosts=async(req,res,next)=>{
    try{
        const posts=await Post.find().populate('creator');
        res.send(posts);
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.getSinglePost=async(req,res,next)=>{
    const { postId }=req.body;

    try{
        const postData=await Post.findById(postId).populate('creator');
        res.json({post:postData});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.DeletePost=async(req,res,next)=>{
    const { postId,image } = req.body;
    try{
        const post=await Post.findById(postId);
        if(post.creator.toString()!==req.userId){
            return res.status(403).send({message:"Not Allowed to Delete!"})
        }
        fs.unlink("public"+image,async(err,response)=>{
            if(err){
                return next(err);
            }
            const UserConnection=await User.findById(req.userId);
            UserConnection.posts.pull(postId);
            UserConnection.save();
            const respo=await Post.findByIdAndDelete(postId);
            res.send(respo);
        })
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.editPost=async(req,res,next)=>{
    const { text,id,image,url }=req.body;
    try{
        const post=await Post.findById(id);
        if(post.creator.toString()!==req.userId){
            return res.status(403).send({message:"Not Allowed to Delete!"})
        }
        if(!image){
            const { path }=req.file;
            fs.unlink(url,(err)=>{
                if(err){
                    return res.send(err);
                }
            });
            const respo=await Post.findByIdAndUpdate(id,{"text":text,image:path});
            return res.send("successfully updated")
        }
        else{
            const reponse=await Post.findByIdAndUpdate(id,{"text":text,"image":url});
            return res.send("successfully updated2")
        }
    }catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
    
}

exports.getMyPosts=async(req,res,next)=>{
    try{
        const posts=await User.findById(req.userId).populate('posts');
        res.send(posts);
    }catch(err){
        next(err);
    }
}

exports.AddLikeHandler=async(req,res,next)=>{
    const {postId,status}=req.body;
    try{
        const post=await Post.findById(postId);
        if(status===true){
            post.likes+=1;
            await post.likedBy.push(req.userId);
        }
        if(status===false){
            post.likes-=1;
            await post.likedBy.pull(req.userId);
        }
        post.save();
        res.status(200).send("You Liked The Post")
    }
    catch(err){
        res.status(401).send("Error Occured");
    }
}