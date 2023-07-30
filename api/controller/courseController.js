// routes/videos.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Video = require('../models/Courses');

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

// Configure multer for handling video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


// Create a new video
router.post('/videos', upload.single('video'), async (req, res) => {
  try {
    const { title, subtitle } = req?.body;
    console.log("******** courses ************", req?.body, req?.file)
    const videoPath = req?.file?.path;
    const video = new Video({ title, subtitle, videoPath });
    let videoRes = await video.save();
    console.log("videoRes ------", videoPath)
    let resp = await Video.find();
    redisClient.set('courses', JSON.stringify(resp));
    res.status(201).json({
      data: videoRes
    });
  } catch (err) {
    console.log("error ******************", err)
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all videos
router.get('/videos', async (req, res) => {

  try {
    const cachedData = await redisClient.get('courses');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json(respData);
    } else {
      let resp = await Video.find();
      res.json(resp);
      console.log("resp :::::::::::")
      redisClient.set('courses', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({ 
      data: err,
      status: false,
      error: "Failed to fetch events!!"
   });
  }

  // try {
  //   const videos = await Video.find();
  //   res.json(videos);
  // } catch (err) {
  //   res.status(500).json({ error: 'Server Error' });
  // }
});

// Get a single video by ID
router.get('/videos/:id',  async (req, res) => {

  try {
    const cachedData = await redisClient.get('courses/:id');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json(respData);
    } else {
      let resp = await Video.findById(req.params.id);
      res.json(resp);
      console.log("resp :::::::::::")
      redisClient.set('courses/:id', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({ 
      data: err,
      status: false,
      error: "Failed to fetch events!!"
   });
  }

  // try {
  //   const video = await Video.findById(req.params.id);
  //   if (!video) {
  //     return res.status(404).json({ error: 'Video not found' });
  //   }
  //   res.json(video);
  // } catch (err) {
  //   res.status(500).json({ error: 'Server Error' });
  // }
});

// Update a video by ID
router.post('/update/videos',  upload.array('videos', 5) , async (req, res) => {
  try {
    console.log("req.body ******************", req.body, req.files)

    const videoPath = req?.files?.map((item)=>item?.path);
    let updateP = {
      ...req.body,
      videoPath: videoPath
    }
    const updatedVideo = await Video.findByIdAndUpdate(
      req.body.id,
      updateP,
      { new: true }
    );
    if (!updatedVideo) {
      console.log("error res ***********", updatedVideo)
      return res.status(404).json({ error: 'Video not found' });
    }

    let resp = await Video.find();
    redisClient.set('courses', JSON.stringify(resp));

    res.json(updatedVideo);
  } catch (err) {
    console.log("Error ****************", err)
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a video by ID
router.delete('/videos/:id', async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndRemove(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    let resp = await Video.find();
    redisClient.set('courses', JSON.stringify(resp));

    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
