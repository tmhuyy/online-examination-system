const express = require("express");
const router = express.Router();
const passport = require("passport");
const Student = require("../models/student");
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../utils/validateModel");
const studentController = require("../controllers/studentController");

router
    .route("/login")
    .get(studentController.renderLoginForm)
    .post(studentController.login);

router.post("/logout", studentController.logout);

module.exports = router;
