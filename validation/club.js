const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClubInputs(data) {
  let errors = {};

  data.clubName = !isEmpty(data.clubName) ? data.clubName : "";

  if (Validator.isEmpty(data.clubName)) {
    errors.clubName = "Club Name cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
