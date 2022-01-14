const express=require('express');
const Router=express.Router();
const multer=require('multer');

const isAuth=require('../middleware/is-Auth');

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

Router.post('/createPost',isAuth,upload.single('image'),postController.createPost);

Router.get('/getPosts',isAuth,postController.getPosts);

Router.post('/getSinglePost',isAuth,postController.getSinglePost);

Router.post('/DeletePost',isAuth,postController.DeletePost);

Router.post('/editPost',isAuth,upload.single('image'),postController.editPost);

Router.get('/getMyPosts',isAuth,postController.getMyPosts);

Router.post('/addLike',isAuth,postController.AddLikeHandler);

module.exports=Router;