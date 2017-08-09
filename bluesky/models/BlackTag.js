const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const blackTagSchema = new mongoose.Schema({
  
  account_id: Schema.Types.ObjectId,
  tag_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const BlackTag = mongoose.model('BlackTag', blackTagSchema);

module.exports = BlackTag;
