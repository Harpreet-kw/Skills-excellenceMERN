// models/video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  subtitle: {
    type: String,
    required: false,
  },
  videoPath: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('Video', videoSchema);