const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const friendSchema = new mongoose.Schema({
  
  user_id: Schema.Types.ObjectId,
  friend_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
