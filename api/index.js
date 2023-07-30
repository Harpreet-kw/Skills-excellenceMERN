const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Admin = require('./models/Admin');
const Job = require('./models/Jobs');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path')
const redis = require('redis');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const port = 4000;

// **** route ******************
const eventRoutes = require('./routes/eventRoute');
const servicesRoutes = require('./routes/servicesRoute');
const videoRoutes = require('./controller/courseController');
// const certificateRoutes = require('./routes/certificateRoute');

// redis client
// const redisClient = require('./redis');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
// Parse JSON bodies for API endpoints

// Parse URL-encoded bodies for HTML forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/uploads', express.static('uploads'));
// app.use('/videos', express.static('videos'));
// app.use(express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/videos', express.static(path.join(__dirname, 'videos')))
// app.use(express.static('./videos'));


// const redis = require('redis');
/**
 * username - rushabhmodi10
 * password - UUbcs8fzE7D6NYXO
 * url - mongodb+srv://rushabhmodi10:<password>@cluster0.zq7b3tx.mongodb.net/
 * oldUrl - mongodb+srv://rushabhmodi10:LCAIhtoQZZ7e14fX@cluster0.x18qjrw.mongodb.net/?retryWrites=true&w=majority
 */

mongoose.connect('mongodb+srv://rushabhmodi10:UUbcs8fzE7D6NYXO@cluster0.zq7b3tx.mongodb.net/',
  {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  }).then(()=> {
    console.log("Connected successfully .....")
  }).catch((err)=> {
    console.log("Error ***********************", err)
  });


const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        // port: REDIS_PORT,
        // host: REDIS_URL
        host: 'localhost', // Replace with your Redis server host
        port: 6379, // Replace with your Redis server port
    }
});

redisClient.connect().catch((err)=> {
  console.log("Error ***********************", err)
})
// redisClient.on('connect', (err)=> {
//   console.log("Connected redis....", err)
// });
// redisClient.on('error', err => console.log('Redis Client Error', err));

app.get('/test', (req,res) => {
    res.json('test ok 2');
});

app.post('/register', async (req,res) => {
  const {name,email,phone,description,username,password} = req.body;
  try{
    const userDoc = await User.create({
      name,
      email,
      phone,
      description,
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/updateUser', async (req,res) => {
  const {name,email,phone,description,username,password, id} = req.body;
  try{
    const userDoc = await User.findByIdAndUpdate(req.body.id, req.body, { new: true });;
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/getUser/:id', async (req,res) => {
  // const {name,email,phone,description,username,password} = req.body;
  try{
    const userDoc = await User.findById(req.params.id);
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.get('/getUser', async (req,res) => {
  
  try {
    const cachedData = await redisClient.get('getUser');
    let respData = JSON.parse(cachedData)
    console.log("get details****", cachedData, respData)
    if (respData?.length) {
      res.json({
        data: respData,
        status: 200
      });
    } else {
      let resp = await User.find({});
      res.json({
        data: resp,
        status: 200
      });
      // console.log("resp :::::::::::", resp)
      redisClient.set('job', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({
      message: "something went wrong!!"
    });
  }
});


app.post('/admin_login', async (req,res) => {
  const {username,password} = req.body;
  try{
    console.log("password ********", username, password)
    const adminDoc = await Admin.findOne({email: username});
    console.log("Admin details *****", adminDoc)
    const passOk = bcrypt.compareSync(password, adminDoc.password);
    console.log("password check ************", passOk)
    if (passOk) {
      // logged in
      jwt.sign({username,id:adminDoc._id}, secret, {}, (err,token) => {
        if (err) {
          console.log("err *************", err)
          throw err
        };
        res.cookie('token', token).json({
          id:adminDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  } catch (err) {
    console.log("Error **********", err)
    res.status(400).json(err);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  console.log("body ***********", req.body)
  const userDoc = await User.findOne({email: username});
  console.log("body ***********", userDoc)
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    console.log("Error ****************")
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});
app.post('/admin_logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/job', uploadMiddleware.single('file'), async (req,res) => {
  console.log("body data", req.body )
  const {originalname, path} = req?.file;
  const parts = originalname?.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,company,summary,content} = req.body;
    const jobDoc = await Job.create({
      title,
      company,
      summary,
      content,
      cover:newPath || "",
    });

    let resp = await Job.find();
    redisClient.set('job', JSON.stringify(resp));

    res.json(jobDoc);
  });

});


app.post('/job/updateJob',  uploadMiddleware.single('file'),  async (req, res) => {

  console.log("Inside update ", req.file)
  let newPath = null;
  if (req?.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  // const { token } = req.cookies;
  // jwt.verify(token, secret, {}, async (err, info) => {
  //   if (err) {
  //     console.log("Error ****************", err)
  //     throw err
  //   };
    // const { id, title, company, summary, content } = req.body;
    // const jobDoc = await Job.findById(req.params.id);
    let payload = {
      ...req.body,
      cover: newPath
    }

    console.log("files ***************", payload)

    try {
      const job = await Job.findByIdAndUpdate(req.body.id, payload, { new: true });
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      let resp = await Job.find();
      redisClient.set('job', JSON.stringify(resp));

      res.status(200).json(job);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the job' });
    }
  // });

});

// redisClient.set('job', JSON.stringify(""));

app.get('/job', async (req, res) => {
  try {
    // const cachedData = await redisClient.get('job');
    // let respData = JSON.parse(cachedData)
    // console.log("get the job details****", cachedData, respData)
    // if (respData?.length) {
    //   console.log("Inside cached ....")
    //   res.json(respData);
    // } else {
      let resp = await Job.find()
        .populate()
        .sort({ createdAt: -1 })
        .limit(20)
      res.json(
        resp
      );
      console.log("resp :::::::::::")
      redisClient.set('job', JSON.stringify(resp));
    // }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({
      message: "something went wrong!!"
    });
  }
});

app.delete('/job/:id', async (req,res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
    console.log("Delete *********", job)
    if (!job) {
      return res.status(404).json({ 
        error: 'job not found',
        data: job,
        status: false,
        message: "job not found!!"
     });
    }

    let resp = await Job.find();
    redisClient.set('job', JSON.stringify(resp));
    
    return res.status(200).json({
        data: job,
        status: true,
        message: "deleted successfully!!"
    });
});

app.get('/job/:id', async (req, res) => {
  try {
    const cachedData = await redisClient.get('job/:id');
    let respData = JSON.parse(cachedData)
    console.log("get the job details****", cachedData, respData)
    if (respData?.length) {
      res.json(respData);
    } else {
      let resp = await Job.findById(id);
      res.json(
        resp
      );
      console.log("resp :::::::::::")
      redisClient.set('job/:id', JSON.stringify(resp));
    }
  } catch (err) {
    console.log("Some error ::::::::::", err)
    res.json({
      message: "something went wrong!!"
    });
  }
})

/**
 * *************************** Event route will goes here *********************
 */
app.use("/events", eventRoutes);
/**
 * ************************** END **************************
 */
// Middleware

// Routes
app.use('/services', servicesRoutes);

app.use('/courses', videoRoutes);

// app.use('/api', certificateRoutes);

app.listen(port, () => {
  console.log(`Server is running on port:: ${port}, http://localhost:${port}`);
});
//