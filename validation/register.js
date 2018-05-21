var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateRegisterInput(data) {
  var errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordconf = !isEmpty(data.passwordconf) ? data.passwordconf : "";

  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "name must be between 2 and 20 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name Field is Required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field is Required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is Invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field is Required";
  }

  if (!validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.passwordconf)) {
    errors.passwordconf = "Confirm Password Field is Required";
  }

  if (!validator.equals(data.password, data.passwordconf)) {
    errors.name = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
