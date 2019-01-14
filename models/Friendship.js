const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],
  requestTo: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  accepted: {
    type: Boolean,
    default: False
  }
});

module.exports = Friendship = mongoose.model("friendship", FriendshipSchema);
