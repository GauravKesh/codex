const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = require("../../config/db");

const loginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});
const login = db.getMainDb().model("login", loginSchema);
module.exports = {login};
