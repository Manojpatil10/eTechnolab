const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/main-routes')
require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const mongodb_url = process.env.MONGODB_URL;

// mongoose.connect(mongodb_url).then(() => {
//     console.log("Mongodb connected successfully");
// }).catch((err) => {
//     console.log("error in mongodb connection", err);
// })

mongoose.connect(`${process.env.ATLAS_URL}`).then((connected)=>{
  console.log("Mongodb connected successfully");
}).catch((err)=>{
  console.log("error in mongodb connection",err);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})