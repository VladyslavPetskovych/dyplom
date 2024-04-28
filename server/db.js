const mongoose = require("mongoose");
require("dotenv").config();

const mongopass = process.env.mongopass;

var mongoURL = `mongodb+srv://peckovychv:1244@cluster0.nhi6fnh.mongodb.net/dyplome`;

mongoose.connect(mongoURL);

var conection = mongoose.connection;


conection.on("error", () => {
  console.log("mongo db conection failed");
});

conection.on("connected", () => {
  console.log("Mongo DB Conection successful!!!!!!!!!!!!!!!");
});

module.exports = mongoose;
