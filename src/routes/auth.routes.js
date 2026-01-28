const express = require("express");
const router = express.Router();
const { signupLeader } = require("../controllers/auth.controller");

router.post("/signup", signupLeader);

module.exports = router;
