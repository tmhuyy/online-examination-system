const Exam = require("../models/exam");
const Record = require("../models/record");

module.exports.renderExamSchedule = async (req, res) => {
    const exams = await Exam.find().populate({ path: "course" });
    const studentID = req.session?.student?._id;
    const examsOfStudent = exams.filter((el) => el.students.includes(studentID));
    res.render("exams/schedule", {examsOfStudent});
};

module.exports.renderExamScore = async (req, res) => {
    const exams = await Exam.find();
    const record = await Record.find().populate({ path: "courseID" });
    const studentID = req.session?.student?._id;
    const recordOfStudent = record.filter(el => el.studentID.toString() === studentID.toString())
    res.render("exams/score", {recordOfStudent});
};
