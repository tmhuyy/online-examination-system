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
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
            keepSessionInfo: true,
        }),
        studentController.login
    );

router.get("/logout", studentController.logout);

module.exports = router;
