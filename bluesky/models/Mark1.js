const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const markSchema = new mongoose.Schema({
  
  account_id: Schema.Types.ObjectId,
  post_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
