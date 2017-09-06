

const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const redisModule = require('../utils/redis');
let jwt = require('jsonwebtoken');


//添加评论
exports.addComment = (req, res) => {
    //console.log('token',req.body.token)
    var decoded = jwt.verify(req.body.token, 'shhhhh');
    //console.log(decoded._id,decoded.username,decoded.email)
    const comment = new Comment();
    comment.post_id = req.body.postid
    comment.content = req.body.content
    comment.upvote = 0
    comment.oppose = 0
    comment.parent_id = mongoose.Types.ObjectId(decoded._id)
    //new ObjectId(decoded._id)
    comment.author_id = mongoose.Types.ObjectId(decoded._id)
    comment.save(function(err,data){
        if(err) { res.json({success: false, msg: err}); return; }
        res.json({success: true, msg: "创建comment成功", data: data})
    })
}
