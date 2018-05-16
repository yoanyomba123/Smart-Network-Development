// specifying imports
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  like: [
    {
      userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  discussion_id: {
    type: String
  },
  parentcomment: {
    type: String
  },
  parents: [
    {
      type: Schema.Types.ObjectId
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comments = mongoose.model("comments", CommentSchema);
