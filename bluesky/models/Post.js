const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: String,
  upvote: { type: Number, default: 0 },
  oppose: { type: Number, default: 0 },
  closed: Boolean,
  closeDate: Date,

  author_id: { type: Schema.Types.ObjectId },
  watcher_ids: [Schema.Types.ObjectId],
  marker_ids: [Schema.Types.ObjectId],
  collector_ids: [Schema.Types.ObjectId],
  replier_ids: [Schema.Types.ObjectId],
  tag_ids: [Schema.Types.ObjectId],
  comment_ids:[Schema.Types.ObjectId],
  upvote_ids:[Schema.Types.ObjectId],
  oppose_ids:[Schema.Types.ObjectId],


}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
