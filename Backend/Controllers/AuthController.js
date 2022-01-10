const { validationResult }=require('express-validator/check');
const bcrypt=require("bcrypt");
const User = require('../Modules/User');

exports.signupHandler=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        errors.data=errors.array();
        next(errors)
    }
    const { email,password,username } = req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,12);
        const user=await new User({email:email,password:hashedPassword,userName:username});
        const userData=await user.save();
        res.status(201).json({message:"User Created!",userId:userData._id});
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
}