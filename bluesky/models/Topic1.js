const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: String,
  content: String,
  upvote: Number,
  oppose: Number,
  closed: Boolean,
  closeDate: Date,
  author_id: { type: Schema.Types.ObjectId },
  watch_ids: [Schema.Types.ObjectId],
  marker_ids: [Schema.Types.ObjectId],
  collect_ids: [Schema.Types.ObjectId],
  tag_ids: [Schema.Types.ObjectId],
  replier_ids: [Schema.Types.ObjectId],

}, { timestamps: true });


const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
