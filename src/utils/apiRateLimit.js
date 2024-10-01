const {rateLimit} = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10000, 
  standardHeaders: "draft-7", 
  legacyHeaders: false, 
});

module.exports = {limiter};