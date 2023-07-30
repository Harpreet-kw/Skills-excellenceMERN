const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const JobSchema = new Schema({
  title:String,
  company:String,
  summary:String,
  content:String,
  cover:String,
}, {
  timestamps: true,
});

const JobModel = model('Job', JobSchema);

module.exports = JobModel;