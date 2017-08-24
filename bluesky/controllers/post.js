

const Post = require('../models/Post');
const mongoose = require('mongoose');
//var ObjectId = require('mongodb').ObjectId;
const redisModule = require('../utils/redis');
let jwt = require('jsonwebtoken');

//req.query.token   get  ?token=
//req.params.token  get  /:token
//req.body.token    post {token:''}

//创建新帖
exports.createPost = (req, res) => {
    //console.log('token',req.body.token)
    var decoded = jwt.verify(req.body.token, 'shhhhh');
    //console.log(decoded._id,decoded.username,decoded.email)
    const post = new Post();
    post.title = req.body.title
    post.content = req.body.content
    //new ObjectId(decoded._id)
    post.author_id = mongoose.Types.ObjectId(decoded._id);
    post.save(function(err,data){
        if(err) res.json({success: false, msg: err})
        res.json({success: true, msg: "创建成功", data: data})
    })
}


//根据对应用户喜好获取home page的post
exports.getHomePosts = (req, res) => {
    //console.log('token',req.body.token)
    var decoded = jwt.verify(req.query.token, 'shhhhh');
    //console.log(decoded._id,decoded.username,decoded.email)
    
    var pageSize = parseInt(req.query.pageSize);                //一页多少条
    var currentPage = parseInt(req.query.currentPage);          //当前第几页
    var sort = {'createdAt':-1};                      //排序（按创建时间倒序）
    var skipnum = (currentPage - 1) * pageSize;       //跳过数
    var condition = {};
    // Post.find(condition, function(err, data){
    //     if (err) res.json({success: false, msg: err})
    //     res.json({success: true, msg: "获取主页post数据成功", data: data})
    // })

    Post.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {
        if (err) {res.json({success: false, msg: err});return;}
        res.json({success: true, msg: "获取主页post数据成功", data: data})
    })
}

//获取post详细信息
exports.getpostDetail = (req, res) => {
    var decoded = jwt.verify(req.query.token, 'shhhhh');
    
    var postid = req.query.postid;             
    var condition = {'_id': mongoose.Types.ObjectId(postid)}; 
    Post.find(condition, function(err, data){
        if (err) res.json({success: false, msg: err})
        res.json({success: true, msg: "获取post详细信息成功", data: data[0]})
    })

}

 