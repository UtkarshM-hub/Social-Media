const Post=require('../Modules/PostModule');
const fs=require('fs');
const path=require('path');

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

exports.getPosts=async(req,res,next)=>{
    try{
        const posts=await Post.find();
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
        const postData=await Post.findById(postId);
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
        fs.unlink("public"+image,async(err,response)=>{
            if(err){
                return next(err);
            }
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