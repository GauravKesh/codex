const  jwt  =  require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "defaultSecretKey"; // Make sure to set this in your environment variables

const generateToken = ( userData) => {
  const payload = {userData };

  const token = jwt.sign(payload, secretKey, { expiresIn: "30d" });

  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
  // });
  return token;
};
module.exports = {generateToken};
