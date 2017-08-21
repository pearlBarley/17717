

const Post = require('../models/Post');
let redisModule = require('../utils/redis');


//创建新帖
exports.createPost = (req, res) => {
    const post = new Post();
    post.title = req.body.title
    post.content = req.body.content

    post.save(function(err,data){
        if(err) res.json({success: false, msg: err})
        res.json({success: true, msg: "创建成功", data: data})
    })
}

 