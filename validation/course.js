const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClubInputs(data) {
  let errors = {};

  data.courseName = !isEmpty(data.courseName) ? data.courseName : "";
  data.courseProfessor = !isEmpty(data.courseProfessor)
    ? data.courseProfessor
    : "";

  if (Validator.isEmpty(data.courseName)) {
    errors.courseName = "Class Name cannot be empty";
  }
  if (Validator.isEmpty(data.courseProfessor)) {
    errors.courseProfessor = "Class Professor cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
