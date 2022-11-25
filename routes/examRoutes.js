const express = require("express");
const router = express.Router();
const passport = require("passport");
const Exam = require("../models/exam");
const catchAsync = require("../utils/catchAsync");
const { validateUser } = require("../utils/validateModel");
const examController = require("../controllers/examController");
const isLoggedIn = require("../utils/isLoggedIn");

router.get("/examschedule", isLoggedIn,examController.renderExamSchedule);
router.get("/score", isLoggedIn, examController.renderExamScore)
module.exports = router;
