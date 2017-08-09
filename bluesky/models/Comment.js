const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const commentSchema = new mongoose.Schema({
  
  post_id: Schema.Types.ObjectId,
  parent_id: Schema.Types.ObjectId,
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
