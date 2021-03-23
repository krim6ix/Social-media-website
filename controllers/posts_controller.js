const Post = require('../models/post')
const Comment = require('../models/comments')

module.exports.create = async function(req, res) {
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        return res.redirect('back');

    }catch(err){
        console.log("Error",err);
        return;
    }

}

module.exports.delete = async function(req, res){
    try{
        let post = await Post.findById(req.params.id)
        
        if(post.user == req.user.id){
            post.remove();

             await Comment.deleteMany({post : req.params.id}, function(err){
                return res.redirect('/')
            })
        }else{
            return res.redirect('/')
        }

    }catch(err){
        console.log("Error", err);
        return;
    }
    
}