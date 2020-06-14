const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://Harmeet:" + process.env.MONGO_ATLAS_PW + "@first-app-fqr36.mongodb.net/node-angular")
.then(() => {
  console.log('Connected To Database');
})
.catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin , X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);


module.exports = app;


