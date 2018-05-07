var express = require("express");
var router = express.Router();

// end points and actions

// @route  GET api/profile/test
// @desc   Tests profile access
// @access Public
router.get("/test", (request, response) =>
  response.json({
    msg: "profile Works"
  })
);

module.exports = router;
