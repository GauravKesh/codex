const { userData } = require("../models/userModel");

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await userData.find({
      email: email,
      password: password,
    });
    if (user) {
      res.status(200).json({
        message: "User logged in successfully",
      });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid email or password" });
  }
};
