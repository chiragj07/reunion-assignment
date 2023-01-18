const ReunionPost = require('../Models/reunionposts')
const ReunionUser = require('../Models/reunionusers')
const ReunionComment = require('../Models/reunioncomments');
const e = require('express');



async function addPost(req,res){

    const {title, description} =  req.body;

    try{

        const post  = new ReunionPost({
            title,
            description,
            author: req.user._id,
            likes:[]
        })

        const newPost = await post.save()
        res.status(201).json(newPost);
    }
    catch(err){
        console.log(err)
        res.status(400).json({error:err.message});
    }

}

async function deletePost(req,res){
    try{
        const post = await ReunionPost.findById(req.params.id)

        if (post) {
            await post.remove()
            res.json({ message: 'post removed' })
        } 
        else {
            throw new Error('post not found')
        }
    }
    catch(err){
        res.status(400).json({error:err.message});

    }
}

async function likePost(req,res){
    try{
        const post = await ReunionPost.findByIdAndUpdate(req.params.id);
        post.likes.push(req.user._id)
        const updatedPost = await post.save()
        res.status(200).json(updatedPost)
    }
    catch(err){
        res.status(400).json({error:err.message});

    }
}

async function dislikePost(req,res){
    try{
        const post = await ReunionPost.findByIdAndUpdate(req.params.id,{
            $pull: {likes: req.user._id}
        });
        res.status(200).json(post)
    }
    catch(err){
        res.status(400).json({error:err.message});

    }
}

async function addComment(req,res){
    const {comment} = req.body
    try{
        const newComment = new ReunionComment({
            comment,
            post: req.params.id,
            author: req.user._id
        })

        const nc= await newComment.save();
        res.status(201).json({commentID: nc._id});
    }
    catch(err){
        res.status(400).json({error:err.message});

    }
}

async function deleteComment(req,res){
    try{
    
        const comm = await ReunionComment.findById(req.params.id);
        if(comm){
            await comm.delete();
            res.status(200).json({message:"Comment deleted"})
        }
        else{
            throw new Error('No comments found')
        }

    }
    catch(err){
        res.status(400).json({error:err.message});

    }
}

async function getOnePost(req,res){
    try{
        const post = await ReunionPost.findById(req.params.id);
        if(!post){
            throw new Error('No such Post');
        }

        else{
            const {likes ,_id, title, description,createdAt } = post
            const comments = await ReunionComment.find({post: req.params.id});
            res.status(200).json({likes: likes.length, title, description, post_id: _id, createdAt,comments})
        }
    }
    catch(err){
        res.status(400).json({error:err.message});
    }

}

async function getAllPosts(req,res){
    try{
        const posts = await ReunionPost.find({user: req.user._id}).select({ "title": 1, "_id": 1, "description" : 1, "createdAt" :1, "likes" : 1});
        res.status(200).json({posts});
    }catch(err){
        res.status(400).json({error:err.message});
        
    }
}
module.exports = {addPost,deletePost,likePost, dislikePost, addComment, deleteComment, getAllPosts, getOnePost}