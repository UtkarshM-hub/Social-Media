var express = require('express');
var router = express.Router();
const UserController=require("../Controllers/UserController");
const multer=require("multer");
const {body}=require("express-validator/check");
const isAuth = require('../middleware/is-Auth');

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,req.userId+"-"+file.originalname);
    },
    destination:(req,file,cb)=>{
        cb(null,'./public/userData/');
    }
})


const fileFilter=(req,file,cb)=>{
    if(file.mimetype=== 'image/png' || 'image/jpg' || 'image/jpeg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload=multer({storage:storage,fileFilter:fileFilter})

/* GET users listing. */
router.post('/getUserData',isAuth,UserController.getUserData);

router.post('/updateUser',isAuth,upload.any(),UserController.updateUserData);

router.get('/DeleteUser',isAuth,UserController.DeleteUser);

module.exports = router;
