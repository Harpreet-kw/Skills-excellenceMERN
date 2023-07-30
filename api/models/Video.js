// models/video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: false
  },
  videoPaths: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('Video', videoSchema);