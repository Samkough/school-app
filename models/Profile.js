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
    type: String,
    required: true
  },
  courses: [
    {
      courseName: {
        type: String,
        required: true
      },
      courseProfessor: {
        type: String,
        required: true
      }
    }
  ],
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
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
