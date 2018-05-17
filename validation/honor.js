var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateHonorInput(data) {
  var errors = {};

  data.award = !isEmpty(data.award) ? data.award : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.award)) {
    errors.award = "award Field is Required";
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
