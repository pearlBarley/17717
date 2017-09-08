const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const commentSchema = new mongoose.Schema({
  // _id: {
  //     type: String,
  //     unique: true,
  //     default: ''
  // },
  post_id: Schema.Types.ObjectId,
  //parent_ids: Schema.Types.ObjectId, // 顶级parent为null
  parent_ids_test: [Schema.Types.ObjectId], // [0,2,4,2,5] 顶级parent为[]
  parent_ids: String,             //0,2,4,2,5    顶级parent为''
  content: String,
  upvote: Number,
  oppose: Number,
  closed: Boolean,
  closeDate: Date,

  author_id: { type: Schema.Types.ObjectId },
  replier_ids: [Schema.Types.ObjectId],
  tag_ids: [Schema.Types.ObjectId],
  comment_ids:[Schema.Types.ObjectId],

}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
