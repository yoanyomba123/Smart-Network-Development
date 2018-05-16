var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateLoginInput(data) {
  var errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field is Required";
  }

  return {
    errors,
    isValid: errors
  };
};
