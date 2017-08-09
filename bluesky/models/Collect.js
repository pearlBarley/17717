const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const collectSchema = new mongoose.Schema({
  
  account_id: Schema.Types.ObjectId,
  post_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const Collect = mongoose.model('Collect', collectSchema);

module.exports = Collect;
