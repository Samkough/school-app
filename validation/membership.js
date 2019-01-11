const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMembershipInputs(data) {
  let errors = {};

  data.membershipName = !isEmpty(data.membershipName) ? data.membershipName : "";

  if (Validator.isEmpty(data.membershipName)) {
    errors.membershipName = "Membership Name cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
