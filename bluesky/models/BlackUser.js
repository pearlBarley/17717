const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const blackUserSchema = new mongoose.Schema({
  
  account_id: Schema.Types.ObjectId,
  blackUser_id: Schema.Types.ObjectId,
  valid: Boolean,

}, { timestamps: true });


const BlackUser = mongoose.model('BlackUser', blackUserSchema);

module.exports = BlackUser;
