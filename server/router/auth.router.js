const GoogleLogin = require("../controller/auth.controller.js");
const express = require("express");

const router = express();

router.post("/google-login", GoogleLogin);

module.exports = router;
