const db = require("../../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  skills: {
    type: Array,
    // required: true,
  },
});

const userData = db.getMainDb().model("userData", userSchema);
module.exports = { userData }; //export the model
