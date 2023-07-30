const redis = require('redis');

const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server host
  port: 6379, // Replace with your Redis server port
});

redisClient.connect()
redisClient.on('connect', (err)=> {
  console.log("Connected redis....")
});
redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = { redisClient }