const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const watchSchema = new mongoose.Schema({
  
  account_id: Schema.Types.ObjectId,
  post_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const Watch = mongoose.model('Watch', watchSchema);

module.exports = Watch;
