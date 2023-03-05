require("dotenv").config();
const express = require("express");
const app = express();
const redis = require("redis");
const subscribe = redis.createClient({
    url: process.env.REDIS_URI
});

subscribe.subscribe('orderSystem');
subscribe.on('message', (channel, message) => {
    console.log(`The channel is ${channel}`);
    console.log(`Receive message ${JSON.parse(message)}`);
});

app.listen(3001, () => {
    console.log("The server is running on port 3000");
});