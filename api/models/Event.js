const mongoose = require('mongoose');

// Create the Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    // ref: 'User',
    required: true
  },
  attendees: [{
    type: String,
    // ref: 'User',
    required: false
  }],
  createdAt: {
    type: String,
    default: Date.now,
    required: false
  }
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
