const { Schema, model } = require("mongoose");
const { ROLE } = require("../config/roles");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "operator",
      enum: [ROLE.operator, ROLE.admin, ROLE.analytics],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
