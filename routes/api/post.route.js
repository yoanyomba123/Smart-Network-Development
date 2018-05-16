var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var passport = require("passport");
var Post = require("../../models/Post");
var Comment = require("../../models/Comments");

var Profile = require("../../models/Profile");

// api end points and actions
var validatePostInput = require("../../validation/post");

// @route   GET api/post/test
// @desc    Tests post access
// @access  Public
router.get("/test", (request, response) =>
  response.json({
    msg: "post Works"
  })
);

// @route   GET api/post
// @desc    get all post
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Post.find({})
      .sort({ date: -1 })
      .then(posts => {
        console.log(posts);
        response.json(posts);
      })
      .catch(error =>
        response
          .status(404)
          .json({ nopostfound: "No Posts Found With That ID" })
      );
  }
);

// @route   GET api/post
// @desc    get a single post by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Post.findById(request.params.id)
      .then(post => {
        console.log(post);
        response.json(post);
      })
      .catch(error =>
        response.status(404).json({ nopostfound: "No Post Found With That ID" })
      );
  }
);

// @route   POST api/post
// @desc    Create A post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // pull out errors by destructuring
    var { errors, isValid } = validatePostInput(request.body);

    // error condition check
    if (!isValid) {
      return response.status(400).json(errors);
    }
    var newpost = new Post({
      text: request.body.text,
      name: request.body.name,
      avatar: request.body.avatar,
      userid: request.user.id,
      user: request.user
    });

    // save post
    newpost.save().then(post => {
      console.log(post);
      response.json(post);
    });
  }
);
// @route   POST api/post/like/:id
// @desc    like a post
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        // post._id
        Post.findById(request.params.id).then(post => {
          console.log(post.like);
          if (
            post.like.filter(
              likeitem => likeitem.userid.toString() === request.user.id
            ).length > 0
          ) {
            return response
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          } else {
            post.like.unshift({ userid: request.user.id });
            console.log(post);
            post.save().then(post => response.json(post));
          }
        });
      })
      .catch(error =>
        response.status(404).json({
          nopostfound: "No Post Found With That ID For Deletion"
        })
      );
  }
);

// @route   POST api/post/unlike/:id
// @desc    unlike a post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id })
      .then(profile => {
        // post._id
        Post.findById(request.params.id).then(post => {
          console.log(post.like);
          if (
            (post.like.filter(
              likeitem => likeitem.userid.toString() === request.user.id
            ).length = 0)
          ) {
            return response
              .status(400)
              .json({ notliked: "User Hasnt Yet liked this post" });
          } else {
            // get remove index
            var removeindex = post.like
              .map(likeitem => likeitem.userid.toString)
              .indexOf(request.user.id);
            //splice out of array
            post.like.splice(removeindex, 1);
            console.log(post);
            post.save().then(post => response.json(post));
          }
        });
      })
      .catch(error =>
        response.status(404).json({
          nopostfound: "No Post Found With That ID For Deletion"
        })
      );
  }
);

// @route   POST api/post/comment/:id
// @desc    add a comment to a post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // pull out errors by destructuring
    var { errors, isValid } = validatePostInput(request.body);

    // error condition check
    if (!isValid) {
      return response.status(400).json(errors);
    }
    console.log("hereeyeeee");
    Post.findById(request.params.id).then(post => {
      // comment on another comment
      if (!post) {
        Comment.findById(request.params.id).then(comment => {
          if (!comment) {
            return response.status(404).json({
              nocommentfound:
                "Unable to add comment response to specified comment"
            });
          }
          // get parent posts' parent list
          var parents = comment.parents;
          // add parent post to its parent list to be used for new post parent list
          parents.push(comment._id);
          var newcomment = new Comment({
            text: request.body.text,
            avatar: request.body.avatar,
            user: request.user,
            name: request.body.name,
            discussion_id: comment.discussion_id,
            parentcomment: comment._id,
            parents: parents
          });
          // save the comment
          newcomment.save().then(comment => {
            // query for post
            Post.findById(comment.discussion_id).then(post => {
              post.comment.unshift({ commentid: comment._id });
              post.save().then(post => response.json(post));
            });
          });
        });
      } else {
        var parents = [];
        parents.push(post._id);
        var newcomment = new Comment({
          text: request.body.text,
          avatar: request.body.avatar,
          user: request.user,
          name: request.body.name,
          discussion_id: post._id,
          parentcomment: "NONE",
          parents: parents
        });
        // save the comment
        newcomment
          .save()
          .then(comment => {
            post.comment.unshift({ commentid: comment._id });
            post.save().then(post => response.json(post));
          })
          .catch(error =>
            response.status(404).json({ nopostfound: " No Post were found" })
          );
      }
    });
  }
);

// @route   Delete api/post/comment/:id/:comment_id
// @desc    Removes a comment from a post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    // pull out errors by destructuring
    var { errors, isValid } = validatePostInput(request.body);

    // error condition check
    if (!isValid) {
      return response.status(400).json(errors);
    }
    console.log("hereeyoooooo");
    Post.findById(request.params.id).then(post => {
      // comment on another comment
      if (!post) {
        response.status(404).json({ unabletofindpost: "Unable to find Post" });
      } else {
        Comment.findById(request.params.comment_id).then(tobedelcomment => {
          console.log("This is comment to be removed" + tobedelcomment);
          // find all comments who have this comment as the parent
          Comment.find({ parentcomment: tobedelcomment._id })
            .then(comments => {
              console.log("these are the rest of the comments " + comments);
              if (comments) {
                comments.map(comment => {
                  if (tobedelcomment.parentcomment === "NONE") {
                    //rmeove comment
                    comment.remove();
                  } else {
                    comment.remove();
                  }
                });
              }
            })
            .catch(error =>
              response
                .status(404)
                .json({ deletecomment: "Placeholder deletion error" })
            );
          // remove the wanted comment
          tobedelcomment.remove();
        });
      }
    });
  }
);
// @route   DELETE api/post
// @desc    delete a single post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    Profile.findOne({ userid: request.user.id }).then(profile => {
      // post._id
      Post.findById(request.params.id).then(post => {
        console.log(post.userid);
        console.log(request.user.id);
        if (post.userid !== request.user.id) {
          return response
            .status(401)
            .json({ notauthorized: "User not authorized" });
        } else {
          console.log("Here yo");
          post
            .remove()
            .then(() => {
              // remove all comments refering to this post
              Comment.find({ discussion_id: request.params.id }).then(
                comments => {
                  comments.map(comment => comment.remove());
                  console.log(comments);
                }
              );
            })
            .catch(error =>
              response.status(404).json({
                nopostfound: "No Post Found With That ID For Deletion"
              })
            );
        }
      });
    });
  }
);

module.exports = router;
