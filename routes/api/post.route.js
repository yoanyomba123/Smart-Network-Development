var express = require("express");
var router = express.Router();

// api end points and actions

// @route   GET api/post/test
// @desc    Tests post access
// @access  Public
router.get("/test", (request, response) =>
  response.json({
    msg: "post Works"
  })
);

module.exports = router;
