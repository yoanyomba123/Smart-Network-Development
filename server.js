/*
 Importing modules and libraries
*/

var express = require("express");
var mongoose = require("mongoose");

//
Users = require("./routes/api/users.route");
Profile = require("./routes/api/profile.route");
Posts = require("./routes/api/post.route");

var app = express();

// Database configuration
var db = require("./config/config").keys.MONGO_URI;
// connect to the database
mongoose
  .connect(db)
  .then(() => console.log("Connected To MongoDB Database"))
  .catch(error => console.log(error));

app.get("/", (request, response) => response.send("helloe"));

// Use routes
app.use("/api/user", Users);
app.use("/api/posts", Posts);
app.use("/api/profile", Profile);

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
