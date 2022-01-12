const { validationResult }=require('express-validator/check');
const bcrypt=require("bcrypt");
const User = require('../Modules/User');
const jwt=require("jsonwebtoken");

exports.signupHandler=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        errors.data=errors.array();
        return next(errors)
    }
    const { email,password,username } = req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,12);
        const user=await new User({email:email,password:hashedPassword,userName:username});
        const userData=await user.save();
        return res.status(200).json({message:"User Created Successfully!",userId:userData._id});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}

exports.LoginHandler=async(req,res,next)=>{
    const {email,password}=req.body;
    console.log(email,password);
    try{
        const user=await User.findOne({'email':email});
        if(!user){
            return res.status(404).send("User Not Found!");
        }
        const HashedPassword=await bcrypt.compare(password,user.password);
        if(!HashedPassword){
            return res.status(403).send("Invalid Password");
        }
        const token=jwt.sign({email:email,userId:user._id.toString()},'ThisisSuperSecretSecret',{expiresIn:"1h"});
        res.status(200).json({token:token,userId:user._id.toString()});
    }
    catch(err){
        next(err);
    }
}