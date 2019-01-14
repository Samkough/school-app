const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    friendshipId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Friends"
    },
    body: {
      type: String,
      required: true
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    seen: {
      type: Boolean,
      default: false
    },
    delivered: {
      type: Boolean,
      default: false
    },
    time: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = Message = mongoose.model("message", MessageSchema);
