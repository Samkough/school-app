const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.major = !isEmpty(data.major) ? data.major : "";
  data.yearOfGrad = !isEmpty(data.yearOfGrad) ? data.yearOfGrad : 0;
  data.bio = !isEmpty(data.bio) ? data.bio : "";
  data.motto = !isEmpty(data.motto) ? data.motto : "";
  data.major = !isEmpty(data.major) ? data.major : "";

  /* Year of Graudation validation
   *
   * Check if year of graduation if valid
   * Can't be before the year MSU was established and can't be more than 5 years in the future.
   */
  const d = new Date();
  if (data.yearOfGrad > d.getFullYear() + 5 || data.yearOfGrad < 1908) {
    errors.yearOfGrad = "Invalid year of graduation";
  }
  if (Validator.isEmpty(data.yearOfGrad)) {
    errors.yearOfGrad = "Year of Graduation required";
  }

  //handle validation
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  //major validation
  if (!Validator.isLength(data.major, { min: 2, max: 40 })) {
    errors.major = "Major title needs to be between 2 and 40 characters";
  }
  if (Validator.isEmpty(data.major)) {
    errors.status = "Major field is required";
  }

  //bio validation
  if (!Validator.isLength(data.bio, { max: 10 })) {
    errors.bio = "Bio must be no more than 2000 characters";
  }

  // Motto validation
  if (!Validator.isLength(data.motto, { max: 80 })) {
    errors.motto = "Bio must be no more than 80 characters";
  }

  //Social link validation
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
