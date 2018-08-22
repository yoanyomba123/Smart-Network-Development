/*
 Importing modules and libraries
*/
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var passport = require("passport");

// specifying more imports
Users = require("./routes/api/users.route");
Profile = require("./routes/api/profile.route");
Posts = require("./routes/api/post.route");
RSS = require("./routes/api/rssfeed.route");
var app = express();

// body parser middleware
// no nested post reponse to be submitted as extended is false
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Database configuration
var db = require("./config/config").keys.MONGO_URI;

// connect to the database
mongoose
  .connect(db)
  .then(() => console.log("Connected To MongoDB Database"))
  .catch(error => console.log(error));

// passport middleware initialization
app.use(passport.initialize());

// passport configuration
require("./config/passport")(passport);

// Use routes
app.use("/api/users", Users);
app.use("/api/posts", Posts);
app.use("/api/profile", Profile);
app.use("/api/rss", RSS);

// define port of which to operate off of
var PORT = process.env.PORT || 5000;

// listen for requests
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
