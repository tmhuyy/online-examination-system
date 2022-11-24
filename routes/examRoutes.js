const express = require("express");
const router = express.Router();
const passport = require("passport");
const Exam = require("../models/exam");
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../utils/validateModel");
const examController = require("../controllers/examController");

// router
//     .route("/login")
//     .get(studentController.renderLoginForm)
//     .post(
//         passport.authenticate("local", {
//             failureFlash: true,
//             failureRedirect: "/login",
//             keepSessionInfo: true,
//         }),
//         studentController.login
//     );

router.get("/examschedule", examController.renderExamSchedule);
router.get("/score", examController.renderExamScore)
module.exports = router;
