import { Schema, model } from 'mongoose';

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  userName: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,19}$/,
  },
  password: { type: String, required: true, match: /[a-zA-Z0-9]{6,128}/ },
});

export default model('User', userSchema);
