const User=require("../Modules/User");
const Post=require("../Modules/PostModule");
const fs=require("fs");
const path=require("path");
const {validationResult}=require("express-validator/check");

exports.getUserData=async(req,res,next)=>{
    const {userId}=req.body;
    console.log(userId);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({message:"User not found!"});
    }
    try{
        const user=await User.findById(userId);
        res.send(user);
    }catch(err){
        next(err);
    }
}

exports.updateUserData=async(req,res,next)=>{
    const {username}=req.body;
    const [profilePic,CoverImage]=req.files;
    try{
            if(profilePic!==undefined && CoverImage!==undefined){
                await User.findByIdAndUpdate(req.userId,{"profilePic":profilePic.path.replace("public",""),"CoverImage":CoverImage.path.replace("public",""),"userName":username});
                return res.status(200).send("all of them");
            }
            else if(profilePic!==undefined && CoverImage===undefined){
                await User.findByIdAndUpdate(req.userId,{"profilePic":profilePic.path.replace("public",""),"userName":username});
                return res.status(200).send("one of them");
            }
            else if(profilePic===undefined && CoverImage!==undefined){
                await User.findByIdAndUpdate(req.userId,{"CoverImage":CoverImage.path.replace("public",""),"userName":username});
                return res.status(200).send("second of them");
            }
            else{
                await User.findByIdAndUpdate(req.userId,{userName:username});
                return res.status(200).send("none of them");
            }
    }catch(err){
        console.log(err);
        res.status(401).send(err);
    }
    // res.send("success");
}

exports.DeleteUser=async(req,res,next)=>{
    try{

        const userData=await User.findById(req.userId);
        await userData.posts.map(async(objectIds)=>{
            await Post.findByIdAndDelete(objectIds);
        });
        fs.unlinkSync("public"+userData.profilePic);
        fs.unlinkSync("public"+userData.CoverImage);
        const status=await User.findByIdAndDelete(req.user).then(response=>{
            return res.status(200).send("User deleted successfully");        
        });
    }catch(err){
        console.log(err)
    }
}