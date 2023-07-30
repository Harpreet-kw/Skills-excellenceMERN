// models/certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Certificate', certificateSchema);
