const User=require("../Modules/User");
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