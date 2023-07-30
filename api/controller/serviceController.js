// controllers/jobController.js
const Job = require('../models/Services');

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


// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description } = req.body;
    const job = new Job({ title, description });
    await job.save();

    let resp = await Job.find();
    redisClient.set('services', JSON.stringify(resp));
    
    res.status(201).json(job);
  } catch (err) {
    console.log("Error ***************", err)
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {


  try {
    const cachedData = await redisClient.get('services');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json(respData);
    } else {
      let resp = await Job.find();
      res.json(resp);
      console.log("resp :::::::::::")
      redisClient.set('services', JSON.stringify(resp));
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
  //   const jobs = await Job.find();
  //   res.json(jobs);
  // } catch (err) {
  //   res.status(500).json({ error: 'Server Error' });
  // }
};

// Get a single job by ID
exports.getJobById = async (req, res) => {
  try {
    const cachedData = await redisClient.get('services/:id');
    let respData = JSON.parse(cachedData)
    console.log("get the details****", cachedData, respData)
    if (respData?.length) {
      res.json(respData);
    } else {
      let resp = Job.findById(req.params.id);
      res.json(resp);
      console.log("resp :::::::::::")
      redisClient.set('services/:id', JSON.stringify(resp));
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
  //   const job = await Job.findById(req.params.id);
  //   if (!job) {
  //     return res.status(404).json({ error: 'Job not found' });
  //   }
  //   res.json(job);
  // } catch (err) {
  //   res.status(500).json({ error: 'Server Error' });
  // }
};

// Update a job by ID
exports.updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    let resp = await Job.find();
    redisClient.set('services', JSON.stringify(resp));
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Delete a job by ID
exports.deleteJobById = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndRemove(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }
    let resp = await Job.find();
    redisClient.set('services', JSON.stringify(resp));
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
