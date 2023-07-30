const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const AdminSchema = new Schema({
  email: {type: String, required: true, min: 8},
  password: {type: String, required: true},
});

const AdminModel = model('Admin', AdminSchema);

module.exports = AdminModel;