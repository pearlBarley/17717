

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
    post.upvote = 0
    post.oppose = 0
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

    Post.find(condition).skip(skipnum).limit(pageSize).sort(sort).lean().exec(function (err, data) {
        if (err) {res.json({success: false, msg: err});return;}
        let arrangeData = arrangeHomePostsData(data, decoded)
        // console.log(arrangeData)
        res.json({success: true, msg: "获取主页post数据成功", data: arrangeData})
    })
}
let arrangeHomePostsData = (data, decoded) => {
    let _id = mongoose.Types.ObjectId(decoded._id)
    let tmp = data.map((value, index, array) =>{
        //value._doc.voteNum =value.upvote || 0 - value.oppose ||0
        value.voteNum = (value.upvote || 0) - (value.oppose ||0)
        let flag = 0
        //if (value.upvote_ids.indexOf(val) !== -1) {
        //if(value.upvote_ids.includes(_id)){  //查找不出数组里是否存在某对象
        if(JSON.stringify(value.upvote_ids).indexOf(JSON.stringify(_id)) != -1){
            flag++
            value.alreadyUpvote = true
            value.alreadyOppose = false
        } else if(JSON.stringify(value.oppose_ids).indexOf(JSON.stringify(_id)) != -1){
            flag++
            value.alreadyUpvote = false
            value.alreadyOppose = true
        } else {
            value.alreadyUpvote = false
            value.alreadyOppose = false        
        }
        if(flag>1){console.log('同一个用户即赞成又反对了')}
        return value
    })
    return tmp
}
//获取post详细信息
exports.getPostDetail = (req, res) => {
    var decoded = jwt.verify(req.query.token, 'shhhhh');
    
    var postid = req.query.postid;            
    var condition = {'_id': mongoose.Types.ObjectId(postid)}; 
    Post.find(condition, function(err, data){
        if (err) res.json({success: false, msg: err})
        res.json({success: true, msg: "获取post详细信息成功", data: data[0]})
    })

}


//vote
exports.votePost = (req, res) => {
    var decoded = jwt.verify(req.body.token, 'shhhhh');
    
    var postid = req.body.postid;
    var action = req.body.action;
    var alreadyUpvote = req.body.alreadyUpvote
    var alreadyOppose = req.body.alreadyOppose

    var condition = {'_id': mongoose.Types.ObjectId(postid)}; 
    
    var update,actionStr,addToSet,pull,inc
    if(!alreadyUpvote && !alreadyOppose){
        //在原值上操作，加1   把投票的用户id加在upvote_ids  同时删除oppose_ids里的用户id
        if(action === 0){
            //oppose
            actionStr='oppose'
            addToSet = 'oppose_ids'
            pull = 'upvote_ids'
        } else if (action === 1) {
            //upvote
            actionStr='upvote'
            addToSet = 'upvote_ids'
            pull = 'oppose_ids'
        } else {
            res.json({success: false, msg: '无操作'})
        }
        update = { '$inc': { [actionStr]:1 }, 
                '$addToSet':{[addToSet]: mongoose.Types.ObjectId(decoded._id)},
                '$pull':{[pull]: mongoose.Types.ObjectId(decoded._id)},
            } 

    } else if (alreadyUpvote) {
        if(action === 0){
            //oppose
            inc = { 'upvote': -1, 'oppose': 1 }
            addToSet = {'$addToSet':{'oppose_ids': mongoose.Types.ObjectId(decoded._id)}}
            pull = {'upvote_ids': mongoose.Types.ObjectId(decoded._id)}

        } else if (action === 1) {
            //upvote
            inc = { 'upvote': -1 }
            addToSet = {}
            pull = {'upvote_ids': mongoose.Types.ObjectId(decoded._id)}

        } else {
            res.json({success: false, msg: '无操作'})
        }
        // update = { '$inc': inc,    
        //         '$pull': pull,
        //         ...addToSet,
        //     } 
        update = Object.assign({}, { '$inc': inc, '$pull': pull}, addToSet); 

    }
    else if (alreadyOppose) {
        if(action === 0){
            //oppose
            inc = { 'oppose': -1 }
            addToSet = {}
            pull = {'oppose_ids': mongoose.Types.ObjectId(decoded._id)}

        } else if (action === 1) {
            //upvote
            inc = { 'upvote': 1, 'oppose': -1 }
            addToSet = {'$addToSet':{'upvote_ids': mongoose.Types.ObjectId(decoded._id)}}
            pull = {'oppose_ids': mongoose.Types.ObjectId(decoded._id)}

        } else {
            res.json({success: false, msg: '无操作'})
        }
        // update = { '$inc': inc, 
        //         '$pull': pull,
        //         ...addToSet,
        //     } 
        update = Object.assign({}, { '$inc': inc, '$pull': pull}, addToSet); 
        
    } else {
        console.log('同一个用户即赞成又反对了')
    }
  
    Post.update(condition, update, function(err, data){
        if (err) {res.json({success: false, msg: err});return;}
        res.json({success: true, msg: "投票成功", data: data})
    })
}



 // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   console.log(404);
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });