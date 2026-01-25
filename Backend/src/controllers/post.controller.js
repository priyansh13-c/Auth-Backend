import {Post} from "../models/post.model.js";

//create a post

const createPost = async(req,res)=>{
    try{
        const { name,description,age } = req.body;
        
        if(!name || !description || !age){
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        
            const post = await Post.create({name, description,age})

            return res.status(200).json({
                message: "Post Created Succesfully", post
            });
    }catch(error){
         res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

//Read all post
const getPost = async(req,res)=>{
    try{
        
            const post = await Post.find();

            res.status(200).json(post);
    }catch(error){
         res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updatePost = async(req,res)=>{
    try{
        //basic validation for empty body
        if(Object.keys(req.body).length===0){
            return res.status(400).json({
                message: "No data provided for update"
            });
        }
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,
            {new:true});
            if(!post){
                return res.status(404).json({
                    message: "Unable to find post"
                })
            }
            res.status(200).json({
                message: "Post Updated Successfully", post
            })

    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deletePost = async(req,res)=>{
    try{
        const deleted = await Post.findByIdAndDelete(req.params.id);
        if(!deleted){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export{
    createPost,
    getPost,
    updatePost,
    deletePost
};