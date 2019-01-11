const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");
const validateCourseInput = require("../../validation/course");
const validateClubInput = require("../../validation/club");
const validateMembershipInput = require("../../validation/membership");

//Load profile model
const Profile = require("../../models/Profile");
//Load user model
const User = require("../../models/User");

//  @route  GET api/profile/test
//  @desc   Test profile route
//  @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile Works" });
});

//  @route  GET api/profile/
//  @desc   Get current user profile
//  @access Private
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//  @route  GET api/profile/all
//  @desc   Get all users
//  @access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

//  @route  GET api/profile/handle/:handle
//  @desc   Get user profile by handle
//  @access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//  @route  GET api/profile/:user_id
//  @desc   Get user profile by id
//  @access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: "There is no profile for this user" }));
});

//  @route  POST api/profile/
//  @desc   Create user profile
//  @access Private
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);
  //check validation
  if (!isValid) {
    //return any erros with 400 status
    return res.status(400).json(errors);
  }

  //get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.motto) profileFields.motto = req.body.motto;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.major) profileFields.major = req.body.major;
  if (req.body.yearOfGrad) profileFields.yearOfGrad = req.body.yearOfGrad;
  //socials
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      //Update
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile =>
        res.json(profile)
      );
    } else {
      //Create

      //check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "that handle already exists";
          res.status(400).json(errors);
        }
        //Save profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

//  @route  POST api/profile/courses
//  @desc   Add student courses
//  @access Private
router.post("/courses", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateCourseInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newCourse = {
        courseName: req.body.courseName,
        courseProfessor: req.body.courseProfessor,
        section: req.body.section,
        term: req.body.term
      };

      //add to course array
      profile.courses.unshift(newCourse);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

//  @route  DELETE api/profile/courses/:course_id
//  @desc   Remove student course
//  @access Private
router.delete("/courses/:course_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //get remove index
      const removeIndex = profile.courses.map(item => item.id).indexOf(req.params.course_id);

      //splice out of array
      profile.courses.splice(removeIndex, 1);

      //save
      profile.save().then(profile => {
        res.json(profile);
      });
    })
    .catch(err => res.status(404).json(err));
});

//  @route  POST api/profile/clubs
//  @desc   Add student club
//  @access Private

router.post("/clubs", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateClubInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newClub = {
        clubName: req.body.clubName
      };

      //add to course array
      profile.clubs.unshift(newClub);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

//  @route  DELETE api/profile/clubs/:club_id
//  @desc   Remove student club
//  @access Private
router.delete("/clubs/:club_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //get remove index
      const removeIndex = profile.clubs.map(item => item.id).indexOf(req.params.club_id);

      //splice out of array
      profile.clubs.splice(removeIndex, 1);

      //save
      profile.save().then(profile => {
        res.json(profile);
      });
    })
    .catch(err => res.status(404).json(err));
});

//  @route  POST api/profile/memberships
//  @desc   Add student membership
//  @access Private

router.post("/memberships", passport.authenticate("jwt", { session: false }), (req, res) => {
  const { errors, isValid } = validateMembershipInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newMem = {
        membershipName: req.body.membershipName
      };

      //add to course array
      profile.memberships.unshift(newMem);
      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

//  @route  POST api/profile/memberships/:mem_id
//  @desc   Remove student membership
//  @access Private
router.delete("/memberships/:membership_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      //get remove index
      const removeIndex = profile.memberships.map(item => item.id).indexOf(req.params.membership_id);

      //splice out of array
      profile.memberships.splice(removeIndex, 1);

      //save
      profile.save().then(profile => {
        res.json(profile);
      });
    })
    .catch(err => res.status(404).json(err));
});
//  @route  DELETE api/profile/
//  @desc   Delete user and profile
//  @access Private
router.delete("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  });
});

module.exports = router;
