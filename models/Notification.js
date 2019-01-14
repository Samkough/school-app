const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = Notification = mongoose.model("notification", NotificationSchema);
