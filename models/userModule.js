const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    role: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
    collection: "userList",
  }
);

module.exports = mongoose.model("userList", userSchema);
