var express = require("express");
var router = express.Router();
var User = require("../../models/User");
var Keys = require("../../config/config");
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var passport = require("passport");
// end points and actions

// load input validation
var validateRegisterInput = require("../../validation/register");
var validateLoginInput = require("../../validation/login");

// @route  GET api/user/test
// @desc   user post access
// @access Public
router.get("/test", (request, response) =>
  response.json({
    msg: "User Works"
  })
);

// @route  POST api/user/register
// @desc   Register a user to the site
// @access Public
router.post("/register", (request, response) => {
  // pull out errors by destructuring
  var { errors, isValid } = validateRegisterInput(request.body);

  // error condition check
  if (!isValid) {
    return response.status(400).json(errors);
  }
  User.findOne({ email: request.body.email }).then(user => {
    // check if user already exists within our db
    if (user) {
      errors.email = "Email Already Exists";
      console.log(errors);
      // respond with a 404 message
      return response.status(400).json(errors);
    } else {
      var avatar = gravatar.url(request.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });

      // create new user
      var newUser = new User({
        name: request.body.name,
        email: request.body.email,
        avatar,
        password: request.body.password
      });

      // hash password and save hash as user password
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          throw error;
        }
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) {
            console.log(error);
            return error;
          }
          newUser.password = hash;
          console.log(request.body);
          newUser
            .save()
            .then(user => response.json(user))
            .catch(error => {
              console.log(error);
            });
        });
      });
    }
  });
});

// @route  GET api/user/login
// @desc   log in a user to the site - really returns a token
// @access Public
router.post("/login", (request, response) => {
  // pull out errors by destructuring
  var { errors, isValid } = validateLoginInput(request.body);

  // error condition check
  if (!isValid) {
    return response.status(400).json(errors);
  }
  const email = request.body.email;
  const password = request.body.password;
  User.findOne({ email: email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User Not Found";
      response.status(400).json(errors);
    } else {
      // check password
      bcrypt.compare(password, user.password).then(isMatched => {
        if (isMatched) {
          console.log("Matched");
          // generate token if user condition is passed
          // creating payload
          var payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          };

          // sign token
          jwt.sign(
            payload,
            Keys.keys.secretOrkey,
            { expiresIn: 3600 * 24 },
            (error, token) => {
              console.log("Bearer " + token);
              response.json({ success: true, token: "Bearer " + token });
            }
          );
          return response.json({
            msg: "Sucess"
          });
        } else {
          console.log("Not Matched");
          errors.password = "Password Incorrect";
          return response.status(400).json(errors);
        }
      });
    }
  });
});

// @route  GET api/users/current
// @desc   returns the current user
// @access Private protected route
// @route GET api/users/current
// @desc  Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
