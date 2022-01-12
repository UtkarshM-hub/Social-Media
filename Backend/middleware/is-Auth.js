const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const header=req.get("Authorization");
    let token;
    if(header){
        token=req.get('Authorization').split(" ")[1];
    }
    let decodedToken;
    try{
        decodedToken=jwt.verify(token,'YOUR_JWT_SECRET_HERE')
    }catch(err){
        return res.status(403).json({message:"Error while validating"});
    }
    if(!decodedToken){
        return res.status(401).send("Not Authenticated!")
    }
    req.userId=decodedToken.userId;
    next();
}
