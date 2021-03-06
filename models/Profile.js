const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  motto: {
    type: String
  },
  bio: {
    type: String
  },
  major: {
    type: String,
    required: true
  },
  yearOfGrad: {
    type: Number,
    required: true
  },
  courses: [
    {
      courseName: {
        type: String,
        required: true
      },
      section: {
        type: ["number", "string"]
      },
      courseProfessor: {
        type: String,
        required: true
      },
      term: {
        type: String,
        required: true
      }
    }
  ],
  clubs: [
    {
      clubName: {
        type: String
      }
    }
  ],
  memberships: [
    {
      membershipName: {
        type: String
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    },
    facebook: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
