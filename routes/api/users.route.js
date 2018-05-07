var express = require("express");
var router = express.Router();

// end points and actions

// @route  GET api/user/test
// @desc   user post access
// @access Public
router.get("/test", (request, response) =>
  response.json({
    msg: "User Works"
  })
);

module.exports = router;
