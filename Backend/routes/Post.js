const express=require('express');
const Router=express.Router();
const multer=require('multer');

const postController=require('../Controllers/PostController');

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    },
    destination:(req,file,cb)=>{
        cb(null,'./public/Posts/');
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

Router.post('/createPost',upload.single('image'),postController.createPost);

Router.get('/getPosts',postController.getPosts);

module.exports=Router;