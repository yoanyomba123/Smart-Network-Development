var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateVolunteerInput(data) {
  var errors = {};

  data.nonprofit = !isEmpty(data.nonprofit) ? data.nonprofit : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.nonprofit)) {
    errors.nonprofit = "nonprofit Field is Required";
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
