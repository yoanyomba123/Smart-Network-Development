// specifying imports
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  Date: {
    type: Date
  }
});

module.exports = User = mongoose.model("users", UserSchema);
