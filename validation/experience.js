var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateExperienceInput(data) {
  var errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "title Field is Required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "company Field is Required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "from date Field is Required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "description Field is Required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
