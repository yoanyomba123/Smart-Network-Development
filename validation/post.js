var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validatePostInput(data) {
  var errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "text Field is Required";
  }

  if (!validator.isLength(data.text, { min: 50, max: 200 })) {
    errors.text = "Posts must be between 50 and 200 characters";
  }
  return {
    errors,
    isValid: errors
  };
};
