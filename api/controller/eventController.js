// const Event = require('./Event');
const Event = require("../models/Event");

const redis = require('redis');
const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server host
  port: 6379, // Replace with your Redis server port
});

redisClient.connect()
redisClient.on('connect', (err)=> {
  // console.log("Connected redis....")
});
redisClient.on('error', err => console.log('Redis Client Error', err));

// Create a new event
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();

    let resp = await Event.find();
    redisClient.set('events', JSON.stringify(resp));
    
    res.status(201).json({
        data: savedEvent,
        status: true,
        message: "Created successfully!!"
    });
  } catch (error) {
    res.status(500).json({ 
        data: error,
        status: false,
        message: "Failed to create event!!"
     });
  }
}

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const cachedData = await redisClient.get('events');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json({
        data: respData,
        status: true,
        message: "fetched successfully!!"
    });
    } else {
      let resp = await Event.find();
      res.json({
        data: resp,
        status: true,
        message: "fetched successfully!!"
    });
      console.log("resp :::::::::::")
      redisClient.set('events', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({ 
      data: err,
      status: false,
      message: "Failed to fetch events!!"
   });
  }
}

// Get a specific event by ID
const getEventById = async (req, res) => {

  try {
    const cachedData = await redisClient.get('events/:id');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json({
        data: respData,
        status: true,
        message: "fetched successfully!!"
    });
    } else {
      let resp = await Event.find();
      res.json({
        data: resp,
        status: true,
        message: "fetched successfully!!"
    });
      console.log("resp :::::::::::")
      redisClient.set('events/:id', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({ 
      data: err,
      status: false,
      message: "Failed to fetch events!!"
   });
  }

  // try {
  //   const event = await Event.findById(req.params.id);
  //   if (!event) {
  //     return res.status(404).json({ 
  //       error: 'Event not found',
  //       data: event,
  //       status: false,
  //       message: "Event not found!!"
  //    });
  //   }
  //   res.status(200).json({
  //       data: event,
  //       status: true,
  //       message: "fetched successfully!!"
  //   });
  // } catch (error) {
  //   res.status(500).json({ 
  //       error: 'Failed to fetch event',
  //       data: error,
  //       status: false,
  //       message: "Failed to fetch!!"
  //    });
  // }
}

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ 
        error: 'Event not found',
        data: event,
        status: false,
        message: "Event not found!!"
     });
    }
    let resp = await Event.find();
    redisClient.set('events', JSON.stringify(resp));
    res.status(200).json({
        data: event,
        status: true,
        message: "updated successfully!!"
    });

  } catch (error) {
    res.status(500).json({ 
        error: 'Failed to update event',
        data: error,
        status: false,
        message: "Failed to update!!"
     });
  }
}

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    console.log("Delete *********", event)
    if (!event) {
      return res.status(404).json({ 
        error: 'Event not found',
        data: event,
        status: false,
        message: "Event not found!!"
     });
    }
    let resp = await Event.find();
    redisClient.set('events', JSON.stringify(resp));
    return res.status(200).json({
        data: event,
        status: true,
        message: "deleted successfully!!"
    });
  } catch (error) {
    console.log("Error ***********", error)
    res.status(500).json({ 
        error: 'Failed to delete event',
        data: error,
        status: false,
        message: "Failed to delete event!!"
     });
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
