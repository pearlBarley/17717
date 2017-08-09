const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = { Schema } = require('mongoose');

const tagSchema = new mongoose.Schema({
  
  tag: { type: String, unique: true }

}, { timestamps: true });


const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
