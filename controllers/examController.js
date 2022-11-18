const Exam = require("../models/exam");

module.exports.renderExamSchedule = async (req, res) => {
    const exams = await Exam.find();
    const student = req.user._id;
    const examsOfStudent = exams.filter((el) => el.students.includes(student));
    res.render("exams/schedule", {examsOfStudent});
};
