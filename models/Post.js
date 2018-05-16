// specifying imports
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  userid: {
    type: String
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
  comment: [
    {
      commentid: {
        type: Schema.Types.ObjectId,
        ref: "comments"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
