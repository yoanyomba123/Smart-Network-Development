var validator = require("validator");
var isEmpty = require("../validation/isEmpty");

module.exports = function validateProjectInput(data) {
  var errors = {};

  data.projecttitle = !isEmpty(data.projecttitle) ? data.projecttitle : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (validator.isEmpty(data.projecttitle)) {
    errors.projecttitle = "projecttitle Field is Required";
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
