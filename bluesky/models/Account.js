const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,

  facebook: String,
  twitter: String,
  google: String,
  github: String,
  instagram: String,
  linkedin: String,
  steam: String,
  tokens: Array,

  friend_ids: [Schema.Types.ObjectId],
  blackUser_ids: [Schema.Types.ObjectId],
  blackTag_ids: [Schema.Types.ObjectId],
  followers: [Schema.Types.ObjectId],
  followings: [Schema.Types.ObjectId],

  profile: {
    gender: String,
    location: String,
    homepage: String,
    picture: String
  }
}, { timestamps: true });


const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
