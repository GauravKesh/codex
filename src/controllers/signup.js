const { userData } = require("../models/userModel");
const bcrypt = require("crypto");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({name, email, password});
    const user = await userData.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      console.log(password);
      const user = new userData({
        name: name,
        email: email,
        password: password,
      });

      const result = await user.save();
      console.log(result);
      res.status(200).json({
        message:"User created successfully"
      })
    }
  } catch (err) {
    res.status(500).json({ message: "Error in signup", error: err.message });
  }
};
