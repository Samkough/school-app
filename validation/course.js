const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateClubInputs(data) {
  let errors = {};

  data.courseName = !isEmpty(data.courseName) ? data.courseName : "";
  data.courseProfessor = !isEmpty(data.courseProfessor) ? data.courseProfessor : "";
  data.term = !isEmpty(data.term) ? data.term : "";

  //validate course name
  if (Validator.isEmpty(data.courseName)) {
    errors.courseName = "Class Name cannot be empty";
  }
  if (!Validator.isLength(data.courseName, { min: 2, max: 50 })) {
    errors.courseName = "Course Name needs to be between 2 and 50 characters";
  }

  //validate course professor
  if (Validator.isEmpty(data.courseProfessor)) {
    errors.courseProfessor = "Course Professor cannot be empty";
  }
  if (!Validator.isLength(data.courseProfessor, { min: 2, max: 50 })) {
    errors.courseProfessor = "Course Professor needs to be between 2 and 50 characters";
  }

  //validate term
  if (Validator.isEmpty(data.term)) {
    errors.term = "Term cannot be empty";
  }
  if (!Validator.isLength(data.term, { min: 2, max: 50 })) {
    errors.term = "Term needs to be between 2 and 50 characters";
  }

  /* validate section
   *
   * if section is a number check if below 0 or above 10
   * because that is unrealistic. Otherwise check if
   * it is between 1 and 3 characters for the cases when sections
   * include letters
   */
  if (typeof data.section === "number" && (data.section < 0 || data.section > 10)) {
    errors.section = "Invalid section";
  } else if (!Validator.isLength(data.term, { min: 1, max: 3 })) {
    errors.term = "Term needs to be between 1 and 3 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
