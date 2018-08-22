/*jshint esversion: 6 */
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");

// load validation
var validateProfileInput = require("../../validation/profile");
var validateExperienceInput = require("../../validation/experience");
var validateEducationInput = require("../../validation/education");
var validateVolunteerInput = require("../../validation/volunteer");
var validateProjectsInput = require("../../validation/projects");
var validateHonorsInput = require("../../validation/honor");
// load profile model
var Profile = require("../../models/Profile");
// load user model
var User = require("../../models/User");

// end points and actions

// @route  GET api/profile/test
// @desc   Tests profile access
// @access Public
router.get("/test", (request, response) =>
  response.json({
    msg: "profile Works"
  })
);

// @route  GET api/profile
// @desc   Gets current user profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    var errors = {};
    // logged in user
    Profile.findOne({ userid: request.user.id })
      .populate("user", [("name", "avatar")])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this User";
          return response.status(404).json(errors);
        }
        console.log(profile);
        response.json(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);
// @route  Get api/profile/all
// @desc  Get All Profile
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // find user by handle
    errors = {};
    Profile.find({})
      .populate("user", ["name", "avatar"])
      .then(profiles => {
        console.log(profiles);
        if (!profiles) {
          errors.noprofile = "There are no profiles";
          return response.status(404).json(errors);
        }
        response.json(profiles);
      })
      .catch(error =>
        response.status(404).json({ profile: "There are no profiles" })
      );
  }
);

// @route  Get api/profile/handle/:handle
// @desc  Get Profile By handle
// @access Private
router.get(
  "/handle/:handle",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // find user by handle
    errors = {};
    Profile.findOne({ handle: request.params.handle })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        console.log(profile);
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          reponse.status(404).json(errors);
        } else {
          response.json(profile);
        }
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Get api/profile/user/:user_id
// @desc  Get Profile By user_id
// @access Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // find user by handle
    errors = {};
    Profile.findOne({ userid: request.params.user_id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        console.log(profile);
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          reponse.status(404).json(errors);
        } else {
          response.json(profile);
        }
      })
      .catch(error =>
        response
          .status(404)
          .json({ profile: "There is no profile for this user" })
      );
  }
);
// @route  Post api/profile
// @desc   Create or edit User Profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateProfileInput(request.body);

    // check validation
    if (!isValid) {
      // return errors with 400 status
      response.status(400).json(errors);
    }

    // get fields coming in
    var profileFields = {};
    profileFields.user = request.user;
    profileFields.userid = request.user.id;
    if (request.body.handle) profileFields.handle = request.body.handle;
    if (request.body.company) profileFields.company = request.body.company;
    if (request.body.website) profileFields.website = request.body.website;
    if (request.body.location) profileFields.location = request.body.location;
    if (request.body.bio) profileFieldybody.bio = request.body.bio;
    if (request.body.status) profileFields.status = request.body.status;
    if (request.body.githubusername)
      profileFields.githubusername = request.body.githubusername;
    // split skills, interests, porfolio into some array data structures
    if (typeof request.body.skills != "undefined") {
      profileFields.skills = request.body.skills.split(",");
    }
    if (typeof request.body.interests != "undefined") {
      profileFields.interests = request.body.interests.split(",");
    }
    if (typeof request.body.portfolio != "undefined") {
      profileFields.portfolio = request.body.portfolio.split(",");
    }

    // social
    profileFields.social = {};
    if (request.body.youtube)
      profileFields.social.youtube = request.body.youtube;
    if (request.body.twitter)
      profileFields.social.twitter = request.body.twitter;
    if (request.body.linkedin)
      profileFields.social.linkedin = request.body.linkedin;
    if (request.body.facebook)
      profileFields.social.facebook = request.body.facebook;
    if (request.body.instagram)
      profileFields.social.instagram = request.body.instagram;

    console.log(profileFields);
    console.log(request.user.id);
    Profile.findOne({ userid: request.user.id }).then(profile => {
      if (profile) {
        console.log(profile);
        // updaete profile
        Profile.findOneAndUpdate(
          { userid: request.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          console.log(profile);
          response.json(profile);
        });
      } else {
        // create

        // check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That Handle Already exitsts";
            console.log(errors);
            return response.status(400).json(errors);
          } else {
            // save profile
            new Profile(profileFields)
              .save()
              .then(profile => response.json(profile));
          }
        });
      }
    });
  }
);

// @route  Post api/profile/experience
// @desc   Add an experience
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateExperienceInput(request.body);
    // check validation
    if (!isValid) {
      console.log("\n\n\n");
      // return errors with 400 status
      response.status(400).json(errors);
    }
    Profile.findOne({ userid: request.user.id }).then(profile => {
      var newexp = {};
      newexp.title = request.body.title;
      newexp.company = request.body.company;
      newexp.location = request.body.location;
      newexp.from = request.body.from;
      newexp.to = request.body.to;
      newexp.current = request.body.current;
      newexp.description = request.body.description;

      console.log(newexp);
      // add to experience array
      profile.experience.unshift(newexp);
      console.log(profile);
      if (profile) {
        profile.save().then(user => {
          console.log(user);
          response.json(user);
        });
      }
    });
  }
);

// @route  Post api/profile/education
// @desc   Add an education experience
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateEducationInput(request.body);
    // check validation
    if (!isValid) {
      // return errors with 400 status
      response.status(400).json(errors);
    }
    Profile.findOne({ userid: request.user.id }).then(profile => {
      var neweducation = {};
      neweducation.school = request.body.school;
      neweducation.degree = request.body.degree;
      neweducation.from = request.body.from;
      neweducation.to = request.body.to;
      neweducation.current = request.body.current;
      neweducation.major = request.body.major;
      console.log(neweducation);
      // add to experience array
      profile.education.unshift(neweducation);
      console.log(profile);
      if (profile) {
        profile.save().then(user => {
          console.log(user);
          response.json(user);
        });
      }
    });
  }
);

// @route  Post api/profile/volunteer
// @desc   Add a volunteer experience
// @access Private
router.post(
  "/volunteer",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateVolunteerInput(request.body);
    // check validation
    if (!isValid) {
      // return errors with 400 status
      response.status(400).json(errors);
    }
    Profile.findOne({ userid: request.user.id }).then(profile => {
      var newvolunter = {};
      newvolunter.nonprofit = request.body.nonprofit;
      newvolunter.from = request.body.from;
      newvolunter.to = request.body.to;
      newvolunter.current = request.body.current;
      newvolunter.description = request.body.description;
      console.log(newvolunter);
      // add to experience array
      profile.volunteer.unshift(newvolunter);
      console.log(profile);
      if (profile) {
        profile.save().then(user => {
          console.log(user);
          response.json(user);
        });
      }
    });
  }
);

// @route  Post api/profile/projects
// @desc   Add a volunteer experience
// @access Private
router.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateProjectsInput(request.body);
    // check validation
    if (!isValid) {
      // return errors with 400 status
      response.status(400).json(errors);
    }
    Profile.findOne({ userid: request.user.id }).then(profile => {
      var newproject = {};
      newproject.projecttitle = request.body.projecttitle;
      newproject.from = request.body.from;
      newproject.to = request.body.to;
      newproject.current = request.body.current;
      newproject.description = request.body.description;
      console.log(newproject);
      // add to project array
      profile.projects.unshift(newproject);
      console.log(profile);
      if (profile) {
        profile.save().then(user => {
          console.log(user);
          response.json(user);
        });
      }
    });
  }
);

// @route  Post api/profile/honors
// @desc   Add an honor
// @access Private
router.post(
  "/honors",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // validate fields by use of destructuring
    var { errors, isValid } = validateHonorsInput(request.body);
    // check validation
    if (!isValid) {
      // return errors with 400 status
      response.status(400).json(errors);
    }
    Profile.findOne({ userid: request.user.id }).then(profile => {
      var newhonor = {};
      newhonor.award = request.body.award;
      newhonor.from = request.body.from;
      newhonor.to = request.body.to;
      newhonor.current = request.body.current;
      newhonor.description = request.body.description;
      console.log(newhonor);
      // add to award array
      profile.honors.unshift(newhonor);
      console.log(profile);
      if (profile) {
        profile.save().then(user => {
          console.log(user);
          response.json(user);
        });
      }
    });
  }
);

//======================================DELETE REQUESTS==========
// @route  Delete api/profile/experience/:experience_id
// @desc   Delete an experience
// @access Private
router.delete(
  "/experience/:experience_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        var removeindex = profile.experience
          .map(item => item.id)
          .indexOf(request.params.experience_id);

        //splice out of array
        profile.experience.splice(removeindex);
        profile.save().then(profile => response.json(profile));
        console.log(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Delete api/profile.projects/.projects_id
// @desc   Delete a project
// @access Private
router.delete(
  ".projects/:projects_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        var removeindex = profile.projects
          .map(item => item.id)
          .indexOf(request.params.projects_id);

        //splice out of array
        profile.projects.splice(removeindex);
        profile.save().then(profile => response.json(profile));
        console.log(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Delete api/profile/education/:education_id
// @desc   Delete an education
// @access Private
router.delete(
  "/education/:education_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        var removeindex = profile.education
          .map(item => item.id)
          .indexOf(request.params.education_id);

        //splice out of array
        profile.education.splice(removeindex);
        profile.save().then(profile => response.json(profile));
        console.log(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Delete api/profile/volunteer/:volunteer_id
// @desc   Delete a volunteer
// @access Private
router.delete(
  "/volunteer/:volunteer_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        var removeindex = profile.volunteer
          .map(item => item.id)
          .indexOf(request.params.volunteer_id);

        //splice out of array
        profile.volunteer.splice(removeindex);
        profile.save().then(profile => response.json(profile));
        console.log(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Delet api/profile/honors/:honors_id
// @desc   Delete an honor
// @access Private
router.delete(
  "/honors/:honors_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        var removeindex = profile.honors
          .map(item => item.id)
          .indexOf(request.params.honors_id);

        //splice out of array
        profile.honors.splice(removeindex);
        profile.save().then(profile => response.json(profile));
        console.log(profile);
      })
      .catch(error => response.status(404).json(error));
  }
);

// @route  Delet api/profile
// @desc   Delete a User and Profile
// @access Private
router.delete(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    console.log("HERER");
    Profile.findOneAndRemove({ userid: request.user.id }).then(() => {
      User.findOneAndRemove({ id: request.user.id }).then(() =>
        response.json({ success: true })
      );
    });
  }
);
module.exports = router;
