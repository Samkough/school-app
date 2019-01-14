const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const NotificationSchema = new Schema({
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
  status: String,
  time: {
    type: Date,
    default: Date.now
  },
  type: String
});

module.exports = Notification = mongoose.model("notification", NotificationSchema);
