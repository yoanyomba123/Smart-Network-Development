var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateEducationInput(data) {
  var errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.major = !isEmpty(data.major) ? data.major : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "school Field is Required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree Field is Required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "from date Field is Required";
  }

  if (validator.isEmpty(data.major)) {
    errors.major = "major Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
