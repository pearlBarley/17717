

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
    comment.post_id = mongoose.Types.ObjectId(req.body.postid);
    comment.content = req.body.content
    comment.upvote = 0
    comment.oppose = 0
    comment.parent_ids = req.body.parentids   //0,2,4,2,5    顶级parent为''
    //comment.parent_ids_test = []
    //new ObjectId(decoded._id)
    comment.author_id = mongoose.Types.ObjectId(decoded._id)
    comment.save(function(err,data){
        if(err) { res.json({success: false, msg: err}); return; }
        res.json({success: true, msg: "创建comment成功", data: data})
    })
}


//获取comment信息
exports.getCommentData = (req, res) => {
    var decoded = jwt.verify(req.query.token, 'shhhhh');
    
    var postid = req.query.postid;           
    var condition = {'post_id': mongoose.Types.ObjectId(postid)}; 
    Comment.find(condition, null, {sort: {'parent_ids': 1}}, function(err, data){
        if(err) { res.json({success: false, msg: err}); return; }
        let sortData = sortCommentData(data)
        res.json({success: true, msg: "获取comment信息成功", data: sortData})
    })

}

//遍历data成树状结构  普通递归
let sortCommentData = (data, pid = '') => {
    // console.log('data',data)
    let result = []
    // let flag = true

    for(let i=0; i<data.length; i++){

       if(data[i]._doc.parent_ids === pid){
           // flag = false
           let newPid = pid === '' ? (data[i]._doc._id.toString()) : (pid + ',' + data[i]._doc._id.toString())
           data[i]._doc.children = sortCommentData(data, newPid)
           result.push(data[i])
       } 
    }
    // if( flag ) {
    //     return []
    // }

    return result
}

//遍历data成树状结构  转换成对象递归
let sortCommentDataByObject = (data) => {
    let obj = {}

    for(let i=0; i<data.length; i++){
        if(!obj[data._doc.parent_ids]){
            obj[data._doc.parent_ids] = []
        }
        obj[data._doc.parent_ids].push(data[i])
    }
    
    let result = subSortByObject(obj)

    return result
}

let subSortByObject = (obj, pid = '') => {
    let result = []
    let tmp = obj[pid]     //pid相同的数据数组

    for(let [i, v] of tmp){  
        let newPid = pid === '' ? (v._doc._id) : (pid + ',' + v._doc._id)
        v._doc.children = subSortByObject(obj, newPid)
        result.push(v)
    }
    return result
}


// // Find First 10 News Items
// News.find({
//     deal_id:deal._id // Search Filters
// },
// ['type','date_added'], // Columns to Return
// {
//     skip:0, // Starting Row
//     limit:10, // Ending Row
//     sort:{
//         date_added: -1 //Sort by Date Added DESC
//     }
// },
// function(err,allNews){
//     socket.emit('news-load', allNews); // Do something with the array of 10 objects
// })

// Post.find({}).sort('test').exec(function(err, docs) { ... });
// Post.find({}).sort({test: 1}).exec(function(err, docs) { ... });
// Post.find({}, null, {sort: {date: 1}}, function(err, docs) { ... });
// Post.find({}, null, {sort: [['date', -1]]}, function(err, docs) { ... });


// // 线性数据转化为树。
// function toTree(data, parent_id) {
//     var tree = [];
//     var temp;
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].parent_id == parent_id) {
//             var obj = data[i];
//             temp = toTree(data, data[i].id);
//             if (temp.length > 0) {
//                 obj.children = temp;
//             }
//             tree.push(obj);
//         }
//     }
//     return tree;
// }