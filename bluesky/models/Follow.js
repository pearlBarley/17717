const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const followSchema = new mongoose.Schema({
  
  follower: Schema.Types.ObjectId,
  following: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
