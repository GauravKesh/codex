const mongoose =  require("mongodb");
const Schema =  mongoose.Schema;
const db =  require("../../config/db")

const loginSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const signup = db.getMainDb().model("signup", loginSchema);
module.exports = {signup};  //export the model
