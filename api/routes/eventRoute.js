const express = require('express');
const router = express.Router();
const eventController = require('../controller/eventController');

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get a specific event by ID
router.get('/:id', eventController.getEventById);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
