const { userLogin } = require("../controllers/login");
const express = require("express");
const router =express.Router();

router.post("/login", userLogin);

module.exports = router;