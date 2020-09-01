const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,19}$/,
  },
  password: { type: String, required: true, match: /[a-zA-Z0-9]{6,128}/ },
});

module.exports = mongoose.model('User', userSchema);
