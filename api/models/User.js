const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
  name: {type: String, required: true, min: 2},
  email: {type: String, required: true, min: 8},
  phone: {type: String, required: true, min: 9},
  description: {type: String, required: true},
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;